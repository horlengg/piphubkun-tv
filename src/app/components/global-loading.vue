<script setup lang="ts">

import { watchEffect } from 'vue';
import { useGlobalStore } from '../stores/global.store';

const globalStore = useGlobalStore()

watchEffect(()=>{
    if(globalStore.showGlobalLoading) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
})
</script>
<template>
    <Teleport to="body">
        <Transition name="loading">
            <div class="loading-overlay" v-if="globalStore.showGlobalLoading">
            </div>
        </Transition>
        <span class="loader" v-if="globalStore.showGlobalLoading"></span>
    </Teleport>
</template>

<style scoped>
.loading-overlay {
    position: fixed;
    inset: 0;
    background-color: var(--overlay-bg );
    z-index: 1010;
}
.loader {
    position: fixed;
    top: 50%;
    left: 50%;
    /* transform: translate(-50%,-50%); */
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    border-top: 5px solid #FFF;
    border-right: 5px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}


.loading-enter-active {
    animation: __fade-in .3s ease forwards;
}
.loading-leave-active {
    animation: __fade-out .3s ease forwards;
}
@keyframes __fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes __fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}




</style>