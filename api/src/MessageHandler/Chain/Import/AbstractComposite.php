<?php

declare(strict_types=1);

namespace App\MessageHandler\Chain\Import;

use JetBrains\PhpStorm\Pure;
use SplObjectStorage;

abstract class AbstractComposite extends AbstractHandler
{
    protected SplObjectStorage $storage;

    #[Pure]
    public function __construct()
    {
        $this->storage = new SplObjectStorage();
    }

    abstract public function add(self $handler): void;
}
