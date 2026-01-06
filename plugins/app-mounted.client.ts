const allowCookies = () => {
    const cookie = useCookie('allow-cookie')

    if (cookie.value) {
        return
    }

    const notification = useToast()

    notification.show({
        icon: undefined,
        position: 'bottomLeft',
        timeout: false,
        class: 'izi-toast --cookie',
        drag: false,
        progressBar: false,
        title: `Оставаясь на сайте, Вы даете согласие на обработку файлов cookie, пользовательских данных, собираемых, в том числе в целях обеспечения работы сайта, проведения статистических исследований и обзоров,в соответствии с <a target="_blank" href="/docs/personal-data-processing-policy.pdf">Политикой обработки персональных данных</a>. Если вы не хотите, чтобы ваши данные обрабатывались, измените настройки браузера или покиньте сайт.`,
        buttons: [
            ['<button>Принимаю</button>', function (instance, toast) {
                instance.hide({}, toast, 'button')
                cookie.value = 'true'
            }, true]
        ]
    })
}

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.hook('app:mounted', () => {
        allowCookies()
    })
})