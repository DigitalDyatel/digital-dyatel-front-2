export default () => {
    const scrollIsDeep = useState<boolean>('scrollIsDeep', () => false)

    return {
        scrollIsDeep
    }
}