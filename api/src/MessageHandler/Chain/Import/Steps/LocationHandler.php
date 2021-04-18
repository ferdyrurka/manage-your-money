<?php

declare(strict_types=1);

namespace App\MessageHandler\Chain\Import\Steps;

use App\Entity\OperationLocation;
use App\Message\Chain\Import\ImportOperationChainMessage;
use App\MessageHandler\Chain\Import\AbstractHandler;

use function PHPExtension\str_contains_array;

final class LocationHandler extends AbstractHandler
{
    public function handle(ImportOperationChainMessage $message): void
    {
        $value = $this->getCsvColumnValue(OperationLocation::class, $message->getCsvRecord());

        foreach ($message->getLocations() as $location) {
            if (str_contains_array($value, $location->getSlugs()) !== false) {
                $message->getOperation()->setLocation($location);
                break;
            }
        }

        parent::handle($message);
    }
}
