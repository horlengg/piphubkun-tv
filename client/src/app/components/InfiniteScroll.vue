<script setup lang="ts">

import {ref,onMounted} from "vue"

const infiniteScrollElementRef = ref<HTMLElement | null>(null)

withDefaults(defineProps<{
    scrollHeight? : string,
}>(),{
    scrollHeight : '100vh',
})

const emits = defineEmits<{
    (event:"loadend"):void
}>()


onMounted(() => {
    if(infiniteScrollElementRef.value){
        infiniteScrollElementRef.value.addEventListener('scroll',(e)=>{
            const element = e.target as HTMLElement;
            const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight;
            if (isAtBottom) {
                emits("loadend");
            }
        })
    }
})


</script>
<template>
    <div class="infinite-scroll tvkh-scrollbar" ref="infiniteScrollElementRef" :style="{height:scrollHeight}">
        <slot />
    </div>
</template>

<style>
.infinite-scroll {
    overflow-y: auto;
    overflow-x: hidden;
}
</style>