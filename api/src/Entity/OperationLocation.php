<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OperationLocationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=OperationLocationRepository::class)
 */
#[ApiResource]
class OperationLocation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    #[Assert\NotBlank]
    #[Assert\Unique]
    private string $name;

    /**
     * @ORM\ManyToMany(targetEntity=OperationCategory::class, mappedBy="locations", fetch="EXTRA_LAZY")
     */
    private Collection $operationCategories;

    public function __construct()
    {
        $this->operationCategories = new ArrayCollection();
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
     * @return Collection|OperationCategory[]
     */
    public function getOperationCategories(): Collection
    {
        return $this->operationCategories;
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
}
