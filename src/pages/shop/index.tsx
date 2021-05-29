import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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

	const handleXxxx = (prod: definitions['_products'], redirect?: boolean) => {
		addItemToCart({
			id: prod.id,
			slug: prod.slug,
			name: prod.name,
			images: prod.images,
			price: prod.price,
			available: prod.available,
			amount: 1
		})

		if (redirect) return router.push(`/shop/cart`)
	}

	return (
		<>
			<Head>
				<title>Shop | {process.env.NEXT_PUBLIC_NAME}</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6">
				<section className="flex flex-wrap gap-3 justify-center py-6">
					{!!_products &&
						_products.map(product => (
							<div
								className="border shadow-md rounded-md w-64 hover:bg-gray-50 group transition duration-300
								bg-white"
								key={product.id}
							>
								<Link href={`/shop/${product.slug}`}>
									<a>
										<div className="relative h-48 rounded-t">
											<Image
												src={`/shop/gallery/${product.images[0]}`}
												className="rounded-t group-hover:opacity-90"
												layout="fill"
												objectFit="cover"
												quality={100}
												alt="xxx"
											/>
										</div>

										<div className="flex flex-col gap-4 px-3 py-2 items-center">
											<div className="font-bold font-sans text-gray-700">{product.name}</div>

											<div className="text-pink-700 font-bold text-lg">
												{formatCurrency(product.price)}
											</div>
										</div>
									</a>
								</Link>

								<div className="flex justify-between p-3">
									<button
										type="button"
										className="p-2 focus:border-gray-400 focus:outline-none focus:shadow-outline
										rounded border bg-white"
										onClick={() => handleXxxx(product, true)}
									>
										<span className="font-sans text-gray-700 uppercase">Comprar agora</span>
									</button>

									<button
										type="button"
										className="p-2 focus:border-gray-400 focus:outline-none focus:shadow-outline
										rounded border bg-white"
										onClick={() => handleXxxx(product)}
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

					{!!!_products && (
						<div className="my-9">
							<h2>We didn't find anything, check later!</h2>
						</div>
					)}
				</section>
			</main>

			<ScrollTop />

			{/* {!!_products && (
				<pre className="whitespace-pre-wrap text-black bg-white font-sans border m-9 p-9 shadow rounded">
					{JSON.stringify(_products, null, 4)}
				</pre>
			)} */}

			<Footer />
		</>
	)
}

// TODO: USAR SWR. SE MUDAR O VALOR DOS PRODUTOS E O CLIENT FICAR NAVEGANDO SEM DAR REFRESH NÃO VAI ATUALIZAR O VALOR
export const getStaticProps: GetStaticProps = async context => {
	let { data: _products, error } = await supabase
		.from<definitions['_products']>('_products')
		.select('id, slug, name, images, price, available')
		.order('updated_at', { ascending: false })

	return {
		props: { _products },
		revalidate: 10
	}
}

export default Shop
