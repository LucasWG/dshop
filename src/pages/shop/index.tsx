import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import Footer from '../../components/footer'
import Header from '../../components/header'
import ScrollTop from '../../components/scrollTop'
import { useCart } from '../../contexts/cart'
import { formatCurrency } from '../../utils/formatCurrency'

type MockProduct = {
	uid: string
	name: string
	desc: string
	image: string
	price: number
	quant: number
	available: number
}

const Shop: React.FC = () => {
	const router = useRouter()
	const { addItemToCart } = useCart()

	const [mockItem, setMockItem] = useState<MockProduct[]>([])

	useEffect(() => {
		const generateNum = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

		let mp = []

		let i = 0
		while (i < 3) {
			let uid = generateNum(1000000000000000000, 9999999999999999999)

			mp.push({
				uid: uid,
				name: uid,
				desc: `PRODUCT DESCRIPTION`,
				image: 'product-image-placeholder.jpg',
				price: +(Math.random() * (0.0 - 999.99) + 1).toFixed(2) * -1,
				quant: 1,
				available: generateNum(0, 30)
			})

			i++
		}

		setMockItem(mp)
	}, [])

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_NAME}</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6">
				<section className="flex flex-wrap gap-3 justify-center py-6">
					{mockItem.map(product => (
						<div
							className="border shadow-md rounded-md w-64 hover:bg-gray-50 group transition duration-300
							bg-white"
							key={product.uid}
						>
							<Link href={`/shop/${product.uid}`}>
								<a>
									<div className="relative h-48 border-b rounded-t">
										<Image
											src={`/shop/gallery/${product.image}`}
											className="rounded-t group-hover:opacity-90"
											layout="fill"
											objectFit="cover"
											quality={100}
											alt="xxx"
										/>
									</div>

									<div className="flex flex-col gap-1 p-3">
										<div className="font-bold font-sans text-gray-700">{product.name}</div>

										<div className="text-gray-600">{product.desc}</div>

										<div className="text-gray-700">{formatCurrency(product.price)}</div>
									</div>
								</a>
							</Link>

							<div className="flex justify-between p-3 border-t">
								<button
									type="button"
									className="p-2 focus:border-gray-400 focus:outline-none
											focus:shadow-outline rounded border"
									onClick={() => {
										addItemToCart(product)

										return router.push(`/shop/cart`)
									}}
								>
									<span className="font-sans text-gray-700 uppercase">Comprar agora</span>
								</button>

								<button
									type="button"
									className="p-2 focus:border-gray-400 focus:outline-none focus:shadow-outline rounded border"
									onClick={() => addItemToCart(product)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-gray-700"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
								</button>
							</div>
						</div>
					))}
				</section>
			</main>

			<ScrollTop />

			<Footer />
		</>
	)
}

export default Shop
