import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import CepCard from '../../../components/cepCard'
import Footer from '../../../components/footer'
import Header from '../../../components/header'
import ScrollTop from '../../../components/scrollTop'
import { useCart } from '../../../contexts/cart'
import { supabase } from '../../../services/supabase'
import { formatCurrency } from '../../../utils/formatCurrency'
import { definitions } from '../../../utils/types/supabase'

type ProductPageProps = {
	_product: definitions['_products']
}

const ProductPage: NextPage<ProductPageProps> = ({ _product }) => {
	const router = useRouter()
	const { addItemToCart } = useCart()

	const [selectedQuantity, setSelectedQuantity] = useState(1)
	const [imageSelected, setImageSelected] = useState('')

	const handleXxxx = (redirect?: boolean) => {
		addItemToCart({
			id: _product.id,
			slug: _product.slug,
			name: _product.name,
			images: _product.images,
			price: _product.price,
			available: _product.available,
			amount: selectedQuantity
		})

		if (redirect) return router.push(`/shop/cart`)
	}

	useEffect(() => setImageSelected(_product.images[0]), [_product])

	return (
		<>
			<Head>
				<title>
					{_product.name} | {process.env.NEXT_PUBLIC_NAME}
				</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6">
				<section className="flex my-9 bg-white rounded-md flex-col md:flex-row">
					<section className="flex-1 p-3">
						<div className="flex gap-3 border-b pb-6">
							<ul className="w-3/12x flex flex-col gap-1">
								{[..._product.images].map((image, key) => (
									<li
										className={`relative w-16 h-16 border-2 hover:border-gray-900 cursor-pointer
										rounded-full overflow-hidden ${imageSelected === image && 'border-gray-700'}`}
										key={key}
									>
										<Image
											src={`/shop/gallery/${image}`}
											layout="fill"
											objectFit="cover"
											alt={_product.name}
											onClick={() => setImageSelected(image)}
										/>
									</li>
								))}

								{_product.images.length === 0 && (
									<Image
										src={`/shop/gallery/9366801_placeholder.jpg`}
										layout="fill"
										objectFit="cover"
										alt={_product.name}
									/>
								)}
							</ul>

							<div className="relative flex-1 h-96">
								<Image
									src={
										_product.images.length > 0
											? `/shop/gallery/${imageSelected}`
											: `/shop/gallery/9366801_placeholder.jpg`
									}
									layout="fill"
									objectFit="contain"
									alt={_product.name}
								/>
							</div>
						</div>

						{_product.description && (
							<div className="my-4">
								<h2 className="mb-3">Descrição</h2>

								<div dangerouslySetInnerHTML={{ __html: _product.description }} />
							</div>
						)}
					</section>

					<section className="flex flex-col w-full md:w-4/12 gap-3 p-3">
						<section className="flex flex-col gap-6 break-all">
							<div className="mb-2">
								<h2>{_product.name}</h2>
							</div>

							{!!_product.available && (
								<div className="">
									<span className="font-sans text-3xl cursor-default select-none mt-2">
										{formatCurrency(_product.price)}
									</span>
								</div>
							)}

							<div className="">
								{!!_product.available ? (
									<p className="">Estoque disponível</p>
								) : (
									<p className="text-red-800">indisponível</p>
								)}

								{!!_product.available && (
									<>
										<div className="flex gap-2 items-center mt-2">
											<select
												className="flex-1 p-2 appearance-none"
												onChange={event => setSelectedQuantity(Number(event.target.value))}
											>
												{[...new Array(_product.available).keys()].map(value => (
													<option value={value + 1} key={value}>
														{value + 1}
													</option>
												))}
											</select>

											<span className="font-extralight text-sm text-gray-500">
												{_product.available > 1
													? `(${_product.available} disponíveis)`
													: `(${_product.available} disponível)`}
											</span>
										</div>
									</>
								)}
							</div>

							<CepCard />

							<div className="flex flex-col gap-2">
								<button
									type="button"
									className="flex items-center justify-center gap-3 p-3 border rounded-md text-gray-600
									hover:text-gray-900 hover:border-gray-300 hover:bg-gray-200 transition-colors
									duration-300 mt-3 bg-gray-200"
									onClick={() => handleXxxx(true)}
								>
									Comprar agora
								</button>

								<button
									type="button"
									className="flex items-center justify-center gap-3 p-3 border rounded-md text-gray-600
									hover:text-gray-900 hover:border-gray-300 hover:bg-gray-200 transition-colors
									duration-300 mt-3 bg-gray-100"
									onClick={() => handleXxxx()}
								>
									Adicionar ao Carrinho
								</button>
							</div>
						</section>
					</section>
				</section>
			</main>

			<ScrollTop />

			<Footer />
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	//

	return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async context => {
	const { slug } = context?.params

	try {
		if (typeof slug !== 'string' || !!!slug) throw new Error('invalid slug')

		const { data: _products, error } = await supabase
			.from<definitions['_products']>('_products')
			.select('id, slug, name, images, price, description, available')
			.eq('slug', slug.toString())

		if (!!!_products.length) throw new Error('product not found')

		return {
			props: { _product: _products[0] },
			revalidate: 10
		}
	} catch (err) {
		return { notFound: true }
	}
}

export default ProductPage
