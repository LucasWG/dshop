import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { FaCreditCard, FaRegTrashAlt } from 'react-icons/fa'
import { HiMinus, HiOutlineSearch, HiOutlineTrash, HiPlus } from 'react-icons/hi'
import { ImSpinner9 } from 'react-icons/im'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { IoAlertCircleOutline } from 'react-icons/io5'

import CepCard from '../components/cepCard'
import Footer from '../components/footer'
import Header from '../components/header'
import ScrollTop from '../components/scrollTop'
import { useCart } from '../contexts/cart'
import { formatCurrency } from '../utils/formatCurrency'

const Cart: React.FC = () => {
	const router = useRouter()
	const {
		cartItems,
		orderDetails,
		coupon,
		selectedShipping,
		addItemToCart,
		addCoupon,
		removeCoupon,
		removeItemToCart
	} = useCart()

	const [cupomCardState, setCupomCardState] = useState(false)
	const [cupomLoading, setCupomLoading] = useState(false)
	const [cupomError, setCupomError] = useState(false)

	const handleFormCupomSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		setCupomError(false)
		setCupomLoading(true)

		let couponAdded = await addCoupon(event.target[0].value)

		if (!couponAdded) setCupomError(true)

		setCupomLoading(false)
	}

	return (
		<>
			<Head>
				<title>Cart - {process.env.NEXT_PUBLIC_NAME}</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6">
				<div className="flex flex-wrap gap-3 py-6">
					<section className="flex-1 flex flex-col gap-3">
						<div className="flex flex-col gap-6 bg-white rounded-md p-6 border">
							<div className="text-xl font-bold font-serif text-gray-700 cursor-default">
								Cart ({cartItems.length > 1 ? `${cartItems.length} Items` : `${cartItems.length} Item`})
							</div>

							<ul className="flex flex-col gap-9">
								{cartItems.map(product => (
									<li key={product.id}>
										<div className="flex gap-4 flex-wrap justify-center">
											<div className="relative h-48 w-full sm:w-40 border rounded-md bg-gray-50">
												<Image
													src={
														product.images.length > 0
															? `/gallery/${product.images[0]}`
															: `/gallery/9366801_placeholder.jpg`
													}
													className="rounded-md"
													layout="fill"
													objectFit="cover"
													alt={product.name}
												/>
											</div>

											<div className="flex-1 flex flex-col justify-between gap-3">
												<div className="flex flex-col gap-2">
													<div className="font-sans text-xl text-gray-600">
														<Link href={`/produtos/${product.slug}`}>
															<a className="hover:text-gray-900 transition-colors duration-300">
																{product.name}
															</a>
														</Link>
													</div>

													<div className="font-bold font-sans text-2xl whitespace-nowrap">
														{formatCurrency(product.price)}
													</div>
												</div>

												<div className="flex gap-3 justify-center md:justify-between flex-wrap">
													<div className="flex items-center flex-wrap gap-1">
														<div className="flex items-center gap-2">
															<button
																type="button"
																className="p-1 border rounded"
																onClick={() =>
																	addItemToCart({
																		id: product.id,
																		slug: product.slug,
																		name: product.name,
																		images: product.images,
																		price: product.price,
																		available: product.available,
																		qty: -1
																	})
																}
															>
																<HiMinus size={24} />
															</button>

															<div className="p-1 cursor-default">{product.qty}</div>

															<button
																type="button"
																className="p-1 border rounded"
																onClick={() =>
																	addItemToCart({
																		id: product.id,
																		slug: product.slug,
																		name: product.name,
																		images: product.images,
																		price: product.price,
																		available: product.available,
																		qty: 1
																	})
																}
															>
																<HiPlus size={24} />
															</button>
														</div>

														<div className="font-extralight text-sm text-gray-500">
															{product.available > 1
																? `(${product.available} disponíveis)`
																: `(${product.available} disponível)`}
														</div>
													</div>

													<div
														className="flex gap-2 sm:items-end justify-end flex-1 sm:flex-none
														flex-wrap"
													>
														<button
															type="button"
															className="flex items-center gap-1 p-2 uppercase text-gray-600
															text-xs font-extralight transition-colors duration-300
															hover:text-red-600 border rounded-md whitespace-nowrap order-last"
															onClick={() => removeItemToCart(product.id)}
														>
															<HiOutlineTrash size={24} />

															<span>remover item</span>
														</button>

														<button
															type="button"
															className="flex items-center gap-1 p-2 uppercase text-gray-600
															text-xs font-extralight transition-colors duration-300
															hover:text-green-600 border rounded-md whitespace-nowrap"
															onClick={() => router.push(`/produtos/${product.slug}`)}
														>
															<AiOutlineEye size={24} />

															<span>ver na loja</span>
														</button>
													</div>
												</div>
											</div>
										</div>
									</li>
								))}

								{cartItems.length === 0 && (
									<li>
										<div
											className="flex items-center justify-center gap-2 border rounded-md
											border-gray-300 py-2 mt-6 text-gray-600"
										>
											<IoAlertCircleOutline size={26} />

											<span>O carrinho de compras está vazio.</span>
										</div>
									</li>
								)}
							</ul>
						</div>
					</section>

					<section className="flex flex-col gap-3 w-full md:w-4/12">
						<div className="flex flex-col gap-3 bg-white rounded-md p-6 border">
							<div className="text-xl font-bold font-serif text-gray-700 cursor-default">
								Detalhes do pedido
							</div>

							<span className="text-gray-500">
								Frete e custos adicionais são calculados com base nos valores que você inseriu
							</span>

							<ul className="font-sans text-lg text-gray-700 font-bold">
								<li>
									<div className="flex justify-between p-4 border-b">
										<div className="">Subtotal</div>
										<div className="">{formatCurrency(orderDetails.subtotal)}</div>
									</div>

									{coupon && (
										<div className="flex justify-between items-center p-4 border-b">
											<div className="flex gap-1 items-center">
												<button type="button" className="p-2 group" onClick={removeCoupon}>
													<FaRegTrashAlt className="text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
												</button>

												<div className="">Cupom "{coupon.coupon}"</div>
											</div>

											<div className="whitespace-nowrap text-green-700">
												- {formatCurrency(orderDetails.coupon)}
											</div>
										</div>
									)}

									{selectedShipping && (
										<div className="flex justify-between p-4 border-b">
											<div className="">Frete</div>
											<div className="">{formatCurrency(selectedShipping.Valor)}</div>
										</div>
									)}

									<div className="flex justify-between p-4 border-b">
										<div className="">Imposto</div>
										<div className="">{formatCurrency(0)}</div>
									</div>

									<div className="flex justify-between p-4">
										<div className="">Total</div>
										<div className="">{formatCurrency(orderDetails.total)}</div>
									</div>
								</li>
							</ul>

							<button
								type="button"
								className="flex items-center justify-center gap-3 p-3 border rounded-md text-gray-600
									hover:text-gray-900 hover:border-gray-300 hover:bg-gray-200 transition-colors
									duration-300 mt-3 bg-gray-100"
								onClick={() => router.push(`/checkout/v1`)}
								disabled={cartItems.length === 0}
							>
								<FaCreditCard />

								<span>PROCEED TO CHECKOUT</span>
							</button>
						</div>

						{cartItems.length > 0 && <CepCard />}

						<div className="flex flex-col gap-3 bg-white rounded-md border">
							<div className="flex justify-between items-center p-6">
								<div className="text-xl font-bold font-serif text-gray-700 cursor-default">Cupom</div>

								<button type="button" className="p-2" onClick={() => setCupomCardState(item => !item)}>
									{cupomCardState ? <IoIosArrowUp /> : <IoIosArrowDown />}
								</button>
							</div>

							<div className={`${cupomCardState ? 'flex' : 'hidden'} gap-4 flex-col px-6 pb-6`}>
								<span className="text-gray-500">
									Se você tiver um código de cupom, insira-o na caixa abaixo
								</span>

								<form onSubmit={handleFormCupomSubmit} autoComplete="off">
									<div className="flex relative">
										<input
											type="text"
											className={`w-full py-3 pl-3 pr-16 border rounded-md bg-gray-50 focus:outline-none
											focus:border-gray-400 text-gray-700 ${cupomError && 'border-red-600'} disabled:opacity-60`}
											placeholder={!!coupon ? coupon.coupon : '10off'}
											disabled={cupomLoading || !!coupon}
										/>

										{cupomLoading ? (
											<button
												type="button"
												className="absolute inset-y-0 right-0 px-4 focus:outline-none border-l"
												disabled={cupomLoading || !!coupon}
											>
												<ImSpinner9
													className="animate-spin -ml-1x mr-3x text-gray-700"
													size={24}
												/>
											</button>
										) : (
											<button
												type="submit"
												className="absolute inset-y-0 right-0 px-4 focus:outline-none border-l"
												disabled={cupomLoading || !!coupon}
											>
												<HiOutlineSearch className="text-gray-700" size={24} />
											</button>
										)}
									</div>

									{coupon && <span className="text-green-800 text-sm">Cupom adicionado</span>}
								</form>
							</div>
						</div>
					</section>
				</div>
			</main>

			<ScrollTop />

			<Footer />
		</>
	)
}

export default Cart
