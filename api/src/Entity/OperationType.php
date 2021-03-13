<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OperationTypeRepository;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=OperationTypeRepository::class)
 * TODO: go to only admin
 */
#[UniqueEntity(fields: ['name'])]
#[ApiResource(
    collectionOperations: [
        'get' => ['normalization_context' => ['groups' => ['user:OperationType:read']]],
        'post' => ['denormalization_context' => ['groups' => ['user:OperationType:write']]],
    ],
    itemOperations: [
        'get' => ['normalization_context' => ['groups' => ['user:OperationType:read']]],
        'patch' => ['denormalization_context' => ['groups' => ['user:OperationType:write']]],
//TODO: delete is change status
//    'delete',
    ],
    denormalizationContext: ['groups' => ['user:OperationType:write']],
    normalizationContext: ['groups' => ['user:OperationType:read']],
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
    #[Groups(['user:OperationType:read', 'user:OperationType:write'])]
    private string $name;

    /**
     * @ORM\Column(type="array")
     */
    #[Assert\NotBlank]
    #[Groups(['user:OperationType:write'])]
    private array $slugs = [];

    /**
     * @ORM\Column(type="string", length=36, unique=true)
     */
    #[ApiProperty(identifier: true)]
    #[Groups(['user:OperationType:read'])]
    private string $hash;

    public function __construct()
    {
        $this->hash = Uuid::uuid4()->toString();
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
