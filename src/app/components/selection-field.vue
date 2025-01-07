<script setup lang="ts">
import ArrowDown from "@/app/assets/icons/arrow-down.svg"
import { useElement } from "@/utils/element-helper";
import { computed, ref, StyleValue } from "vue";

const props = defineProps<{
    placeholder? : string,
    disabled? : boolean,
    options : Array<any>,
    optionLabel? : string,
    fieldValue ? : string,
}>()
const selectFieldRef = ref<HTMLElement>()
const isShowOption = ref(false)
const optionStyleBinding = ref<StyleValue>()
const model = defineModel()
const { getOffsetLeftAndTop } = useElement()
const getFieldOptionDisplay = (option:any)=>{
    return props.optionLabel ? option[props.optionLabel] : option
}
const setOptionStyle = ()=>{
    if(!selectFieldRef.value) throw new Error("selectFieldRef is none!.") 
    const rect = selectFieldRef.value.getBoundingClientRect()
    const { offsetLeft,offsetTop } = getOffsetLeftAndTop(selectFieldRef.value)
    optionStyleBinding.value = {
        position : "absolute",
        "min-width" : `${Math.floor(rect.width)}px`,
        "top" : `${Math.floor(offsetTop + rect.height + 4)}px`,
        "left" : `${Math.floor(offsetLeft)}px`,
        "z-index" : "999",
    }
}
const handleShowOptions = ()=>{
    if(props.disabled) return
    setOptionStyle()
    if(isShowOption.value) return handleClickDocument(null)
    isShowOption.value = true
    document.addEventListener("click",handleClickDocument)
}
const handleClickDocument = (e:MouseEvent | null)=>{
    console.log("handleClickDocument");
    if(e && selectFieldRef.value?.contains(e.target as HTMLElement)) return
    isShowOption.value = false
    document.removeEventListener("click", handleClickDocument)
}

const selectOption = (option:any)=>{
    model.value = props.fieldValue ? option[props.fieldValue] : option
}
const valueDisplay = computed(()=>{
    if(!model.value) return ""
    const option = props.options.find(e => (props.fieldValue ? e[props.fieldValue] : e ) == model.value)
    return option ? getFieldOptionDisplay(option) : ''
})

</script>
<template>
    <div class="selection-field_wr" ref="selectFieldRef">
        <div class="selection-field animation-mode" :class="{'is-disabled':disabled}" @click="handleShowOptions">
            <input 
                type="text" 
                class="selection-field_input animation-mode" 
                :placeholder="placeholder" 
                readonly
                :disabled="disabled"
                :value="valueDisplay"
            >
            <span class="dropdown-icon" :class="{'active':isShowOption}">
                <img :src="ArrowDown" alt="icon" class="animation-mode">
            </span>
        </div>
        <Teleport to="body">
            <transition name="optionSelection">
                <div class="option-wr " :style="optionStyleBinding" v-if="isShowOption">
                    <div class="option-list scroll-y">
                        <div 
                            class="option-item" 
                            v-for="option of options" 
                            @click="selectOption(option)"
                            :class="{'active':getFieldOptionDisplay(option) == valueDisplay}"
                        >
                            <span>{{ getFieldOptionDisplay(option) }}</span>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<style lang="scss">
.selection-field_wr {
    .selection-field {
        position: relative;
        height: 50px;
        width: 100%;
        border-radius: 8px;
        background-color: var(--search-box-bg);
        .selection-field_input {
            padding: 0 10px;
            height: 100%;
            width: 100%;
            outline: none;
            background-color: transparent;
            border: none;
            user-select: none;
        }
        .dropdown-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            transition: transform .3s ease-in-out;
            img {
                filter: var(--icon-color);
            }
            &.active {
                transform: translateY(-50%) rotate(180deg);
            }
        }
        &.is-disabled {
            opacity: .5;
            pointer-events: none;
        }
        &:not(.is-disabled){
            cursor: pointer;
            .selection-field_input {
                cursor: pointer;
            }
        }
    }
}

.option-wr {
    background-color: var(--search-box-bg);
    border-radius: 8px;
    padding: 20px 0;
    .option-list {
        display: flex;
        flex-direction: column;
        min-height: 150px;
        .option-item {
            height: 30px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            cursor: pointer;
            transition: background-color .3s ease-in-out;
            &.active {
                color: var(--primary-color);
            }
            &:hover {
                background-color: rgba(0,0,0,.1);
            }
        }
    }
}
.optionSelection-enter-active {
    animation: __optionEnter .3s ease forwards;
}
.optionSelection-leave-active {
    animation: __optionLeave .3s ease forwards;
}
@keyframes __optionEnter {
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes __optionLeave {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-10px);
    }
}

</style>