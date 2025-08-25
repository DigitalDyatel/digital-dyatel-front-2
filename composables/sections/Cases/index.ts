import type { Case } from '~/constants/cases'
import { useModal } from 'vue-final-modal'
import CaseModal from '~/components/modals/CaseModal.vue'

export const useActiveCategory = () => {
    const openCaseModal = (_case: Case) => {

        const { open, close } = useModal({
            component: CaseModal,
            attrs: {
                case: _case,
                close: () => {
                    void close()
                },
            },
        })

        void open()
    }

    return {
        openCaseModal
    }
}