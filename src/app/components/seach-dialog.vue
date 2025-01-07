<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import Dialog from './dialog.vue';
import SearchIcon from "@/app/assets/icons/search.svg"
import { useGlobalStore } from '../stores/global.store';
import { useDramaStore } from '../stores/drama.store';
import { DramaType } from '../types/drama.type';
import { useRouter } from 'vue-router';

const globalStore  = useGlobalStore()
const searchBoxRef = ref<HTMLInputElement>()
const dramaStore = useDramaStore()
const dramaTitle = ref("")
const router = useRouter()

const navigateToViewDrama = (drama:DramaType)=>{
    globalStore.showSearchDialog = false
    router.push(`/drama/${drama.id}`)
}

watchEffect(()=>{
    if(globalStore.showSearchDialog) searchBoxRef.value?.focus()
})

onMounted(async()=>{
    if(!dramaStore.isDramaFetched) {
        globalStore.showGlobalLoading = true
        await dramaStore.fetchData()
        globalStore.showGlobalLoading = false
    }
})

</script>
<template>
    <Dialog v-model="globalStore.showSearchDialog" dialog-class="searchbox-dialog">
        <div class="search-box-content">
            <div class="search-input-wr">
                <div class="search-box">
                    <span class="search-icon">
                        <img :src="SearchIcon" alt="icon">
                    </span>
                    <input type="search" placeholder="Search..." ref="searchBoxRef" v-model="dramaTitle">
                </div>
            </div>
            <div class="search-result-wr">
                <ul class="drama-result-list scroll-y none-scroll-bar">
                    <li class="drama-result-item" 
                        v-for="(drama, index) of dramaStore.getDramaListFilter({title : dramaTitle.trim()})" 
                        :key="index"
                        @click="navigateToViewDrama(drama)"
                    >
                        <div class="drama-thimbnail" :style="{backgroundImage:`url('${drama.thumbnailUrl}')`}"> </div>
                        <div class="drama-info">
                            <h5>{{ drama.title }}</h5>
                            <p>Eps : <span>120 ~ Opening</span></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </Dialog>
</template>

<style scoped lang="scss">

.search-box-content {
    height: 80vh;
    width: 500px;
    padding: 20px;
    .search-input-wr {
        height: 12%;
        .search-box {
            width: 100%;
            height: 50px;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            transition: width .3s ease-in-out, var(--base-transition);
            z-index: 11;
            background-color: rgba(0, 0, 0, .1);
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
                border: none;
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
    .search-result-wr {
        height: 80%;
        .drama-result-list {
            height: 100%;
            .drama-result-item {
                display: flex;
                align-items: center;
                cursor: pointer;
                height: 65px;
                padding: 0 20px;
                gap: 20px;
                border-radius: 8px;
                transition: background-color .3s ease;
                user-select: none;
                .drama-thimbnail {
                    background-position: top center;
                    background-size: cover;
                    width: 50px;
                    height: 50px;
                    border-radius: 10px;
                }
    
                .drama-info {
                    h5 {
                        font-size: 14px;
                        font-weight: 500;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 250px;
                        text-wrap: nowrap;
                    }
    
                    p {
                        font-size: 12px;
                        margin-top: 5px;
    
                        span {
                            color: goldenrod;
                        }
                    }
                }
    
                &:hover {
                    background-color: rgba(0, 0, 0, .1);
                }
            }
        }
    }
}

@media only screen and (max-width:1280px) {
    .search-box-content {
        width: 400px;
    }
}
@media only screen and (max-width:760px) {
    
}
@media only screen and (max-width:500px){
    .search-box-content {
        width: 100vw;
        height: 100vh;
        padding: 50px 10px 20px 10px !important;
        .search-result-wr {
            height: 85%;
            margin-top: 15px;
        }
    }
}

</style>