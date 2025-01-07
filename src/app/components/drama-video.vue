<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { videoDurationPretter } from '../helpers/usevideo.helper';
import SoundIcon from "@/app/assets/icons/sound.svg"
import MutedIcon from "@/app/assets/icons/muted.svg"
import SubtitleIcon from "@/app/assets/icons/subtitle.svg"
// import SettingIcon from "@/app/assets/icons/setting.svg"
import PlayIcon from "@/app/assets/icons/play.svg"
import PausedIcon from "@/app/assets/icons/paused.svg"
import ScrollNextIcon from "@/app/assets/icons/scroll-next.svg"
import ScrollPrevIcon from "@/app/assets/icons/scroll-prev.svg"
import FullscreenIcon from "@/app/assets/icons/fullscreen.svg"
import ExistFullscreenIcon from "@/app/assets/icons/exist-fullscreen.svg"
import screenfull from 'screenfull';

withDefaults(defineProps<{
    url :string,
}>(),{
    url : ""
})
const inputRangeRef = ref<HTMLInputElement>()
const videoRef = ref<HTMLVideoElement>()
const isVideoPlaying = ref(false)
const totalDuration = ref(0)
const currentTime = ref(0)
const subtitleOn = ref(true)
const vWrapperRef = ref<HTMLElement>()
const isVideoFullscreen = ref(false)
const isVideoLoaded = ref(false)
const showVControls = ref(false)
let timeoutId:ReturnType<typeof setTimeout>;
let scrollNextTimeoutId:ReturnType<typeof setTimeout>;
let scrollPrevTimeoutId:ReturnType<typeof setTimeout>;
let hideControllTimeoutId:ReturnType<typeof setTimeout>;
const isMuted = ref(true)

const setFillTimeScrolled = () => {
    if (!inputRangeRef.value || !videoRef.value) return;
    if (isVideoPlaying.value) {
        videoRef.value.pause();
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            // Check if the video is still in a "paused" state before playing
            if (videoRef.value?.paused) {
                videoRef.value.play().catch((error) => {
                    console.error("Error playing video:", error);
                });
            }
        }, 1000);
    }

    const value = inputRangeRef.value.valueAsNumber;
    const min = parseInt(inputRangeRef.value.min) || 0;
    const max = parseInt(inputRangeRef.value.max) || 100;

    const percentage = (value - min) / (max - min);
    videoRef.value.currentTime = Math.floor(totalDuration.value * percentage);
    currentTime.value = videoRef.value.currentTime
    setScrolledStyle(percentage * 100)

    showVControls.value = true
    closeControlVideoTracker()
};
const setScrolledStyle = (percentage:number)=>{
    if(!inputRangeRef.value) return
    inputRangeRef.value.style.background = `linear-gradient(to right, #4caf50 ${percentage}%, #ccc ${percentage}%)`;
}

const togglePlayVideo = ()=>{
    if(!videoRef.value) return
    if(videoRef.value.paused) videoRef.value.play()
    else videoRef.value.pause()
    isVideoPlaying.value = !videoRef.value.paused
}
const loadVideo = ()=>{
    if(!videoRef.value) return
    videoTimeUpdate()
    isVideoLoaded.value = true
}
const videoTimeUpdate = ()=>{
    if(!videoRef.value || !inputRangeRef.value) return
    totalDuration.value = Math.floor(videoRef.value.duration)
    currentTime.value = videoRef.value.currentTime
    inputRangeRef.value.value = currentTime.value.toString()

    setScrolledStyle((currentTime.value / totalDuration.value) * 100)
}
const toggleMutedVideo = ()=>{
    if(!videoRef.value) return
    videoRef.value.muted = !videoRef.value.muted
    isMuted.value = videoRef.value.muted
}
const scrollNextTime = ()=>{
    if(!videoRef.value) return
    videoRef.value.pause()
    videoRef.value.currentTime += 10
    currentTime.value = videoRef.value.currentTime
    if(scrollNextTimeoutId) clearTimeout(scrollNextTimeoutId)
    scrollNextTimeoutId = setTimeout(() => {
        videoRef.value?.play()
    }, 2000);
}
const scrollPrevTime = ()=>{
    if(!videoRef.value) return
    videoRef.value.pause()
    videoRef.value.currentTime -= 10
    currentTime.value = videoRef.value.currentTime
    if(scrollPrevTimeoutId) clearTimeout(scrollPrevTimeoutId)
    scrollPrevTimeoutId = setTimeout(() => {
        videoRef.value?.play()
    }, 2000);
}

