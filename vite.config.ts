import { defineConfig } from 'vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'
import laravel from 'laravel-vite-plugin'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        Components({
            resolvers: [
                PrimeVueResolver({
                    components: {
                        prefix: 'Prime'
                    }
                })
            ]
        }),
        laravel({
            input: ['resources/js/app.ts'],
            refresh: true,
        }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './resources/views/components'),
            '@js': path.resolve(__dirname, './resources/js'),
            '@layouts': path.resolve(__dirname, './resources/views/layouts'),
            '@pages': path.resolve(__dirname, './resources/views/pages'),
        },
    },
    server: {
        watch: {
            ignored: [
                '**/app/**',
                '**/bootstrap/**',
                '**/config/**',
                '**/database/**',
                '**/public/**',
                '**/routes/**',
                '**/storage/**',
                '**/tests/**',
            ],
        },
    },
});
