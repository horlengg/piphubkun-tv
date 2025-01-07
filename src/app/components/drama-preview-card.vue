<script setup lang="ts">
import { DRAMA_STATUS_MAP } from "../helpers/drama-status.map";
import { DramaType } from "../types/drama.type";
defineProps<{
    drama : DramaType
}>()

</script>
<template>
    <router-link :to="`/drama/${drama.id}`">
        <div class="video__card-wrapper animation-mode">
            <span class="eps-no">Eps {{ drama.totalEpisode }}</span>
            <div class="card-image-wr">
                <div class="block-image" :style="{backgroundImage:`url('${drama.thumbnailUrl}')`}">
                    <!-- <img width="100%" :src="drama.thumbnailUrl" alt="Image"> -->
                </div>
                <span class="mv-status">{{ DRAMA_STATUS_MAP[drama.status] }}</span>
            </div>
            <p class="mv-title">{{ drama.title }}</p>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
.video__card-wrapper {
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: 100%;
    .card-image-wr {
        background-color: red;
        position: relative;
        overflow: hidden;
        border-radius: 10px 10px 0 0;
        width: 100%;
        overflow: hidden;
        .block-image {
            height: 300px;
            transition: transform .3s ease;
            background-size: cover;
            background-position: top center;
        }
        .mv-status {
            position: absolute;
            z-index: 1;
            bottom: 0;
            left: 0;
            background-color: #d69410;
            color: #FFF;
            padding: 2px 8px;
            border-radius: 0 4px 0 0;
            // letter-spacing: 1px;
            font-size: 12px;
        }
    }
    .mv-title {
        text-align: center;
        margin-top: 10px;
    }
    .eps-no {
        position: absolute;
        right: 0;
        top: 0;
        background-color: #1bcc18;
        color: #FFF;
        padding: 3px 10px;
        border-radius: 0 10px 0 10px;
        z-index: 1;
    }
    &:hover .block-image {
        transform: scale(1.2);
    }
}
// @media screen and (max-width: 1280px) {
    
// }
@media screen and (max-width: 760px) {
    .video__card-wrapper {
        // height: 200px;
        &.sticky-width {
            min-width: 240px;
        }
    }
}
@media screen and (max-width: 400px) {
    .video__card-wrapper {
        // height: 180px;
        &.sticky-width {
            min-width: 220px;
        }
    }
}
    
</style>