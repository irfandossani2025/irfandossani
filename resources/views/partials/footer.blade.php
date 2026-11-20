<footer class="site-footer">
    <a class="brand footer-brand" href="{{ route('home') }}#top">
        <span class="brand-mark" aria-hidden="true">ID</span>
        <span class="brand-name">IRFAN DOSSANI<small>MARKETING / BRANDING / DIGITAL</small></span>
    </a>
    <p>Useful work begins with a clear question.</p>
    <div class="footer-socials" aria-label="Social profiles">
        @foreach ($portfolio['socials'] as $social)
            <a href="{{ $social['url'] }}" target="_blank" rel="noopener noreferrer">{{ $social['label'] }}</a>
        @endforeach
    </div>
    <span class="footer-copyright">© {{ now()->year }} IRFAN SHIRAJ DOSSANI</span>
</footer>
