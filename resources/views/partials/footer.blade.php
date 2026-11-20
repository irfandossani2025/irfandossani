<footer class="site-footer">
    <div class="site-footer__main">
        <a class="brand footer-brand" href="{{ route('home') }}#top">
            <span class="brand-glyph" aria-hidden="true"><i>I</i><i>D</i><b></b></span>
            <span class="brand-name">IRFAN DOSSANI<small>MARKETING / BRAND / DIGITAL</small></span>
        </a>
        <p>Good work moves people<br><em>and business.</em></p>
        <a class="footer-back-top" href="{{ route('home') }}#top">Back to top <span aria-hidden="true">↑</span></a>
        <div class="footer-socials" aria-label="Social profiles">
            @foreach ($portfolio['socials'] as $social)
                <a href="{{ $social['url'] }}" target="_blank" rel="noopener noreferrer">{{ $social['label'] }} <span aria-hidden="true">↗</span></a>
            @endforeach
        </div>
        <span class="footer-copyright">© {{ now()->year }} IRFAN SHIRAJ DOSSANI / MUSCAT, OMAN</span>
    </div>
</footer>
