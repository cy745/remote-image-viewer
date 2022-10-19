import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 7863,
        proxy: {
            '/api': {
                changeOrigin: true,
                target: 'http://localhost:7861/api',
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/static': {
                changeOrigin: true,
                target: 'http://localhost:7861/static',
                rewrite: (path) => path.replace(/^\/static/, '')
            }
        }
    },
    plugins: [vue()]
})
