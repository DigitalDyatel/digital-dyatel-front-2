import type { CustomRuntimeConfig } from '~/types'
import { FetchError } from 'ofetch'
import type { ReturnType } from 'birpc'

export default abstract class Api {
    config: CustomRuntimeConfig
    notification: ReturnType<typeof useNotification>

    constructor() {
        this.config = useRuntimeConfig() as unknown as CustomRuntimeConfig
        this.notification = useNotification()
    }

    protected async fetch<T = any, U = {}>(
        url: string,
        options: Omit<Parameters<typeof $fetch>[1], 'baseURL'> = {}
    ): Promise<T> {
        try {
            options.body = this.prepareRequestData(options.body)
            options.headers = {
                Accept: 'application/json',
                ...(options.headers || {}),
            }

            return await $fetch<T>(url, {
                baseURL: this.config.public.apiBase,
                ...options
            })
        } catch (err: unknown) {
            if (!(err instanceof FetchError)) {
                throw err
            }

            if (err.status === undefined) {
                this.notification.fire({title: 'Server error'})

                throw err
            }

            if (err.status === 422) {
                throw err.data.errors
            }

            throw err
        }
    }

    protected async post<T extends {[key: string]: any} = undefined>(url: string, data?: T): Promise<any> {
        return await this.fetch(this.config.public.apiBase + url, {
            method: 'POST',
            body: data
        })
    }

    protected async get(url: string, data?: any): Promise<any> {
        return await this.fetch(this.config.public.apiBase+ url, {
            body: data
        })
    }

    private prepareRequestData = (requestData) => {

        let isFormData = false

        for (const key in requestData) {
            if (!requestData.hasOwnProperty(key)) {
                continue
            }

            if (requestData[key] instanceof File) {
                isFormData = true
            }

            if (requestData[key] instanceof FileList) {
                isFormData = true
            }

            if (this.isArrayOfFilesTypeGuard(requestData[key])) {
                isFormData = true
            }
        }

        if (isFormData) {

            const formData = new FormData

            for (const key in requestData) {

                if (requestData[key] === undefined) {
                    continue
                }

                let value: any = requestData[key as keyof typeof requestData]

                if (typeof requestData[key] === 'boolean') {
                    value = value ? 1 : 0
                }

                if (value === null) {
                    value = '__null__'
                }

                if (value instanceof Array) {
                    value.forEach(item => {
                        formData.append(`${key}[]`, item)
                    })

                    continue
                }

                if (value instanceof FileList) {
                    Array.from(value).forEach((file, index) => {
                        formData.append(`${key}[]`, file);
                    });

                    continue
                }

                formData.append(key, value)
            }

            return formData
        }

        return requestData
    }

    private isArrayOfFilesTypeGuard = (value: unknown): value is File[] => {
        return (
            Array.isArray(value) &&
            value.some(item => item instanceof File)
        )
    }
}