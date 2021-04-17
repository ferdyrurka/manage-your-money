<?php

declare(strict_types=1);

namespace App\DTO;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

class OperationImportDTO
{
    #[Assert\File(
        maxSize: "18M",
        maxSizeMessage: 'Maximum size is 18MB',
    )]
    public UploadedFile $file;
}
