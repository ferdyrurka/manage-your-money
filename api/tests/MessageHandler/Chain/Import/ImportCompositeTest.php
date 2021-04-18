<?php

declare(strict_types=1);

namespace App\Tests\MessageHandler\Chain\Import;

use App\Entity\Operation;
use App\Message\Chain\Import\ImportOperationChainMessage;
use App\MessageHandler\Chain\Import\AbstractHandler;
use App\MessageHandler\Chain\Import\ImportComposite;
use Mockery;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use PHPUnit\Framework\TestCase;

class ImportCompositeTest extends TestCase
{
    use MockeryPHPUnitIntegration;

    private ImportComposite $importComposite;

    protected function setUp(): void
    {
        $this->importComposite = new ImportComposite();
    }

    public function testHandleManyHandlers(): void
    {
        $handler1 = Mockery::mock(AbstractHandler::class);
        $handler2 = clone $handler1;
        $handler3 = clone $handler1;

        $handler1->shouldReceive('setNextHandler')->once()->with(AbstractHandler::class)->andReturn($handler2);
        $handler1->shouldReceive('handle')->once()->with(ImportOperationChainMessage::class);

        $handler2->shouldReceive('setNextHandler')->once()->with(AbstractHandler::class)->andReturn($handler3);
        $handler2->shouldReceive('handle')->once()->with(ImportOperationChainMessage::class);

        $handler3->shouldReceive('setNextHandler')->never();
        $handler3->shouldReceive('handle')->once()->with(ImportOperationChainMessage::class);

        $this->importComposite->add($handler1);
        $this->importComposite->add($handler2);
        $this->importComposite->add($handler3);

        $this->importComposite->handle(new ImportOperationChainMessage(new Operation(), [], [], []));
    }

    public function testHandleOneHandlers(): void
    {
        $handler1 = Mockery::mock(AbstractHandler::class);

        $handler1->shouldReceive('setNextHandler')->never();
        $handler1->shouldReceive('handle')->once()->withArgs([ImportOperationChainMessage::class]);

        $this->importComposite->add($handler1);

        $this->importComposite->handle(new ImportOperationChainMessage(new Operation(), [], [], []));
    }
}
