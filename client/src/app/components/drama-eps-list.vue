<script setup lang="ts">
import DramaEpsCard from "./drama-eps-card.vue"
import { DramaEpsCardEps } from "@/app/types";


const listDramaEps = ()=> {
    return Array.from({length : 10}).map(()=>{
        return {
            title : "Battle through the heavens S5",
            eps : "Episode 103 Subtitle",
            description : "Eps - 103 -battle through the heavens",
            thumbnail : "https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x",
            releasedDate : "July 13, 2024"
        } as DramaEpsCardEps
    })
}


</script>

<template>
    <div>
        <div class="drama-status">
            <div class="drama-logo" style="background-image: url('https://puui.wetvinfo.com/vcover_hz_pic/0/fc0jm32uyhpfqae1692700218430/0?imageMogr2/thumbnail/1400x');"></div>
            <div class="drama-title">
                <span>Battle Through the Heavens 5th Season</span>
                <span>Ongoing - 105 / 300 eps</span>
            </div>
        </div>
        <div class="list-eps tvkh-scrollbar">
            <DramaEpsCard :eps="eps" :class="{'active':index==0}" v-for="(eps,index) of listDramaEps()"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.drama-status {
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: var(--bg-color);
    box-shadow: var(--card-shadow);
    padding: 15px 20px;
    position: relative;
    // &::after {
    //     content: "";
    //     position: absolute;
    //     width: 100%;
    //     border-bottom: 1px solid var(--border-color);
    //     left: 0;
    //     bottom: 0px;
    // }
    .drama-logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-position: center;
        background-size: cover;
    }
    .drama-title {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
}
.list-eps {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 400px;
    overflow-y: auto;
    border: .1px solid var(--border-color);
}

@media screen and (max-width: 1280px) {
    
}
@media screen and (max-width: 760px) {
    
}
@media screen and (max-width: 400px) {
}

</style>