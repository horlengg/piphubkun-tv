<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { OptionItem } from '../types';

withDefaults(defineProps<{
    items : OptionItem[]
}>(),{
    items : []
})
const wrapperElement = ref<HTMLDivElement | null>(null);
const optionElement = ref<HTMLDivElement | null>(null);

onMounted(()=>{
    if(wrapperElement.value && optionElement.value) {
        const rect = wrapperElement.value.getBoundingClientRect();
        console.log(rect);
        optionElement.value.style.top = rect.top + wrapperElement.value.offsetHeight + 5  + 'px'
        optionElement.value.style.left = rect.left  - 100 - wrapperElement.value.offsetWidth + 'px'
    }
})

</script>

<template>
    <div ref="wrapperElement">
        <slot />
        <Teleport to="body">
            <div class="option-wrapper" ref=optionElement>
                <ul class="option-menu">
                    <li class="option-menu-item" v-for="(item,key) of items" :key="key" @click="item.excecute()">
                        {{ item.label }}
                    </li>
                </ul>
            </div>
        </Teleport>
    </div>
</template>

<style lang="scss" scoped>
.option-wrapper {
    min-width: 200px;
    position: fixed;
    z-index: 1000;
    background-color: #FFF;
    box-shadow: 0 4px 40px #DEDEDE;
    padding: 20px 0;
    border-radius: 5px;
    ul.option-menu {
        list-style-type: none;
        li.option-menu-item {
            min-height: 35px ;
            padding: 0 20px;
            display: flex;
            align-items: center;
            cursor: pointer;
            &:hover {
                background-color: var(--layout-color);
            }
        }
    }
    
}
</style>