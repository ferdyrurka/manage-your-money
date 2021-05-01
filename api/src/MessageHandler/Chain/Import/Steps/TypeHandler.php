<?php

declare(strict_types=1);

namespace App\MessageHandler\Chain\Import\Steps;

use App\Entity\OperationLocation;
use App\Entity\OperationType;
use App\Exception\InvalidArgumentException;
use App\Message\Chain\Import\ImportOperationChainMessage;
use App\MessageHandler\Chain\Import\AbstractHandler;
use App\Util\ImportOperationColumnMapper;

use function PHPExtension\str_contains_array;

final class TypeHandler extends AbstractHandler
{
    public function handle(ImportOperationChainMessage $message): void
    {
        $value = $this->getCsvColumnValue(OperationType::class, $message->getCsvRecord());

        foreach ($message->getTypes() as $type) {
            if (str_contains_array($value, $type->getSlugs())) {
                $message->getOperation()->setType($type);
                break;
            }
        }

        parent::handle($message);
    }
}
