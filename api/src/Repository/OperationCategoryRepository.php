<?php

namespace App\Repository;

use App\Entity\OperationCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method OperationCategory|null find($id, $lockMode = null, $lockVersion = null)
 * @method OperationCategory|null findOneBy(array $criteria, array $orderBy = null)
 * @method OperationCategory[]    findAll()
 * @method OperationCategory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OperationCategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OperationCategory::class);
    }

    // /**
    //  * @return OperationCategory[] Returns an array of OperationCategory objects
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
    public function findOneBySomeField($value): ?OperationCategory
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
