import type { CustomRuntimeConfig } from '~/types'

export default <T>(request, options: Parameters<typeof useFetch<T>>[1] = {}) => {
    const config = useRuntimeConfig() as unknown as CustomRuntimeConfig

    return useFetch<T>(request, {
        baseURL: config.public.baseURL,
        ...options
    })
}