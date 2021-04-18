<?php

namespace PHPExtension;

function str_contains_array(string $haystack, array $needles): bool|int
{
    $haystack = strtolower($haystack);

    foreach ($needles as $key => $needle) {
        $needle = strtolower($needle);

        if (str_contains($haystack, $needle)) {
            return $key;
        }
    }

    return false;
}
