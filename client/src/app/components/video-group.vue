<script setup lang="ts">
import { VideoCardView } from "@/app/types";
import VideoCard from "./video-card.vue"

withDefaults(defineProps<{
    title : string,
    videos : VideoCardView[]
}>(),{
    title : "",
})

</script>
<template>
    <div class="video-group-wrapper">
        <div class="video-category">
            <span class="title">{{ title }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="0.5em" height="1em" viewBox="0 0 12 24">
                <defs><path id="weuiArrowOutlined0" fill="currentColor" d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"/></defs><use fill-rule="evenodd" href="#weuiArrowOutlined0" transform="rotate(-180 5.02 9.505)"/>
            </svg>
        </div>
        <div class="list-videos">
            <div v-for="(video,index) of videos" :key="index">
                <video-card :video="video"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.video-group-wrapper {
    margin-top: 20px;
    .video-category {
        cursor: pointer;
        width: fit-content;
        padding: 5px 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        user-select: none;
        transition: background-color .3s ease-out;   
        &:hover {
            background-color: var(--bg-color)
        }
        .title {
            font-size: 25px;
            font-weight: bold;
        }
        svg {
            font-size: 25px;
        }
    }
    .list-videos {
        margin-top: 20px;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        gap: 20px;
        padding: 20px 0;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}

@media screen and (max-width: 1280px) {
    .video-group-wrapper {
        .video-category {
            padding: 5px 15px;
            .title {
                font-size: 20px;
                font-weight: bold;
            }
            svg {
                font-size: 16px
            }
        }
    }
}
@media screen and (max-width: 760px) {
    .video-group-wrapper {
        .video-category {
            padding: 5px 10px;
            .title {
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
}
</style>