const toggleFullscreen = () => {
    if (!vWrapperRef.value) return;
    // Check if fullscreen is supported
    if(screenfull.isEnabled) {
        screenfull.toggle(vWrapperRef.value)
    }
    else {
        alert("Fullscreen API is not supported in this browser.")
    }

};

const setKeyboardScrollV = ()=>{
    window.addEventListener("keyup",(e:KeyboardEvent)=>{
        e.preventDefault();
        if(e.key == "ArrowRight") scrollNextTime();
        if(e.key == "ArrowLeft") scrollPrevTime();
    })
}
const setEventTrackFullscreenChange = ()=>{
    if (screenfull.isEnabled) {
        screenfull.on('change', () => {
            isVideoFullscreen.value = screenfull.isFullscreen;
        });
    }
}
const closeControlVideoTracker = () => {
    if (hideControllTimeoutId) clearTimeout(hideControllTimeoutId)
    hideControllTimeoutId = setTimeout(() => {
        showVControls.value = false
    }, 3000)
}
onMounted(()=>{
    setFillTimeScrolled()
    setEventTrackFullscreenChange()
    setKeyboardScrollV()
    vWrapperRef.value?.addEventListener("click",(event:MouseEvent)=>{
        closeControlVideoTracker()
        const targetElement = event.target as HTMLElement
        if(showVControls.value && ["BUTTON","IMG","INPUT"].includes(targetElement.tagName)) return
        if(!showVControls.value){
            showVControls.value = true
        }else showVControls.value = false
    })
})

