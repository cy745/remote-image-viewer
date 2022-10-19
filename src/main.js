import {createApp, ref} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

export const baseUrl = ref("http://localhost:7861")

createApp(App)
    .use(ElementPlus)
    .mount('#app')
