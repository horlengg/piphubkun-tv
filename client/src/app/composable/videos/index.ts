import { KeyboardCode } from "@/app/types";
import { ref } from "vue";

export const useVideoPlayer = ()=>{

    const isMuted = ref(false);
    const isPlaying = ref(false);
    const videoPlayerRef = ref<HTMLVideoElement | null>(null);
    const videoWrapperRef = ref<HTMLElement | null>(null);
    const scrollNextRef = ref<HTMLElement | null>(null)
    const scrollPrevRef = ref<HTMLElement | null>(null)
    const scrollRef = ref<HTMLElement | null>(null);
    const scrollActiveLength = ref('0');
    const totalTime = ref("00:00")
    const currentTime = ref("00:00");
    const timePopover = ref("00:00");
    const timePopoverLeft = ref("0");
    const isFullScreenRequested = ref(false);
    const playSatusRef = ref<HTMLElement | null>(null)
    const isShowVideoController = ref(false);
    let startShowControllerId:any = 0;
    let restartShowPlayPrevId:any = 0;
    let restartShowPlayNextId:any = 0;
    let restartShowPlayStatusId:any = 0;
    
    const formatTime = (seconds:number | undefined)=>{
        if(!seconds) return "00:00";
        const formatNumber = (number:number) => number.toString().padStart(2, "0");
        let hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = Math.floor(seconds % 60);
        if (hours) return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(remainingSeconds)}`;
        if (minutes) return `${formatNumber(minutes)}:${formatNumber(remainingSeconds)}`;
        return `00:${formatNumber(remainingSeconds)}`;
    }


    const getVideoCurrentTimeVideoFromEvent = (event:MouseEvent) => {
        if(!videoPlayerRef.value) return
        var width = scrollRef.value?.offsetWidth!;
        var clickX = event.clientX - scrollRef.value?.getBoundingClientRect().left!;
        var relativeX = clickX / width;
        return Math.round(videoPlayerRef.value.duration * relativeX);
    }
    
    const scrollNext = ()=> {
        if(videoPlayerRef.value) {
            videoPlayerRef.value.currentTime += 5;
            restartShowPlayNext()
        }
    }
    const restartShowPlayPrev = ()=>{
        scrollPrevRef.value?.classList.add("active");
        if(restartShowPlayPrevId) clearTimeout(restartShowPlayPrevId)
        restartShowPlayPrevId = setTimeout(()=>{
            scrollPrevRef.value?.classList.remove("active");
        },500)
    }
    const restartShowPlayNext = ()=>{
        scrollNextRef.value?.classList.add("active");
        if(restartShowPlayNextId) clearTimeout(restartShowPlayNextId)
        restartShowPlayNextId = setTimeout(()=>{
            scrollNextRef.value?.classList.remove("active");
        },500)
    }
    const restartShowPlayStatus = ()=>{
        playSatusRef.value?.classList.add("active");
        if(restartShowPlayStatusId) clearTimeout(restartShowPlayStatusId)
        restartShowPlayStatusId = setTimeout(()=>{
            playSatusRef.value?.classList.remove("active");
        },1000)
    }
    const scrollPrev = ()=> {
        if(videoPlayerRef.value) {
            videoPlayerRef.value.currentTime -= 5;
            restartShowPlayPrev()
        }
    }
    const setKeyboradVideoScroll = ()=>{
        window.addEventListener("keydown", (e) => {
            restartShowVideoController()
            switch(e.keyCode){
                case KeyboardCode.SPACE : 
                    togglePlayVideo()
                    break;
                case KeyboardCode.ARROW_LEFT : 
                    scrollPrev()
                    break;
                case KeyboardCode.ARROW_RIGHT :
                    scrollNext()
                    break;
                default:
                    break;
            }
            
        });
    }
    const togglePlayVideo = ()=>{
        if(videoPlayerRef.value) {
            if(videoPlayerRef.value.paused) {
                videoPlayerRef.value.play()
                isPlaying.value = true;
            }else {
                videoPlayerRef.value.pause()
                isPlaying.value = false;
            }
            restartShowPlayStatus()
        }
    }
    const restartShowVideoController = ()=>{
        isShowVideoController.value = true;
        if(startShowControllerId) clearTimeout(startShowControllerId)
        startShowControllerId = setTimeout(()=>{
            isShowVideoController.value = false;
        },3000)
    }

    const handleClickVideo = (_:MouseEvent) =>{
        isShowVideoController.value = !isShowVideoController.value
        console.log("Hello");
        
    }
    const toggleMuteVideo = ()=>{
        if(videoPlayerRef.value) {
            if(isMuted.value) {
                videoPlayerRef.value.muted = false;
                isMuted.value = false;
            }else {
                videoPlayerRef.value.muted = true;
                isMuted.value = true;
            }
        }
    }

    const videoTimeupdate = ()=>{
        if(videoPlayerRef.value){
            const crrTime = videoPlayerRef.value.currentTime;
            const duration = videoPlayerRef.value.duration;
            scrollActiveLength.value = Math.round((crrTime / duration) * 100) + "%";
            currentTime.value = formatTime(crrTime);
        }
    }
    const toggleScreen = async () => {
        if (videoWrapperRef.value) {
            if (!isFullScreenRequested.value) {
                try {
                    await videoWrapperRef.value.requestFullscreen();
                    await (screen.orientation as any).lock('landscape');
                    isFullScreenRequested.value = true;
                } catch (err) {
                    console.error("Failed to enter fullscreen or lock orientation:", err);
                }
            } else {
                // Exit fullscreen and unlock orientation
                try {
                    await document.exitFullscreen();
                    await (screen.orientation as any).unlock();
                    isFullScreenRequested.value = false;
                } catch (err) {
                    console.error("Failed to exit fullscreen or unlock orientation:", err);
                }
            }
        }
    };
    
    const mouseMove = (e:MouseEvent)=>{
        if(!scrollRef.value) return
        var clickX = e.clientX - scrollRef.value.getBoundingClientRect().left;
        timePopoverLeft.value = Math.round(clickX) + "px";
        timePopover.value = formatTime(getVideoCurrentTimeVideoFromEvent(e));
    }
    
    const load = ()=>{
        if(window.innerWidth > 760) setKeyboradVideoScroll()
        restartShowVideoController()
    }

    return {
        toggleScreen,
        formatTime,
        getVideoCurrentTimeVideoFromEvent,
        scrollPrev,
        scrollNext,
        setKeyboradVideoScroll,
        handleClickVideo,
        toggleMuteVideo,
        togglePlayVideo,
        videoTimeupdate,
        mouseMove,
        restartShowVideoController,
        load,
        isPlaying,
        isMuted,
        videoPlayerRef,
        videoWrapperRef,
        scrollNextRef,
        scrollPrevRef,
        scrollRef,
        currentTime,
        totalTime,
        timePopover,
        timePopoverLeft,
        playSatusRef,
        isFullScreenRequested,
        scrollActiveLength,
        isShowVideoController,
    }
}