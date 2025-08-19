import Api from '~/utils/api'

export interface FormDataCreate {
    name: string | undefined,
    phone: string | undefined,
    email: string | undefined,
    from_trigger: string | undefined,
    is_agree_to_receive_ads: boolean,
    files?: FileList | undefined
}

export default class Contacts extends Api {
    public async create(data: FormDataCreate) {
        await this.post<FormDataCreate>('/contacts/create', data)
    }
}