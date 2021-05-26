import axios from 'axios'
import { CepResponse } from 'correios-brasil'
import { NextApiRequest, NextApiResponse } from 'next'

interface AxiosCepResponse extends CepResponse {
	erro?: string
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<AxiosCepResponse | void> => {
	try {
		const { cep } = req.query

		const { data } = await axios.get<AxiosCepResponse>(`https://viacep.com.br/ws/${cep}/json`)

		if (data?.erro) {
			throw new Error('invalid cep')
		}

		return res.json(data)
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}
