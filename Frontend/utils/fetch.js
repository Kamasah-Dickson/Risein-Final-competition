const useFetcher = () => {
    /**
     * HTTP Method: Get
     * @param {string} route API route
     * @returns {any} Response from fetch
     */
    const get = async (route) => {
        const response = await fetch(route)
        const data = await response.json()

        return data
    }

    /**
     * HTTP Method: Post
     * @param {string} route API route
     * @param {Object} payload Payload to pass along the body of fetch
     * @returns {any} Response from fetch
     */
    const post = async (route, payload) => {
        const response = await fetch(route, {
            method: 'POST',
            body: JSON.stringify(payload),
        })
        const data = await response.json()

        return data
    }

    return {
        get,
        post,
    }
}

export default useFetcher
