<?php

declare(strict_types=1);

namespace App\MessageHandler\Chain\Import;

use App\Entity\OperationType;
use App\Exception\InvalidArgumentException;
use App\Message\Chain\Import\ImportOperationChainMessage;
use App\Util\ImportOperationColumnMapper;

abstract class AbstractHandler
{
    protected ?self $nextHandler = null;

    public function setNextHandler(self $handler): self
    {
        $this->nextHandler = $handler;

        return $handler;
    }

    public function handle(ImportOperationChainMessage $message): void
    {
        if ($this->nextHandler instanceof self) {
            $this->nextHandler->handle($message);
        }
    }

    protected function getCsvColumnValue(string $columnName, array $csvRecord, bool $isEmpty = false): string
    {
        $column = ImportOperationColumnMapper::findPlForSystemColumn($columnName);
        $value = $csvRecord[$column] ?? null;

        if (!$value && !$isEmpty) {
            throw new InvalidArgumentException('Give bad type value. Column: ' . $column . ' value: ' . $value);
        }

        return $value;
    }
}
