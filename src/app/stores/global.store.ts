import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global.store",()=>{
    const showGlobalLoading = ref(false)
    const showSearchDialog = ref(false)
    
    return {
        showSearchDialog,
        showGlobalLoading
    }
})