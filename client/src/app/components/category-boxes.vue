<script lang="ts" setup>
import { Category } from '../types';


withDefaults(defineProps<{
    category : Category | null,
    modelValue? : string
}>(),{
    category : null,
    modelValue : ""
})

const keyCode = defineModel({type : String,default : ""})

const change = (_keyCode:string)=>{
    keyCode.value = _keyCode
}

</script>
<template>
    <div class="category-box-wr d-row gap-2">
        <div class="checkbox-wrapper" v-for="item of category?.list" :key="item.keyCode">
            <input 
                type="radio" 
                class="checkbox"
                :id="item.keyCode"
                :name="category?.name" 
                :value="item.keyCode" 
                :checked="item.keyCode === modelValue"
                hidden
                @change="change(item.keyCode)"
            >
            <label :for="item.keyCode">{{ item.title }}</label>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.category-box-wr {
    margin-top: 20px;
    height: 30px;
    width: 100%;
    overflow-x: auto;
    &::-webkit-scrollbar {
        height: 0;
    }
}

.checkbox-wrapper {
    label {
        padding: 8px 15px;
        border-radius: 20px;
        cursor: pointer;
        transition: background-color .1s linear,color .1s linear;
        user-select: none;
        text-wrap: nowrap;
    }
    input.checkbox {
        &:checked + label {
            background-color: var(--search-box-bg);
        }
    }
}


</style>