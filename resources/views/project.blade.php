@extends('layouts.app')

@section('title', $project['name'].' — Project story by Irfan Dossani')
@section('description', $project['summary'])
@section('body_class', 'project-page')

@section('head')
    <link rel="stylesheet" href="{{ asset('css/project.css') }}?v=1.0.0">
@endsection

@section('content')
<main id="main">
    <section class="project-hero section-shell">
        <a class="back-link" href="{{ route('home') }}#work">Back to selected work</a>
        <div class="project-hero__top">
            <div class="project-hero__copy">
                <p class="eyebrow">{{ $project['category'] }} <span>/</span> {{ $project['type'] }}</p>
                <h1>{{ $project['name'] }}</h1>
                <p class="project-standfirst">{{ $project['summary'] }}</p>
            </div>
            <aside class="project-hero__facts">
                <div class="project-fact">
                    <span class="eyebrow">Project stage</span>
                    <strong>{{ $project['status'] }}</strong>
                </div>
                <div class="project-fact">
                    <span class="eyebrow">Tools & themes</span>
                    <div class="project-tags">
                        @foreach ($project['stack'] as $item)
                            <span>{{ $item }}</span>
                        @endforeach
                    </div>
                </div>
                @foreach ($project['external_links'] as $link)
                    <a class="project-fact-link" href="{{ $link['url'] }}" target="_blank" rel="noopener noreferrer">{{ $link['label'] }}</a>
                @endforeach
            </aside>
        </div>
        <div class="project-hero__art">
            @include('partials.project-art', ['project' => $project])
        </div>
    </section>

    <section class="project-story section-shell">
        <article class="project-story__challenge">
            <p class="eyebrow">The challenge</p>
            <h2>Make the next step<br><em>feel clearer.</em></h2>
            <p>{{ $project['challenge'] }}</p>
        </article>
        <article class="project-story__approach">
            <p class="eyebrow">The approach</p>
            <ul>
                @foreach ($project['approach'] as $step)
                    <li>{{ $step }}</li>
                @endforeach
            </ul>
        </article>
        <aside class="project-story__contribution">
            <p class="eyebrow">My contribution</p>
            <ul>
                @foreach ($project['contribution'] as $item)
                    <li>{{ $item }}</li>
                @endforeach
            </ul>
        </aside>
    </section>

    <section class="related-section section-shell">
        <div class="related-heading">
            <div><p class="eyebrow">More selected work</p><h2>Keep exploring.</h2></div>
            <a class="text-link" href="{{ route('home') }}#work">View all projects</a>
        </div>
        <div class="related-grid">
            @foreach ($related as $item)
                <a class="related-card" href="{{ route('projects.show', $item['slug']) }}">
                    @include('partials.project-art', ['project' => $item])
                    <span class="eyebrow">{{ $item['type'] }}</span>
                    <strong>{{ $item['name'] }}</strong>
                </a>
            @endforeach
        </div>
    </section>

    <section class="project-contact section-shell">
        <p class="eyebrow">Have a business challenge?</p>
        <h2>Let’s find a useful<br><em>next step.</em></h2>
        <a class="button button-primary" href="mailto:{{ $portfolio['email'] }}">Email {{ $portfolio['display_name'] }}</a>
    </section>
</main>
@endsection
