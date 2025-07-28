export default () => {
    type FormKey = string;
    type FormDefinition = FormKey | { [key: FormKey]: any };
    type ExtractKeys<T> = T extends string ? T : keyof T;
    type ExtractValue<T, K> = T extends string ? undefined : T extends Record<K, infer V> ? V : never;

    const initForm = <T extends readonly FormDefinition[]>(formDataProperties: T = [] as unknown as T): {
        [K in ExtractKeys<T[number]>]: ExtractValue<T[number], K>
    } => {
        return formDataProperties.reduce((obj, key) => {
            if (typeof key === 'object' && key !== null) {
                const [entry] = Object.entries(key)

                obj[entry[0]] = entry[1]
                return obj
            }

            obj[key] = undefined
            return obj
        }, {} as any)
    }

    return {
        initForm
    }
}