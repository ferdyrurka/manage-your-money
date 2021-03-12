<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OperationCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=OperationCategoryRepository::class)
 */
#[ApiResource]
class OperationCategory
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Assert\NotBlank]
    #[Assert\Unique]
    private string $name;

    /**
     * @ORM\ManyToMany(targetEntity=OperationLocation::class, inversedBy="operationCategories", fetch="EXTRA_LAZY")
     */
    private Collection $locations;

    /**
     * @ORM\Column(type="array")
     */
    #[Assert\NotBlank]
    private array $slugs = [];

    public function __construct()
    {
        $this->locations = new ArrayCollection();
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
     * @return Collection|OperationLocation[]
     */
    public function getLocations(): Collection
    {
        return $this->locations;
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
}
