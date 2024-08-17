<script setup lang="ts">
import VideoCard from '@/app/components/video-card.vue';
import CategoryBoxes from '@/app/components/category-boxes.vue';
import { Category, VideoCardView } from '@/app/types';
import {  ref } from 'vue';
import InfiniteScroll from '@/app/components/InfiniteScroll.vue';


const listVideo = ref<VideoCardView[]>([
    {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        },
        {
            "link" : "/drama/battle-through-the-heavens-5th-season",
            "title" : "Battle Through the Heavens 5th Season",
            "image" : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x"
        }
])
const keyCode = ref(["all","all_region"])

const category = ref<Category[]>([
    {
            "name" :"MovieType",
            "list" : [
                {
                    "title" : "All",
                    "keyCode" : "all"
                },
                {
                    "title" : "Anime",
                    "keyCode" : "anime"
                },
                {
                    "title" : "Hollywood",
                    "keyCode" : "hollywood"
                }
            ]
        },
        {
            "name" : "Regin",
            "list" : [
                {
                    "title" : "All Region",
                    "keyCode" : "all_region"
                },
                {
                    "title" : "Khmer",
                    "keyCode" : "kh"
                },
                {
                    "title" : "English",
                    "keyCode" : "en"
                },
                {
                    "title" : "Chinese",
                    "keyCode" : "cn"
                },
                {
                    "title" : "Korea",
                    "keyCode" : "kr"
                }
            ]
        }
])

// const fetchVideos = async () => {
//     const response = await axios.get("/video.json");
//     listVideo.value = response.data.data;
// }
// const fetchCategories = async () => {
//     const response = await fetch("/category.json");
//     if(response.ok) {
//         const data = await response.json()
//         category.value = data.data;
//     }
// }

const loadVideos = () => {
    console.log("Loaded end");
    
}


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