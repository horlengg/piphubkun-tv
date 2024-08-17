<script setup lang="ts">
import VideoCard from '@/app/components/video-card.vue';
import { VideoCardView } from '@/app/types';
import { ref } from 'vue';

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


</script>

<template>
    <div class="page-layout page-fav">
        <div class="p-fav-title">
            <span class="title-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                    <path fill="currentColor" d="M24.132 7.97c-2.203-2.204-5.916-2.097-8.25.236l-.382.382l-.382-.382c-2.334-2.333-6.047-2.44-8.25-.235c-2.204 2.204-2.098 5.917.235 8.25l8.396 8.396l8.395-8.396c2.334-2.333 2.44-6.046.237-8.25z"/>
                </svg>
            </span>
            <h2>Favouries</h2>
        </div>
        <div class="d-video-card">
            <video-card :sticky-width="false" :video="video" v-for="video of listVideo"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.page-fav {
    .p-fav-title {
        margin: 30px 0;
        display: flex;
        align-items: center;
        gap: 10px;
        .title-icon {
            transform: translateY(2px);
            svg {
                font-size: 30px;
            }
        }
    }
}

@media screen and (max-width: 760px) {
    .title-icon {
        svg {
            font-size: 18px;
        }
    }
}

</style>