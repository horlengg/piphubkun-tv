const PARAM_SPLIT_STR = '-eps-'
const getParamDetail = (fullCode:string)=>{
    const code = fullCode.split(PARAM_SPLIT_STR)[0]
    const epsNo = fullCode.split(PARAM_SPLIT_STR)[1]
    return {
        code,
        epsNo
    }
}
const getLinkParam = (code:string,eps?:number)=>{
    const secodeParam = eps ? PARAM_SPLIT_STR + eps : ''
    return `/${code}${secodeParam}`
}

export {
    getParamDetail,
    getLinkParam
}