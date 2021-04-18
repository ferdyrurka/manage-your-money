<?php

declare(strict_types=1);

namespace App\Util;

use App\Entity\OperationLocation;
use App\Entity\OperationType;

class ImportOperationColumnMapper
{
    private const PKOBP_PL_COLUMNS = [
        'Data operacji' => 'payAt',
        'Typ transakcji' => OperationType::class,
        'Kwota' => 'amount',
        'Saldo po transakcji' => 'balanceAfterSurgery',
        'Opis transakcji' => 'description',
        'Lokalizacja' => OperationLocation::class,
    ];

    public static function getAllPlLowerKeys(): array
    {
        $keys = array_keys(self::PKOBP_PL_COLUMNS);
        $keys = array_map('strtolower', $keys);

        return array_flip($keys);
    }

    public static function findPlForSystemColumn(string $systemColumn): string
    {
        return array_search($systemColumn, self::PKOBP_PL_COLUMNS);
    }
}
