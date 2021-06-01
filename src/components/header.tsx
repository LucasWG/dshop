import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { HiOutlineMinusCircle, HiOutlinePlusCircle, HiOutlineSearch } from 'react-icons/hi'
import { IoAlertCircleOutline } from 'react-icons/io5'

import { useCart } from '../contexts/cart'
import { formatCurrency } from '../utils/formatCurrency'

const Header: React.FC = () => {
	const router = useRouter()
	const { cartItems, addItemToCart } = useCart()

	const [menuCartOpen, setMenuCartOpen] = useState(false)

	return (
		<header className="pb-3">
			<div className="container flex flex-col gap-4 mx-auto px-6 py-3">
				<div className="flex items-center justify-center py-3 relative">
					<h1 className="font-serif text-gray-700">
						<Link href="/">
							<a>{process.env.NEXT_PUBLIC_NAME}</a>
						</Link>
					</h1>

					{router.route !== '/cart' && (
						<div className="absolute inset-y-0x right-0">
							<button
								type="button"
								className="flex cursor-pointer truncate p-2 rounded focus:outline-none"
								onClick={() => setMenuCartOpen(value => !value)}
							>
								<div className="flex flex-row-reverse ml-2 w-full">
									<div slot="icon" className="relative">
										<div
											className="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0
										right-0 bg-red-700 text-white"
										>
											{cartItems.length}
										</div>

										<FiShoppingCart className="" size={24} />
									</div>
								</div>
							</button>
						</div>
					)}
				</div>

				<nav className="mx-auto">
					{/* <ul className="flex gap-6 flex-wrap justify-center">
						<li
							className="hover:underline cursor-pointer capitalize text-gray-500 font-mono
							hover:text-gray-800 transition-colors duration-300 ease-linear"
						>
							<Link href="/">
								<a>home</a>
							</Link>
						</li>

						<li
							className="hover:underline cursor-pointer capitalize text-gray-500 font-mono
							hover:text-gray-800 transition-colors duration-300 ease-linear"
						>
							<Link href="/loja">
								<a>loja</a>
							</Link>
						</li>

						<li
							className="hover:underline cursor-pointer capitalize text-gray-500 font-mono
							hover:text-gray-800 transition-colors duration-300 ease-linear"
						>
							<Link href="/categories">
								<a>Categories</a>
							</Link>
						</li>

						<li
							className="hover:underline cursor-pointer capitalize text-gray-500 font-mono
							hover:text-gray-800 transition-colors duration-300 ease-linear"
						>
							<Link href="/contact">
								<a>Contact</a>
							</Link>
						</li>

						<li
							className="hover:underline cursor-pointer capitalize text-gray-500 font-mono
							hover:text-gray-800 transition-colors duration-300 ease-linear"
						>
							<Link href="/about">
								<a>About</a>
							</Link>
						</li>
					</ul> */}
				</nav>

				{false && (
					<div className="relative mt-3 max-w-lg mx-auto">
						<span className="absolute inset-y-0 left-0 pl-3 flex items-center">
							<HiOutlineSearch className="text-gray-500" size={20} />
						</span>

						<input
							className="w-full border rounded-md pl-10 pr-4 py-3 focus:border-blue-500 focus:outline-none
						focus:shadow-outline"
							type="text"
							placeholder="Search"
						/>
					</div>
				)}
			</div>

			{router.route !== '/cart' && (
				<div
					className={`fixed inset-y-0 right-0 transition delay-150 duration-300 transform ${
						menuCartOpen ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'
					} z-10`}
				>
					<div className="h-full w-screen sm:w-96 bg-white border-l p-3">
						<div className="flex flex-col justify-between h-full gap-3">
							<div className="flex justify-between items-center pb-3 border-b">
								<div className="font-medium font-sans text-xl">Carrinho de Compras</div>

								<button type="button" className="p-2" onClick={() => setMenuCartOpen(false)}>
									<AiOutlineClose
										className="text-gray-700 hover:text-red-700 transition-colors duration-300"
										size={24}
									/>
								</button>
							</div>

							<ul className="flex-1 flex flex-col gap-1 overflow-y-auto">
								{cartItems.length <= 0 && (
									<div
										className="flex items-center justify-center gap-2 border rounded-md
										border-gray-300 py-2 mt-3 text-gray-600"
									>
										<IoAlertCircleOutline size={26} />

										<span>O carrinho de compras está vazio.</span>
									</div>
								)}

								{cartItems.map(product => (
									<li className="border-b" key={product.id}>
										<div className="flex gap-3 mb-3">
											<div className="relative flex-shrink-0 w-20 h-20 place-self-center">
												<Image
													src={
														product.images.length > 0
															? `/gallery/${product.images[0]}`
															: `/gallery/9366801_placeholder.jpg`
													}
													layout="fill"
													objectFit="cover"
													alt={product.name}
												/>
											</div>

											<div className="flex-1 flex flex-col justify-between py-1">
												<Link href={`/produtos/${product.slug}`}>
													<a>
														<div className="font-sans text-gray-700">{product.name}</div>
													</a>
												</Link>

												<div className="flex justify-between flex-col sm:flex-row">
													<div className="flex items-center gap-2 mt-1">
														<button
															type="button"
															className=""
															onClick={() =>
																addItemToCart({
																	id: product.id,
																	slug: product.slug,
																	name: product.name,
																	images: product.images,
																	price: product.price,
																	available: product.available,
																	qtd: -1
																})
															}
														>
															<HiOutlineMinusCircle className="text-gray-500" size={24} />
														</button>

														<div className="">{product.qtd}</div>

														<button
															type="button"
															className=""
															onClick={() =>
																addItemToCart({
																	id: product.id,
																	slug: product.slug,
																	name: product.name,
																	images: product.images,
																	price: product.price,
																	available: product.available,
																	qtd: 1
																})
															}
														>
															<HiOutlinePlusCircle className="text-gray-500" size={24} />
														</button>
													</div>

													<div className="py-1 px-2 whitespace-nowrap text-right">
														<div className="">{formatCurrency(product.price)}</div>
													</div>
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>

							{cartItems.length > 0 && (
								<button
									type="button"
									className="flex items-center justify-center gap-3 p-3 border rounded-md text-gray-600
									hover:text-gray-900 hover:border-gray-300 hover:bg-gray-200 transition-colors
									duration-300 bg-gray-100 font-bold"
									onClick={() => router.push('/cart')}
								>
									{'CARRINHO -->'}
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</header>
	)
}

export default Header
