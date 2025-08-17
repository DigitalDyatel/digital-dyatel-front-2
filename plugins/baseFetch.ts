export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

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