</script>
<template>
    <div class="v-wrapper" ref="vWrapperRef">
        <video 
            class="v-player"
            :class="{'on-fullscreen':isVideoFullscreen}" 
            ref="videoRef" 
            muted
            playsinline
            @loadedmetadata="loadVideo" 
            @timeupdate="videoTimeUpdate"
            @play="isVideoPlaying = true"
            @pause="isVideoPlaying = false"
        >
            <source src="https://res.cloudinary.com/decme1qrv/video/upload/v1735133742/TV.KH/videoplayback_a7okem.mp4">
            Your browser does not support the video tag.
            <track
                label="Khmer"
                kind="subtitles"
                srclang="kh"
                src="/subtitle.vtt"
                default
                v-if="subtitleOn"
            />
        </video>
        <div class="btn-play-wrapper" v-show="showVControls">
            <button class="btn-toggle-v" @click="scrollPrevTime">
                <img :src="ScrollPrevIcon" alt="icon">
            </button>
            <button class="btn-toggle-v" @click="togglePlayVideo">
                <img :src="isVideoPlaying ? PausedIcon : PlayIcon" alt="icon">
            </button>
            <button class="btn-toggle-v" @click="scrollNextTime">
                <img :src="ScrollNextIcon" alt="icon">
            </button>
        </div>
        <div class="v-controller" v-show="showVControls">
            <div class="v-scroller-wrapper">
                <span class="time-played">{{ videoDurationPretter(currentTime) }}</span>
                <span class="total-time">{{ videoDurationPretter(totalDuration) }}</span>
                <input 
                    type="range" 
                    class="v-scroller" 
                    @input="setFillTimeScrolled" 
                    ref="inputRangeRef"
                    :max="totalDuration"
                    :min="0"
                >
            </div>
            <div class="v-option">
                <button 
                    class="btn-option btn-sound" 
                    @click="toggleMutedVideo" 
                    :class="{'active':!isMuted}"
                >
                    <img :src="isMuted ? MutedIcon : SoundIcon" alt="icon">
                </button>
                <button class="btn-option btn-subtitle" :class="{'active':subtitleOn}" @click="subtitleOn = !subtitleOn">
                    <img :src="SubtitleIcon" alt="icon">
                </button>
                <button class="btn-option btn-fullscreen" @click="toggleFullscreen">
                    <img :src="isVideoFullscreen ? ExistFullscreenIcon : FullscreenIcon" alt="icon" >
                </button>
                <!-- <button class="btn-option btn-setting" disabled>
                    <img :src="SettingIcon" alt="icon">
                </button> -->
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.v-wrapper {
    position: relative;
    --thumb-height : 100px;
    background-color: rgb(14, 13, 13);
    .v-player {
        width: 100%;
        pointer-events: none;
        &::cue {
            color: #b8b8b8;
            font-size: 18px;
            font-weight: 600;
            font-family: "Roboto",Arial, Helvetica, sans-serif;
            background-color: rgba(0, 0, 0, 1);
        }
        &.on-fullscreen {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            & ~ .v-controller {
                bottom: 30px !important;
            }
        }
    }
    svg {
        color: rgba(6, 33, 77, 1);
    }
    .btn-play-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        transition: opacity 0.3s ease-in-out;
        display: flex;
        align-items: center;
        gap: 40px;
        animation: __fade-in .3s ease-in-out forwards;
        .btn-toggle-v {
            background-color: var(--v-btn-bg-color );
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 15px;
            img {
                filter: var(--v-icon-color-filter);
                opacity: .9;
            }
        }
    }
    .v-controller {
        position: absolute;
        width: 100%;
        bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 40px;
        transition: opacity 0.3s ease-in-out;
        padding: 0 40px;
        animation: __fade-in .3s ease-in-out forwards;
        .v-scroller-wrapper {
            width: 100%;
            position: relative;
            .time-played,
            .total-time {
                position: absolute;
                top: -15px;
                font-size: 14px;
                font-weight: 600;
                color: #d7d6d6;
            }
            .time-played {
                left: 0;
            }
            .total-time {
                right: 0;
            }
            .v-scroller {
                height: 4px;
                cursor: pointer;
                -webkit-appearance: none;
                &::-webkit-slider-thumb {
                    -webkit-appearance: none; /* Remove default styling */
                    appearance: none; /* Ensure compatibility */
                    width: 15px; /* Thumb width */
                    height: 15px; /* Thumb height */
                    background-color: #4caf50; /* Thumb color */
                    border-radius: 50%; /* Circular thumb */
                    cursor: pointer; /* Change cursor on hover */
                    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5); /* Add shadow */
                }
                &::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    background-color: blue;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
                }
            }
        }
        .v-option {
            display: flex;
            align-items: center;
            gap: 20px;
            .btn-option {
                width: 30px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    filter: var(--v-icon-color-filter);
                    opacity: .8;
                }
                &:disabled {
                    opacity: .5;
                    cursor: auto;
                }
                &:not(.active){
                    background-color: var(--v-btn-bg-color );
                }
                &.active {
                    background-color: #4caf50;
                }
            }
        }
    }
    // &.show-v-controls {
    //     .v-controller{
    //         display: block;
    //     }
    //     .btn-play-wrapper {
    //         display: flex;
    //     }
    // }
}

@media only screen and (max-width: 600px) {
    .v-wrapper {
        .v-controller {
            padding: 0 10px;
            .btn-option {
                width: 25px;
                height: 25px ;
                img {
                    width: 16px;
                }
            }
            .v-option {
                gap: 5px;
            }
        }
        .btn-play-wrapper {
            .btn-toggle-v {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                img {
                    width: 18px;
                }
            }
        }
        .v-player {
            &::cue {
                font-size: 10px;
            }
        }
    }
}


@keyframes __fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>