<div class="project-art art-{{ $project['art_class'] }}">
    @if ($project['image'])
        <img src="{{ asset($project['image']) }}" alt="{{ $project['image_alt'] }}" width="1200" height="760" loading="lazy">
        <span class="art-photo-label">{{ $project['art_kicker'] }}</span>
    @else
        <div class="art-orbit" aria-hidden="true"></div>
        <div class="art-lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <div class="art-copy">
            <span class="art-kicker">{{ $project['art_kicker'] }}</span>
            <strong>
                @foreach ($project['art_title'] as $line)
                    <span>{{ $line }}</span>
                @endforeach
            </strong>
            <span class="art-note">{{ $project['art_note'] }}</span>
        </div>
        <span class="art-stamp" aria-hidden="true">{{ strtoupper(substr($project['name'], 0, 2)) }}</span>
    @endif
</div>
