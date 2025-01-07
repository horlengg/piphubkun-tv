import { ref } from "vue"

export const useTest = ()=>{
    const refValue = ref()
    return {
            refValue
    }
}