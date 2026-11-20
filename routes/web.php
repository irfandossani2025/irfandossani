<?php

use App\Http\Controllers\JarvisController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');

Route::get('/projects/{project}', [PortfolioController::class, 'show'])
    ->whereIn('project', array_keys(config('portfolio.projects')))
    ->name('projects.show');

Route::post('/jarvis/respond', JarvisController::class)
    ->middleware('throttle:20,1')
    ->name('jarvis.respond');

Route::post('/jarvis/handoff', [JarvisController::class, 'handoff'])
    ->middleware('throttle:5,1')
    ->name('jarvis.handoff');
