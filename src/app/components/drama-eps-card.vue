<script setup lang="ts">
import { DramaType } from "../types/drama.type";
import { EpisodeType } from "../types/episode.type";
defineProps<{
    drama : DramaType,
    episode : EpisodeType
}>()
</script>
<template>
    <div class="d-eps-card animation-mode">
        <div class="d-card-img" :style="{backgroundImage : `url('${drama.thumbnailUrl}')`}">
        </div>
        <div class="d-card-body">
            <span class="d-eps-title">{{ drama.title }}</span>
            <span class="d-eps-eps-title">{{ episode.episodeNo }}</span>
            <span class="d-eps-desc">{{ drama.description }}</span>
            <span class="d-eps-released">{{ episode.releasedDate }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.d-eps-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 10px;
    cursor: pointer;
    &.active,
    &:hover {
        background-color: var(--bg-color);
        box-shadow: var(--card-shadow);
    }
    .d-card-img {
        flex: .3;
        height: 70px;
        background-position: center;
        background-size: cover;
        border-radius: 2px;
    }
    .d-card-body {
        flex: .7;
        display: flex;
        flex-direction: column;
        gap: 3px;
        .d-eps-title,
        .d-eps-eps-title {
            font-weight: 500;
        }
        .d-eps-desc,
        .d-eps-released {
            font-size: var(--font-size-sm);
            opacity: .8;
        }
        .d-eps-desc {
            margin-top: 10px;
        }
        .d-eps-released {
            display: inline-block;
            text-align: end;
        }
    }
}

@media screen and (max-width: 1280px) {
    
}
@media screen and (max-width: 760px) {
    .d-eps-card {
        .d-card-img {
            flex: .2;
        }
        .d-card-body {
            flex: .8;
        }
    }
}
@media screen and (max-width: 400px) {
    .d-eps-card {
        .d-card-img {
            flex: .4;
        }
        .d-card-body {
            flex: .6;
        }
    }
}

</style>