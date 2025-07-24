export default () => {
    const isMobile = () => {
        return window.innerWidth < 769
    }

    const isDesktop = () => {
        return window.innerWidth >= 769
    }

    return {
        isDesktop,
        isMobile
    }
}