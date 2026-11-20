<header class="site-header">
    <div class="site-header__inner">
        <a class="brand" href="{{ route('home') }}" aria-label="Irfan Dossani home">
            <span class="brand-glyph" aria-hidden="true"><i>I</i><i>D</i><b></b></span>
            <span class="brand-name">IRFAN DOSSANI<small>STRATEGIST & DIGITAL BUILDER</small></span>
        </a>
        <div class="header-actions">
            <nav class="site-navigation" id="site-navigation" aria-label="Main navigation">
                <a href="{{ route('home') }}#work">Work <span>01</span></a>
                <a href="{{ route('home') }}#approach">Approach <span>02</span></a>
                <a href="{{ route('home') }}#experience">Experience <span>03</span></a>
                <a href="{{ route('home') }}#about">About <span>04</span></a>
                <a class="navigation-cta" href="{{ route('home') }}#contact">Let’s talk <b aria-hidden="true">↗</b></a>
            </nav>
            <button class="motion-toggle" type="button" data-motion-toggle aria-pressed="true" aria-label="Pause decorative motion">
                <span class="motion-toggle__orb" aria-hidden="true"></span><span>Motion <b data-motion-label>On</b></span>
            </button>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" aria-label="Open navigation">
                <span class="menu-toggle__label">Menu</span>
                <span class="menu-toggle__icon" aria-hidden="true"><i></i><i></i></span>
            </button>
        </div>
    </div>
</header>
