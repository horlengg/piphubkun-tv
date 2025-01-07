<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LighIcon from "@/app/assets/icons/light-icon.svg"
import DarkIcon from "@/app/assets/icons/dark-icon.svg"
import SearchIcon from "@/app/assets/icons/search.svg"
import { useGlobalStore } from '../stores/global.store';


const isExpended = ref(false);
const isClientUsingDarkMode = ref(false);
const globalStore  = useGlobalStore()


const toggleThemeMode = () => {
    isClientUsingDarkMode.value = !isClientUsingDarkMode.value;
    localStorage.setItem("theme", isClientUsingDarkMode.value ? "dark" : "light")
    setTheme()
}
const setTheme = () => {
    if (isClientUsingDarkMode.value) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
}

onMounted(() => {
    window.onresize = () => {
        if (innerWidth > 1000 && isExpended.value) isExpended.value = false
    }
    if (localStorage.getItem("theme") === "dark") isClientUsingDarkMode.value = true;
    setTheme()
})

</script>
<template>
    <div class="app-header animation-mode">
        <div class="app-header_body">
            <div class="app-logo-wr">
                <div class="app-logo"></div>
                <h1 class="app-title">PiphopKun TV</h1>
            </div>
            <nav class="nav-bar">
                <div class="search-box-wr">
                    <div class="search-box" @click="globalStore.showSearchDialog = true">
                        <span class="search-icon">
                            <img :src="SearchIcon" alt="icon">
                        </span>
                        <input type="search"  placeholder="Search...">
                    </div>
                </div>
                <div class="theme-switch-block">
                    <button class="theme-switcher-btn" :class="{'dark-mode':isClientUsingDarkMode}" @click="toggleThemeMode">
                        <img :src="LighIcon" alt="icon" v-if="isClientUsingDarkMode">
                        <img :src="DarkIcon" alt="icon" v-else>
                    </button>
                </div>
                <!-- <div class="auth-block">
                    <div class="user-profile"> </div>
                </div> -->
            </nav>
        </div>
    </div>
</template>
<style lang="scss">
.app-header {
    height: 80px;
    display: flex;
    align-items: center;
    .app-header_body {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .app-logo-wr {
            display: flex;
            align-items: center;
            gap: 20px;
            .app-logo {
                background-image: url('/images/feng-xian-cycle.png');
                background-position: center top;
                background-size: cover;
                width: 45px;
                height: 45px;
            }
            .app-title {
                color: #1bcc18 !important;
            }
        
        }
        nav.nav-bar {
            position: relative;
            display: flex;
            gap: 20px;
            align-items: center;
            .theme-switch-block {
                button.theme-switcher-btn {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    outline: none;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--search-box-bg);
                    img {
                        width: 25px;
                        filter: var(--icon-color);
                    }
                }
            }
            .auth-block {
                .user-profile {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background-image: url('/images/xiao-yan.png');
                    background-position: top center;
                    background-size: cover;
                }
            }
            .search-box-wr {
                .search-box {
                    width: 400px;
                    background-color: var(--search-box-bg);
                    height: 45px;
                    border-radius: 100px;
                    overflow: hidden;
                    position: relative;
                    transition: width .3s ease-in-out,var(--base-transition);
                    z-index: 11;
                    .search-icon {
                        position: absolute;
                        left: 15px;
                        top: 50%;
                        transform: translateY(-40%);
                        img {
                            transition: filter .3s linear;
                            width: 25px;
                            filter: var(--icon-color);
                        }
                    }
                    input {
                        height: 100%;
                        background-color: transparent;
                        border: none ;
                        outline: none;
                        padding: 0 20px 0 50px;
                        font-size: 16px;
                        &,
                        &::placeholder {
                            transition: color .3s linear;
                        }
                    }
                }
            }
        }
    }

}

@media only screen and (max-width:1280px) {
    .search-box-wr .search-box {
        width: 300px !important;
    }
}
@media only screen and (max-width:760px) {
    .search-box-wr .search-box {
        width: 45px !important;
        .search-icon {
            left: 10px !important;
        }
    }
    
}
@media only screen and (max-width:500px){
    nav.nav-bar {
        gap: 10px !important;
    }
    .app-logo-wr {
        gap: 10px !important;
        .app-title {
            font-size: 20px !important;
        }
    }
}


</style>