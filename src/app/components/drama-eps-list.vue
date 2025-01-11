<script setup lang="ts">
import { useRoute } from "vue-router";
import { DramaEpisodeType } from "../types/drama.type";
import { getEpsiodeReleaseDateFormat } from "@/utils/date-format";
import { DRAMA_STATUS_MAP } from "../helpers/drama-status.map";

defineProps<{
    dramaEpisode : DramaEpisodeType,
    currentEpisodeNo : number
}>()

const route = useRoute()

</script>

<template>
    <div>
        <div class="drama-status animation-mode">
            <div class="drama-logo" :style="{backgroundImage : `url('${dramaEpisode.drama.thumbnailUrl}')`}"></div>
            <div class="drama-title">
                <span class="main-title">{{ dramaEpisode.drama.title }}</span>
                <span class="eps-detail">
                    <template v-if="dramaEpisode.drama.status == 'ONGOING'">
                        <span style="color: orange;">{{ DRAMA_STATUS_MAP[dramaEpisode.drama.status] }}</span> - 
                        {{ dramaEpisode.episodes[0]?.episodeNo || 0 }} eps
                    </template>
                    <span style="color: orange;" v-else>{{ DRAMA_STATUS_MAP[dramaEpisode.drama.status] }}...</span> 
                </span>
            </div>
        </div>
        <div class="list-eps animation-mode tvkh-scrollbar">
            <p v-if="!dramaEpisode.episodes.length" class="no-episode-msg">No episode released</p>
            <template v-for="(episode) of dramaEpisode.episodes" :key="episode.id">
                <router-link :to="`/drama/${route.params.dramaId}/${episode.episodeNo}`">
                    <div 
                        class="d-eps-card animation-mode" 
                        :class="{'active':currentEpisodeNo == episode.episodeNo}"
                    >
                        <div class="d-card-img" :style="{backgroundImage : `url('${dramaEpisode.drama.thumbnailUrl}')`}">
                        </div>
                        <div class="d-card-body">
                            <h5 class="d-eps-title">{{ episode.title }}</h5>
                            <div class="other-eps-info">
                                <p class="d-eps-eps-title">
                                    Eps {{ episode.episodeNo }} - {{ dramaEpisode.drama.title }}
                                </p>
                                <p class="d-eps-released">
                                    <span v-if="!episode.translateBy">Multiple subtitles</span> 
                                    <span else>Khmer Language</span> 
                                    <span>{{ getEpsiodeReleaseDateFormat(episode.releasedDate) }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </router-link>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.no-episode-msg {
    text-align: center;
    margin-top: 30px;
}
.drama-status {
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: var(--bg-color);
    box-shadow: var(--card-shadow);
    padding: 15px 20px;
    position: relative;
    .drama-logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-position: center;
        background-size: cover;
    }
    .drama-title {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .main-title {
            font-size: 14px;
        }
        .eps-detail {
            font-size: 12px;
        }
    }
}
.list-eps {
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 430px;
    overflow-y: auto;
    border-top: .1px solid var(--border-color);
    box-shadow: var(--card-shadow);

}

.d-eps-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 10px;
    cursor: pointer;
    &.active,
    &:hover {
        background-color: var(--eps-card-hover-color);
        // box-shadow: var(--card-shadow);
    }
    .d-card-img {
        width: 130px;
        height: 70px;
        background-position: center;
        background-size: cover;
    }
    .d-card-body {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 3px;
        height: 100%;
        justify-content: space-between;
        .d-eps-title {
            font-weight: 500;
            font-size: 14px;
        }
        .other-eps-info {
            font-size: 12px;
            opacity: .8;
            margin-top: 5px;
            .d-eps-released {
                margin-top: 5px;
                display: flex;
                justify-content: space-between;
            }
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