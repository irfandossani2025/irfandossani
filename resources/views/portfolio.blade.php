@extends('layouts.app')

@section('title', 'Irfan Dossani — Marketing, Branding & Digital Experiences')
@section('description', 'Irfan Shiraj Dossani is a Muscat-based marketing and branding consultant working across digital experiences, business systems and practical AI.')
@section('body_class', 'home-page')

@section('head')
    <script type="application/ld+json">
        {!! json_encode([
            '@context' => 'https://schema.org',
            '@type' => 'Person',
            'name' => $portfolio['name'],
            'jobTitle' => $portfolio['role'],
            'url' => url('/'),
            'email' => $portfolio['email'],
            'address' => [
                '@type' => 'PostalAddress',
                'addressLocality' => 'Muscat',
                'addressCountry' => 'Oman',
            ],
            'knowsAbout' => [
                'Marketing strategy',
                'Branding',
                'Digital marketing',
                'Website development',
                'Mobile application development',
                'Artificial intelligence',
                'Customer experience',
            ],
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
    </script>
@endsection

@section('content')
<main id="main">
    <section class="hero-section" id="top">
        <div class="hero-grain" aria-hidden="true"></div>
        <div class="hero-copy" data-reveal>
            <div class="hero-kicker"><span class="live-indicator" aria-hidden="true"></span><span>{{ $portfolio['role'] }}</span><span class="hero-kicker__index">MCT / 01</span></div>
            <h1 class="hero-title">
                <span class="hero-title__line">Ideas shape</span>
                <span class="hero-title__line">how business</span>
                <span class="hero-title__line hero-title__line--accent">moves<span class="hero-title__dot">.</span></span>
            </h1>
            <p class="hero-intro">{{ $portfolio['intro'] }}</p>
            <div class="hero-actions">
                <a class="button button-primary" href="#work">See selected work <span aria-hidden="true">↓</span></a>
                <a class="button button-quiet" href="#experience">The short story <span aria-hidden="true">↗</span></a>
            </div>
            <div class="hero-footline">
                <span><strong>12+</strong> years in motion</span>
                <span><i aria-hidden="true"></i>{{ $portfolio['location'] }}</span>
                <span class="hero-footline__available">{{ $portfolio['availability'] }}</span>
            </div>
        </div>

        <div class="hero-visual" data-reveal data-hero-visual>
            <div class="hero-visual__wash" aria-hidden="true"></div>
            <div class="hero-orbit hero-orbit--one" aria-hidden="true"><i></i></div>
            <div class="hero-orbit hero-orbit--two" aria-hidden="true"><i></i></div>
            <div class="hero-portrait" data-parallax-card>
                <img src="{{ asset('images/irfan-portrait.webp') }}" alt="Irfan Dossani in a dark suit" width="1000" height="1500" fetchpriority="high">
                <span class="hero-portrait__shine" aria-hidden="true"></span>
                <span class="hero-portrait__frame" aria-hidden="true"></span>
            </div>
            <div class="hero-sticker" aria-label="People first. Tools second.">
                <svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="sticker-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" /></defs><text><textPath href="#sticker-circle">PEOPLE FIRST • TOOLS SECOND • </textPath></text></svg>
                <span aria-hidden="true">✳</span>
            </div>
            <span class="hero-visual__caption">IRFAN SHIRAJ DOSSANI <i>—</i> MUSCAT, OMAN</span>
            <span class="hero-visual__serial">ID / FIELD NOTES 01</span>
        </div>
        <a class="hero-scroll" href="#work"><span class="hero-scroll__line" aria-hidden="true"></span><span>Scroll to explore</span></a>
    </section>

    <div class="marquee" aria-hidden="true">
        <div class="marquee__track">
            @for ($repeat = 0; $repeat < 2; $repeat++)
                <span>BRANDS WITH A POINT OF VIEW</span><b>✳</b><span>DIGITAL THAT DOES THE WORK</span><b>✳</b><span>PEOPLE. BUSINESS. TECHNOLOGY.</span><b>✳</b><span>IDEAS INTO MOMENTUM</span><b>✳</b>
            @endfor
        </div>
    </div>

    <section class="work-section section-shell" id="work">
        <div class="section-heading" data-reveal>
            <div class="section-heading__title">
                <p class="eyebrow"><span>01</span> / Selected work</p>
                <h2>Built for the<br><em>next move.</em></h2>
            </div>
            <div class="section-heading__aside">
                <p>A cross-section of brand experiences, business systems and product ideas. Each one starts with a real problem worth making simpler.</p>
                <span class="section-heading__scribble" aria-hidden="true">↘</span>
            </div>
        </div>
        <div class="work-toolbar">
            <div class="work-filters" role="group" aria-label="Filter selected work">
                <button class="filter-button is-active" type="button" data-filter="all" aria-pressed="true">Everything <span>{{ count($portfolio['projects']) }}</span></button>
                <button class="filter-button" type="button" data-filter="brand" aria-pressed="false">Brand / digital</button>
                <button class="filter-button" type="button" data-filter="systems" aria-pressed="false">Business systems</button>
                <button class="filter-button" type="button" data-filter="products" aria-pressed="false">Products / AI</button>
            </div>
            <p class="filter-status" id="filter-status" aria-live="polite">A few things made with purpose</p>
        </div>
        <div class="project-grid">
            @foreach ($portfolio['projects'] as $project)
                <a class="project-card" href="{{ route('projects.show', $project['slug']) }}" data-project-card data-category="{{ $project['category_key'] }}" data-reveal style="--card-index: {{ $loop->index }};">
                    <div class="project-card__visual">
                        @include('partials.project-art', ['project' => $project])
                        <span class="project-card__number">0{{ $loop->iteration }}</span>
                        <span class="project-card__arrow" aria-hidden="true">↗</span>
                    </div>
                    <div class="project-card__body">
                        <div class="project-card__topline"><span>{{ $project['type'] }}</span><i aria-hidden="true"></i><span>{{ $project['status'] }}</span></div>
                        <h3>{{ $project['name'] }}</h3>
                        <p>{{ $project['summary'] }}</p>
                        <span class="project-card__link">Open case study <b aria-hidden="true">→</b></span>
                    </div>
                </a>
            @endforeach
        </div>
    </section>

    <section class="approach-section" id="approach">
        <div class="approach-section__inner section-shell">
            <div class="approach-intro" data-reveal>
                <p class="eyebrow"><span>02</span> / The way through</p>
                <h2>Less noise.<br><em>More movement.</em></h2>
                <p>Marketing, customer experience and technology are most useful when they work together. Start with the business question; build the right thing around it.</p>
                <a class="text-link" href="#contact">Bring me a challenge <span aria-hidden="true">↗</span></a>
            </div>
            <div class="approach-wheel" aria-hidden="true"><span>GOOD WORK</span><i>✳</i><small>IS A LOOP</small></div>
            <div class="approach-steps">
                <article class="approach-step" data-reveal><span class="step-index">01</span><div><h3>Listen</h3><p>Understand the business, the audience and where the friction lives.</p></div><span class="step-glyph" aria-hidden="true">◉</span></article>
                <article class="approach-step" data-reveal><span class="step-index">02</span><div><h3>Find the angle</h3><p>Shape a stronger offer, story and customer journey.</p></div><span class="step-glyph" aria-hidden="true">⌁</span></article>
                <article class="approach-step" data-reveal><span class="step-index">03</span><div><h3>Make it real</h3><p>Build the brand, website, product or workflow that moves it forward.</p></div><span class="step-glyph" aria-hidden="true">↗</span></article>
                <article class="approach-step" data-reveal><span class="step-index">04</span><div><h3>Keep it useful</h3><p>Learn from what people do and make the experience work harder.</p></div><span class="step-glyph" aria-hidden="true">✳</span></article>
            </div>
        </div>
    </section>

    <section class="experience-section section-shell" id="experience">
        <div class="section-heading experience-heading" data-reveal>
            <div class="section-heading__title"><p class="eyebrow"><span>03</span> / The long game</p><h2>A career of<br><em>connecting dots.</em></h2></div>
            <div class="experience-summary"><p>{{ $portfolio['experience_summary'] }}</p><div class="market-tags" aria-label="Markets worked across"><span>Oman</span><span>UAE</span><span>India</span><span>Canada</span><span>United States</span><span>Congo</span></div></div>
        </div>
        <div class="timeline">
            @foreach ($portfolio['experience'] as $index => $role)
                <details class="timeline-entry" data-reveal @if ($index === 0) open @endif>
                    <summary><span class="timeline-entry__period">{{ $role['period'] }}</span><span class="timeline-entry__main"><strong>{{ $role['role'] }}</strong><span>{{ $role['company'] }} <i>/</i> {{ $role['location'] }}</span></span><span class="timeline-entry__toggle" aria-hidden="true">+</span></summary>
                    <div class="timeline-entry__details"><p>{{ $role['description'] }}</p></div>
                </details>
            @endforeach
        </div>
        <div class="education-card" data-reveal><span class="eyebrow">The foundation</span><div><strong>BBA — Marketing</strong><span>University of Houston / Class of 2006</span></div><span class="education-symbol" aria-hidden="true">UH</span></div>
    </section>

    <section class="capabilities-section" id="about">
        <div class="capabilities-section__inner section-shell">
            <div class="section-heading" data-reveal><div class="section-heading__title"><p class="eyebrow"><span>04</span> / What I bring</p><h2>Different lenses.<br><em>One clear view.</em></h2></div><p class="section-heading__aside-copy">A career spanning financial services, customer support, sales leadership, marketing and digital technology brings a practical view of how businesses work.</p></div>
            <div class="capability-grid">
                @foreach ($portfolio['capabilities'] as $capability)
                    <article class="capability-card" data-reveal style="--capability-index: {{ $loop->index }};"><span class="capability-mark" aria-hidden="true">0{{ $loop->iteration }}</span><p class="eyebrow">{{ $capability['title'] }}</p><h3>{{ $capability['description'] }}</h3><ul>@foreach ($capability['items'] as $item)<li>{{ $item }}</li>@endforeach</ul></article>
                @endforeach
            </div>
        </div>
    </section>

    <section class="brief-section section-shell" id="brief">
        <div class="brief-heading" data-reveal><p class="eyebrow"><span>05</span> / Your first move</p><h2>Where could we<br>make a <em>shift?</em></h2><p>Choose a starting point. I’ll suggest a useful direction for the conversation.</p><span class="brief-heading__asterisk" aria-hidden="true">✳</span></div>
        <div class="brief-panel" data-reveal>
            <div class="brief-panel__label">Pick the pressure point <span>01 — 04</span></div>
            <div class="brief-options" role="group" aria-label="Choose a business challenge">
                <button type="button" class="brief-option is-active" data-brief-option aria-pressed="true" data-response="A sharper position and a consistent story can make every marketing and customer touchpoint work harder." data-project="{{ route('projects.show', 'safety-mart-online') }}"><span>01</span>My brand needs more clarity<i aria-hidden="true">↗</i></button>
                <button type="button" class="brief-option" data-brief-option aria-pressed="false" data-response="Start by mapping what customers need to do, where they get stuck and what a useful digital path should make easier." data-project="{{ route('projects.show', 'arabian-dreams-tours') }}"><span>02</span>I want to improve a website<i aria-hidden="true">↗</i></button>
                <button type="button" class="brief-option" data-brief-option aria-pressed="false" data-response="A good system connects the steps people already take, then removes avoidable repetition and confusion." data-project="{{ route('projects.show', 'powerbooks') }}"><span>03</span>Our operations feel disconnected<i aria-hidden="true">↗</i></button>
                <button type="button" class="brief-option" data-brief-option aria-pressed="false" data-response="Begin with the task that takes time or creates friction. Then decide whether automation or AI can help in a way people can review." data-project="{{ route('projects.show', 'cleanflow') }}"><span>04</span>I am exploring AI or automation<i aria-hidden="true">↗</i></button>
            </div>
            <div class="brief-answer"><span class="eyebrow">A possible first move</span><p id="brief-response" aria-live="polite">A sharper position and a consistent story can make every marketing and customer touchpoint work harder.</p><a class="text-link" id="brief-project-link" href="{{ route('projects.show', 'safety-mart-online') }}">See it in a project <span aria-hidden="true">→</span></a></div>
        </div>
    </section>

    <section class="assistant-section section-shell" id="ask">
        <div class="assistant-intro" data-reveal><p class="eyebrow"><span>06</span> / A thinking partner</p><h2>Meet <em>Irfan 2.0.</em></h2><p>Start with the real question. Explore marketing, branding, websites, digital products or practical AI, then decide what to do next.</p><div class="prompt-pills"><button type="button" data-archive-prompt="I need a clearer website for my business.">A clearer website</button><button type="button" data-archive-prompt="How can I improve my customer journey?">A better customer journey</button><button type="button" data-archive-prompt="Where could AI help my business?">AI for my business</button></div></div>
        <div class="assistant-panel" data-reveal>
            <div class="assistant-panel__top"><div class="assistant-avatar" aria-hidden="true">ID<span></span></div><div><strong>IRFAN 2.0</strong><span>Business thinking partner</span></div><span class="assistant-status"><i aria-hidden="true"></i>Ready when you are</span></div>
            <p class="assistant-disclosure">When live replies are enabled, questions are sent to an AI service to prepare a response. Please do not include confidential or sensitive information.</p>
            <div class="assistant-chat" aria-live="polite"><p class="assistant-message">Tell me what you are trying to improve. I will help you find a clearer next step.</p></div>
            <form class="assistant-form" action="{{ route('jarvis.respond') }}" method="post">@csrf<label class="visually-hidden" for="jarvis-question">Ask Irfan 2.0 a question</label><input id="jarvis-question" maxlength="800" name="message" placeholder="What are you trying to improve?" required><button type="submit">Send <span aria-hidden="true">↗</span></button></form>
            <details class="lead-handoff"><summary>Or share a project note <span aria-hidden="true">+</span></summary><form class="lead-form" action="{{ route('jarvis.handoff') }}" method="post">@csrf<label>Name<input name="name" autocomplete="name" maxlength="120" required></label><label>Email<input name="email" type="email" autocomplete="email" maxlength="254" required></label><label>Phone or WhatsApp<input name="phone" type="tel" autocomplete="tel" maxlength="50" required></label><label class="lead-consent"><input name="consent" type="checkbox" required> I agree that my contact details and this conversation can be emailed to Irfan for project follow-up.</label><input class="honeypot" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><button type="submit">Send project note <span aria-hidden="true">↗</span></button><p class="lead-status" aria-live="polite">Your details are shared only if you submit this form with consent checked.</p></form></details>
        </div>
    </section>

    <section class="contact-section" id="contact">
        <div class="contact-orbit" aria-hidden="true">✳</div>
        <div class="contact-section__inner section-shell">
            <div class="contact-copy" data-reveal><p class="eyebrow">One good question can start it</p><h2>Let’s make<br><em>something move.</em></h2><p>Tell me what you are building, changing or trying to make clearer. We can start with the business need and find the right next move.</p></div>
            <div class="contact-card" data-reveal><span class="eyebrow">Start here</span><a class="contact-email" href="mailto:{{ $portfolio['email'] }}">{{ $portfolio['email'] }} <span aria-hidden="true">↗</span></a><span class="contact-location">{{ $portfolio['location'] }} <i>/</i> {{ $portfolio['availability'] }}</span><div class="contact-socials">@foreach ($portfolio['socials'] as $social)<a href="{{ $social['url'] }}" target="_blank" rel="noopener noreferrer">{{ $social['label'] }} <span aria-hidden="true">↗</span></a>@endforeach</div></div>
        </div>
    </section>
</main>
@endsection
