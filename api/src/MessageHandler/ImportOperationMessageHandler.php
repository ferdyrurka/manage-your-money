<?php

namespace App\MessageHandler;

use App\Message\ImportOperationMessage;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

final class ImportOperationMessageHandler implements MessageHandlerInterface
{
    public function __construct(
        private string $privateStoragePath,
        private string $importStoragePath,
    ) {
    }

    public function __invoke(ImportOperationMessage $message)
    {
        throw new \Exception();
    }
}
