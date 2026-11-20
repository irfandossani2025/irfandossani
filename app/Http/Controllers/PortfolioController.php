<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\Response;

class PortfolioController extends Controller
{
    public function index(): View
    {
        return view('portfolio', [
            'portfolio' => config('portfolio'),
        ]);
    }

    public function show(string $project): View|Response
    {
        $item = config('portfolio.projects.'.$project);

        abort_unless(is_array($item), 404);

        $related = array_slice(array_values(array_filter(
            config('portfolio.projects'),
            static fn (array $candidate): bool => $candidate['slug'] !== $project
        )), 0, 2);

        return view('project', [
            'portfolio' => config('portfolio'),
            'project' => $item,
            'related' => $related,
        ]);
    }
}
