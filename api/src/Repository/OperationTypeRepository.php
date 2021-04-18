<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\OperationType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class OperationTypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OperationType::class);
    }

    public function findAll(): array
    {
        return $this->createQueryBuilder('ot')
            ->orderBy('ot.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
