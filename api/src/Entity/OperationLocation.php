<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OperationLocationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=OperationLocationRepository::class)
 * TODO: go to only admin
 */
#[UniqueEntity(fields: ['name'])]
#[ApiResource(
    collectionOperations: [
    'get' => ['normalization_context' => ['groups' => ['user:OperationCategory:read', 'user:OperationLocation:read']]],
    'post' => ['denormalization_context' => ['groups' => ['user:OperationLocation:write']]],
],
    itemOperations: [
    'get' => ['normalization_context' => ['groups' => ['user:OperationCategory:read', 'user:OperationLocation:read']]],
    'patch' => ['denormalization_context' => ['groups' => ['user:OperationLocation:write']]],
//TODO: delete is change status
//    'delete',
],
    denormalizationContext: ['groups' => ['user:OperationLocation:write']],
    normalizationContext: ['groups' => ['user:OperationLocation:read']],
)]
class OperationLocation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[ApiProperty(identifier: false)]
    private int $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    #[Assert\NotBlank]
    #[Groups(['user:OperationLocation:read', 'user:OperationLocation:write'])]
    private string $name;

    /**
     * @ORM\ManyToMany(targetEntity=OperationCategory::class, mappedBy="locations", fetch="EXTRA_LAZY")
     */
    #[Groups(['user:OperationLocation:write', 'user:OperationCategory:read'])]
    private Collection $operationCategories;

    /**
     * @ORM\Column(type="string", length=36, unique=true)
     */
    #[ApiProperty(identifier: true)]
    #[Groups(['user:OperationLocation:read'])]
    private string $hash;

    /**
     * @ORM\Column(type="array")
     */
    #[Assert\NotBlank]
    #[Groups(['user:OperationLocation:write'])]
    private array $slugs = [];

    public function __construct()
    {
        $this->operationCategories = new ArrayCollection();
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

    /**
     * @return OperationCategory[]
     */
    public function getOperationCategories(): array
    {
        return $this->operationCategories->getValues();
    }

    public function addOperationCategory(OperationCategory $operationCategory): self
    {
        if (!$this->operationCategories->contains($operationCategory)) {
            $this->operationCategories[] = $operationCategory;
            $operationCategory->addLocation($this);
        }

        return $this;
    }

    public function removeOperationCategory(OperationCategory $operationCategory): self
    {
        if ($this->operationCategories->removeElement($operationCategory)) {
            $operationCategory->removeLocation($this);
        }

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

    public function getSlugs(): ?array
    {
        return $this->slugs;
    }

    public function setSlugs(array $slugs): self
    {
        $this->slugs = $slugs;

        return $this;
    }
}
