import { calcularPrecoPrazo, PrecoPrazoRequest } from 'correios-brasil'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	try {
		const {
			sCepOrigem,
			sCepDestino,
			nVlPeso,
			nCdFormato,
			nVlComprimento,
			nVlAltura,
			nVlLargura,
			'nCdServico[]': nCdServico,
			nVlDiametro
		} = req.query

		const args = {
			sCepOrigem,
			sCepDestino,
			nVlPeso,
			nCdFormato,
			nVlComprimento,
			nVlAltura,
			nVlLargura,
			nCdServico,
			nVlDiametro
		} as PrecoPrazoRequest

		const response = await calcularPrecoPrazo(args)

		return res.status(200).json(response)
	} catch (err) {
		return res.status(400).json({ message: err.message })
	}
}
