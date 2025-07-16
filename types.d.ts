declare module "*.svg?component" {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent;
    export default component;
}

declare module '@splidejs/vue-splide' {
    import { DefineComponent } from 'vue'
    import type { Splide as SplideInstance } from '@splidejs/splide'

    export interface SplideProps {
        options?: Record<string, any>
    }

    export interface SplideSlideProps {}

    export const Splide: DefineComponent<SplideProps, {}, any> & {
        new(): {
            splide: SplideInstance
        }
    }
    export const SplideSlide: DefineComponent<SplideSlideProps>
}