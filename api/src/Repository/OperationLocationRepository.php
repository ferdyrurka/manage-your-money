<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\OperationLocation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class OperationLocationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OperationLocation::class);
    }

    public function findAll(): array
    {
        return $this->createQueryBuilder('ol')
            ->orderBy('ol.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
