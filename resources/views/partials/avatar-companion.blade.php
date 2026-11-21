<aside class="avatar-companion" data-avatar-companion data-mode="charm" data-pose="idle" aria-label="Irfan's animated desk companion">
    <div class="avatar-companion__charm" data-avatar-charm>
        <div class="avatar-companion__charm-rig" data-avatar-charm-rig>
            <span class="avatar-companion__chain" aria-hidden="true"><i></i></span>
            <button class="avatar-companion__pendant" type="button" data-avatar-pendant aria-label="Flick to swing or tap to wake Irfan">
                <span class="avatar-companion__pendant-loop" aria-hidden="true"></span>
                <img src="{{ asset('images/irfan-avatar-cartoon.webp') }}" alt="" width="1024" height="1536">
            </button>
        </div>
        <span class="avatar-companion__charm-hint" data-avatar-charm-hint aria-hidden="true">Flick to swing · tap to wake</span>
    </div>
    <div class="avatar-companion__actor" data-avatar-actor>
        <div class="avatar-companion__image-stack" aria-hidden="true">
            <img src="{{ asset('images/irfan-avatar-cartoon.webp') }}" alt="" width="1024" height="1536" data-avatar-image="idle">
            <img src="{{ asset('images/irfan-avatar-think.webp') }}" alt="" width="1024" height="1536" data-avatar-image="think">
            <img src="{{ asset('images/irfan-avatar-phone-reach.webp') }}" alt="" width="1024" height="1536" data-avatar-image="phone-reach">
            <img src="{{ asset('images/irfan-avatar-phone.webp') }}" alt="" width="1024" height="1536" data-avatar-image="phone">
            <img src="{{ asset('images/irfan-avatar-message.webp') }}" alt="" width="1024" height="1536" data-avatar-image="message">
            <img src="{{ asset('images/irfan-avatar-workstation.webp') }}" alt="" width="1312" height="1199" data-avatar-image="work">
            <div class="avatar-companion__walk-cycle" data-avatar-walk-cycle></div>
            <div class="avatar-companion__pushup-cycle" data-avatar-pushup-cycle></div>
            <span class="avatar-companion__ring" data-avatar-ring aria-hidden="true"><i>☎</i><b>•••</b></span>
        </div>
        <div class="avatar-companion__bubble-wrap">
            <button class="avatar-companion__bubble" type="button" data-avatar-toggle aria-pressed="false" aria-label="Pause the animated avatar">
                <span class="avatar-companion__bubble-icon" data-avatar-icon aria-hidden="true">✦</span>
                <span class="avatar-companion__bubble-text" data-avatar-caption aria-live="polite">Loading Irfan</span>
                <span class="avatar-companion__bubble-control" data-avatar-control-icon aria-hidden="true">Ⅱ</span>
            </button>
            <button class="avatar-companion__menu-trigger" type="button" data-avatar-menu-toggle aria-expanded="false" aria-controls="avatar-action-menu" aria-label="Choose an avatar action">＋</button>
        </div>
        <div class="avatar-companion__menu" id="avatar-action-menu" data-avatar-menu role="group" aria-label="Choose an avatar action" hidden>
            <button type="button" data-avatar-action="walk"><span aria-hidden="true">↔</span>Walk</button>
            <button type="button" data-avatar-action="think"><span aria-hidden="true">✦</span>Think</button>
            <button type="button" data-avatar-action="call"><span aria-hidden="true">☎</span>Call</button>
            <button type="button" data-avatar-action="message"><span aria-hidden="true">✉</span>Message</button>
            <button type="button" data-avatar-action="work"><span aria-hidden="true">⌨</span>Work</button>
            <button type="button" data-avatar-action="pushups"><span aria-hidden="true">↗</span>Push-ups</button>
        </div>
    </div>
</aside>
