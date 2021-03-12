<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OperationTypeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=OperationTypeRepository::class)
 */
#[ApiResource]
class OperationType
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=64, unique=true)
     */
    #[Assert\NotBlank]
    #[Assert\Unique]
    private string $name;

    /**
     * @ORM\Column(type="array")
     */
    #[Assert\NotBlank]
    private array $slugs = [];

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
}
