class Flash {
    constructor(public message: string, public type: 'info' | 'error' | 'success' | 'warn') {}
}

export default Flash