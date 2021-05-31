import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '../../../../services/supabase'
import { definitions } from '../../../../utils/types/supabase'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	res.setHeader('Cache-Control', 'max-age=0, s-maxage=60, stale-while-revalidate, public')

	const { id } = req?.query

	if (typeof id === 'string') {
		const { data: _products, error } = await supabase
			.from<definitions['_products']>('_products')
			.select('id, slug, name, images, price, available')
			.eq('id', id)

		if (error) return res.status(400).json({ error: error.message })

		return res.status(200).json(_products[0])
	}

	return res.status(400).json({ error: 'invalid params' })
}
