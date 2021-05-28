import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import Footer from '../../components/footer'
import Header from '../../components/header'
import ScrollTop from '../../components/scrollTop'
import { useCart } from '../../contexts/cart'
import { supabase } from '../../services/supabase'
import { formatCurrency } from '../../utils/formatCurrency'
import { definitions } from '../../utils/types/supabase'

type ShopProps = {
	_products: definitions['_products'][]
}

const Shop: NextPage<ShopProps> = ({ _products }) => {
	const router = useRouter()
	const { addItemToCart } = useCart()

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_NAME}</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6">
				<section className="flex flex-wrap gap-3 justify-center py-6">
					{_products.map(product => (
						<div
							className="border shadow-md rounded-md w-64 hover:bg-gray-50 group transition duration-300
							bg-white"
							key={product.id}
						>
							<Link href={`/shop/${product.id}`}>
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

										<div className="text-gray-600">{product.description}</div>

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
										addItemToCart({
											uid: product.id,
											name: product.name,
											desc: product.description,
											price: product.price,
											image: product.image,
											available: product.available,
											quant: 1
										})

										return router.push(`/shop/cart`)
									}}
								>
									<span className="font-sans text-gray-700 uppercase">Comprar agora</span>
								</button>

								<button
									type="button"
									className="p-2 focus:border-gray-400 focus:outline-none focus:shadow-outline rounded border"
									onClick={() =>
										addItemToCart({
											uid: product.id,
											name: product.name,
											desc: product.description,
											price: product.price,
											image: product.image,
											available: product.available,
											quant: 1
										})
									}
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

			{/* <pre className="whitespace-pre-wrap p-2 bg-green-500 text-white font-sans">
				{JSON.stringify(_products, null, 4)}
			</pre> */}

			<Footer />
		</>
	)
}

export const getStaticProps: GetStaticProps = async context => {
	let { data: _products, error } = await supabase.from<definitions['_products']>('_products').select('*')

	if (error) {
		return { notFound: true }
	}

	return {
		props: { _products },
		revalidate: 10
	}
}

export default Shop
