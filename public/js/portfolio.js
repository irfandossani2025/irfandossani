const menuButton = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('.site-navigation');

if (menuButton && siteNavigation) {
    const menuLabel = menuButton.querySelector('.menu-toggle__label');
    const navLens = siteNavigation.querySelector('[data-nav-lens]');
    const navLinks = [...siteNavigation.querySelectorAll('a')];
    let activeLensLink = null;

    const placeNavLens = (link) => {
        if (!navLens || !link) return;

        const navBounds = siteNavigation.getBoundingClientRect();
        const linkBounds = link.getBoundingClientRect();
        navLens.style.width = linkBounds.width + 'px';
        navLens.style.height = linkBounds.height + 'px';
        navLens.style.setProperty('--lens-x', (linkBounds.left - navBounds.left) + 'px');
        navLens.style.setProperty('--lens-y', (linkBounds.top - navBounds.top) + 'px');
        siteNavigation.classList.add('has-lens');
        activeLensLink = link;
    };

    const hideNavLens = () => {
        if (!navLens || siteNavigation.contains(document.activeElement)) return;
        siteNavigation.classList.remove('has-lens');
        activeLensLink = null;
    };

    navLinks.forEach((link) => {
        link.addEventListener('pointerenter', () => placeNavLens(link));
    });

    siteNavigation.addEventListener('focusin', (event) => {
        const link = event.target.closest('a');
        if (link) placeNavLens(link);
    });

    siteNavigation.addEventListener('pointerleave', hideNavLens);
    siteNavigation.addEventListener('focusout', (event) => {
        if (!siteNavigation.contains(event.relatedTarget)) hideNavLens();
    });
    window.addEventListener('resize', () => {
        if (activeLensLink) placeNavLens(activeLensLink);
    });

    const closeMenu = () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        if (menuLabel) menuLabel.textContent = 'Menu';
        siteNavigation.classList.remove('is-open');
        siteNavigation.classList.remove('has-lens');
        activeLensLink = null;
    };

    menuButton.addEventListener('click', () => {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
        if (menuLabel) menuLabel.textContent = isOpen ? 'Menu' : 'Close';
        siteNavigation.classList.toggle('is-open', !isOpen);
    });

    siteNavigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
}

const progressBar = document.querySelector('.page-progress span');

if (progressBar) {
    const updateProgress = () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
        progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
}

const motionToggle = document.querySelector('[data-motion-toggle]');
const motionLabel = document.querySelector('[data-motion-label]');
const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionEnabled = !reducedMotionPreference.matches;

if (motionToggle) {
    if (!reducedMotionPreference.matches) {
        try {
            motionEnabled = window.localStorage.getItem('irfan-motion') !== 'off';
        } catch (error) {
            motionEnabled = true;
        }
    }

    const updateMotionPreference = () => {
        const isEnabled = motionEnabled && !reducedMotionPreference.matches;
        document.documentElement.dataset.motion = isEnabled ? 'on' : 'off';
        motionToggle.setAttribute('aria-pressed', String(isEnabled));
        motionToggle.setAttribute('aria-label', isEnabled ? 'Pause decorative motion' : 'Play decorative motion');
        motionToggle.disabled = reducedMotionPreference.matches;
        if (motionLabel) motionLabel.textContent = reducedMotionPreference.matches ? 'Reduced' : (isEnabled ? 'On' : 'Off');
    };

    motionToggle.addEventListener('click', () => {
        motionEnabled = !motionEnabled;
        updateMotionPreference();
        try {
            window.localStorage.setItem('irfan-motion', motionEnabled ? 'on' : 'off');
        } catch (error) {
            // The motion setting still applies for this page when storage is unavailable.
        }
    });

    reducedMotionPreference.addEventListener?.('change', updateMotionPreference);
    updateMotionPreference();
}

const heroVisual = document.querySelector('[data-hero-visual]');
const parallaxCard = document.querySelector('[data-parallax-card]');

if (heroVisual && parallaxCard && !reducedMotionPreference.matches) {
    heroVisual.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse' || document.documentElement.dataset.motion === 'off') return;

        const bounds = heroVisual.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        parallaxCard.style.setProperty('--pointer-x', (x * 12).toFixed(1) + 'px');
        parallaxCard.style.setProperty('--pointer-y', (y * 12).toFixed(1) + 'px');
    });

    heroVisual.addEventListener('pointerleave', () => {
        parallaxCard.style.setProperty('--pointer-x', '0px');
        parallaxCard.style.setProperty('--pointer-y', '0px');
    });
}

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projectCards = [...document.querySelectorAll('[data-project-card]')];
const filterStatus = document.querySelector('#filter-status');

if (filterButtons.length && projectCards.length) {
    const applyFilter = (filter) => {
        let visibleCount = 0;

        projectCards.forEach((card) => {
            const isVisible = filter === 'all' || card.dataset.category === filter;
            card.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        filterButtons.forEach((button) => {
            const isActive = button.dataset.filter === filter;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });

        if (filterStatus) {
            filterStatus.textContent = 'Showing ' + visibleCount + (visibleCount === 1 ? ' project' : ' projects');
        }
    };

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => applyFilter(button.dataset.filter));
    });
}

