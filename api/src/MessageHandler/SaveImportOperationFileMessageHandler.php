<?php

namespace App\MessageHandler;

use App\Exception\InvalidArgumentException;
use App\Message\SaveImportOperationFileMessage;
use App\Service\ImportOperationFileService;
use League\Csv\Reader;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

final class SaveImportOperationFileMessageHandler implements MessageHandlerInterface
{
    public function __construct(
        private string $importStoragePath,
        private ImportOperationFileService $importFileService,
    ) {
    }

    public function __invoke(SaveImportOperationFileMessage $message)
    {
        $file = $message->getFile();

        $csv = Reader::createFromString($file->getContent());
        $csv->setHeaderOffset(0);

        if (!$this->importFileService->checkCompatibility($csv)) {
            throw new InvalidArgumentException('Not all required columns or given to many columns were provided.');
        }

        $file->move(
            $this->importStoragePath,
            $message->getUuid() . '.csv'
        );
    }
}
