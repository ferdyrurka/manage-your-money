<?php

declare(strict_types=1);

namespace App\MessageHandler\Chain\Import\Steps;

use App\Message\Chain\Import\ImportOperationChainMessage;
use App\MessageHandler\Chain\Import\AbstractHandler;

final class MoneyHandler extends AbstractHandler
{
    public function handle(ImportOperationChainMessage $message): void
    {
        $this->setBalanceAfterSurgery($message);
        $this->setAmount($message);

        parent::handle($message);
    }

    private function setBalanceAfterSurgery(ImportOperationChainMessage $message): void
    {
        $balanceAfterSurgery = str_replace(
            ',',
            '.',
            $this->getCsvColumnValue('balanceAfterSurgery', $message->getCsvRecord())
        );

        $message->getOperation()->setBalanceAfterSurgery((float) $balanceAfterSurgery);
    }

    private function setAmount(ImportOperationChainMessage $message): void
    {
        $amount = str_replace(
            ',',
            '.',
            $this->getCsvColumnValue('amount', $message->getCsvRecord())
        );

        $message->getOperation()->setAmount((float) $amount);
    }
}
