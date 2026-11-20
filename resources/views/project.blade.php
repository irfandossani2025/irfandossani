@extends('layouts.app')

@section('title', $project['name'].' — Project story by Irfan Dossani')
@section('description', $project['summary'])
@section('body_class', 'project-page')

@section('head')
    <link rel="stylesheet" href="{{ asset('css/project.css') }}?v=2.0.0">
@endsection

@section('content')
<main id="main">
    <section class="project-hero section-shell">
        <a class="back-link" href="{{ route('home') }}#work"><span aria-hidden="true">←</span> Back to selected work</a>
        <div class="project-hero__heading" data-reveal>
            <div class="project-hero__eyebrow"><span>PROJECT {{ strtoupper($project['category']) }}</span><i aria-hidden="true"></i><span>{{ $project['type'] }}</span></div>
            <h1>{{ $project['name'] }}<span>.</span></h1>
            <p class="project-standfirst">{{ $project['summary'] }}</p>
        </div>
        <div class="project-hero__meta" data-reveal>
            <div class="project-fact"><span>Stage</span><strong>{{ $project['status'] }}</strong></div>
            <div class="project-fact"><span>Focus</span><div class="project-tags">@foreach ($project['stack'] as $item)<span>{{ $item }}</span>@endforeach</div></div>
            <div class="project-links">@foreach ($project['external_links'] as $link)<a href="{{ $link['url'] }}" target="_blank" rel="noopener noreferrer">{{ $link['label'] }} <span aria-hidden="true">↗</span></a>@endforeach</div>
            <span class="project-hero__index">ID / {{ str_pad((string) (array_search($project['slug'], array_column(array_values($portfolio['projects']), 'slug'), true) + 1), 2, '0', STR_PAD_LEFT) }}</span>
        </div>
    </section>

    <section class="project-full-art section-shell" data-reveal>
        @include('partials.project-art', ['project' => $project])
        <span class="project-full-art__caption">{{ $project['art_kicker'] }} <i>—</i> {{ $project['status'] }}</span>
    </section>

    <section class="project-story section-shell">
        <div class="project-story__heading" data-reveal><p class="eyebrow">The brief / the build</p><h2>Make the next<br><em>move count.</em></h2></div>
        <article class="project-story__challenge" data-reveal><span class="story-label">01 / The challenge</span><p>{{ $project['challenge'] }}</p></article>
        <article class="project-story__approach" data-reveal><span class="story-label">02 / The approach</span><ul>@foreach ($project['approach'] as $step)<li><span>↗</span>{{ $step }}</li>@endforeach</ul></article>
        <aside class="project-story__contribution" data-reveal><span class="story-label">03 / My contribution</span><ul>@foreach ($project['contribution'] as $item)<li>{{ $item }}</li>@endforeach</ul></aside>
    </section>

    <section class="related-section section-shell">
        <div class="related-heading" data-reveal><div><p class="eyebrow">Another angle</p><h2>Keep the<br><em>momentum.</em></h2></div><a class="button button-quiet" href="{{ route('home') }}#work">All projects <span aria-hidden="true">↗</span></a></div>
        <div class="related-grid">
            @foreach ($related as $index => $item)
                <a class="related-card" href="{{ route('projects.show', $item['slug']) }}" data-reveal><div class="related-card__art">@include('partials.project-art', ['project' => $item])<span aria-hidden="true">0{{ $index + 1 }}</span></div><div class="related-card__body"><span class="eyebrow">{{ $item['type'] }} / {{ $item['status'] }}</span><strong>{{ $item['name'] }}</strong><span class="related-card__arrow" aria-hidden="true">↗</span></div></a>
            @endforeach
        </div>
    </section>

    <section class="project-contact">
        <div class="project-contact__inner section-shell"><p class="eyebrow">Have a business question?</p><h2>Let’s find the<br><em>next move.</em></h2><a class="button button-primary" href="mailto:{{ $portfolio['email'] }}">Email {{ $portfolio['display_name'] }} <span aria-hidden="true">↗</span></a></div>
    </section>
</main>
@endsection
