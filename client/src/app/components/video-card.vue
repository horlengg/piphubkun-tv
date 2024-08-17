<script setup lang="ts">
import { VideoCardView } from "../types";

withDefaults(defineProps<{
    video : VideoCardView | null,
    stickyWidth? : boolean
}>(),{
    video : null,
    stickyWidth : true
})


</script>
<template>
    <router-link :to="video?.link!">
        <div class="video__card-wrapper animation-mode" :class="{'sticky-width':stickyWidth}">
            <div class="block-image" :style="{backgroundImage : `url(${video?.image})`}">
            </div>
            <div class="block-title">
                <span>{{ video?.title }}</span>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
.video__card-wrapper {
    display: inline-block;
    height: 250px;
    overflow: hidden;
    background-color: var(--bg-color);
    box-shadow: var(--card-shadow);
    border-radius: 8px;
    &.sticky-width {
        min-width: 280px;
    }
    &:not(.sticky-width) {
        width: 100%;
    }
    .block-image {
        height: 70%;
        background-position: center;
        background-size: cover;
    }
    .block-title {
        padding: 10px;
        span {
            font-weight: 500;
        }
    }
}
// @media screen and (max-width: 1280px) {
    
// }
@media screen and (max-width: 760px) {
    .video__card-wrapper {
        height: 200px;
        &.sticky-width {
            min-width: 240px;
        }
    }
}
@media screen and (max-width: 400px) {
    .video__card-wrapper {
        height: 180px;
        &.sticky-width {
            min-width: 220px;
        }
    }
}
    
</style>