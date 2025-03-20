import { createApp, h, type DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import AppLayout from '@/views/layouts/app.vue'
import PrimeVue from 'primevue/config'
import { passthrough, preset } from './theme'
import '../css/app.css'

createInertiaApp({
    title: (title: string) => `${title} :: ${import.meta.env.VITE_APP_NAME}`,
    resolve: async (name: string) => {
        const pages = import.meta.glob('../views/pages/**/*.vue', { eager: true })
        const page = pages[`../views/pages/${name}.vue`] as DefineComponent
        page.default.layout = Object.hasOwn(page.default, 'layout')
            ? page.default.layout
            : AppLayout
        return page
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(PrimeVue, {
                pt: passthrough,
                ptOptions: {
                    mergeSections: true,
                    mergeProps: true
                },
                ripple: true,
                theme: {
                    preset,
                    options: {
                        darkModeSelector: '.dark',
                        cssLayer: {
                            name: 'primevue',
                        }
                    }
                }
            })
            .mount(el)
    },
})
