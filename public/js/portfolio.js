const menuButton = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('.site-navigation');

if (menuButton && siteNavigation) {
    const closeMenu = () => {
        menuButton.setAttribute('aria-expanded', 'false');
        siteNavigation.classList.remove('is-open');
    };

    menuButton.addEventListener('click', () => {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isOpen));
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