const briefOptions = [...document.querySelectorAll('[data-brief-option]')];
const briefResponse = document.querySelector('#brief-response');
const briefProjectLink = document.querySelector('#brief-project-link');

briefOptions.forEach((button) => {
    button.addEventListener('click', () => {
        briefOptions.forEach((option) => {
            const isActive = option === button;
            option.classList.toggle('is-active', isActive);
            option.setAttribute('aria-pressed', String(isActive));
        });

        if (briefResponse) briefResponse.textContent = button.dataset.response;
        if (briefProjectLink) briefProjectLink.href = button.dataset.project;
    });
});

const revealItems = [...document.querySelectorAll('[data-reveal]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (revealItems.length && 'IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}

const assistantResponse = document.querySelector('.assistant-message');
const assistantForm = document.querySelector('.assistant-form');
let lastIrfanTwoQuestion = '';

const askIrfanTwo = async (message) => {
    if (!assistantResponse) return;

    lastIrfanTwoQuestion = message;
    assistantResponse.classList.add('typing');
    assistantResponse.textContent = 'Irfan 2.0 is thinking…';

    try {
        const result = await fetch('/jarvis/respond', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
            },
            body: JSON.stringify({ message }),
        });
        const data = await result.json();
        assistantResponse.textContent = data.message || 'I could not prepare a response just now. Please contact Irfan by email to continue.';
    } catch (error) {
        assistantResponse.textContent = 'I could not prepare a response just now. Please contact Irfan by email to continue.';
    } finally {
        assistantResponse.classList.remove('typing');
    }
};

assistantForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = event.currentTarget.elements.message;
    const message = input.value.trim();

    if (!message) return;
    askIrfanTwo(message);
    input.value = '';
});

document.querySelectorAll('[data-archive-prompt]').forEach((prompt) => {
    prompt.addEventListener('click', () => {
        const input = document.querySelector('#jarvis-question');
        if (!input) return;
        input.value = prompt.dataset.archivePrompt;
        input.focus();
    });
});

document.querySelector('.lead-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = form.querySelector('.lead-status');

    if (!lastIrfanTwoQuestion || assistantResponse?.classList.contains('typing')) {
        status.textContent = 'Ask Irfan 2.0 a question first, then choose whether to share the project note.';
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const payload = Object.fromEntries(new FormData(form));
    payload.question = lastIrfanTwoQuestion;
    payload.summary = assistantResponse.textContent.trim();
    payload.consent = form.elements.consent.checked;
    submitButton.disabled = true;
    status.textContent = 'Sending your project note…';

    try {
        const result = await fetch('/jarvis/handoff', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
            },
            body: JSON.stringify(payload),
        });
        const data = await result.json();
        status.textContent = data.message || 'The project note could not be sent just now.';
        if (result.ok) form.reset();
    } catch (error) {
        status.textContent = 'The project note could not be sent just now. Please contact Irfan directly by email.';
    } finally {
        submitButton.disabled = false;
    }
});

const avatarCompanion = document.querySelector('[data-avatar-companion]');

