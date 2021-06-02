import { addDays } from 'date-fns'
import Cookies from 'js-cookie'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Footer from '../../../components/footer'
import Header from '../../../components/header'
import { useCart } from '../../../contexts/cart'
import { formatCurrency } from '../../../utils/formatCurrency'

const Checkout: React.FC = () => {
	const { orderDetails, coupon, selectedShipping, cartItems } = useCart()

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors }
	} = useForm()

	// *****************************************************************************************************************
	const saveCookie = (cookieName: string, value: string, expiresDay: number = 1): void => {
		Cookies.set(cookieName, value, {
			expires: addDays(new Date(), expiresDay),
			secure: process.env.NODE_ENV === 'production'
		})
	}

	const getCookie = (cookieName: string): string => Cookies.get(cookieName)

	const deleteCookie = (cookieName: string): void => Cookies.remove(cookieName)
	// *****************************************************************************************************************

	const onCepSubmit = data => {
		console.log(data)
	}

	useEffect(() => {
		let _cookie = getCookie('__ds-pec')

		if (_cookie) {
			setValue('cep', _cookie)
			// handleSubmit(onCepSubmit)()
		}
	}, [])

	return (
		<>
			<Head>
				<title>Checkout - {process.env.NEXT_PUBLIC_NAME}</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6">
				<div className="flex flex-wrap gap-3 py-6">
					<section className="flex-1 flex flex-col gap-4">
						<ul className="flex gap-2x divide-x divide-gray-300 text-gray-500 mb-3">
							<li className="px-2">
								<button type="button" className={`text-xs text-gray-900 font-semibold`}>
									Entrega
								</button>
							</li>

							<li className="px-2">
								<button type="button" className={`text-xs `}>
									Pagamento
								</button>
							</li>
						</ul>

						{/* Dados de contato */}
						<div className="mb-3">
							<div className="text-3xl font-bold py-2">Dados de contato</div>

							<input
								type="text"
								className={`w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:border-gray-400
								text-gray-700 disabled:opacity-70`}
								placeholder="E-mail"
								disabled={false}
							/>
						</div>

						{/* ENTREGA */}
						<div className="mb-3">
							<div className="text-3xl font-bold py-2">Entrega</div>

							<form onSubmit={handleSubmit(onCepSubmit)} autoComplete="off">
								<div className="">
									<label htmlFor="cep" className="block mb-2">
										Cep
									</label>

									<div className="relative">
										<input
											type="text"
											id="cep"
											{...register('cep', {
												required: true,
												pattern: /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/
											})}
											className={`w-full py-3 pl-3 pr-40 border rounded-md bg-gray-100 focus:outline-none
											text-gray-700 disabled:opacity-70
											${errors.cep ? 'border-red-700' : 'focus:border-gray-400'}`}
											placeholder="CEP"
											disabled={false}
										/>
										{errors.cep && <p className="text-red-700">cep is required.</p>}

										<a
											href="http://www.buscacep.correios.com.br/sistemas/buscacep/"
											className="absolute inset-y-0 right-0 p-3 text-blue-700 hover:text-blue-900
											transition-colors"
											target="_blank"
											rel="noopener noreferrer"
										>
											Não sei meu CEP
										</a>
									</div>
								</div>
							</form>
						</div>

						{false && (
							<form autoComplete="off">
								{/* Dados do destinatário */}
								<div className="mb-3">
									<div className="text-3xl font-bold py-2">Dados do destinatário</div>

									<div className="mb-3">
										<label htmlFor="shippingAddress.first_name" className="block mb-2">
											Nome
										</label>

										<div className="">
											<input
												type="text"
												id="shippingAddress.first_name"
												{...register('shippingAddress.first_name', {
													required: true
												})}
												className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.shippingAddress?.first_name ? 'border-red-700' : 'focus:border-gray-400'}`}
												placeholder="Nome"
												disabled={false}
											/>
											{errors.shippingAddress?.first_name && (
												<p className="text-red-700">Este campo deve ser preenchido</p>
											)}
										</div>
									</div>

									<div className="mb-3">
										<label htmlFor="shippingAddress.last_name" className="block mb-2">
											Sobrenome
										</label>

										<div className="">
											<input
												type="text"
												id="shippingAddress.last_name"
												{...register('shippingAddress.last_name', {
													required: true
												})}
												className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.shippingAddress?.last_name ? 'border-red-700' : 'focus:border-gray-400'}`}
												placeholder="Nome"
												disabled={false}
											/>
											{errors.shippingAddress?.last_name && (
												<p className="text-red-700">Este campo deve ser preenchido</p>
											)}
										</div>
									</div>

									<div className="mb-3">
										<label htmlFor="shippingAddress.phone" className="block mb-2">
											Telefone
										</label>

										<div className="">
											<input
												type="tel"
												id="shippingAddress.phone"
												{...register('shippingAddress.phone', {
													required: true
												})}
												className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.shippingAddress?.phone ? 'border-red-700' : 'focus:border-gray-400'}`}
												placeholder="Telefone"
												disabled={false}
											/>
											{errors.shippingAddress?.phone && (
												<p className="text-red-700">Este campo deve ser preenchido</p>
											)}
										</div>
									</div>
								</div>

								{/* Endereço do destinatário */}
								<div className="mb-3">
									<div className="text-3xl font-bold py-2">Endereço do destinatário</div>

									<div className="mb-3">
										<label htmlFor="shippingAddress.address" className="block mb-2">
											Endereço
										</label>

										<div className="">
											<input
												type="text"
												id="shippingAddress.address"
												{...register('shippingAddress.address', {
													required: true
												})}
												className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.shippingAddress?.address ? 'border-red-700' : 'focus:border-gray-400'}`}
												placeholder="Endereço"
												disabled={false}
											/>
											{errors.shippingAddress?.address && (
												<p className="text-red-700">Este campo deve ser preenchido</p>
											)}
										</div>
									</div>

									<div className="flex flex-wrap gap-4 mb-3">
										<div className="w-full sm:w-1/3">
											<label htmlFor="shippingAddress.number" className="block mb-2">
												Número
											</label>

											<div className="">
												<input
													type="number"
													id="shippingAddress.number"
													{...register('shippingAddress.number', {
														required: true
													})}
													className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.shippingAddress?.number ? 'border-red-700' : 'focus:border-gray-400'}`}
													placeholder="Número"
													disabled={false}
												/>
												{errors.shippingAddress?.number && (
													<p className="text-red-700">Este campo deve ser preenchido</p>
												)}
											</div>
										</div>

										<div className="flex-1">
											<label htmlFor="shippingAddress.floor" className="block mb-2">
												Complemento (Opcional)
											</label>

											<div className="">
												<input
													type="text"
													id="shippingAddress.floor"
													{...register('shippingAddress.floor', {
														required: true
													})}
													className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.shippingAddress?.floor ? 'border-red-700' : 'focus:border-gray-400'}`}
													placeholder="Complemento (Opcional)"
													disabled={false}
												/>
												{errors.shippingAddress?.floor && (
													<p className="text-red-700">Este campo deve ser preenchido</p>
												)}
											</div>
										</div>
									</div>

									<div className="mb-3">
										<label htmlFor="shippingAddress.locality" className="block mb-2">
											Bairro
										</label>

										<div className="">
											<input
												type="text"
												id="shippingAddress.locality"
												{...register('shippingAddress.locality', {
													required: true
												})}
												className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.shippingAddress?.locality ? 'border-red-700' : 'focus:border-gray-400'}`}
												placeholder="Bairro"
												disabled={false}
											/>
											{errors.shippingAddress?.locality && (
												<p className="text-red-700">Este campo deve ser preenchido</p>
											)}
										</div>
									</div>

									<div className="mb-3">
										<label htmlFor="shippingAddress.city" className="block mb-2">
											Cidade
										</label>

										<div className="">
											<input
												type="text"
												id="shippingAddress.city"
												{...register('shippingAddress.city', {
													required: true
												})}
												className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.shippingAddress?.city ? 'border-red-700' : 'focus:border-gray-400'}`}
												placeholder="Cidade"
												disabled={false}
											/>
											{errors.shippingAddress?.city && (
												<p className="text-red-700">Este campo deve ser preenchido</p>
											)}
										</div>
									</div>

									<div className="flex flex-wrap gap-4 mb-3">
										<div className="w-full sm:w-1/3">
											<label htmlFor="shippingAddress.zipcode" className="block mb-2">
												CEP
											</label>

											<div className="">
												<input
													type="text"
													id="shippingAddress.zipcode"
													{...register('shippingAddress.zipcode', {
														required: true
													})}
													className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.shippingAddress?.zipcode ? 'border-red-700' : 'focus:border-gray-400'}`}
													placeholder="CEP"
													disabled={false}
												/>
												{errors.shippingAddress?.zipcode && (
													<p className="text-red-700">Este campo deve ser preenchido</p>
												)}
											</div>
										</div>

										<div className="flex-1">
											<label htmlFor="shippingAddress.state" className="block mb-2">
												Estado
											</label>

											<div className="">
												<input
													type="text"
													id="shippingAddress.state"
													{...register('shippingAddress.state', {
														required: true
													})}
													className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.shippingAddress?.state ? 'border-red-700' : 'focus:border-gray-400'}`}
													placeholder="Estado"
													disabled={false}
												/>
												{errors.shippingAddress?.state && (
													<p className="text-red-700">Este campo deve ser preenchido</p>
												)}
											</div>
										</div>
									</div>
								</div>

								{/* Dados de cobrança */}
								<div className="mb-3">
									<div className="text-3xl font-bold py-2">Dados de cobrança</div>

									<div className="mb-3">
										<label htmlFor="billingAddress.id_number" className="block mb-2">
											CPF ou CNPJ
										</label>

										<div className="">
											<input
												type="text"
												id="billingAddress.id_number"
												{...register('billingAddress.id_number', {
													required: true
												})}
												className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.billingAddress?.id_number ? 'border-red-700' : 'focus:border-gray-400'}`}
												placeholder="CPF ou CNPJ"
												disabled={false}
											/>
											{errors.billingAddress?.id_number && (
												<p className="text-red-700">Este campo deve ser preenchido</p>
											)}
										</div>
									</div>

									<div className="flex items-center gap-2 text-gray-600 text-sm mt-4 mb-6">
										<input
											type="checkbox"
											id="billingAddress.sameAddress"
											{...register('billingAddress.sameAddress', {
												required: true
											})}
											className=""
											checked
										/>

										<label htmlFor="billingAddress.sameAddress">
											Minhas informações de cobrança e entrega são as mesmas
										</label>
									</div>

									{/* Pessoa que pagará pelo pedido */}
									<div className="mb-3">
										<div className="font-bold text-lg mb-3">Pessoa que pagará pelo pedido</div>

										<div className="mb-3">
											<label htmlFor="billingAddress.first_name" className="block mb-2">
												Nome
											</label>

											<div className="">
												<input
													type="text"
													id="billingAddress.first_name"
													{...register('billingAddress.first_name', {
														required: true
													})}
													className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.billingAddress?.first_name ? 'border-red-700' : 'focus:border-gray-400'}`}
													placeholder="Nome"
													disabled={false}
												/>
												{errors.billingAddress?.first_name && (
													<p className="text-red-700">Este campo deve ser preenchido</p>
												)}
											</div>
										</div>

										<div className="mb-3">
											<label htmlFor="billingAddress.last_name" className="block mb-2">
												Sobrenome
											</label>

											<div className="">
												<input
													type="text"
													id="billingAddress.last_name"
													{...register('billingAddress.last_name', {
														required: true
													})}
													className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.billingAddress?.last_name ? 'border-red-700' : 'focus:border-gray-400'}`}
													placeholder="Nome"
													disabled={false}
												/>
												{errors.billingAddress?.last_name && (
													<p className="text-red-700">Este campo deve ser preenchido</p>
												)}
											</div>
										</div>

										<div className="mb-3">
											<label htmlFor="billingAddress.phone" className="block mb-2">
												Telefone
											</label>

											<div className="">
												<input
													type="tel"
													id="billingAddress.phone"
													{...register('billingAddress.phone', {
														required: true
													})}
													className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.billingAddress?.phone ? 'border-red-700' : 'focus:border-gray-400'}`}
													placeholder="Telefone"
													disabled={false}
												/>
												{errors.billingAddress?.phone && (
													<p className="text-red-700">Este campo deve ser preenchido</p>
												)}
											</div>
										</div>
									</div>

									{/* ​Endereço da pessoa que pagará pelo pedido */}
									<div className="mb-3">
										<div className="font-bold text-lg mb-3">
											​Endereço da pessoa que pagará pelo pedido
										</div>

										<div className="mb-3">
											<label htmlFor="billingAddress.zipcode" className="block mb-2">
												CEP
											</label>

											<div className="">
												<input
													type="text"
													id="billingAddress.zipcode"
													{...register('billingAddress.zipcode', {
														required: true
													})}
													className={`w-full p-3 border rounded-md bg-gray-100
											focus:outline-none text-gray-700 disabled:opacity-70
											${errors.billingAddress?.zipcode ? 'border-red-700' : 'focus:border-gray-400'}`}
													placeholder="CEP"
													disabled={false}
												/>
												{errors.billingAddress?.zipcode && (
													<p className="text-red-700">Este campo deve ser preenchido</p>
												)}
											</div>
										</div>
									</div>
								</div>
							</form>
						)}
					</section>

					<section className="flex flex-col gap-3 w-full md:w-4/12">
						<div className="flex flex-col gap-3 bg-white rounded-md p-6 border">
							<div className="text-xl font-bold font-serif text-gray-700 cursor-default">
								Detalhes do pedido
							</div>

							<div className="flex flex-col gap-2 border-b pb-4">
								{cartItems.map((item, index) => (
									<div
										className={`flex gap-2 items-center font-sans text-sm text-gray-700`}
										key={item.id}
									>
										<div className="relative h-12 w-12 rounded-md overflow-hidden">
											<Image
												src={`/gallery/${item.images[0]}`}
												layout="fill"
												objectFit="cover"
												alt={item.name}
											/>
										</div>

										<div className="w-7/12">
											{item.name} x {item.qty}
										</div>

										<div className="flex-1 text-right whitespace-nowrap">
											{formatCurrency(item.qty * item.price)}
										</div>
									</div>
								))}
							</div>

							<ul className="flex flex-col gap-2 font-sans text-gray-700">
								<li>
									<div className="flex justify-between">
										<div className="">Subtotal</div>
										<div className="">{formatCurrency(orderDetails.subtotal)}</div>
									</div>
								</li>

								<li>
									{coupon && (
										<div className="flex justify-between">
											<div className="">Cupom "{coupon.coupon}"</div>
											<div className="whitespace-nowrap text-green-700">
												- {formatCurrency(orderDetails.coupon)}
											</div>
										</div>
									)}
								</li>

								<li>
									{selectedShipping && (
										<div className="flex justify-between">
											<div className="">Frete</div>
											<div className="">{formatCurrency(selectedShipping.Valor)}</div>
										</div>
									)}
								</li>

								<li>
									<div className="flex justify-between">
										<div className="">Imposto</div>
										<div className="">{formatCurrency(0)}</div>
									</div>
								</li>

								<li className="mt-3">
									<div className="flex justify-between font-bold text-xl text-blue-900">
										<div className="">Total</div>
										<div className="">{formatCurrency(orderDetails.total)}</div>
									</div>
								</li>
							</ul>
						</div>
					</section>
				</div>
			</main>

			<Footer />
		</>
	)
}

export default Checkout
