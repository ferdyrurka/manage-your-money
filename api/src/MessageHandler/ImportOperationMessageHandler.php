<?php

namespace App\MessageHandler;

use App\Entity\Operation;
use App\Exception\InvalidArgumentException;
use App\Message\Chain\Import\ImportOperationChainMessage;
use App\Message\ImportOperationMessage;
use App\MessageHandler\Chain\Import\AbstractHandler;
use App\MessageHandler\Chain\Import\ImportComposite;
use App\Repository\OperationLocationRepository;
use App\Repository\OperationRepository;
use App\Repository\OperationTypeRepository;
use Exception;
use League\Csv\Reader;
use League\Flysystem\FilesystemOperator;
use Psr\Log\LoggerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

final class ImportOperationMessageHandler implements MessageHandlerInterface
{
    public function __construct(
        private OperationLocationRepository $operationLocationRepository,
        private OperationTypeRepository $operationTypeRepository,
        private OperationRepository $operationRepository,
        private FilesystemOperator $importOperationStorage,
        private ImportComposite $importComposite,
        private LoggerInterface $logger,
        /** @var AbstractHandler[] $handlers */
        private array $handlers,
    ) {
    }

    public function __invoke(ImportOperationMessage $message)
    {
        $csv = Reader::createFromString(
            $this->importOperationStorage->read($message->getFileUuid()->toString() . '.csv')
        );
        $csv->setHeaderOffset(0);

        $locations = $this->operationLocationRepository->findAll();
        $types = $this->operationTypeRepository->findAll();

        foreach ($this->handlers as $handler) {
            $this->importComposite->add($handler);
        }

        foreach ($csv as $record) {
            $operation = new Operation();
            $message = new ImportOperationChainMessage($operation, $record, $locations, $types);

            try {
                $this->importComposite->handle($message);

                $this->operationRepository->save($operation);
            } catch (InvalidArgumentException $exception) {
                $this->logger->info($exception->getMessage(), ['exception' => $exception]);
            } catch (Exception $exception) {
                $this->logger->error($exception->getMessage(), ['exception' => $exception]);
            }
        }
    }
}
