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
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="hero-copy" data-reveal>
            <p class="eyebrow hero-eyebrow"><span class="signal-dot" aria-hidden="true"></span> {{ $portfolio['role'] }}</p>
            <h1>A clearer story.<br>A better system.<br><em>Work that moves.</em></h1>
            <p class="hero-intro">{{ $portfolio['intro'] }}</p>
            <div class="hero-actions">
                <a class="button button-primary" href="#work">Explore selected work</a>
                <a class="button button-text" href="#experience">Career & experience</a>
            </div>
            <div class="hero-notes">
                <span><b>12+</b> years of international experience</span>
                <span>Muscat, Oman <i aria-hidden="true">/</i> Working worldwide</span>
            </div>
        </div>
        <div class="hero-portrait" data-reveal>
            <div class="portrait-glow" aria-hidden="true"></div>
            <div class="portrait-frame">
                <img src="{{ asset('images/irfan-portrait.webp') }}" alt="Irfan Dossani in a dark suit" width="1000" height="1500" fetchpriority="high">
                <span class="portrait-edge" aria-hidden="true"></span>
            </div>
            <div class="portrait-caption">
                <span class="portrait-caption__mark" aria-hidden="true">ID</span>
                <span>Business / Brand / Technology</span>
            </div>
            <div class="portrait-note">
                <span class="eyebrow">A grounded point of view</span>
                <strong>People first.<br>Tools second.</strong>
            </div>
        </div>
        <a class="hero-scroll" href="#work"><span class="scroll-line" aria-hidden="true"></span> Scroll to explore</a>
    </section>

    <div class="signal-strip" aria-hidden="true">
        <div class="signal-strip__track">
            <span>Marketing strategy</span><i aria-hidden="true"></i>
            <span>Brand systems</span><i aria-hidden="true"></i>
            <span>Digital experiences</span><i aria-hidden="true"></i>
            <span>Business technology</span><i aria-hidden="true"></i>
            <span>AI with purpose</span><i aria-hidden="true"></i>
            <span>Marketing strategy</span><i aria-hidden="true"></i>
            <span>Brand systems</span><i aria-hidden="true"></i>
            <span>Digital experiences</span><i aria-hidden="true"></i>
            <span>Business technology</span><i aria-hidden="true"></i>
            <span>AI with purpose</span><i aria-hidden="true"></i>
        </div>
    </div>

    <section class="work-section section-shell" id="work">
        <div class="section-heading" data-reveal>
            <div>
                <p class="eyebrow">Selected work</p>
                <h2>Real business needs.<br><em>Thoughtfully built.</em></h2>
            </div>
            <p class="section-intro">A selection across brand, customer experience, business software and new product ideas. Each project starts with a real need and a clearer next step.</p>
        </div>
        <div class="work-filters" role="group" aria-label="Filter selected work">
            <button class="filter-button is-active" type="button" data-filter="all" aria-pressed="true">All work <span>{{ count($portfolio['projects']) }}</span></button>
            <button class="filter-button" type="button" data-filter="brand" aria-pressed="false">Brand & digital</button>
            <button class="filter-button" type="button" data-filter="systems" aria-pressed="false">Business systems</button>
            <button class="filter-button" type="button" data-filter="products" aria-pressed="false">Products & AI</button>
            <p class="filter-status" id="filter-status" aria-live="polite"></p>
        </div>
        <div class="project-grid">
            @foreach ($portfolio['projects'] as $project)
                <a class="project-card" href="{{ route('projects.show', $project['slug']) }}" data-project-card data-category="{{ $project['category_key'] }}" data-reveal>
                    @include('partials.project-art', ['project' => $project])
                    <div class="project-card__body">
                        <div class="project-card__heading">
                            <div>
                                <p class="eyebrow">{{ $project['type'] }} <span>/</span> {{ $project['status'] }}</p>
                                <h3>{{ $project['name'] }}</h3>
                            </div>
                            <span class="project-card__open" aria-hidden="true">+</span>
                        </div>
                        <p>{{ $project['summary'] }}</p>
                        <span class="project-card__link">Read the project story</span>
                    </div>
                </a>
            @endforeach
        </div>
    </section>

    <section class="approach-section section-shell" id="approach">
        <div class="approach-intro" data-reveal>
            <p class="eyebrow">How I work</p>
            <h2>Start with the<br>business question.<br><em>Then make it real.</em></h2>
            <p>Marketing, customer experience and technology work best when they point in the same direction. I bring the pieces together from first question through delivery.</p>
            <a class="text-link" href="#contact">Talk through a challenge</a>
        </div>
        <div class="approach-steps">
            <article class="approach-step" data-reveal>
                <span class="step-index">01</span>
                <div><h3>Understand</h3><p>Get clear on the business, the audience and the point of friction.</p></div>
                <span class="step-glyph" aria-hidden="true">●</span>
            </article>
            <article class="approach-step" data-reveal>
                <span class="step-index">02</span>
                <div><h3>Shape</h3><p>Find the strongest offer, story and customer journey to move forward.</p></div>
                <span class="step-glyph" aria-hidden="true">◒</span>
            </article>
            <article class="approach-step" data-reveal>
                <span class="step-index">03</span>
                <div><h3>Build</h3><p>Turn the direction into a brand experience, website, product or workflow.</p></div>
                <span class="step-glyph" aria-hidden="true">◈</span>
            </article>
            <article class="approach-step" data-reveal>
                <span class="step-index">04</span>
                <div><h3>Improve</h3><p>Learn from the signals and keep making the experience more useful.</p></div>
                <span class="step-glyph" aria-hidden="true">✳</span>
            </article>
        </div>
    </section>

    <section class="experience-section section-shell" id="experience">
        <div class="section-heading experience-heading" data-reveal>
            <div>
                <p class="eyebrow">The experience behind the work</p>
                <h2>People, business<br>and technology —<br><em>in the same room.</em></h2>
            </div>
            <div class="experience-summary">
                <p>{{ $portfolio['experience_summary'] }}</p>
                <div class="market-tags" aria-label="Markets worked across">
                    <span>Oman</span><span>UAE</span><span>India</span><span>Canada</span><span>United States</span><span>Congo</span>
                </div>
            </div>
        </div>
        <div class="timeline">
            @foreach ($portfolio['experience'] as $index => $role)
                <details class="timeline-entry" data-reveal @if ($index === 0) open @endif>
                    <summary>
                        <span class="timeline-entry__period">{{ $role['period'] }}</span>
                        <span class="timeline-entry__main">
                            <strong>{{ $role['role'] }}</strong>
                            <span>{{ $role['company'] }} <i>/</i> {{ $role['location'] }}</span>
                        </span>
                        <span class="timeline-entry__toggle" aria-hidden="true"></span>
                    </summary>
                    <div class="timeline-entry__details"><p>{{ $role['description'] }}</p></div>
                </details>
            @endforeach
        </div>
        <div class="education-card" data-reveal>
            <span class="eyebrow">Education</span>
            <div><strong>BBA — Marketing</strong><span>University of Houston / Class of 2006</span></div>
            <span class="education-symbol" aria-hidden="true">BBA</span>
        </div>
    </section>

    <section class="capabilities-section section-shell" id="about">
        <div class="section-heading" data-reveal>
            <div>
                <p class="eyebrow">A versatile toolkit</p>
                <h2>Different disciplines.<br><em>One clear direction.</em></h2>
            </div>
            <p class="section-intro">A career spanning financial services, customer support, sales leadership, marketing and digital technology brings a practical view of how businesses work.</p>
        </div>
        <div class="capability-grid">
            @foreach ($portfolio['capabilities'] as $capability)
                <article class="capability-card" data-reveal>
                    <span class="capability-mark" aria-hidden="true"></span>
                    <p class="eyebrow">{{ $capability['title'] }}</p>
                    <h3>{{ $capability['description'] }}</h3>
                    <ul>
                        @foreach ($capability['items'] as $item)
                            <li>{{ $item }}</li>
                        @endforeach
                    </ul>
                </article>
            @endforeach
        </div>
    </section>

    <section class="brief-section section-shell" id="brief">
        <div class="brief-heading" data-reveal>
            <p class="eyebrow">A useful first question</p>
            <h2>What would you like<br>to make <em>clearer?</em></h2>
            <p>Choose a starting point and get a simple direction for the conversation.</p>
        </div>
        <div class="brief-panel" data-reveal>
            <div class="brief-options" role="group" aria-label="Choose a business challenge">
                <button type="button" class="brief-option is-active" data-brief-option aria-pressed="true" data-response="A sharper position and a consistent story can make every marketing and customer touchpoint work harder." data-project="{{ route('projects.show', 'safety-mart-online') }}">My brand needs more clarity</button>
                <button type="button" class="brief-option" data-brief-option aria-pressed="false" data-response="Start by mapping what customers need to do, where they get stuck and what a useful digital path should make easier." data-project="{{ route('projects.show', 'arabian-dreams-tours') }}">I want to improve a website</button>
                <button type="button" class="brief-option" data-brief-option aria-pressed="false" data-response="A good system connects the steps people already take, then removes avoidable repetition and confusion." data-project="{{ route('projects.show', 'powerbooks') }}">Our operations feel disconnected</button>
                <button type="button" class="brief-option" data-brief-option aria-pressed="false" data-response="Begin with the task that takes time or creates friction. Then decide whether automation or AI can help in a way people can review." data-project="{{ route('projects.show', 'cleanflow') }}">I am exploring AI or automation</button>
            </div>
            <div class="brief-answer">
                <span class="eyebrow">A possible first move</span>
                <p id="brief-response" aria-live="polite">A sharper position and a consistent story can make every marketing and customer touchpoint work harder.</p>
                <a class="text-link" id="brief-project-link" href="{{ route('projects.show', 'safety-mart-online') }}">Explore a related project</a>
            </div>
        </div>
    </section>

    <section class="assistant-section section-shell" id="ask">
        <div class="assistant-intro" data-reveal>
            <p class="eyebrow">Meet Irfan 2.0</p>
            <h2>Start with the<br><em>real question.</em></h2>
            <p>Ask about marketing, branding, websites, digital products or practical AI. Get a useful first direction, then decide what to do next.</p>
            <div class="prompt-pills">
                <button type="button" data-archive-prompt="I need a clearer website for my business.">I need a clearer website</button>
                <button type="button" data-archive-prompt="How can I improve my customer journey?">I want a better customer journey</button>
                <button type="button" data-archive-prompt="Where could AI help my business?">I am exploring AI</button>
            </div>
        </div>
        <div class="assistant-panel" data-reveal>
            <div class="assistant-panel__top">
                <div class="assistant-avatar" aria-hidden="true">ID</div>
                <div><strong>IRFAN 2.0</strong><span>Business thinking partner</span></div>
                <span class="assistant-status">Interactive guide</span>
            </div>
            <p class="assistant-disclosure">When live replies are enabled, questions are sent to an AI service to prepare a response. Please do not include confidential or sensitive information.</p>
            <div class="assistant-chat" aria-live="polite">
                <p class="assistant-message">Tell me what you are trying to improve. I will help you find a clearer next step.</p>
            </div>
            <form class="assistant-form" action="{{ route('jarvis.respond') }}" method="post">
                @csrf
                <label class="visually-hidden" for="jarvis-question">Ask Irfan 2.0 a question</label>
                <input id="jarvis-question" maxlength="800" name="message" placeholder="What are you trying to improve?" required>
                <button type="submit">Ask Irfan 2.0</button>
            </form>
            <details class="lead-handoff">
                <summary>Share a project note with Irfan</summary>
                <form class="lead-form" action="{{ route('jarvis.handoff') }}" method="post">
                    @csrf
                    <label>Name<input name="name" autocomplete="name" maxlength="120" required></label>
                    <label>Email<input name="email" type="email" autocomplete="email" maxlength="254" required></label>
                    <label>Phone or WhatsApp<input name="phone" type="tel" autocomplete="tel" maxlength="50" required></label>
                    <label class="lead-consent"><input name="consent" type="checkbox" required> I agree that my contact details and this conversation can be emailed to Irfan for project follow-up.</label>
                    <input class="honeypot" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
                    <button type="submit">Send project note</button>
                    <p class="lead-status" aria-live="polite">Your details are shared only if you submit this form with consent checked.</p>
                </form>
            </details>
        </div>
    </section>

    <section class="contact-section section-shell" id="contact">
        <div class="contact-glow" aria-hidden="true"></div>
        <div class="contact-copy" data-reveal>
            <p class="eyebrow">Start a conversation</p>
            <h2>Have a business<br>question worth <em>solving?</em></h2>
            <p>Tell me what you are building, changing or trying to make clearer. We can start with the business need and find the right next move.</p>
        </div>
        <div class="contact-card" data-reveal>
            <span class="eyebrow">The easiest place to start</span>
            <a class="contact-email" href="mailto:{{ $portfolio['email'] }}">{{ $portfolio['email'] }}</a>
            <span class="contact-location">{{ $portfolio['location'] }} <i>/</i> {{ $portfolio['availability'] }}</span>
            <div class="contact-socials">
                @foreach ($portfolio['socials'] as $social)
                    <a href="{{ $social['url'] }}" target="_blank" rel="noopener noreferrer">{{ $social['label'] }}</a>
                @endforeach
            </div>
        </div>
    </section>
</main>
@endsection
