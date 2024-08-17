import { createApp } from 'vue'
import "@/app/styles/index.scss"
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "@/app/app.route"

const app = createApp(App)
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app')
