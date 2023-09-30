import { table } from '../../utils/airtable'

export default async function handler(req, res) {
    const records = await table
        .select({
            fields: ['Address', 'Minted'],
        })
        .all()

    const allowlist = records.map((record) => {
        const address = record.get('Address')
        const minted = record.get('Minted') ?? false

        return {
            address,
            minted,
        }
    })

    res.status(200).json(allowlist)
}
