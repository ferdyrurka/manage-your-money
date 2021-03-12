<?php

namespace App\Repository;

use App\Entity\OperationLocation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method OperationLocation|null find($id, $lockMode = null, $lockVersion = null)
 * @method OperationLocation|null findOneBy(array $criteria, array $orderBy = null)
 * @method OperationLocation[]    findAll()
 * @method OperationLocation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OperationLocationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OperationLocation::class);
    }

    // /**
    //  * @return OperationLocation[] Returns an array of OperationLocation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?OperationLocation
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
