<script lang="ts" setup>
import DramaEpsList from "@/app/components/drama-eps-list.vue"
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import { DramaService } from "@/app/services/api/drama.service";
import { DramaEpisodeType } from "@/app/types/drama.type";
import EmojiIcon from "@/app/assets/images/emoji.png"


const route = useRoute()
const dramaEpisode = ref<DramaEpisodeType>()
const currentEpisodeNo = ref(0)
const fetchDramaById = async (dramaId: string) => {
    dramaEpisode.value = undefined
    const response = await DramaService.retrieveDramaEpisodeById(dramaId)
    if (response) {
        dramaEpisode.value = response.data
        const lastEpisodeNo = dramaEpisode.value.episodes[0]?.episodeNo
        if(!currentEpisodeNo.value && lastEpisodeNo) {
            currentEpisodeNo.value = lastEpisodeNo
        }
    }
}

const currentEpisode = computed(() => {
    return dramaEpisode.value?.episodes.find(e => e.episodeNo == currentEpisodeNo.value)
})

watch(
    () => route.params.dramaId,
    (newDramaId) => {
        console.log({newDramaId});
        if (newDramaId && typeof newDramaId === "string") {
            fetchDramaById(newDramaId); 
        }
    }
,{ immediate : true});
watch(
    () => route.params.epsNo,
    (newEpsNo) => {
        console.log({newEpsNo});
        
        if (newEpsNo && typeof newEpsNo === "string") {
            currentEpisodeNo.value = parseInt(newEpsNo, 10); 
        }
    }
,{ immediate : true});


</script>
<template>
    <div class="page-drama">
        <div class="drama-video">
            <!-- <drama-video :url="currentEpisode.videoUrl" v-if="currentEpisode"/> -->
            <div class="v-el-wrapper" v-if="dramaEpisode?.drama.status !== 'INCOMMING'">
                <iframe :src="currentEpisode?.videoUrl" allowfullscreen :title="currentEpisode?.title"
                    allow="fullscreen;">
                </iframe>
            </div>
            <div v-else class="thumnail-preview"
                :style="{ backgroundImage: `url('${dramaEpisode.drama.thumbnailUrl}')` }">
                <span>
                    Incomming Soon...
                </span>
                <img :src="EmojiIcon" alt="icon" width="40">
            </div>
            <div class="video-caption">
                <h2 class="episode-title">
                    <span>{{ currentEpisode?.title}}</span>
                    <template v-if="currentEpisode?.translateBy">
                        by
                        <a 
                            :href="currentEpisode.translatorResource" 
                            target="_blank" 
                            class="transtator-link"
                        >
                            @{{ currentEpisode.translateBy }}
                        </a>
                    </template>
                </h2>
                <p v-if="currentEpisode">Eps - {{ currentEpisode?.episodeNo }} - {{
                    dramaEpisode?.drama.title.toLowerCase() }}</p>
                <p>
                    {{ dramaEpisode?.drama.description }}
                </p>
            </div>
        </div>
        <div class="daram-list-eps">
            <DramaEpsList :dramaEpisode="dramaEpisode" v-if="dramaEpisode" :currentEpisodeNo="currentEpisodeNo" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.thumnail-preview {
    background-position: center;
    background-size: cover;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    span {
        font-size: 30px;
        font-weight: 600;
        letter-spacing: 1px;
        color: orange;
    }
}

.v-el-wrapper {
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    height: 400px;
    background-color: #000;

    iframe {
        height: 100%;
        width: 100%;
        border: none;
    }
}

.page-drama {
    padding: 20px 50px;
    display: flex;
    gap: 40px;
    justify-content: space-between;

    .drama-video {
        flex: .6;
        .video-caption {
            margin-top: 30px;
            p {
                margin-top: 20px;
                line-height: 1.3;
                font-size: var(--font-size-sm);
            }
            .episode-title {
                font-size: 22px;
                font-weight: 600;
            }
        }
    }

    .daram-list-eps {
        flex: .4;
    }
}
.transtator-link {
    color: orange;
    text-decoration: none;
}

@media screen and (max-width: 1280px) {
    .page-drama {
        padding: 20px 30px;

        .drama-video {
            flex: .55;
        }

        .daram-list-eps {
            flex: .45;
        }
    }
}

@media screen and (max-width: 1000px) {
    .page-drama {
        padding: 20px 0px;
        flex-direction: column;

        .drama-video {
            flex: 1;
        }

        .daram-list-eps {
            flex: 1;
        }
    }
}

@media screen and (max-width: 500px) {
    .v-el-wrapper {
        height: 250px;
    }

    .thumnail-preview {
        height: 250px;
    }

}
</style>