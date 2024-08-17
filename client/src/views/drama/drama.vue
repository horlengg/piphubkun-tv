<script lang="ts" setup>
import DramaEpsList from "@/app/components/drama-eps-list.vue"
import Video from "@/app/components/video.vue";
import VideoUrl from "@/app/assets/videos/impossible.mp4"

</script>
<template>
    <div class="page-drama">
        <div class="drama-video">
            <Video :url="VideoUrl" />
            <div class="video-caption">
                <h2>Battle through the heavens S5</h2>
                <p>Eps - 103 -battle through the heavens</p>
            </div>
        </div>
        <div class="daram-list-eps">
            <DramaEpsList />
        </div>
    </div>
</template>

<style scoped lang="scss">
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
@media screen and (max-width: 760px) {
    .page-drama {
        padding: 20px 20px;
        flex-direction: column;
        .drama-video {
            flex: 1;
        }
        .daram-list-eps {
            flex: 1;
        }
    }
}
@media screen and (max-width: 400px) {
}
</style>