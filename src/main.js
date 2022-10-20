import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'viewerjs/dist/viewer.css'
import './style.css'

import VueViewer from "v-viewer";
import App from './App.vue'

createApp(App)
    .use(ElementPlus)
    .use(VueViewer)
    .mount('#app')
