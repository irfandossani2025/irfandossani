<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="@yield('description', config('portfolio.experience_summary'))">
    <meta name="theme-color" content="#0b1020">
    <meta property="og:type" content="website">
    <meta property="og:title" content="@yield('title', 'Irfan Dossani — Marketing, Branding & Digital Experiences')">
    <meta property="og:description" content="@yield('description', config('portfolio.experience_summary'))">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ asset('images/irfan-portrait.webp') }}">
    <link rel="canonical" href="{{ url()->current() }}">
    <script>document.documentElement.classList.add('js');</script>
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/portfolio.css') }}?v=1.0.0">
    @yield('head')
    <title>@yield('title', 'Irfan Dossani — Marketing, Branding & Digital Experiences')</title>
</head>
<body class="@yield('body_class')">
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="page-progress" aria-hidden="true"><span></span></div>
    @include('partials.navigation', ['portfolio' => $portfolio])
    @yield('content')
    @include('partials.footer', ['portfolio' => $portfolio])
    <script src="{{ asset('js/portfolio.js') }}?v=1.0.0" defer></script>
    @yield('scripts')
</body>
</html>
