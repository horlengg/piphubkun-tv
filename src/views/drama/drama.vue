<script lang="ts" setup>
import DramaEpsList from "@/app/components/drama-eps-list.vue"
import { useRoute } from "vue-router";
import { computed, ref, watchEffect } from "vue";
import { DramaService } from "@/app/services/api/drama.service";
import { DramaEpisodeType } from "@/app/types/drama.type";
import EmojiIcon from "@/app/assets/images/emoji.png"


const route = useRoute()
const dramaEpisode = ref<DramaEpisodeType>()
const currentEpisodeId = ref("")
const fetchDramaById = async (dramaId: string) => {
    dramaEpisode.value = undefined
    const response = await DramaService.retrieveDramaEpisodeById(dramaId)
    if (response) {
        dramaEpisode.value = response.data
        currentEpisodeId.value = dramaEpisode.value.episodes[0]?.id
    }
}

const currentEpisode = computed(() => {
    return dramaEpisode.value?.episodes.find(e => e.id == currentEpisodeId.value)
})

watchEffect(() => {
    if (route.params.dramaId && typeof route.params.dramaId == 'string') {
        fetchDramaById(route.params.dramaId)
    }
})


</script>
<template>
    <div class="page-drama">
        <div class="drama-video">
            <!-- <drama-video :url="currentEpisode.videoUrl" v-if="currentEpisode"/> -->
            <div class="v-el-wrapper" v-if="dramaEpisode?.drama.status !=='INCOMMING'">
                <iframe 
                    :src="currentEpisode?.videoUrl" 
                    allowfullscreen
                    :title="currentEpisode?.title"
                    allow="fullscreen;"
                >
                </iframe>
            </div>
            <div v-else class="thumnail-preview" :style="{backgroundImage: `url('${dramaEpisode.drama.thumbnailUrl}')`}">
                <span>
                    Incomming Soon... 
                </span>
                <img :src="EmojiIcon" alt="icon" width="40">
            </div>
            <div class="video-caption">
                <h2>{{ currentEpisode?.title || dramaEpisode?.drama.title }}</h2>
                <p v-if="currentEpisode">Eps - {{ currentEpisode?.episodeNo }} - {{ dramaEpisode?.drama.title.toLowerCase() }}</p>
                <p>
                    {{ dramaEpisode?.drama.description }}
                </p>
            </div>
        </div>
        <div class="daram-list-eps">
            <DramaEpsList :dramaEpisode="dramaEpisode" v-if="dramaEpisode" v-model="currentEpisodeId"/>
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
    background-color: rgba(79, 68, 93, 0.953);
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
        flex: .7;
        .video-caption {
            margin-top: 10px;
            p {
                margin-top: 10px;
                line-height: 1.3;
            }
        }
    }

    .daram-list-eps {
        flex: .3;
    }
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