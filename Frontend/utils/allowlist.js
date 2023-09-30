export const useAllowlist = () => {
    /**
     * Check is user in the allowlist
     * @param {string} address Current connected wallet address.
     * @returns {boolean} Return `true` if user is in the allowlist, else `false`.
     */
    const checkAllowlist = async (address) => {
        const response = await fetch('/api/check-allowlist', {
            method: 'POST',
            body: JSON.stringify({ address }),
        })
        const { inAllowlist } = await response.json()

        return inAllowlist
    }

    /**
     * Add user to the allowlist
     * @param {string} address Current connected wallet address.
     * @returns {boolean} Return `true` if user is added to the allowlist, else `false`.
     */
    const joinAllowlist = async (address) => {
        const response = await fetch('/api/add-allowlist', {
            method: 'POST',
            body: JSON.stringify({ address }),
        })

        const { success } = await response.json()

        if (success) return true

        return false
    }

    /**
     * Update user minted status in the allowlist
     * @param {string} address Current connected wallet address.
     * @returns Return `true` if the allowlist is updated, else `false`.
     */
    const updateAllowlist = async (address) => {
        const response = await fetch('/api/update-allowlist', {
            method: 'POST',
            body: JSON.stringify({ address }),
        })

        const { success } = await response.json()

        if (success) return true

        return false
    }

    /**
     * Download and export allowlist as CSV
     */
    const downloadAllowlist = async () => {
        const response = await fetch('/api/get-allowlist')
        const records = await response.json()

        const csvHeaders = Object.keys(records[0]).join(',')
        const csvRows = records.map((record) => Object.values(record).join(','))
        const csvData = [csvHeaders, ...csvRows]

        const blob = new Blob([csvData.join('\n')], {
            type: 'text/csv',
        })

        const downloadURL = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.style.display = 'none'
        a.href = downloadURL
        a.download = 'allowlist.csv'
        a.click()
        window.URL.revokeObjectURL(downloadURL)
    }

    return {
        check: checkAllowlist,
        join: joinAllowlist,
        update: updateAllowlist,
        download: downloadAllowlist,
    }
}
