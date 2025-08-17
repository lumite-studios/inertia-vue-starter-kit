<?php

namespace App\Common;

use Closure;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;
use Inertia\DeferProp;
use Inertia\Inertia;
use Inertia\LazyProp;
use Inertia\MergeProp;
use Inertia\Response;

abstract class Controller
{
    public function inertia(string $path, array $data = [], array $additionalTranslations = []): Response
    {
        $translations = $this->buildTranslations($this->getRouteTranslations(), ...$additionalTranslations);
        $data = array_merge(['pageTranslations' => $this->defer(fn () => $translations)], $data);
        $data['deferred'] = array_keys(Arr::where($data, fn ($value) => $value instanceof DeferProp));

        return Inertia::render($path, $data);
    }

    protected function defer(Closure $closure, string $group = 'default'): DeferProp
    {
        return Inertia::defer($closure, $group);
    }

    protected function lazy(Closure $closure): LazyProp
    {
        return Inertia::lazy($closure);
    }

    protected function merge(Closure $closure): MergeProp
    {
        return Inertia::merge($closure);
    }

    protected function deepMerge(Closure $closure): MergeProp
    {
        return Inertia::deepMerge($closure);
    }

    protected function buildTranslations(...$translations)
    {
        return json_encode(collect($translations)->transform(function ($trans) {
            return is_string($trans) ? [] : $trans;
        })->collapse()->toArray());
    }

    protected function mergeTranslations(...$translations): string
    {
        return $this->buildTranslations(
            $this->getRouteTranslations(),
            ...$translations,
        );
    }

    protected function getRouteTranslations()
    {
        return trans(Route::currentRouteName());
    }
}
