<header class="site-header">
    <a class="brand" href="{{ route('home') }}" aria-label="Irfan Dossani home">
        <span class="brand-mark" aria-hidden="true">ID</span>
        <span class="brand-name">IRFAN DOSSANI<small>STRATEGY / DESIGN / TECHNOLOGY</small></span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">
        <span class="menu-toggle__label">Menu</span>
        <span class="menu-toggle__icon" aria-hidden="true"><i></i><i></i></span>
    </button>
    <nav class="site-navigation" id="site-navigation" aria-label="Main navigation">
        <a href="{{ route('home') }}#work">Work</a>
        <a href="{{ route('home') }}#approach">Approach</a>
        <a href="{{ route('home') }}#experience">Experience</a>
        <a href="{{ route('home') }}#about">About</a>
        <a class="navigation-cta" href="{{ route('home') }}#contact">Start a conversation</a>
    </nav>
</header>
