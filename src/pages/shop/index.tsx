import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Footer from '../../components/footer'
import Header from '../../components/header'
import ScrollTop from '../../components/scrollTop'

const Shop: React.FC = () => {
	//

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_NAME}</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6">
				<section className="flex flex-wrap gap-3 justify-center py-6">
					{[...new Array(12).keys()].map(product => (
						<div
							className="border shadow-md rounded-md w-64 hover:bg-gray-50 group transition duration-300
							bg-white"
							key={product}
						>
							<Link href={`/shop/xxx-${product + 1}`}>
								<a>
									<div className="relative h-48 border-b rounded-t">
										<Image
											src="/shop/gallery/product-image-placeholder.jpg"
											className="rounded-t group-hover:opacity-90"
											layout="fill"
											objectFit="cover"
											quality={100}
											alt="xxx"
										/>
									</div>

									<div className="flex flex-col gap-1 p-3">
										<div className="font-bold font-serif text-gray-800">PRODUCT NAME</div>

										<div className="text-gray-700">PRODUCT DESCRIPTION</div>

										<div className="text-gray-600">R$ 12,50</div>
									</div>
								</a>
							</Link>

							<div className="flex justify-between p-3 border-t">
								<button
									type="button"
									className="p-2 focus:border-gray-400 focus:outline-none
											focus:shadow-outline rounded border"
									onClick={() => {}}
								>
									<span className="font-sans text-gray-700 uppercase">Comprar agora</span>
								</button>

								<button
									type="button"
									className="p-2 focus:border-gray-400 focus:outline-none focus:shadow-outline rounded border"
									onClick={() => {}}
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
