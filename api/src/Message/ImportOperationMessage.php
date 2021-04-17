<?php

namespace App\Message;

use Ramsey\Uuid\UuidInterface;

final class ImportOperationMessage
{
    private UuidInterface $fileUuid;

    public function __construct(UuidInterface $fileUuid)
    {
        $this->fileUuid = $fileUuid;
    }

    public function getFileUuid(): UuidInterface
    {
        return $this->fileUuid;
    }
}