if (avatarCompanion) {
    const avatarActor = avatarCompanion.querySelector('[data-avatar-actor]');
    const avatarToggle = avatarCompanion.querySelector('[data-avatar-toggle]');
    const avatarCaption = avatarCompanion.querySelector('[data-avatar-caption]');
    const avatarIcon = avatarCompanion.querySelector('[data-avatar-icon]');
    const avatarControlIcon = avatarCompanion.querySelector('[data-avatar-control-icon]');
    const avatarImages = [...avatarCompanion.querySelectorAll('[data-avatar-image]')];
    const avatarHero = document.querySelector('.hero-section');
    const avatarPhases = [
        { pose: 'walk', caption: 'On the move', icon: '↗', duration: 7800 },
        { pose: 'think', caption: 'Thinking it through', icon: '✦', duration: 4100 },
        { pose: 'phone', caption: 'Taking a call', icon: '☎', duration: 4300 },
        { pose: 'message', caption: 'Sending a note', icon: '✉', duration: 4100 },
        { pose: 'dance', caption: 'Dance break', icon: '♪', duration: 4600 },
    ];
    let avatarPhaseIndex = -1;
    let avatarDirection = 1;
    let avatarAnimation = null;
    let avatarTargetLeft = 0;
    let avatarTimer = null;
    let avatarDeadline = 0;
    let avatarRemaining = 0;
    let avatarRunning = false;
    let avatarManuallyPaused = false;
    let avatarPastHero = !avatarHero || avatarHero.getBoundingClientRect().bottom <= 0;

    const avatarMotionAllowed = () => (
        document.documentElement.dataset.motion !== 'off' && !reducedMotionPreference.matches && avatarPastHero
    );

    const syncAvatarAnchor = () => {
        const actorBounds = avatarActor.getBoundingClientRect();
        avatarCompanion.dataset.anchor = actorBounds.left + actorBounds.width / 2 > window.innerWidth / 2 ? 'right' : 'left';
    };

    const setAvatarPhase = (phase) => {
        avatarCompanion.dataset.pose = phase.pose;
        avatarCaption.textContent = phase.caption;
        avatarIcon.textContent = phase.icon;
        avatarImages.forEach((image) => {
            image.classList.toggle('is-active', image.dataset.avatarImage === phase.pose);
        });
        syncAvatarAnchor();
    };

    const updateAvatarPauseControl = () => {
        avatarCompanion.classList.toggle('is-paused', avatarManuallyPaused || !avatarMotionAllowed());
        avatarToggle.setAttribute('aria-pressed', String(avatarManuallyPaused));
        avatarToggle.setAttribute('aria-label', avatarManuallyPaused ? 'Resume the animated avatar' : 'Pause the animated avatar');
        avatarControlIcon.textContent = avatarManuallyPaused ? '▶' : 'Ⅱ';
    };

    const stopAvatarTimer = () => {
        if (avatarTimer !== null) {
            window.clearTimeout(avatarTimer);
            avatarTimer = null;
        }
    };

    const pauseAvatarPhase = () => {
        if (!avatarRunning) return;
        avatarRemaining = Math.max(0, avatarDeadline - performance.now());
        stopAvatarTimer();
        avatarAnimation?.pause();
        avatarRunning = false;
    };

    const finishAvatarWalk = () => {
        if (avatarCompanion.dataset.pose !== 'walk' || !avatarAnimation) return;
        avatarActor.style.left = avatarTargetLeft + 'px';
        avatarAnimation.cancel();
        avatarAnimation = null;
        syncAvatarAnchor();
    };

    const scheduleAvatarPhase = (duration) => {
        avatarRemaining = duration;
        avatarDeadline = performance.now() + duration;
        avatarRunning = true;
        avatarTimer = window.setTimeout(() => {
            avatarTimer = null;
            avatarRunning = false;
            avatarRemaining = 0;
            finishAvatarWalk();

            if (avatarPhaseIndex === avatarPhases.length - 1) avatarDirection *= -1;
            beginAvatarPhase((avatarPhaseIndex + 1) % avatarPhases.length);
        }, duration);
    };

    const beginAvatarPhase = (index) => {
        if (!avatarMotionAllowed() || avatarManuallyPaused) return;
        stopAvatarTimer();
        avatarAnimation?.cancel();
        avatarAnimation = null;
        avatarPhaseIndex = index;
        const phase = avatarPhases[index];
        setAvatarPhase(phase);

        if (phase.pose === 'walk') {
            const actorWidth = avatarActor.getBoundingClientRect().width;
            const start = avatarDirection > 0 ? 12 : Math.max(12, window.innerWidth - actorWidth - 12);
            avatarTargetLeft = avatarDirection > 0 ? Math.max(12, window.innerWidth - actorWidth - 12) : 12;
            avatarActor.style.left = start + 'px';
            avatarActor.classList.toggle('is-reversed', avatarDirection < 0);
            const distance = Math.abs(avatarTargetLeft - start);
            avatarAnimation = avatarActor.animate(
                [{ left: start + 'px' }, { left: avatarTargetLeft + 'px' }],
                { duration: phase.duration, easing: 'linear', fill: 'forwards' },
            );
            if (!distance) avatarAnimation.finish();
        }

        scheduleAvatarPhase(phase.duration);
    };

    const resumeAvatarPhase = () => {
        if (!avatarMotionAllowed() || avatarManuallyPaused || avatarRunning) return;
        if (avatarPhaseIndex < 0) {
            beginAvatarPhase(0);
            return;
        }

        avatarAnimation?.play();
        updateAvatarPauseControl();
        scheduleAvatarPhase(avatarRemaining || avatarPhases[avatarPhaseIndex].duration);
    };

    const syncAvatarMotion = () => {
        const motionAllowed = avatarMotionAllowed();
        avatarCompanion.classList.toggle('is-motion-off', !motionAllowed);

        if (!motionAllowed) {
            pauseAvatarPhase();
        } else if (!avatarManuallyPaused) {
            resumeAvatarPhase();
        }

        updateAvatarPauseControl();
    };

    const syncAvatarHeroVisibility = () => {
        const isPastHero = !avatarHero || avatarHero.getBoundingClientRect().bottom <= 0;
        if (isPastHero === avatarPastHero) return;
        avatarPastHero = isPastHero;
        syncAvatarMotion();
    };

    avatarToggle.addEventListener('click', () => {
        avatarManuallyPaused = !avatarManuallyPaused;
        if (avatarManuallyPaused) pauseAvatarPhase();
        else resumeAvatarPhase();
        updateAvatarPauseControl();
    });

    window.addEventListener('resize', () => {
        syncAvatarAnchor();
        syncAvatarHeroVisibility();
    });
    window.addEventListener('scroll', syncAvatarHeroVisibility, { passive: true });
    reducedMotionPreference.addEventListener?.('change', syncAvatarMotion);

    new MutationObserver(syncAvatarMotion).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-motion'],
    });

    avatarCompanion.classList.add('is-ready');
    syncAvatarHeroVisibility();
    syncAvatarMotion();
}
