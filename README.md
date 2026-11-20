# Irfan Dossani — Professional Portfolio

A responsive Laravel portfolio for marketing, branding, digital experience and business technology work. The page content is rendered with Blade; the interactions use small, buildless JavaScript and CSS.

## Included

- Professional profile and career history based on Irfan's résumé.
- Selected business, brand and product projects, with project story pages.
- Project category filters, a responsive mobile menu, a guided challenge selector, and a motion control for visitors.
- A full-body cartoon avatar that begins as a chain-hung, flickable charm, then drops into a four-frame walk cycle, answers a ringing phone, messages, slides in a laptop workstation, thinks and dances. Visitors can choose actions or pause the companion from its glass-style controls; the motion follows reduced-motion settings.
- Cinematic CSS motion: staggered title entrances, orbiting graphics, an animated project marquee, reactive hover states, portrait parallax, and scroll reveals. Motion follows the visitor's reduced-motion setting.
- Irfan 2.0 assistant with optional Anthropic replies and a consent-based project-note handoff.
- Optimized WebP portrait and project visuals.

## Runtime

- PHP 8.2 or newer
- Laravel 12
- Composer dependencies managed in Plesk Laravel Toolkit
- No Node.js build step
- No MariaDB or other database required for the portfolio pages
- File-based sessions and cache; synchronous queue

The current website host reports PHP 8.2.36. Node.js 17.9 and MariaDB 10.1 are not used by this portfolio.

## Deploy with Plesk Git and Laravel Toolkit

1. In **Plesk → Git**, connect https://github.com/irfandossani2025/irfandossani.git and pull the main branch.
2. Set the website document root to the repository's public directory.
3. In **Laravel Toolkit**, select PHP 8.2 or newer and install the production Composer dependencies.
4. Configure the application environment in Plesk. Set APP_NAME, APP_ENV=production, APP_DEBUG=false, and APP_URL=https://www.irfandossani.com. Generate APP_KEY with Laravel Toolkit.
5. Keep SESSION_DRIVER=file, CACHE_STORE=file, and QUEUE_CONNECTION=sync. The public portfolio does not need a database or migrations.
6. Make storage and bootstrap/cache writable through Plesk File Manager or Laravel Toolkit.
7. After a pull, clear Laravel's cached configuration and views using Laravel Toolkit.

Do not upload a local .env file or put service credentials in GitHub. The safe starting values are in .env.example.

## Optional visitor features

### Irfan 2.0 replies

The assistant works without a key and will direct visitors to email. To enable generated replies, add ANTHROPIC_API_KEY in Plesk's environment settings. Visitor questions are sent to Anthropic to prepare a response; the page tells visitors not to include confidential or sensitive details. Never put the key in source control.

### Project-note email

The handoff form sends a note only after a visitor checks the consent box and submits the form. Configure SMTP in Plesk (MAIL_MAILER, MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM_ADDRESS) and set JARVIS_LEAD_RECIPIENT=info@irfandossani.com. Without working SMTP, visitors can still contact Irfan directly by email.

## Content

Portfolio content and project links live in config/portfolio.php. Status labels distinguish live websites, product builds, MVPs and concepts. The résumé's career facts are included on the page; the private source PDF is not copied into the public assets.
