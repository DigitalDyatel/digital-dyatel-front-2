import Api, { type FormDataErrors } from '~/utils/api'

export interface FormDataCreate {
    name: string | undefined,
    phone: string | undefined,
    email: string | undefined,
    from_trigger: string | undefined,
    is_agree_to_receive_ads: boolean,
    files?: FileList | undefined
}

export type FormDataCreateErrors = FormDataErrors<FormDataCreate>

export const getDefaultFormDataCreate = (fromTrigger: string): FormDataCreate => {
    return {
        name: undefined,
        phone: undefined,
        email: undefined,
        is_agree_to_receive_ads: true,
        from_trigger: fromTrigger
    }
}

class Contacts extends Api {
    public async create(data: FormDataCreate) {
        await this.post<FormDataCreate>('/contacts/create', data)
    }
}

export default () => new Contacts()