<script setup lang="ts">
import { useRoute } from "vue-router";
import { DramaEpisodeType } from "../types/drama.type";
import { getEpsiodeReleaseDateFormat } from "@/utils/date-format";
import { DRAMA_STATUS_MAP } from "../helpers/drama-status.map";

defineProps<{
    dramaEpisode : DramaEpisodeType,
}>()

const route = useRoute()
const currentEpisodeIdModel = defineModel({
    type : String
})


</script>

<template>
    <div>
        <div class="drama-status animation-mode">
            <div class="drama-logo" :style="{backgroundImage : `url('${dramaEpisode.drama.thumbnailUrl}')`}"></div>
            <div class="drama-title">
                <span class="main-title">{{ dramaEpisode.drama.title }}</span>
                <span class="eps-detail">
                    <span style="color: orange;">{{ DRAMA_STATUS_MAP[dramaEpisode.drama.status] }}</span> - 
                    {{ dramaEpisode.episodes[0]?.episodeNo || 0 }} eps
                </span>
            </div>
        </div>
        <div class="list-eps tvkh-scrollbar">
            <p v-if="!dramaEpisode.episodes.length" class="no-episode-msg">No episode released</p>
            <template v-for="(episode) of dramaEpisode.episodes" :key="episode.id">
                <router-link :to="`/drama/${route.params.dramaId}`">
                    <div 
                        class="d-eps-card animation-mode" 
                        :class="{'active':currentEpisodeIdModel == episode.id}"
                        @click="currentEpisodeIdModel = episode.id"
                    >
                        <div class="d-card-img" :style="{backgroundImage : `url('${dramaEpisode.drama.thumbnailUrl}')`}">
                        </div>
                        <div class="d-card-body">
                            <h5 class="d-eps-title">{{ episode.title }}</h5>
                            <div class="other-eps-info">
                                <span class="d-eps-eps-title">
                                    Eps {{ episode.episodeNo }} - {{ dramaEpisode.drama.title }}
                                </span>
                                <span class="d-eps-released">
                                    Multiple subtitle - {{ getEpsiodeReleaseDateFormat(episode.releasedDate) }}
                                </span>
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
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 430px;
    overflow-y: auto;
    border: .1px solid var(--border-color);
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
        background-color: var(--bg-color);
        box-shadow: var(--card-shadow);
    }
    .d-card-img {
        flex: .3;
        height: 70px;
        background-position: center;
        background-size: cover;
    }
    .d-card-body {
        flex: .7;
        display: flex;
        flex-direction: column;
        gap: 3px;
        height: 100%;
        justify-content: space-between;
        .d-eps-title {
            font-weight: 500;
            font-size: 14px;
        }
        .d-eps-eps-title {
            font-weight: 400;
            opacity: .8;
        }
        .other-eps-info {
            font-size: 10px;
            .d-eps-released {
                font-size: var(--font-size-sm);
                opacity: .8;
            }
            .d-eps-released {
                display: inline-block;
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