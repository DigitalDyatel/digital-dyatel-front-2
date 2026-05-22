export default () => {
    const goToAnchor = (selector: string, block: ScrollLogicalPosition = 'start') => {
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block })
        history.replaceState(null, '', selector)
    }

    return {
        goToAnchor
    }
}