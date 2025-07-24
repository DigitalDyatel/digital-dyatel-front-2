interface NotificationProps {
    title: string
    blocking?: boolean
    position?: string,
    timeout?: number,
    class?: 'izi-toast' | 'izi-toast --white'
}

export default () => {
    const notification = useToast()
    const isBlocked = ref(false)

    const fire = (notificationProps: NotificationProps = {}) => {

        const notificationPropsDefault = {
            icon: false,
            position: 'bottomCenter',
            progressBarColor: 'var(--color-contrast)',
            timeout: 2000,
            class: 'izi-toast',
            pauseOnHover: false,
            drag: false,
            closeOnClick: true,
            blocking: true,
        }

        const notificationPropsMerged = Object.assign({}, notificationPropsDefault, notificationProps)

        if (notificationPropsMerged.blocking && isBlocked.value === true) {
            return
        }

        notification.show(notificationPropsMerged)

        isBlocked.value = true

        setTimeout(() => {
            isBlocked.value = false
        }, notificationPropsMerged.timeout)
    }

    return {
        fire
    }
}