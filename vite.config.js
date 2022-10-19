import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 7860,
        // proxy: {
        //     '/api': {
        //         changeOrigin: true,
        //         target: 'http://localhost:7861',
        //         rewrite: (path) => path.replace(/^\/api/, '')
        //     }
        // }
    },
    plugins: [vue()]
})
