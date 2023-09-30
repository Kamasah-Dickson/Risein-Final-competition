import { table } from '../../utils/airtable'

export default async function handler(req, res) {
    const { address } = JSON.parse(req.body)

    const records = await table
        .select({
            fields: ['Address', 'Minted'],
            filterByFormula: `{Address} = '${address}'`,
        })
        .all()

    try {
        records[0].updateFields({
            Minted: true,
        })

        res.status(200).json({
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            error,
        })
    }
}
