<script setup lang="ts">
import { Drama } from "@/app/types";
import VideoGroup from "@/app/components/video-group.vue"
import { onMounted, ref } from "vue";


const dramas = ref<Drama[]>([])

const fetchDarama = async()=>{
    const response = await fetch("/drama.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    dramas.value = data.data ?? []
    
}

onMounted(fetchDarama)

</script>
<template>
    <div class="home-page">
        <!-- <Slide /> -->
        <div class="video-list-wrapper">
            <template v-for="drama of dramas">
                <video-group :title="drama.category" :videos="drama.dramas"/>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.video-list-wrapper {
    padding: 0 50px;
}
@media screen and (max-width: 1000px) {
    .video-list-wrapper {
        padding: 0 30px;
    }
}
@media screen and (max-width: 500px) {
    .video-list-wrapper {
        padding: 0 10px;
    }
}
</style>