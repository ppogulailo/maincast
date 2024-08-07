import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { fileURLToPath, URL } from 'node:url'

dotenv.config()

export default defineConfig({
    plugins: [react()],
    server: {
        port: +(process.env.VITE_PORT ?? 3000),
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
        preserveSymlinks: true,
    },
})
