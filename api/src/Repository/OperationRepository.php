<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Operation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class OperationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Operation::class);
    }

    public function save(Operation $operation): void
    {
        $this->getEntityManager()->persist($operation);
        $this->getEntityManager()->flush();
    }
}
