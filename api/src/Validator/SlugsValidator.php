<?php

declare(strict_types=1);

namespace App\Validator;

use App\Exception\InvalidArgumentException;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class SlugsValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof ConstraintSlugs) {
            throw new UnexpectedTypeException($constraint, ConstraintSlugs::class);
        }

        if (!is_array($value)) {
            throw new InvalidArgumentException(
                'Excepted array but given: ' . get_debug_type($constraint),
            );
        }

        if (!count($value)) {
            return;
        }

        foreach ($value as $item) {
            if (!is_string($item)) {
                throw new UnexpectedValueException($item, 'string');
            }

            if (preg_match('/^[A-Za-z0-9 ]*$/', $item) === false) {
                $this->context->buildViolation($constraint->message)
                    ->setParameter('{{ communication }}', 'have illegal character')
                    ->addViolation();

                return;
            }
        }

        if (count(array_unique($value)) === count($value)) {
            return;
        }

        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ communication }}', 'don\'t have only unique values')
            ->addViolation();
    }
}
