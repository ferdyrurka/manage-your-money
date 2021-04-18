<?php

declare(strict_types=1);

namespace App\MessageHandler\Chain\Import\Steps;

use App\Message\Chain\Import\ImportOperationChainMessage;
use App\MessageHandler\Chain\Import\AbstractHandler;

final class OtherHandler extends AbstractHandler
{
    public function handle(ImportOperationChainMessage $message): void
    {
        $description = $this->getCsvColumnValue('description', $message->getCsvRecord());

        $message->getOperation()->setDescription($description);

        parent::handle($message);
    }
}
