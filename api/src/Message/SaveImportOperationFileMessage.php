<?php

namespace App\Message;

use Ramsey\Uuid\UuidInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

final class SaveImportOperationFileMessage
{
    private UploadedFile $file;

    private UuidInterface $uuid;

    public function __construct(UploadedFile $file, UuidInterface $uuid)
    {
        $this->file = $file;
        $this->uuid = $uuid;
    }

    public function getFile(): UploadedFile
    {
        return $this->file;
    }

    public function getUuid(): UuidInterface
    {
        return $this->uuid;
    }
}
