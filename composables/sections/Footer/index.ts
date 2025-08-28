import type { CustomRuntimeConfig } from '~/types'
import { useModal } from 'vue-final-modal'
import { FROM_TRIGGER } from '~/constants'
import FormModal from '~/components/modals/FormModal.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'

export const useFooter = () => {
    const currentYear = (new Date()).getFullYear()
    const config = useRuntimeConfig() as unknown as CustomRuntimeConfig
    const metro = config.public.legal.metro.map((metro, i) => {
        return i < config.public.legal.metro.length - 1 ? metro + ',' : metro
    })
    const device = useDevice()
    const notification = useNotification()
    const { reachGoal } = useYandexMetrika()

    const callMeModal = () => {
        const { open, close } = useModal({
            component: FormModal,
            attrs: {
                title: 'Оставьте номер, обсудим детали',
                buttonText: 'Жду звонка',
                fromTrigger: FROM_TRIGGER.CALLBACK,
                yandexMetrikaGoalID: 'footer__button-call-me__success',
                onConfirm: () => {
                    void close()

                    const thankYouModal = useModal({
                        component: ThankYouModal,
                        attrs: {
                            onClose: () => {
                                void thankYouModal.close()
                            }
                        }
                    })
                    void thankYouModal.open()
                }
            },
        })

        void open()
        reachGoal('footer__button-call-me__open-form')
    }

    const clickOnPhone = async (phone) => {
        if (device.isMobile()) {
            const a = document.createElement('a')
            a.href = 'tel:' + phone.phoneRaw
            a.click()
            a.remove()
            reachGoal('footer__copy-phone')
            return
        }

        await navigator.clipboard.writeText(phone.phoneRaw)
        notification.fire({
            title: 'Телефон скопирован!',
            class: 'izi-toast --white',
        })
        reachGoal('footer__copy-phone')
    }

    const clickEmail = () => {
        const el = document.createElement('a')
        el.href = `mailto:${config.public.email}`
        el.click()
        el.remove()

        reachGoal('footer__email')
    }

    return {
        currentYear,
        config,
        metro,
        callMeModal,
        clickOnPhone,
        clickEmail,
        reachGoal
    }
}