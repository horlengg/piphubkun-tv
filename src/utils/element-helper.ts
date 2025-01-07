export function useElement(){
    const getOffsetLeftAndTop = (element:HTMLElement)=>{
        let offsetLeft = 0;
        let offsetTop = 0;
    
        while (element) {
            offsetLeft += element.offsetLeft;
            offsetTop += element.offsetTop;
            element = element.offsetParent as HTMLElement; // Move up to the parent element
        }
    
        return { offsetLeft, offsetTop };
    }
    return {
        getOffsetLeftAndTop
    }
}