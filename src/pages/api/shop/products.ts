import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '../../../services/supabase'
import { definitions } from '../../../utils/types/supabase'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400, stale-while-revalidate, public')

	let { data: _products, error } = await supabase
		.from<definitions['_products']>('_products')
		.select('id, slug, name, image, price, available')

	return res.status(200).json(_products)
}
