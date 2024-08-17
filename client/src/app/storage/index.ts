export class  Storages {


    private LOCAL_STOORAGE = localStorage;

    public setThemeMode(dark:boolean){
        this.s('theme-mode',dark ? 'dark' : 'light')
    }
    public getThemeMode(){
        return this.g('theme-mode') || 'light';
    }

    private s(key:string,value: any){
        this.LOCAL_STOORAGE.setItem(key,typeof value === 'string' ? value : JSON.stringify(value));
    }
    private g(key:string){
        return this.LOCAL_STOORAGE.getItem(key);
    }
}