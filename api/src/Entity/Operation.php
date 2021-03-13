<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OperationRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=OperationRepository::class)
 */
#[ApiResource(
    collectionOperations: [
    'get' => ['normalization_context' => ['groups' => ['user:Operation:read']]],
    'post' => ['denormalization_context' => ['groups' => ['user:Operation:write']]],
],
    itemOperations: [
    'get' => ['normalization_context' => ['groups' => ['user:Operation:read']]],
    'patch' => ['denormalization_context' => ['groups' => ['user:Operation:write']]],
    'delete',
],
    denormalizationContext: ['groups' => ['user:Operation:write']],
    normalizationContext: ['groups' => ['user:Operation:read']],
)]
class Operation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="float")
     */
    #[Assert\NotBlank]
    #[Groups(['user:Operation:read', 'user:Operation:write'])]
    private float $amount;

    /**
     * @ORM\Column(type="float")
     */
    #[Assert\NotBlank]
    #[Groups(['user:Operation:read', 'user:Operation:write'])]
    private float $balanceAfterSurgery;

    /**
     * @ORM\Column(type="datetime")
     */
    #[Groups(['user:Operation:read'])]
    private DateTime $createdAt;

    /**
     * @ORM\Column(type="datetime")
     */
    #[Groups(['user:Operation:read'])]
    private DateTime $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=OperationType::class)
     * @ORM\JoinColumn(nullable=false)
     */
    #[Assert\NotNull]
    #[Groups(['user:OperationLocation:read', 'user:Operation:write'])]
    private OperationLocation $location;

    public function __construct()
    {
        $this->createdAt = new DateTime();
        $this->updatedAt = new DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getBalanceAfterSurgery(): ?float
    {
        return $this->balanceAfterSurgery;
    }

    public function setBalanceAfterSurgery(float $balanceAfterSurgery): self
    {
        $this->balanceAfterSurgery = $balanceAfterSurgery;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function getLocation(): ?OperationType
    {
        return $this->location;
    }

    public function setLocation(?OperationType $location): self
    {
        $this->location = $location;

        return $this;
    }
}
