<?php

namespace App\MessageHandler;

use App\Message\ImportOperationMessage;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

final class ImportOperationMessageHandler implements MessageHandlerInterface
{
    public function __invoke(ImportOperationMessage $message)
    {

    }
}
