<script setup lang="ts">
import { watchEffect } from 'vue';

defineProps<{
    dialogClass? : string
}>()
const showDialog = defineModel({type : Boolean})
const clickOverlay = ()=>{
    showDialog.value = false
}
watchEffect(()=>{
    if(showDialog.value) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
})

</script>
<template>
    <Teleport to="body">
        <Transition name="fade">
            <div class="dialog-overlay" v-if="showDialog" @click="clickOverlay"> </div>
        </Transition>
        <Transition name="dialog">
            <div class="dialog" :class="dialogClass" v-if="showDialog">
                <slot />
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped lang="scss">
.dialog-overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: var(--overlay-bg);
    pointer-events: auto;
    z-index: 999;
}
.dialog {
    position: fixed;
    left: 50%;
    top: 50%;
    width: fit-content;
    transform: translate(-50%, -50%);
    background-color: var(--search-box-bg);
    padding: 20px;
    border-radius: 8px;
    z-index: 1000;
}


.dialog-enter-active {
    animation: __dialogEnter .3s ease forwards;
}
.dialog-leave-active{
    animation: __dialogLeave .3s ease forwards;
}

@keyframes __dialogEnter {
    0% {
        opacity: 0;
        transform: translate(-50%, calc(-50% - 20px));
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}

@keyframes __dialogLeave {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, calc(-50% - 20px));
    }
}

</style>