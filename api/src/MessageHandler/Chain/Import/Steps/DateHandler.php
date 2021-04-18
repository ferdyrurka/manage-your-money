<?php

declare(strict_types=1);

namespace App\MessageHandler\Chain\Import\Steps;

use App\Exception\InvalidArgumentException;
use App\Message\Chain\Import\ImportOperationChainMessage;
use App\MessageHandler\Chain\Import\AbstractHandler;
use DateTime;

final class DateHandler extends AbstractHandler
{
    public function handle(ImportOperationChainMessage $message): void
    {
        $rawPayAt = $this->getCsvColumnValue('payAt', $message->getCsvRecord());
        $payAt = $this->parseDate($rawPayAt);

        if ($payAt > (new DateTime())) {
            throw new InvalidArgumentException('Give a future date but excepted today or earlier');
        }

        $message->getOperation()->setPayAt($payAt);

        parent::handle($message);
    }

    private function parseDate(string $raw): DateTime
    {
        try {
            return new DateTime($raw);
        } catch (\Exception) {
            throw new InvalidArgumentException('Give invalid format pay at data. Value: ' . $raw);
        }
    }
}
