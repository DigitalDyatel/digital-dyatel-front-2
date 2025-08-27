import type { CustomRuntimeConfig } from '~/types'

declare global {
    interface Window {
        ym: (...args: any[]) => void;
    }
}

export default defineNuxtPlugin(nuxtApp => {
    /*const config = useRuntimeConfig() as unknown as CustomRuntimeConfig
    const yandexMetrikaId = config.public.yandexMetrikaId

    if (!yandexMetrikaId) {
        throw new Error('Missed yandex metrika ID')
    }

    const script = document.createElement('script')

    script.innerHTML = `
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${yandexMetrikaId}', 'ym');

    ym(${yandexMetrikaId}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
    `
    document.head.appendChild(script)*/

    // SPA: Отправка хита при каждой смене маршрута
/*    nuxtApp.hook('page:finish', () => {
        if (typeof window !== 'undefined' && window.ym) {
            window.ym(yandexMetrikaId, 'hit', window.location.href)
        }
    })*/

    // <noscript> для пользователей без JS
/*    const noscript = document.createElement('noscript')
    noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${yandexMetrikaId}" style="position:absolute; left:-9999px;" alt="" /></div>`
    document.body.appendChild(noscript)*/
})