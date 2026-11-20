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
    const avatarCharm = avatarCompanion.querySelector('[data-avatar-charm]');
    const avatarCharmRig = avatarCompanion.querySelector('[data-avatar-charm-rig]');
    const avatarCharmChain = avatarCompanion.querySelector('.avatar-companion__chain');
    const avatarPendant = avatarCompanion.querySelector('[data-avatar-pendant]');
    const avatarMenuToggle = avatarCompanion.querySelector('[data-avatar-menu-toggle]');
    const avatarMenu = avatarCompanion.querySelector('[data-avatar-menu]');
    const avatarCaption = avatarCompanion.querySelector('[data-avatar-caption]');
    const avatarIcon = avatarCompanion.querySelector('[data-avatar-icon]');
    const avatarControlIcon = avatarCompanion.querySelector('[data-avatar-control-icon]');
    const avatarImages = [...avatarCompanion.querySelectorAll('[data-avatar-image]')];
    const avatarActionButtons = [...avatarCompanion.querySelectorAll('[data-avatar-action]')];
    const avatarHero = document.querySelector('.hero-section');
    const avatarPhases = [
        { pose: 'walk', action: 'walk', caption: 'On the move', icon: '↔', duration: 8200 },
        { pose: 'think', action: 'think', caption: 'Thinking it through', icon: '✦', duration: 4200 },
        { pose: 'ring', imagePose: 'idle', action: 'call', caption: 'Phone ringing…', icon: '☎', duration: 1600 },
        { pose: 'phone-reach', action: 'call', caption: 'Pulling my phone out', icon: '☎', duration: 1500 },
        { pose: 'phone', action: 'call', caption: 'Taking a call', icon: '☎', duration: 3900 },
        { pose: 'message', action: 'message', caption: 'Sending a note', icon: '✉', duration: 3900 },
        { pose: 'work', action: 'work', caption: 'Setting up to work', icon: '⌨', duration: 6800, move: 'workstation' },
        { pose: 'dance', imagePose: 'none', action: 'dance', caption: 'Moonwalking', icon: '♪', duration: 7200, move: 'moonwalk' },
        { pose: 'pushups', imagePose: 'none', action: 'pushups', caption: 'Getting a few reps in', icon: '↗', duration: 7200 },
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
    let avatarArrivalAnimation = null;
    let avatarArrivalTimer = null;
    let charmAngle = 0;
    let charmAngularVelocity = 0;
    let charmFrame = null;
    let charmLastFrame = 0;
    let charmDragging = false;
    let charmDragMoved = false;
    let charmLastPointerAngle = 0;
    let charmLastPointerTime = 0;
    let charmStartX = 0;
    let charmStartY = 0;
    let charmPreviousX = 0;
    let suppressCharmClick = false;

    const avatarMotionAllowed = () => (
        document.documentElement.dataset.motion !== 'off' && !reducedMotionPreference.matches
    );

    const clampCharmAngle = (angle) => Math.max(-1.05, Math.min(1.05, angle));

    const updateCharmAngle = () => {
        avatarCharmRig.style.setProperty('--swing-angle', (charmAngle * 180 / Math.PI).toFixed(2) + 'deg');
    };

    const stopCharmSwing = () => {
        if (charmFrame !== null) {
            window.cancelAnimationFrame(charmFrame);
            charmFrame = null;
        }
        charmLastFrame = 0;
    };

    const startCharmSwing = () => {
        if (charmFrame !== null || !avatarMotionAllowed() || avatarCompanion.dataset.mode !== 'charm') return;

        const swing = (timestamp) => {
            if (!avatarMotionAllowed() || avatarCompanion.dataset.mode !== 'charm') {
                charmFrame = null;
                charmLastFrame = 0;
                return;
            }

            if (charmLastFrame && !charmDragging) {
                const delta = Math.min((timestamp - charmLastFrame) / 1000, .04);
                const chainLength = Math.max(1, avatarCharmChain.offsetHeight);
                const acceleration = -(1100 / chainLength) * Math.sin(charmAngle) - 2.05 * charmAngularVelocity;
                charmAngularVelocity += acceleration * delta;
                charmAngle += charmAngularVelocity * delta;

                if (Math.abs(charmAngle) > 1.05) {
                    charmAngle = clampCharmAngle(charmAngle);
                    charmAngularVelocity *= -.38;
                }

                if (Math.abs(charmAngle) < .001 && Math.abs(charmAngularVelocity) < .006) {
                    charmAngle = 0;
                    charmAngularVelocity = 0;
                    updateCharmAngle();
                    charmFrame = null;
                    charmLastFrame = 0;
                    return;
                }
            }

            charmLastFrame = timestamp;
            updateCharmAngle();
            charmFrame = window.requestAnimationFrame(swing);
        };

        charmFrame = window.requestAnimationFrame(swing);
    };

    const syncAvatarAnchor = () => {
        const actorBounds = avatarActor.getBoundingClientRect();
        avatarCompanion.dataset.anchor = actorBounds.left + actorBounds.width / 2 > window.innerWidth / 2 ? 'right' : 'left';
    };

    const setAvatarPhase = (phase) => {
        avatarCompanion.dataset.pose = phase.pose;
        avatarCaption.textContent = phase.caption;
        avatarIcon.textContent = phase.icon;
        const imagePose = phase.imagePose || phase.pose;
        avatarImages.forEach((image) => {
            image.classList.toggle('is-active', image.dataset.avatarImage === imagePose);
        });
        avatarActionButtons.forEach((button) => {
            button.classList.toggle('is-active', button.dataset.avatarAction === phase.action);
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

    const stopAvatarMovement = (snapToTarget = false) => {
        if (!avatarAnimation) return;
        const currentLeft = Number.parseFloat(window.getComputedStyle(avatarActor).left);
        if (snapToTarget && Number.isFinite(avatarTargetLeft)) {
            avatarActor.style.left = avatarTargetLeft + 'px';
        } else if (Number.isFinite(currentLeft)) {
            avatarActor.style.left = currentLeft + 'px';
        }
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
            stopAvatarMovement(true);

            if (avatarPhaseIndex === avatarPhases.length - 1) avatarDirection *= -1;
            beginAvatarPhase((avatarPhaseIndex + 1) % avatarPhases.length);
        }, duration);
    };

    const beginAvatarPhase = (index) => {
        if (!avatarMotionAllowed() || avatarManuallyPaused) return;
        stopAvatarTimer();
        stopAvatarMovement();
        avatarPhaseIndex = index;
        const phase = avatarPhases[index];
        setAvatarPhase(phase);

        if (phase.pose === 'walk') {
            const actorWidth = avatarActor.getBoundingClientRect().width;
            const start = avatarDirection > 0 ? 12 : Math.max(12, window.innerWidth - actorWidth - 12);
            avatarTargetLeft = avatarDirection > 0 ? Math.max(12, window.innerWidth - actorWidth - 12) : 12;
            avatarActor.style.left = start + 'px';
            avatarActor.classList.toggle('is-reversed', avatarDirection < 0);
            syncAvatarAnchor();
            const distance = Math.abs(avatarTargetLeft - start);
            avatarAnimation = avatarActor.animate(
                [{ left: start + 'px' }, { left: avatarTargetLeft + 'px' }],
                { duration: phase.duration, easing: 'linear', fill: 'forwards' },
            );
            if (!distance) avatarAnimation.finish();
        } else if (phase.move === 'workstation') {
            const actorWidth = avatarActor.getBoundingClientRect().width;
            const start = -actorWidth - 32;
            avatarTargetLeft = 12;
            avatarActor.classList.remove('is-reversed');
            avatarActor.style.left = start + 'px';
            syncAvatarAnchor();
            avatarAnimation = avatarActor.animate(
                [
                    { left: start + 'px', transform: 'translateY(5px) scale(.98)' },
                    { left: (avatarTargetLeft + 18) + 'px', transform: 'translateY(0) scale(1)', offset: .82 },
                    { left: avatarTargetLeft + 'px', transform: 'translateY(0) scale(1)' },
                ],
                { duration: 1250, easing: 'cubic-bezier(.2,.8,.25,1)', fill: 'forwards' },
            );
        } else if (phase.move === 'moonwalk') {
            const actorWidth = avatarActor.getBoundingClientRect().width;
            const maxLeft = Math.max(12, window.innerWidth - actorWidth - 12);
            const currentLeft = Number.parseFloat(window.getComputedStyle(avatarActor).left);
            const start = Math.max(12, Math.min(maxLeft, Number.isFinite(currentLeft) ? currentLeft : 12));
            const travel = Math.min(Math.max(180, window.innerWidth * .22), 300);
            const leftSpace = start - 12;
            const rightSpace = maxLeft - start;
            const glideRight = leftSpace < travel && rightSpace > leftSpace;
            avatarTargetLeft = glideRight ? Math.min(maxLeft, start + travel) : Math.max(12, start - travel);
            avatarActor.style.left = start + 'px';
            avatarActor.classList.toggle('is-reversed', glideRight);
            syncAvatarAnchor();
            avatarAnimation = avatarActor.animate(
                [{ left: start + 'px' }, { left: avatarTargetLeft + 'px' }],
                { duration: phase.duration, easing: 'linear', fill: 'forwards' },
            );
        } else if (phase.pose === 'pushups') {
            const actorWidth = avatarActor.getBoundingClientRect().width;
            const maxLeft = Math.max(12, window.innerWidth - actorWidth - 12);
            const currentLeft = Number.parseFloat(window.getComputedStyle(avatarActor).left);
            const start = Math.max(12, Math.min(maxLeft, Number.isFinite(currentLeft) ? currentLeft : 12));
            avatarActor.style.left = start + 'px';
            avatarActor.classList.remove('is-reversed');
            syncAvatarAnchor();
        }

        scheduleAvatarPhase(phase.duration);
    };

    const finishAvatarArrival = (continueCycle = false, phaseIndex = 0) => {
        if (avatarArrivalTimer !== null) {
            window.clearTimeout(avatarArrivalTimer);
            avatarArrivalTimer = null;
        }

        if (avatarArrivalAnimation) {
            avatarActor.style.left = '12px';
            avatarActor.style.top = 'auto';
            avatarActor.style.bottom = '0px';
            avatarActor.style.width = '';
            avatarActor.style.height = '';
            avatarActor.style.transform = 'none';
            avatarActor.style.transformOrigin = '';
            avatarArrivalAnimation.cancel();
            avatarArrivalAnimation = null;
        }

        avatarCompanion.classList.remove('is-arriving');
        syncAvatarAnchor();
        if (continueCycle && avatarMotionAllowed() && !avatarManuallyPaused) beginAvatarPhase(phaseIndex);
    };

    const activateAvatar = (phaseIndex = 0) => {
        if (!avatarMotionAllowed() || avatarCompanion.dataset.mode === 'active') return;

        stopCharmSwing();
        stopAvatarTimer();
        avatarManuallyPaused = false;
        const pendantBounds = avatarPendant.getBoundingClientRect();
        const arrivalAngle = charmAngle * 180 / Math.PI;

        avatarCompanion.dataset.mode = 'active';
        avatarCompanion.classList.add('is-arriving');
        setAvatarPhase({ pose: 'idle', action: 'walk', caption: 'Coming down to meet you', icon: '↘' });

        const targetBounds = avatarActor.getBoundingClientRect();
        const targetWidth = targetBounds.width;
        const targetHeight = targetBounds.height;
        const targetLeft = 12;
        const targetTop = Math.max(12, window.innerHeight - targetHeight);
        avatarTargetLeft = targetLeft;
        avatarActor.style.left = pendantBounds.left + 'px';
        avatarActor.style.top = pendantBounds.top + 'px';
        avatarActor.style.bottom = 'auto';
        avatarActor.style.width = pendantBounds.width + 'px';
        avatarActor.style.height = pendantBounds.height + 'px';
        avatarActor.style.transformOrigin = '50% 50%';
        syncAvatarAnchor();

        avatarArrivalAnimation = avatarActor.animate(
            [
                {
                    left: pendantBounds.left + 'px',
                    top: pendantBounds.top + 'px',
                    width: pendantBounds.width + 'px',
                    height: pendantBounds.height + 'px',
                    transform: 'rotate(' + arrivalAngle.toFixed(1) + 'deg) scale(.96)',
                    opacity: 1,
                },
                {
                    left: (targetLeft + 16) + 'px',
                    top: (targetTop + 12) + 'px',
                    width: targetWidth + 'px',
                    height: targetHeight + 'px',
                    transform: 'rotate(-7deg) scale(1.04)',
                    opacity: 1,
                    offset: .84,
                },
                {
                    left: targetLeft + 'px',
                    top: targetTop + 'px',
                    width: targetWidth + 'px',
                    height: targetHeight + 'px',
                    transform: 'rotate(0deg) scale(1)',
                    opacity: 1,
                },
            ],
            { duration: 1450, easing: 'cubic-bezier(.2,.75,.25,1)', fill: 'forwards' },
        );

        updateAvatarPauseControl();
        avatarArrivalTimer = window.setTimeout(() => finishAvatarArrival(true, phaseIndex), 1450);
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
            stopCharmSwing();
            if (avatarArrivalAnimation) finishAvatarArrival(false);
            pauseAvatarPhase();
        } else if (avatarCompanion.dataset.mode === 'charm') {
            startCharmSwing();
            if (avatarPastHero) activateAvatar();
        } else if (!avatarManuallyPaused && !avatarCompanion.classList.contains('is-arriving')) {
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
        if (avatarCompanion.dataset.mode === 'charm') {
            activateAvatar();
            return;
        }

        avatarManuallyPaused = !avatarManuallyPaused;
        if (avatarManuallyPaused) pauseAvatarPhase();
        else resumeAvatarPhase();
        updateAvatarPauseControl();
    });

    const getCharmAngleFromPointer = (event) => {
        const bounds = avatarCharm.getBoundingClientRect();
        const anchorX = bounds.left + bounds.width / 2;
        const anchorY = bounds.top;
        return clampCharmAngle(Math.atan2(event.clientX - anchorX, Math.max(1, event.clientY - anchorY)));
    };

    avatarPendant.addEventListener('pointerenter', (event) => {
        if (avatarCompanion.dataset.mode !== 'charm' || event.pointerType !== 'mouse') return;
        const bounds = avatarCharm.getBoundingClientRect();
        charmAngularVelocity += event.clientX < bounds.left + bounds.width / 2 ? -.28 : .28;
        startCharmSwing();
    });

    avatarPendant.addEventListener('pointerdown', (event) => {
        if (avatarCompanion.dataset.mode !== 'charm' || (event.pointerType === 'mouse' && event.button !== 0)) return;
        charmDragging = true;
        charmDragMoved = false;
        charmStartX = event.clientX;
        charmStartY = event.clientY;
        charmLastPointerAngle = getCharmAngleFromPointer(event);
        charmLastPointerTime = event.timeStamp;
        charmPreviousX = event.clientX;
        avatarPendant.setPointerCapture(event.pointerId);
        event.preventDefault();
    });

    avatarPendant.addEventListener('pointermove', (event) => {
        if (avatarCompanion.dataset.mode !== 'charm') return;

        if (charmDragging) {
            const angle = getCharmAngleFromPointer(event);
            const elapsed = Math.max(.008, (event.timeStamp - charmLastPointerTime) / 1000);
            charmAngularVelocity = Math.max(-5, Math.min(5, (angle - charmLastPointerAngle) / elapsed));
            charmAngle = angle;
            charmDragMoved = charmDragMoved || Math.hypot(event.clientX - charmStartX, event.clientY - charmStartY) > 7;
            charmLastPointerAngle = angle;
            charmLastPointerTime = event.timeStamp;
            updateCharmAngle();
            startCharmSwing();
            return;
        }

        if (event.pointerType === 'mouse') {
            const movement = event.clientX - charmPreviousX;
            if (Math.abs(movement) > 1) {
                charmAngularVelocity += Math.max(-1, Math.min(1, movement / 34)) * .075;
                charmPreviousX = event.clientX;
                startCharmSwing();
            }
        }
    });

    const releaseCharmPointer = () => {
        if (!charmDragging) return;
        const tap = !charmDragMoved;
        charmDragging = false;
        suppressCharmClick = true;
        window.setTimeout(() => { suppressCharmClick = false; }, 0);
        startCharmSwing();
        if (tap) activateAvatar();
    };

    avatarPendant.addEventListener('pointerup', releaseCharmPointer);
    avatarPendant.addEventListener('pointercancel', releaseCharmPointer);
    avatarPendant.addEventListener('lostpointercapture', releaseCharmPointer);
    avatarPendant.addEventListener('click', (event) => {
        if (suppressCharmClick) {
            event.preventDefault();
            return;
        }
        if (event.detail === 0 && avatarCompanion.dataset.mode === 'charm') activateAvatar();
    });
    avatarPendant.addEventListener('keydown', (event) => {
        if (avatarCompanion.dataset.mode !== 'charm' || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        charmAngularVelocity += event.key === 'ArrowLeft' ? -1.25 : 1.25;
        startCharmSwing();
    });

    const setAvatarMenuOpen = (isOpen) => {
        avatarMenu.hidden = !isOpen;
        avatarCompanion.classList.toggle('is-menu-open', isOpen);
        avatarMenuToggle.setAttribute('aria-expanded', String(isOpen));
        avatarMenuToggle.setAttribute('aria-label', isOpen ? 'Close avatar actions' : 'Choose an avatar action');
        avatarMenuToggle.textContent = isOpen ? '×' : '＋';
    };

    avatarMenuToggle.addEventListener('click', () => {
        setAvatarMenuOpen(avatarMenuToggle.getAttribute('aria-expanded') !== 'true');
    });

    avatarActionButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const phaseIndex = avatarPhases.findIndex((phase) => phase.action === button.dataset.avatarAction);
            if (phaseIndex < 0) return;
            setAvatarMenuOpen(false);
            avatarManuallyPaused = false;
            beginAvatarPhase(phaseIndex);
            updateAvatarPauseControl();
        });
    });

    document.addEventListener('pointerdown', (event) => {
        if (!avatarCompanion.contains(event.target) && avatarMenuToggle.getAttribute('aria-expanded') === 'true') {
            setAvatarMenuOpen(false);
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && avatarMenuToggle.getAttribute('aria-expanded') === 'true') {
            setAvatarMenuOpen(false);
            avatarMenuToggle.focus();
        }
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
