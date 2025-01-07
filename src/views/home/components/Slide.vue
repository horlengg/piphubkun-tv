<script setup lang="ts">
import ArrowBackIcon from "@/app/assets/icons/arrow-back.svg"
import { computed, onMounted, ref } from "vue";
const files = import.meta.glob('@/app/assets/slides/**');

const slides = ref<Array<string>>([]);
const currentSlideIndex = ref(0);
const isNextToNextSlide = ref(true)
const isClicked = ref(false);
const slideLoadStatusRefs = ref<Array<HTMLElement>>([])

const nextSlide = ()=> {
    if(isClicked.value) return
    isClicked.value = true
    isNextToNextSlide.value = true
    if(slides.value.length > currentSlideIndex.value+1) currentSlideIndex.value++;
    else currentSlideIndex.value = 0;
    setTimeout(()=>{
        isClicked.value = false
    },500)
    slideAutoChangeEvent.restart();
}
const prevSlide = ()=>{
    if(isClicked.value) return
    isClicked.value = true
    isNextToNextSlide.value = false
    if(currentSlideIndex.value > 0) currentSlideIndex.value--;
    else currentSlideIndex.value = slides.value.length - 1
    setTimeout(()=>{
        isClicked.value = false
    },500)
    slideAutoChangeEvent.restart();
}


const currentSlide = computed(()=> `url(${slides.value[currentSlideIndex.value]})`)

const useSlideAutoChangeEvent = ()=>{
    let intervalID:ReturnType<typeof setTimeout> | null = null;
    const restart = ()=>{
        if(intervalID) {
            clearInterval(intervalID);
            start();
        }
    }
    const start = ()=>{
        intervalID = setInterval(nextSlide,5000)
    }
    return {restart,start}
}

const slideAutoChangeEvent = useSlideAutoChangeEvent()

const loadToSlide = (index:number) => {
    currentSlideIndex.value = index;
    slideAutoChangeEvent.restart();
}
    
// watch(currentSlideIndex,()=>{
//     // const loadEl = slideLoadStatusRefs.value.find((_,index) => index === currentSlideIndex.value)
//     // loadEl?.scrollIntoView({behavior : "smooth",block:"center"})
// })
    
onMounted(()=>{
    for (const path in files) {
        if (Object.prototype.hasOwnProperty.call(files, path)) {
            path &&  slides.value.push(path);
        }
    }
    slideAutoChangeEvent.start();
})

</script>

<template>
    <div class="drama-slide-preview">
        <button class="btn-icon md cycle text-btn btn-prev-slide" @click="prevSlide">
            <img :src="ArrowBackIcon" alt="icon">
        </button>
        <button class="btn-icon md cycle text-btn btn-next-slide" @click="nextSlide">
            <img :src="ArrowBackIcon" alt="icon">
        </button>
        <transition 
            leave-active-class="slide-leave" 
            enter-active-class="slide-enter"
        >
            <div class="slide-el" :class="{'to-prev-slide':!isNextToNextSlide}" :style="{ backgroundImage: currentSlide }" :key="currentSlideIndex"></div>
        </transition>
        <div class="slide-load-status d-row gap-1" >
            <div v-for="(_,index) of Array.from({length : slides.length})" :key="index" ref="slideLoadStatusRefs">
                <span  class="status-el" :class="{'active' : currentSlideIndex === index}" @click="loadToSlide(index)"></span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.drama-slide-preview {
    position: relative;
    height: 60vh;
    overflow: hidden;
    z-index: 0;
    .slide-el {
        background-size: cover;
        background-position: center;
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .slide-load-status {
        position: absolute;
        bottom : 10px;
        left: 50%;
        transform: translateX(-50%);
        &::-webkit-scrollbar {
            display: none;
        }
        .status-el {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #FFF;
            transition: background-color 0.3s ease-out;
            cursor: pointer;
            &.active {
                background-color: #45ba0b;
            }
        }
    }
    .btn-next-slide,
    .btn-prev-slide {
        position: absolute;
        top: 50%;
        z-index: 1;
        img {
            filter: brightness(0) saturate(100%) invert(57%) sepia(67%) saturate(542%) hue-rotate(59deg) brightness(104%) contrast(99%);
        }
    }
    .btn-prev-slide {
        transform: translateY(-50%);
        left : 40px;
    }
    .btn-next-slide {
        right : 40px;
        transform: translateY(-50%) rotate(180deg) ;
    }
    .slide-enter {
        &:not(.to-prev-slide) {
            animation: __slide_animate_enter_next .5s ease-out forwards;
        }
        &.to-prev-slide {
            animation: __slide_animate_enter_prev .5s ease-out forwards;
        }
    }
    .slide-leave {
        &:not(.to-prev-slide) {
            animation: __slide_animate_leave_next .5s ease-out forwards;
        }
        &.to-prev-slide {
            animation: __slide_animate_leave_prev .5s ease-out forwards;
        }
    }
}

@media screen and (max-width: 760px) {
    .drama-slide-preview {
        height: 30vh;
    }
    .btn-next-slide,
    .btn-prev-slide {
        display: none;
    }
}
@media screen and (max-width: 500px) {
    .drama-slide-preview {
        height: 20vh;
    }
}

@keyframes __slide_animate_enter_prev {
    from {
        left: -100%;
    }
    to {
        left: 0;
    }
}
@keyframes __slide_animate_leave_prev {
    from {
        left : 0;
    }
    to {
        left : 100%;
    }
}
@keyframes __slide_animate_enter_next {
    from {
        left: 100%;
    }
    to {
        left: 0;
    }
}
@keyframes __slide_animate_leave_next{
    from {
        left : 0;
    }
    to {
        left : -100%;
    }
}
</style>