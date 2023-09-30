import { table } from '../../utils/airtable'

export default async function handler(req, res) {
    const { address } = JSON.parse(req.body)

    const records = await table
        .select({
            fields: ['Address', 'Minted'],
            filterByFormula: `{Address} = '${address}'`,
        })
        .all()

    const inAllowlist = records.length > 0

    res.status(200).json({ inAllowlist })
}
