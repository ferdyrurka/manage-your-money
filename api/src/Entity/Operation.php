<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use DateTime;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 */
#[ApiResource(
    collectionOperations: [
        'get' => ['normalization_context' => ['groups' => ['user:Operation:read']]],
        'post' => ['denormalization_context' => ['groups' => ['user:Operation:write']]],
    ],
    graphql: ['item_query', 'collection_query'],
    itemOperations: [
        'get' => ['normalization_context' => ['groups' => ['user:Operation:read']]],
        'patch' => ['denormalization_context' => ['groups' => ['user:Operation:write']]],
        //TODO: delete is change status
        // 'delete',
    ],
    denormalizationContext: ['groups' => ['user:Operation:write']],
    normalizationContext: ['groups' => ['user:Operation:read']]
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
     * @ORM\Column(type="text")
     */
    #[Assert\NotBlank]
    #[Groups(['user:Operation:read', 'user:Operation:write'])]
    private string $description;

    /**
     * @ORM\Column(type="date")
     */
    #[Groups(['user:Operation:read'])]
    private DateTime $payAt;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    #[Groups(['user:Operation:read'])]
    private DateTimeImmutable $createdAt;

    /**
     * @ORM\Column(type="datetime")
     */
    #[Groups(['user:Operation:read'])]
    private DateTime $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=OperationLocation::class)
     * @ORM\JoinColumn(nullable=true)
     */
    #[Assert\NotNull]
    #[Groups(['user:OperationLocation:read', 'user:Operation:write'])]
    private ?OperationLocation $location = null;

    /**
     * @ORM\ManyToOne(targetEntity=OperationType::class)
     * @ORM\JoinColumn(nullable=true)
     */
    #[Assert\NotNull]
    #[Groups(['user:OperationLocation:read', 'user:Operation:write'])]
    private ?OperationType $type = null;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
        $this->update();
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
        $this->update();

        return $this;
    }

    public function getBalanceAfterSurgery(): ?float
    {
        return $this->balanceAfterSurgery;
    }

    public function setBalanceAfterSurgery(float $balanceAfterSurgery): self
    {
        $this->balanceAfterSurgery = $balanceAfterSurgery;
        $this->update();

        return $this;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?DateTime
    {
        return $this->updatedAt;
    }

    public function getLocation(): ?OperationLocation
    {
        return $this->location;
    }

    public function setLocation(?OperationLocation $location): self
    {
        $this->location = $location;
        $this->update();

        return $this;
    }

    public function getPayAt(): DateTime
    {
        return $this->payAt;
    }

    public function setPayAt(DateTime $payAt): self
    {
        $this->payAt = $payAt;
        $this->update();

        return $this;
    }

    public function getType(): ?OperationType
    {
        return $this->type;
    }

    public function setType(?OperationType $type): self
    {
        $this->type = $type;
        $this->update();

        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;
        $this->update();

        return $this;
    }

    private function update(): void
    {
        $this->updatedAt = new DateTime();
    }
}
