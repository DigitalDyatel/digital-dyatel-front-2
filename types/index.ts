export interface Phone {
    phone: string,
    phoneRaw: string,
    description: string
}

export interface CustomRuntimeConfigPublic {
    baseURL: string,
    casesMenuCount: number
    phones: Phone[],
    telegram: string,
    whatsapp: string,
    email: string,
    legal: {
        details: string,
        address: string,
        metro: string[],
        openingHours: string
    },
    yandexMetrikaId: string
}

export interface CustomRuntimeConfig {
    public: CustomRuntimeConfigPublic
}