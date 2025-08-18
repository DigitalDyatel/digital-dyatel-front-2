import type { CustomRuntimeConfig } from '~/types'
import { FetchError } from 'ofetch'

export const useApi = () => {
    const config = useRuntimeConfig() as unknown as CustomRuntimeConfig

    const fetch = async <T = any, U = {}>(
        url: string,
        options: Omit<Parameters<typeof $fetch>[1], 'baseURL'> = {}
    ): Promise<T> => {
        try {
            return await $fetch<T>(url, {
                baseURL: config.public.apiBase,
                ...options
            })
        } catch (error: unknown) {
            if (error instanceof FetchError && error.status === 422) {
                throw error.data.errors
            }

            throw error
        }
    }

    return { fetch }
}