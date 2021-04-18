<?php

declare(strict_types=1);

namespace App\Tests\MessageHandler\Chain\Import\Steps;

use App\Entity\Operation;
use App\Exception\InvalidArgumentException;
use App\Message\Chain\Import\ImportOperationChainMessage;
use App\MessageHandler\Chain\Import\Steps\DateHandler;
use DateTime;
use Mockery;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use PHPUnit\Framework\TestCase;

class DateHandlerTest extends TestCase
{
    use MockeryPHPUnitIntegration;

    private DateHandler $handler;

    private ImportOperationChainMessage $message;

    protected function setUp(): void
    {
        $this->handler = new DateHandler();
        $this->message = Mockery::mock(ImportOperationChainMessage::class);
    }

    /**
     * @test
     * @dataProvider getBadRawData
     */
    public function badRawData(string $rawDate): void
    {
        $this->message->shouldReceive('getCsvRecord')->once()->andReturn(['Data operacji' => $rawDate]);

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Give invalid format pay at data. Value: ' . $rawDate);
        $this->handler->handle($this->message);
    }

    public function getBadRawData(): array
    {
        return [
            ['<?php echo test ?>'],
            ['<?php return false; ?>'],
            ['BLA'],
            ['2030-02-AA'],
        ];
    }

    /**
     * @test
     */
    public function featureRawData(): void
    {
        $date = new DateTime('+1 day');
        $this->message->shouldReceive('getCsvRecord')->once()->andReturn(
            ['Data operacji' => $date->format('Y-m-d')]
        );

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Give a future date but excepted today or earlier');
        $this->handler->handle($this->message);
    }

    /**
     * @test
     */
    public function validRawData(): void
    {
        $date = new DateTime('-1 day');

        $operation = Mockery::mock(Operation::class);
        $operation->shouldReceive('setPayAt')->once()->with(DateTime::class);

        $this->message->shouldReceive('getCsvRecord')->once()->andReturn(
            ['Data operacji' => $date->format('Y-m-d')]
        );
        $this->message->shouldReceive('getOperation')->once()->andReturn($operation);

        $this->handler->handle($this->message);
    }
}
