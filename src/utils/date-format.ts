import { LIST_MONTH_NAMES } from "@/common/constant/month.constant";

export function getEpsiodeReleaseDateFormat(date:string){
    const d = new Date(date);
    const m = d.getMonth()
    return `${LIST_MONTH_NAMES[m]} ${d.getDate()}, ${d.getFullYear()}`
}