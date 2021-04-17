<?php

declare(strict_types=1);

namespace App\Controller;

use App\DTO\OperationImportDTO;
use App\Exception\InvalidArgumentException;
use App\Form\OperationImportFormType;
use App\Message\ImportOperationMessage;
use App\Message\SaveImportOperationFileMessage;
use Ramsey\Uuid\Uuid;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\Exception\HandlerFailedException;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class OperationImportController extends AbstractController
{
    public function __construct(
        private MessageBusInterface $messageBus,
    ) {
    }

    #[Route(path: "/api/v1/operation/import", methods: ["POST"])]
    public function importAction(Request $request): JsonResponse
    {
        $form = $this->createForm(OperationImportFormType::class, new OperationImportDTO());
        $form->submit($request->files->all());

        if ($form->isSubmitted() && $form->isValid()) {
            $fileUuid = Uuid::uuid4();

            try {
                $this->messageBus->dispatch(
                    new SaveImportOperationFileMessage($form->getData()->file, $fileUuid)
                );
            } catch (HandlerFailedException $e) {
                if ($e->getPrevious() instanceof InvalidArgumentException) {
                    return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
                }

                throw $e;
            }

            $this->messageBus->dispatch(new ImportOperationMessage($fileUuid));

            return new JsonResponse([], Response::HTTP_OK);
        }

        return new JsonResponse(['message' => (string) $form->getErrors(true, false)], Response::HTTP_BAD_REQUEST);
    }
}
