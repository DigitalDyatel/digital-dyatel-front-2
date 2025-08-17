import type { CustomRuntimeConfig } from '~/types'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig() as unknown as CustomRuntimeConfig

    const baseFetch = (request: string, opts = {}) => {
        return $fetch(request, {
            baseURL: config.public.apiBase,
            ...opts,
        })
    }

    return {
        provide: {
            baseFetch,
        },
    }
})