import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { useCart } from '../contexts/cart'
import { formatCurrency } from '../utils/formatCurrency'

const Header: React.FC = () => {
	const router = useRouter()
	const { items, addItemToCart } = useCart()

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

					{router.route !== '/shop/cart' && (
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
											{items.length}
										</div>

										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="100%"
											height="100%"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
											className="w-6 h-6 mt-2"
										>
											<circle cx={9} cy={21} r={1} />
											<circle cx={20} cy={21} r={1} />
											<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
										</svg>
									</div>
								</div>
							</button>
						</div>
					)}
				</div>

				<nav className="mx-auto">
					<ul className="flex gap-6 flex-wrap justify-center">
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
							<Link href="/shop">
								<a>shop</a>
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
					</ul>
				</nav>

				{false && (
					<div className="relative mt-3 max-w-lg mx-auto">
						<span className="absolute inset-y-0 left-0 pl-3 flex items-center">
							<svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
								<path
									d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
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

			{router.route !== '/shop/cart' && (
				<div
					className={`fixed inset-y-0 right-0 transition delay-150 duration-300 transform ${
						menuCartOpen ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'
					} z-10`}
				>
					<div className="h-full w-screen sm:w-96 bg-white border-l p-3">
						<div className="flex flex-col justify-between h-full gap-3">
							<div className="flex justify-between items-center pb-3 border-b">
								<div className="font-medium font-sans text-2xl">Your cart</div>

								<button type="button" className="p-2" onClick={() => setMenuCartOpen(false)}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							<ul className="flex-1 flex flex-col gap-1 overflow-y-auto">
								{items.map(product => (
									<li className="border-b" key={product.uid}>
										<div className="flex gap-3 mb-3">
											<div className="relative flex-shrink-0 w-20 h-20 place-self-center">
												<Image
													src={`/shop/gallery/${product.image}`}
													layout="fill"
													objectFit="contain"
													quality={100}
													alt={product.name}
												/>
											</div>

											<div className="flex-1 flex flex-col justify-between py-1">
												{/* TODO: MUDAR PARA SLUG */}
												<Link href={`/shop/${product.uid}`}>
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
																	uid: product.uid,
																	quant: -1,
																	available: product.available
																})
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-6 w-6 text-gray-500"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
																/>
															</svg>
														</button>

														<div className="">{product.quant}</div>

														<button
															type="button"
															className=""
															onClick={() =>
																addItemToCart({
																	uid: product.uid,
																	quant: 1,
																	available: product.available
																})
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-6 w-6 text-gray-500"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
																/>
															</svg>
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

							{items.length > 0 && (
								<button
									type="button"
									className="flex items-center justify-center gap-3 p-3 border rounded-md text-gray-600
									hover:text-gray-900 hover:border-gray-300 hover:bg-gray-200 transition-colors
									duration-300 bg-gray-100 font-bold"
									onClick={() => router.push('/shop/cart')}
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
