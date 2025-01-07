<script setup lang="ts">
import AppHeader from "@/app/layout/AppHeader.vue";
</script>

<template>
    <div class="app-layout">
        <AppHeader />
        <div class="app-content">
            <router-view v-slot="{ Component }">
                <transition leave-active-class="page-leave" enter-active-class="page-enter">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-enter {
    animation: __page-load .2s linear forwards;
}

.page-leave {
    animation: __page-unload .2s linear forwards;
}

@keyframes __page-load {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes __page-unload {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
