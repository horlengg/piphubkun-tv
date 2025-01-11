<script setup lang="ts">
import {  onMounted, ref } from "vue";
import DramaPreviewCard from "@/app/components/drama-preview-card.vue"
import DramaFilter from "./components/drama-filter.vue";
import { useGlobalStore } from "@/app/stores/global.store";
import { useDramaStore } from "@/app/stores/drama.store";
import NotFoundIcon from "@/app/assets/images/not-found.png"

const globalStore = useGlobalStore()
const dramaStore = useDramaStore()
const filter = ref({})


onMounted(async()=>{
    if(!dramaStore.isDramaFetched) {
        globalStore.showGlobalLoading = true
        await dramaStore.fetchData()
        globalStore.showGlobalLoading = false
    }
})
const handleFilterDrama = ({categoryId,regionId}:{
    categoryId: string
    regionId: string 
})=>{
    filter.value = {
        categoryId,
        regionId
    }
}

</script>
<template>
    <div class="home-page page-container">
        <!-- <Slide /> -->
        <drama-filter @filter="handleFilterDrama"/>
        <div class="drama-list">
            <template v-for="drama of dramaStore.getDramaListFilter(filter)">
                <drama-preview-card :drama="drama"/>
            </template>
        </div>
        <p 
            class="no-drama-msg"
            v-if="!globalStore.showGlobalLoading && !dramaStore.getDramaListFilter(filter).length"
        >
            No drama found!.
            <img :src="NotFoundIcon" alt="icon" width="25px">
        </p>
    </div>
</template>

<style lang="scss" scoped>
.no-drama-msg {
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.drama-list {
    display: grid;
    grid-template-columns: repeat(6,1fr);
    gap: 20px;
    margin-bottom: 30px;
    // display: flex;
    // flex-wrap: wrap;
}
@media screen and (max-width: 1200px) {
    .drama-list {
        grid-template-columns: repeat(5,1fr);
        // padding: 0 30px;
    }
}
@media screen and (max-width: 876px) {
    .drama-list {
        grid-template-columns: repeat(3,1fr);
        // padding: 0 30px;
    }
}
@media screen and (max-width: 500px) {
    .drama-list {
        // padding: 0 10px;
        grid-template-columns: repeat(2,1fr);
    }
}
</style>