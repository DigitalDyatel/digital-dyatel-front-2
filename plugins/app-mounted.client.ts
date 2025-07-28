const allowCookies = () => {
    const cookie = useCookie('allow-cookie')

    if (cookie.value) {
        return
    }

    const notification = useToast()

    notification.show({
        icon: false,
        position: 'bottomLeft',
        timeout: false,
        class: 'izi-toast --cookie',
        drag: false,
        progressBar: false,
        title: 'Мы используем <a target="_blank" href="/docs/cookies.pdf">cookies</a> ',
        buttons: [
            ['<button>Хорошо</button>', function (instance, toast) {
                instance.hide({}, toast, 'button')
                cookie.value = true
            }, true]
        ]
    })
}

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.hook('app:mounted', () => {
        allowCookies()
    })
})