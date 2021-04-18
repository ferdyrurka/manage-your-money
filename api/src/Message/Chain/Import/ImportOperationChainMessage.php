<?php

declare(strict_types=1);

namespace App\Message\Chain\Import;

use App\Entity\Operation;
use App\Entity\OperationLocation;
use App\Entity\OperationType;

class ImportOperationChainMessage
{
    public function __construct(
        private Operation $operation,
        private array $csvRecord,
        /** @var OperationLocation[] $locations */
        private array $locations,
        /** @var OperationType[] $locations */
        private array $types,
    ) {
    }

    public function getOperation(): Operation
    {
        return $this->operation;
    }

    public function getCsvRecord(): array
    {
        return $this->csvRecord;
    }

    /**
     * @return OperationLocation[]
     */
    public function getLocations(): array
    {
        return $this->locations;
    }

    /**
     * @return OperationType[]
     */
    public function getTypes(): array
    {
        return $this->types;
    }
}
