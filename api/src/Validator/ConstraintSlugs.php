<?php

declare(strict_types=1);

namespace App\Validator;

use Attribute;
use Symfony\Component\Validator\Constraint;

#[Attribute]
class ConstraintSlugs extends Constraint
{
    public string $message = 'The slug {{ communication }}.';

    public function validatedBy(): string
    {
        return SlugsValidator::class;
    }
}
