<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\RangeFilter;
use DateTime;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 */
#[ApiResource(
    collectionOperations: [
        'get' => ['normalization_context' => ['groups' => ['read']]],
        'post' => ['denormalization_context' => ['groups' => ['write'], 'datetime_format' => 'Y-m-d']],
    ],
    graphql: ['item_query', 'collection_query'],
    itemOperations: [
        'get' => ['normalization_context' => ['groups' => ['read']]],
        'patch' => ['denormalization_context' => ['groups' => ['write'], 'datetime_format' => 'Y-m-d']],
        'delete',
    ],
    attributes: ['pagination_client_enabled' => true],
    denormalizationContext: ['groups' => ['write']],
    formats: ['json', 'jsonld', 'html'],
    normalizationContext: ['groups' => ['read']]
)]
#[ApiFilter(DateFilter::class, properties: ['payAt' => DateFilter::EXCLUDE_NULL,])]
#[ApiFilter(RangeFilter::class, properties: ['amount'])]
#[ApiFilter(OrderFilter::class, properties: ['payAt'], arguments: ['orderParameterName' => 'order'])]
class Operation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[ApiProperty(identifier: false)]
    private int $id;

    /**
     * @ORM\Column(type="float")
     */
    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Groups(['read', 'write'])]
    private float $amount;

    /**
     * @ORM\Column(type="float")
     */
    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Groups(['read', 'write'])]
    private float $balanceAfterSurgery;

    /**
     * @ORM\Column(type="text")
     */
    #[Groups(['read', 'write'])]
    private string $description = '';

    /**
     * @ORM\Column(type="date")
     */
    #[Groups(['read', 'write'])]
    #[Assert\LessThanOrEqual('now')]
    #[Assert\NotBlank]
    #[Assert\NotNull]
    private DateTimeInterface $payAt;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    #[Groups(['read'])]
    private DateTimeImmutable $createdAt;

    /**
     * @ORM\Column(type="datetime")
     */
    #[Groups(['read'])]
    private DateTime $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=OperationLocation::class)
     * @ORM\JoinColumn(nullable=true)
     */
    #[Groups(['read', 'write'])]
    private ?OperationLocation $location = null;

    /**
     * @ORM\ManyToOne(targetEntity=OperationType::class)
     * @ORM\JoinColumn(nullable=true)
     */
    #[Groups(['read', 'write'])]
    private ?OperationType $type = null;

    /**
     * @ORM\Column(type="boolean", options={"default": 0})
     */
    private bool $expense = false;

    /**
     * @ORM\Column(type="boolean", options={"default": 0})
     */
    private bool $income = false;

    /**
     * @ORM\Column(type="string", length=36, unique=true)
     */
    #[ApiProperty(identifier: true)]
    #[Groups(['read'])]
    private string $hash;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
        $this->hash = Uuid::uuid4()->toString();
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

        if ($this->amount < 0) {
            $this->expense = true;
        } else {
            $this->income = true;
        }

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

    public function getHash(): string
    {
        return $this->hash;
    }

    private function update(): void
    {
        $this->updatedAt = new DateTime();
    }
}
