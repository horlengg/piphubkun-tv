<script setup lang="ts">
import SelectionField from '@/app/components/selection-field.vue';
import { useDramaStore } from '@/app/stores/drama.store';
import { ref, watchEffect } from 'vue';

const emits = defineEmits<{
    (event:'filter',value:{regionId:string,categoryId:string}):void
}>()
const dramaStore = useDramaStore()

const dramaSelected = ref("")
const regionSelected = ref("")
const defaultOption = {title : "All",id : ""}

watchEffect(()=>{
    emits('filter',{
        regionId: regionSelected.value,
        categoryId: dramaSelected.value,
    })
})

</script>
<template>
    <div class="filter-list scroll-x none-scroll-bar">
        <SelectionField 
            placeholder="Select drama" 
            :options="[defaultOption,...dramaStore.categoryList]" 
            option-label="title"
            field-value="id" 
            v-model="dramaSelected"
            style="width: 200px;"
        />
        <SelectionField 
            placeholder="Select Region" 
            :options="[defaultOption,...dramaStore.regionList]" 
            option-label="title"
            field-value="id" 
            v-model="regionSelected"
            style="width: 200px;"
        />
    </div>
</template>

<style scoped lang="scss">
.filter-list {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
}
</style>