import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400, stale-while-revalidate, public')

	return res.status(200).json({ test: true })
}
