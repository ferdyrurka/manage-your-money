<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Validator as AppAssert;

/**
 * @ORM\Entity
 */
#[UniqueEntity(fields: ['name'])]
#[ApiResource(
    collectionOperations: [
        'get' => ['normalization_context' => ['groups' => ['admin:OperationType:read']]],
        'post' => ['denormalization_context' => ['groups' => ['admin:OperationType:write']]],
    ],
    graphql: ['item_query', 'collection_query',],
    itemOperations: [
        'get' => ['normalization_context' => ['groups' => ['admin:OperationType:read']]],
        'put' => ['denormalization_context' => ['groups' => ['admin:OperationType:write']]],
        //TODO: delete is change status
        // 'delete',
    ],
    denormalizationContext: ['groups' => ['admin:OperationType:write']],
    normalizationContext: ['groups' => ['admin:OperationType:read']],
)]
class OperationType
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[ApiProperty(identifier: false)]
    private int $id;

    /**
     * @ORM\Column(type="string", length=64, unique=true)
     */
    #[Assert\NotBlank]
    #[Groups(['admin:OperationType:read', 'admin:OperationType:write'])]
    private string $name;

    /**
     * @ORM\Column(type="array")
     */
    #[Assert\NotBlank]
    #[AppAssert\ConstraintSlugs]
    #[Groups(['admin:OperationType:read', 'admin:OperationType:write'])]
    private array $slugs = [];

    /**
     * @ORM\Column(type="string", length=36, unique=true)
     */
    #[ApiProperty(identifier: true)]
    #[Groups(['admin:OperationType:read'])]
    private string $hash;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private DateTimeImmutable $createdAt;

    public function __construct()
    {
        $this->hash = Uuid::uuid4()->toString();
        $this->createdAt = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSlugs(): ?array
    {
        return $this->slugs;
    }

    public function setSlugs(array $slugs): self
    {
        $this->slugs = $slugs;

        return $this;
    }

    public function getHash(): ?string
    {
        return $this->hash;
    }

    public function setHash(string $hash): self
    {
        $this->hash = $hash;

        return $this;
    }
}
