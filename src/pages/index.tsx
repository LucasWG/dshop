import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Footer from '../components/footer'
import Header from '../components/header'
import ScrollTop from '../components/scrollTop'
import { useCart } from '../contexts/cart'
import { supabase } from '../services/supabase'
import { formatCurrency } from '../utils/formatCurrency'
import { definitions } from '../utils/types/supabase'

import { AiOutlineEye } from 'react-icons/ai'

type ShopProps = {
	_products: definitions['_products'][]
}

const Shop: NextPage<ShopProps> = ({ _products }) => {
	const router = useRouter()
	const { addItemToCart } = useCart()

	const handleAddItemToCart = (prod: definitions['_products'], redirect?: boolean) => {
		addItemToCart({
			id: prod.id,
			slug: prod.slug,
			name: prod.name,
			images: prod.images,
			price: prod.price,
			available: prod.available,
			qty: 1
		})

		if (redirect) return router.push(`cart`)
	}

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_NAME}</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6">
				<section className="flex flex-wrap gap-4 justify-center py-6">
					{!!_products &&
						_products.map(product => (
							<div key={product.id}>
								<div className="border rounded-md w-64 transition duration-300 bg-white shadow-md hover:shadow-lg">
									<Link href={`/produtos/${product.slug}`}>
										<a>
											<div className="relative h-48 rounded-t">
												<Image
													src={
														product.images.length > 0
															? `/gallery/${product.images[0]}`
															: `/gallery/9366801_placeholder.jpg`
													}
													className="rounded-t"
													layout="fill"
													objectFit="cover"
													alt={product.name}
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

									<div className="flex justify-center gap-3 p-3">
										<button
											type="button"
											className="px-4 py-2 uppercase text-gray-700 font-bold text-xs transition-colors
											duration-300 hover:text-white hover:bg-green-600 border rounded-md whitespace-nowrap"
											onClick={() => handleAddItemToCart(product, true)}
										>
											<span className="tracking-widest">Comprar</span>
										</button>

										<button
											type="button"
											className="flex items-center gap-1 px-4 py-2 uppercase text-gray-700 font-bold
											text-xs transition-colors duration-300 hover:border-gray-400 border
											rounded-md whitespace-nowrap"
											onClick={() => router.push(`/produtos/${product.slug}`)}
										>
											<AiOutlineEye size={24} />

											<span className="tracking-widest">Espiar</span>
										</button>
									</div>
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

			<Footer />
		</>
	)
}

// TODO: USAR SWR. SE MUDAR O VALOR DOS PRODUTOS E O CLIENT FICAR NAVEGANDO SEM DAR REFRESH NÃO VAI ATUALIZAR O VALOR
export const getStaticProps: GetStaticProps = async context => {
	let { data: _products } = await supabase
		.from<definitions['_products']>('_products')
		.select('id, slug, name, images, price, available')
		.order('updated_at', { ascending: false })

	return {
		props: { _products },
		revalidate: 10
	}
}

export default Shop
