import { defineStore } from "pinia";
import { ref } from "vue";
import { DramaType } from "../types/drama.type";
import { CategoryType, RegionType } from "../types";
import { DramaService } from "../services/api/drama.service";
import { RegionService } from "../services/api/region.service";
import { CategoryService } from "../services/api/category.service";

export const useDramaStore = defineStore("useDramaStore.store",()=>{
    const dramaList = ref<Array<DramaType>>([])
    const categoryList = ref<CategoryType[]>([])
    const regionList = ref<RegionType[]>([])
    const isDramaFetched = ref(false)
    const getDramaListFilter = (filters: { categoryId?: string; regionId?: string,title? : string }) => {
        // Return the full list if no filters are provided
        if (!filters.categoryId && !filters.regionId && !filters.title) return dramaList.value;
      
        // Filter the drama list based on provided filters
        return dramaList.value.filter((drama) => {
          const matchesCategory = filters.categoryId ? drama.categoryId === filters.categoryId : true;
          const matchesRegion = filters.regionId ? drama.regionId === filters.regionId : true;
          const matchesTitle = filters.title ? drama.title.toLowerCase().includes(filters.title.toLowerCase()) : true;
          return matchesCategory && matchesRegion && matchesTitle;
        });
      };

    const fetchAllDrama = async(param?:string)=>{
        const response = await DramaService.retrieveDrama(param)
        if(response){
          dramaList.value = response.data;
        }
        isDramaFetched.value = true
    }
    const fetchAllCategories = async()=>{
        const response = await CategoryService.retrieveCategory('categoryId=kxjajxaxaixaxmajxah')
        if(response){
          categoryList.value = response.data;
        }
    }
    const fetchAllRegion = async()=>{
        const response = await RegionService.retrieveRegions('categoryId=kxjajxaxaixaxmajxah')
        if(response){
            regionList.value = response.data;
        }
    }
    const fetchData = async()=>{
      await fetchAllDrama();
      await fetchAllCategories();
      await fetchAllRegion();
    }
    
    return {
        dramaList,
        categoryList,
        regionList,
        fetchData,
        isDramaFetched,
        getDramaListFilter
    }
})