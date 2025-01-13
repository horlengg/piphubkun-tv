<script setup lang="ts">
import AppLayout from "@/app/layout/AppLayout.vue"
import SearchDialog from "@/app/components/search-dialog.vue"
import AppLoading from "@/app/components/global-loading.vue"
import { onMounted } from "vue";
import { useDramaStore } from "./app/stores/drama.store";
import { useGlobalStore } from "./app/stores/global.store";

const dramaStore = useDramaStore()
const globalStore = useGlobalStore()

onMounted(async()=>{
    if(!dramaStore.isDramaFetched) {
        globalStore.showGlobalLoading = true
        await dramaStore.fetchData()
        globalStore.showGlobalLoading = false
    }
})

</script>

<template>
    <AppLayout />
    <SearchDialog />
    <AppLoading />
</template>