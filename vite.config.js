import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [svelte()],
        resolve: {
            alias: {
                src: '/src',
            },
        },
        define: {
            __APP_URL__: JSON.stringify(env.VITE_VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VITE_VERCEL_PROJECT_PRODUCTION_URL}` : env.VITE_LOCAL_URL)
        }
    }
})
