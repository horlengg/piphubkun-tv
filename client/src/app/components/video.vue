<script setup lang="ts">
import { onMounted } from 'vue';
import { useVideoPlayer } from '../composable/videos';

withDefaults(defineProps<{
    url :string,
}>(),{
    url : ""
})

const {
    scrollRef,
    isMuted,
    isPlaying,
    scrollNextRef,
    scrollPrevRef,
    videoPlayerRef,
    videoWrapperRef,
    currentTime,
    isFullScreenRequested,
    playSatusRef,
    timePopover,
    timePopoverLeft,
    totalTime,
    scrollActiveLength,
    isShowVideoController,
    isClientUsingPc,
    scrollNext,
    scrollPrev,
    load,
    formatTime,
    getVideoCurrentTimeVideoFromEvent,
    handleClickVideo,
    videoTimeupdate,
    toggleMuteVideo,
    togglePlayVideo,
    toggleScreen,
    restartShowVideoController
} = useVideoPlayer();



const videoPlayerLoad = () => {
    totalTime.value = formatTime(videoPlayerRef.value?.duration);
}


const changeVideoTime = (event:MouseEvent)=>{
    if(videoPlayerRef.value){
        videoPlayerRef.value.currentTime = getVideoCurrentTimeVideoFromEvent(event)!;
    }
}


const clickVideoWrapper = (e:MouseEvent)=>{
    const el = e.target as HTMLElement
    if(el.tagName === 'VIDEO') return ;
    restartShowVideoController()
}



onMounted(()=>{
    load()
})

