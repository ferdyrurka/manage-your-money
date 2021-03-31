<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiProperty;

/**
 * @ORM\Entity
 */
#[UniqueEntity(fields: ['name'])]
#[ApiResource(
    collectionOperations: [
        'get' => ['normalization_context' => ['groups' => ['admin:OperationCategory:read', 'admin:OperationLocation:read']]],
        'post' => ['denormalization_context' => ['groups' => ['admin:OperationCategory:write']]],
    ],
    graphql: ['item_query', 'collection_query',],
    itemOperations: [
        'get' => ['normalization_context' => ['groups' => ['admin:OperationCategory:read', 'admin:OperationLocation:read']]],
        'patch' => ['denormalization_context' => ['groups' => ['admin:OperationCategory:write']]],
        //TODO: delete is change status
        //  'delete',
    ],
    denormalizationContext: ['groups' => ['admin:OperationCategory:write']],
    normalizationContext: ['groups' => ['admin:OperationCategory:read', 'admin:OperationLocation:read']],
)]
class OperationCategory
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[ApiProperty(identifier: false)]
    private int $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Assert\NotBlank]
    #[Groups(['admin:OperationCategory:read', 'admin:OperationCategory:write'])]
    private string $name;

    /**
     * @ORM\ManyToMany(targetEntity=OperationLocation::class, inversedBy="operationCategories", fetch="EXTRA_LAZY")
     */
    #[Groups(['admin:OperationCategory:write', 'admin:OperationLocation:read'])]
    private Collection $locations;

    /**
     * @ORM\Column(type="string", length=36, unique=true)
     */
    #[ApiProperty(identifier: true)]
    #[Groups(['admin:OperationCategory:read'])]
    private string $hash;

    public function __construct()
    {
        $this->locations = new ArrayCollection();
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
     * @return OperationLocation[]
     */
    public function getLocations(): array
    {
        return $this->locations->getValues();
    }

    public function addLocation(OperationLocation $location): self
    {
        if (!$this->locations->contains($location)) {
            $this->locations[] = $location;
        }

        return $this;
    }

    public function removeLocation(OperationLocation $location): self
    {
        $this->locations->removeElement($location);

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
