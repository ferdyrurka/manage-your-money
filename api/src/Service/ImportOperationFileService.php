<?php

declare(strict_types=1);

namespace App\Service;

use App\Util\ImportOperationColumnMapper;
use League\Csv\Reader;

class ImportOperationFileService
{
    public function checkCompatibility(Reader $csv): bool
    {
        $requiredKeys = ImportOperationColumnMapper::getAllPlLowerKeys();

        foreach ($csv->getHeader() as $column) {
            $column = strtolower($column);

            if ($column && isset($requiredKeys[$column])) {
                unset($requiredKeys[$column]);
            }
        }

        return (count($requiredKeys) === 0);
    }
}