</script>
<template>
    <div class="v-wrapper" ref="videoWrapperRef" @click="clickVideoWrapper">
        <video 
            :class="{'fullscreen-view':isFullScreenRequested && isClientUsingPc()}"
            @loadedmetadata="videoPlayerLoad" 
            @timeupdate="videoTimeupdate" 
            ref="videoPlayerRef"
            @click="handleClickVideo"
            @mouseover="restartShowVideoController"
        >
            <source :src="url" type='video/mp4'>
        </video>
        <div class="v-scroll-icon v-scroll-prev" ref="scrollPrevRef">
            <span class="d-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                    <path fill="currentColor" d="M3 7.5L11 0v15z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                    <path fill="currentColor" d="M3 7.5L11 0v15z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                    <path fill="currentColor" d="M3 7.5L11 0v15z"/>
                </svg>
            </span>
        </div>
        <div class="v-scroll-icon v-play-status" ref="playSatusRef">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" v-if="isPlaying">
                <path fill="currentColor" d="M14 19V5h4v14zm-8 0V5h4v14z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 256 256" v-else>
                <path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/>
            </svg>
        </div>
        <div class="v-scroll-icon v-scroll-next" ref="scrollNextRef">
            <span class="d-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                    <path fill="currentColor" d="M3 7.5L11 0v15z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                    <path fill="currentColor" d="M3 7.5L11 0v15z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                    <path fill="currentColor" d="M3 7.5L11 0v15z"/>
                </svg>
            </span>
        </div>
        <div class="v-controller" v-show="isShowVideoController">
            <div class="v-scroll-wrapper">
                <div class="scroll-el" ref="scrollRef" @click="changeVideoTime"> 
                    <div class="scroll-active" :style="{width : scrollActiveLength}">
                    </div>
                </div>
                <span class="v-time-popover c-light" :style="{left : timePopoverLeft}">{{ timePopover }}s</span>
            </div>
            <div class="v-option-wrapper">
                <div class="v-option-left">
                    <div class="d-row gap-1">
                        <button class="btn-icon md cycle text-btn c-white" @click="scrollPrev">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke-width="3" stroke="currentColor" fill="none" style="width: 20px;">
                                <polyline points="9.57 15.41 12.17 24.05 20.81 21.44" stroke-linecap="round"/><path d="M26.93,41.41V23a.09.09,0,0,0-.16-.07s-2.58,3.69-4.17,4.78" stroke-linecap="round"/><rect x="32.19" y="22.52" width="11.41" height="18.89" rx="5.7"/><path d="M12.14,23.94a21.91,21.91,0,1,1-.91,13.25" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <button class="btn-icon md cycle text-btn c-white" @click="togglePlayVideo()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 256 256" v-if="!isPlaying">
                                <path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" v-else>
                                <path fill="currentColor" d="M14 19V5h4v14zm-8 0V5h4v14z"/>
                            </svg>
                        </button>
                        <button class="btn-icon md cycle text-btn c-white" @click="scrollNext">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke-width="3" stroke="currentColor" fill="none" style="width: 20px;">
                                <polyline points="9.57 15.41 12.17 24.05 20.81 21.44" stroke-linecap="round"/><path d="M26.93,41.41V23a.09.09,0,0,0-.16-.07s-2.58,3.69-4.17,4.78" stroke-linecap="round"/><rect x="32.19" y="22.52" width="11.41" height="18.89" rx="5.7"/><path d="M12.14,23.94a21.91,21.91,0,1,1-.91,13.25" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <button class="btn-icon md cycle text-btn c-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20.095 21a.75.75 0 0 1-.75-.75V3.75a.75.75 0 0 1 1.5 0v16.5a.74.74 0 0 1-.75.75m-3.4-9.589a2.25 2.25 0 0 1-.85 1.82l-9.11 7.09c-.326.247-.713.4-1.12.44h-.23a2.142 2.142 0 0 1-1-.22a2.201 2.201 0 0 1-.9-.81a2.17 2.17 0 0 1-.33-1.16V5.421a2.22 2.22 0 0 1 .31-1.12a2.25 2.25 0 0 1 .85-.8a2.18 2.18 0 0 1 2.24.1l9.12 6.08c.29.191.53.448.7.75a2.3 2.3 0 0 1 .32.98"/>
                            </svg>
                        </button>
                    </div>
                    <div class="c-light">
                        <span class="v-time-started">{{currentTime}}</span>
                        /
                        <span class="v-total-time">{{ totalTime }}</span>
                    </div>
                    <button class="btn-icon md cycle text-btn c-white" @click="toggleMuteVideo()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" v-if="isMuted">
                            <path fill="currentColor" fill-rule="evenodd" d="M17.47 9.47a.75.75 0 0 1 1.06 0L20 10.94l1.47-1.47a.75.75 0 0 1 1.06 1.06L21.061 12l1.47 1.47a.75.75 0 0 1-1.061 1.06L20 13.06l-1.47 1.47a.75.75 0 0 1-1.06-1.06L18.94 12l-1.47-1.47a.75.75 0 0 1 0-1.06m-4.433-6.074c1.163-.767 2.713.068 2.713 1.461v14.286c0 1.394-1.55 2.228-2.713 1.461l-6-3.955a.25.25 0 0 0-.137-.042H4a2.75 2.75 0 0 1-2.75-2.75v-3.714A2.75 2.75 0 0 1 4 7.393h2.9a.25.25 0 0 0 .138-.041z" clip-rule="evenodd"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" v-else>
                            <path fill="currentColor" fill-rule="evenodd" d="M18.97 6.97a.75.75 0 0 1 1.06 0l-.53.53l.53-.53h.001l.001.002l.003.002l.007.007l.02.02l.062.069c.05.057.12.138.201.241A6.87 6.87 0 0 1 21.75 11.5a6.87 6.87 0 0 1-1.425 4.189a5 5 0 0 1-.264.31l-.02.02l-.006.007l-.003.002v.001h-.001l-.51-.508l.51.51a.75.75 0 1 1-1.061-1.061l.53.53l-.53-.53h-.001v.001l-.002.001l.005-.005l.033-.036q.048-.052.139-.167a5.37 5.37 0 0 0 .448-5.843a5 5 0 0 0-.448-.685a3 3 0 0 0-.172-.203l-.005-.005a.75.75 0 0 1 .003-1.058m-5.933-3.574c1.163-.767 2.713.068 2.713 1.461v14.286c0 1.394-1.55 2.228-2.713 1.461l-6-3.955a.25.25 0 0 0-.137-.042H4a2.75 2.75 0 0 1-2.75-2.75v-3.714A2.75 2.75 0 0 1 4 7.393h2.9a.25.25 0 0 0 .138-.041z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
                <button class="btn-icon md cycle text-btn c-white" @click="toggleScreen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" v-if="!isFullScreenRequested">
                        <path fill="currentColor" d="M3 21v-5h2v3h3v2zm13 0v-2h3v-3h2v5zM3 8V3h5v2H5v3zm16 0V5h-3V3h5v5z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" v-else>
                        <path fill="currentColor" d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.v-wrapper {
    position: relative;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    video {
        width: 100%;
        &.fullscreen-view {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .v-scroll-icon {
        position: absolute;
        top: 50%;
        color: #414141;
        display: none;
        &.v-play-status {
            align-items: center;
            justify-content : center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(255,255,255,.2);
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            color: #FFF;
            &.active {
                display: flex;
            }
        }
        &.v-scroll-prev {
            left: 10%;
            &.active {
                display: inline-block;
                svg:nth-child(1) {
                    animation: __video_scroll_animated .4s linear .4s forwards;
                }
                svg:nth-child(2) {
                    animation: __video_scroll_animated .4s linear .2s forwards;
                }
                svg:nth-child(3) {
                    animation: __video_scroll_animated .4s linear forwards;
                }
            }
        }
        &.v-scroll-next {
            right : 10%;
            transform: rotate(180deg);
            &.active {
                display: inline-block;
                svg:nth-child(1) {
                    animation: __video_scroll_animated .4s linear .4s forwards;
                }
                svg:nth-child(2) {
                    animation: __video_scroll_animated .4s linear .2s forwards;
                }
                svg:nth-child(3) {
                    animation: __video_scroll_animated .4s linear forwards;
                }
            }
        }
    }
    .v-controller {
        position: absolute;
        width: 100%;
        bottom: 4px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 5px;
        padding: 0 10px;
        .v-option-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .v-time-started,
            .v-total-time,
            .v-time-popover {
                font-size:  var(--font-size-sm);
            }
            .v-option-left {
                display: flex;
                align-items: center;
                gap: 20px;
            }
        }
        .v-scroll-wrapper {
            position: relative;
            width: 100%;
            .v-time-popover {
                display: none;
                position: absolute;
                top: -20px;
            }
            .scroll-el {
                position: relative;
                background-color: #FFF;
                height: 5px;
                border-radius: 20px;
                cursor: pointer;
                // overflow: hidden;
                .scroll-active {
                    position: absolute;
                    background-color: red;
                    height: 5px;
                    border-radius: 8px;
                    left: 0;
                    transition: width .2s linear;
                    &::after {
                        content: "";
                        position: absolute;
                        display: inline-block;
                        top: 50%;
                        right: -6px;
                        transform: translateY(-50%);
                        height: 12px;
                        width: 12px;
                        border-radius: 50%;
                        background-color: red;
                        opacity: 0;
                        transition: opacity .2s ease-out;
                    }
                }
                &:hover .scroll-active::after {
                    opacity: 1;
                }
                &:hover + .v-time-popover {
                    display: inline-block;
                }
            }
        }
    }
}

@keyframes __video_scroll_animated {
    100% {
        color: #FFF;

    }
}

@media screen and (max-width : 760px ) {
    .scroll-el {
        height: 4px !important;
        .scroll-active {
            height: 4px !important;
            &::before {
                width: 5px;
                height: 5px;
            }
        }
    }
}

</style>