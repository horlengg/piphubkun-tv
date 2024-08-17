<script setup lang="ts">
import VideoCard from '@/app/components/video-card.vue';
import CategoryBoxes from '@/app/components/category-boxes.vue';
import { Category, VideoCardView } from '@/app/types';
import { onMounted, ref } from 'vue';
import InfiniteScroll from '@/app/components/InfiniteScroll.vue';


const listVideo = ref<VideoCardView[]>([])
const keyCode = ref(["all","all_region"])

const category = ref<Category[]>([])

const fetchVideos = async () => {
    const response = await fetch("/video.json");
    if(response.ok) {
        const data = await response.json()
        listVideo.value = data.data;
    }
}
const fetchCategories = async () => {
    const response = await fetch("/category.json");
    if(response.ok) {
        const data = await response.json()
        category.value = data.data;
    }
}

const loadVideos = () => {
    console.log("Loaded end");
    
}

onMounted(()=>{
    fetchCategories()
    fetchVideos()
})

</script>

<template>
    <InfiniteScroll @loadend="loadVideos">
        <div class="page-layout explore-page">
            <div class="category-list-wrapper">
                <CategoryBoxes :category="item" v-for="(item,index) of category" v-model="keyCode[index]" />
            </div>
            <div class="d-video-card">
                <video-card :sticky-width="false" :video="video" v-for="video of listVideo"/>
            </div>
        </div>
    </InfiniteScroll>
</template>

<style lang="scss" scoped>

.explore-page {
    .category-list-wrapper {
        margin: 40px 0;
    }
}

@media screen and (max-width: 1280px) {
}
@media screen and (max-width: 760px) {
    .explore-page {
        .category-list-wrapper {
            margin: 20px 0 40px 0;
        }
    }
}
@media screen and (max-width: 400px) {
}
</style>