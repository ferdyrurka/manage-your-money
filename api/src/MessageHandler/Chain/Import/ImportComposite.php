<?php

declare(strict_types=1);

namespace App\MessageHandler\Chain\Import;

use App\Message\Chain\Import\ImportOperationChainMessage;

class ImportComposite extends AbstractComposite
{
    public function add(AbstractHandler $handler): void
    {
        $this->storage->attach($handler);
    }

    public function setNextHandler(AbstractHandler $handler): AbstractHandler
    {
        return $handler;
    }

    public function handle(ImportOperationChainMessage $message): void
    {
        if (!$this->storage->count()) {
            return;
        }

        $first = null;
        $current = null;

        /** @var AbstractHandler $handler */
        foreach ($this->storage as $handler) {
            if (!$current instanceof AbstractHandler) {
                $first = $handler;
                $current = $handler;

                continue;
            }

            $current = $current->setNextHandler($handler);
        }

        $first->handle($message);
    }
}
