export interface Phone {
    phone: string,
    description: string
}

export interface CustomRuntimeConfig {
    public: {
        phones: Phone[],
        telegram: string,
        whatsapp: string,
        email: string,
        legal: {
            details: string,
            address: string,
            metro: string[],
            openingHours: string
        }
    }
}