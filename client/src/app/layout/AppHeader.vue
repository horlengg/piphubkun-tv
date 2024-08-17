<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MenuIcon from "@/app/assets/icons/menu.svg"
import Profile from "@/app/assets/images/haya-defeat.jpg"
import LighIcon from "@/app/assets/icons/light-icon.svg"
import DarkIcon from "@/app/assets/icons/dark-icon.svg"
import { useRoute } from 'vue-router';

const isExpended = ref(false);
const isClientUsingDarkMode = ref(false);
const isClickSearch = ref(false);
const searchBoxRef = ref<HTMLInputElement | null>(null)
const route = useRoute();

const navbarItems = ref<Array<{label:string,to:string}>>([
    {label : "Home",to:"/"},
    {label : "Explore",to:"/explore"},
    {label : "Favourite",to:"/favourite"},
])

const toggleNavbar = ()=>{
    isExpended.value = !isExpended.value;
}
const collapsedNavbar = ()=>{
    if(!isExpended.value) return
    toggleNavbar();
}

const toggleThemeMode = ()=>{
    isClientUsingDarkMode.value = !isClientUsingDarkMode.value;
    localStorage.setItem("theme", isClientUsingDarkMode.value? "dark" : "light")
    setTheme()
}
const setTheme = ()=>{
    if(isClientUsingDarkMode.value) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
}
const openSearchbox = ()=>{
    if(innerWidth > 760) return
    isClickSearch.value = true
    setTimeout(()=>{
        if(searchBoxRef.value) 
            searchBoxRef.value.focus()
    },50)
}
const leaveSearchBox = ()=>{
    isClickSearch.value = false
}

onMounted(()=>{
    window.onresize = ()=>{
        if(innerWidth > 1000 && isExpended.value) isExpended.value = false
    }
    if(localStorage.getItem("theme") === "dark") isClientUsingDarkMode.value = true;
    setTheme()
})

</script>
<template>
    <div class="app-header animation-mode">
        <div class="h-left">
            <div class="searchbox-wrapper animation-mode" :class="{'active':isClickSearch}" @click="openSearchbox">
                <span class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M338.29 338.29L448 448"/>
                    </svg>
                </span>
                <input type="search" placeholder="I'm looking for..." class="search-box " ref="searchBoxRef" @blur="leaveSearchBox">
                <div class="search-suggestion tvkh-scrollbar">
                    <ul class="suggestion-menu">
                        <li class="suggestion-menu-item">Battle Throught The Heavens</li>
                        <li class="suggestion-menu-item">Battle Throught The Heavens</li>
                        <li class="suggestion-menu-item">Battle Throught The Heavens</li>
                        <li class="suggestion-menu-item">Battle Throught The Heavens</li>
                        <li class="suggestion-menu-item">Battle Throught The Heavens</li>
                        <li class="suggestion-menu-item">Battle Throught The Heavens</li>
                    </ul>
                </div>
            </div>
            <div class="d-row gap-2">
                <button id="btn-toggle-navbar" class="btn-icon md cycle text-btn" @click="toggleNavbar">
                    <img :src="MenuIcon" alt="menu icon">
                </button>
                <h1 class="app-title">TVKH</h1>
            </div>
        </div>
        <div class="h-right">
            <div class="navbar-overlay" v-if="isExpended" @click="collapsedNavbar"></div>
            <div class="first-navbar" :class="{'show':isExpended}" >
                <div class="menu-bar-wrapper">
                    <div class="expand-logo-wrapper">
                        <button class="btn-icon md cycle text-btn" @click="toggleNavbar">
                            <img :src="MenuIcon" alt="menu icon">
                        </button>
                        <h1 class="title">TVKH</h1>
                    </div>
                    <ul class="menu-bar">
                        <li class="nav-item" :class="{'active':item.to === route.path}" v-for="item of navbarItems" @click="collapsedNavbar">
                            <router-link :to="item.to">{{ item.label }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="second-navbar">
                <div class="d-row gap-4"> 
                    <div>
                        <button class="btn-icon md cycle text-btn" @click="toggleThemeMode">
                            <img :src="isClientUsingDarkMode ? DarkIcon : LighIcon" alt="menu icon">
                        </button>
                    </div>
                    <div>
                        <div class="client-image" :style="{backgroundImage:`url('${Profile}')`}"> </div>
                    </div>
                    <div class="btn-logout-wrapper">
                        <button class="btn-icon md cycle text-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

.searchbox-wrapper {
    position: relative;
    border-radius: 100px;
    width: 50%;
    transition: width .3s ease-out;
    background-color: var(--search-box-bg);
    // box-shadow: var(--card-shadow);
    .search-icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        svg {
            font-size: 20px;
        }
    }
    .search-suggestion {
        position: absolute;
        top: 22px;
        background-color: var(--search-box-bg);
        height: 0;
        overflow-y: hidden;
        transition: height .3s ease-out,opacity .3s ease-out;
        z-index: -1;
        border-radius: 0 0 10px 10px;
        opacity: 0;
        width: 100%;
        ul.suggestion-menu {
            padding: 30px 0 20px 0;
            list-style-type: none;
            left: 0;
            li.suggestion-menu-item {
                min-height: 35px;
                display: flex;
                align-items: center;
                padding: 0 20px;
                cursor: pointer;
                transition: background-color .3s ease-out;
                &:hover {
                    background-color: var(--layout-color);
                }
            }
        }
    }
    input.search-box {
        position: relative;
        border: none;
        background-color: transparent;
        height: 38px;
        padding: 0 20px;
        &::placeholder {
            transition: color .3s linear;
        }
        &:focus + .search-suggestion {
            height: 40vh;
            overflow-y: auto;
            opacity: 1;
        }
    }
}
@media only screen and (max-width:760px){
    .searchbox-wrapper {
        &:not(.active){
            background-color: transparent;
            width: 20%;
            input.search-box {
                visibility: hidden;
            }
        }
        &.active {
            width: 100%;
            
            & + div {
                display: none;
            }
        }
    }
    .app-title {
        font-size: 18px;
    }
}
</style>