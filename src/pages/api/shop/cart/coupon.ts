import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '../../../../services/supabase'
import { definitions } from '../../../../utils/types/supabase'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	res.setHeader('Cache-Control', 'max-age=0, s-maxage=60, stale-while-revalidate, public')

	const { cpn } = req?.query

	if (typeof cpn !== 'string') return res.json({ error: 'param', message: 'invalid param' })

	const { data: _coupons, error } = await supabase
		.from<definitions['_coupons']>('_coupons')
		.select('*')
		.eq('coupon', cpn.toLowerCase())

	if (error) return res.status(400).json({ error: error.message })

	if (_coupons[0] === undefined) return res.json({ error: 'coupon', message: 'invalid coupon' })

	// VERIFICAR DATA
	if (false) return res.json({ error: 'expired', message: 'expired coupon' })

	if (_coupons[0].qty <= 0) return res.json({ error: 'finished', message: 'all coupons have already been used' })

	return res.json(_coupons[0])
}
