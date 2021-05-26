import axios from 'axios'
import { CepResponse, PrecoPrazoEvent } from 'correios-brasil/dist'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

import Footer from '../../../components/footer'
import Header from '../../../components/header'
import ScrollTop from '../../../components/scrollTop'
import { getShippingCodeName } from '../../../utils/correios'

interface ICorreiosPrecoPrazo extends PrecoPrazoEvent {
	Nome: string
}

const ProductPage: React.FC = () => {
	const inputCepRef = useRef<HTMLInputElement>(null)

	const [address, setAddress] = useState<CepResponse>(null)
	const [shipping, setShipping] = useState<ICorreiosPrecoPrazo[]>(null)

	const [cepInputLoading, setCepInputLoading] = useState(false)
	const [cepInputError, setCepInputError] = useState(false)

	const calculateShipping = async () => {
		setCepInputLoading(true)
		setCepInputError(false)

		try {
			const cepResponse = await axios.get(`/api/cep-validate`, { params: { cep: inputCepRef.current.value } })

			// TEMP
			localStorage.setItem('tempCepDev', inputCepRef.current.value)

			const productShippingArgs = {
				sCepOrigem: '96820-990', // '01001-000',
				sCepDestino: inputCepRef.current.value,
				nVlPeso: '1',
				nCdFormato: '1',
				nVlComprimento: '20',
				nVlAltura: '20',
				nVlLargura: '20',
				nCdServico: ['04014', '04510'],
				nVlDiametro: '0'
			}

			const calculateShippingResponse = await axios.get<PrecoPrazoEvent[]>('/api/calculate-shipping', {
				params: { ...productShippingArgs }
			})

			let calculateShippingData = calculateShippingResponse.data.map(cpp => {
				return {
					...cpp,
					Nome: getShippingCodeName(cpp.Codigo)
				}
			})

			calculateShippingData = calculateShippingData.sort((a, b) => a.Valor.localeCompare(b.Valor))

			setAddress(cepResponse.data)
			setShipping(calculateShippingData)
		} catch (err) {
			setCepInputError(true)
		}

		setCepInputLoading(false)
	}

	const changeCep = () => {
		// TEMP
		localStorage.removeItem('tempCepDev')
		setAddress(null)
		setShipping(null)
	}

	useEffect(() => {
		if (inputCepRef && !shipping) {
			const tempCepDev = localStorage.getItem('tempCepDev') // TEMP

			inputCepRef.current.value = tempCepDev || ''
		}
	}, [inputCepRef])

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_NAME}</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6">
				<section className="flex my-9 bg-white rounded-md flex-col md:flex-row">
					<section className="flex-1 p-3">
						<div className="flex gap-3 border-b pb-6">
							<ul className="w-3/12x flex flex-col gap-1">
								{[...new Array(3).keys()].map((_, key) => (
									<li
										className="relative w-16 h-16 border-2 hover:border-gray-400 cursor-pointer
										rounded-full overflow-hidden"
										key={key}
									>
										<Image
											src="/shop/gallery/product-image-placeholder.jpg"
											quality={100}
											layout="fill"
											objectFit="fill"
											alt="Vela de altar 20x7 branca"
										/>
									</li>
								))}
							</ul>

							<div className="relative flex-1 h-80">
								<Image
									src="/shop/gallery/product-image-placeholder.jpg"
									layout="fill"
									objectFit="contain"
									quality={100}
								/>
							</div>
						</div>

						<div className="my-4">
							<h2 className="mb-3">Características principais</h2>

							<table className="table-auto bg-gray-100 rounded border w-full">
								<tbody className="text-left">
									<tr className="flex flex-col sm:flex-row leading-none border-b">
										<th className="flex-1 sm:flex-none sm:w-3/12 p-4">Fabricante</th>
										<td className="flex-1 p-4 bg-gray-50">
											<span className="">Velas Cairan</span>
										</td>
									</tr>

									<tr className="flex flex-col sm:flex-row leading-none border-b">
										<th className="flex-1 sm:flex-none sm:w-3/12 p-4">Tipo de vela</th>
										<td className="flex-1 p-4 bg-gray-50">
											<span className="">Votiva 7 dias Parafina</span>
										</td>
									</tr>

									<tr className="flex flex-col sm:flex-row leading-none border-b">
										<th className="flex-1 sm:flex-none sm:w-3/12 p-4">Cor</th>
										<td className="flex-1 p-4 bg-gray-50">
											<span className="">Branco</span>
										</td>
									</tr>

									<tr className="flex flex-col sm:flex-row leading-none border-b">
										<th className="flex-1 sm:flex-none sm:w-3/12 p-4">Altura</th>
										<td className="flex-1 p-4 bg-gray-50">
											<span className="">15 cm</span>
										</td>
									</tr>

									<tr className="flex flex-col sm:flex-row leading-none border-b">
										<th className="flex-1 sm:flex-none sm:w-3/12 p-4">Diâmetro</th>
										<td className="flex-1 p-4 bg-gray-50">
											<span className="">5 cm</span>
										</td>
									</tr>

									<tr className="flex flex-col sm:flex-row leading-none border-b">
										<th className="flex-1 sm:flex-none sm:w-3/12 p-4">Formato de venda</th>
										<td className="flex-1 p-4 bg-gray-50">
											<span className="">Kit</span>
										</td>
									</tr>

									<tr className="flex flex-col sm:flex-row leading-none border-b">
										<th className="flex-1 sm:flex-none sm:w-3/12 p-4">Unidades por kit</th>
										<td className="flex-1 p-4 bg-gray-50">
											<span className="">12</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="my-4">
							<h2 className="mb-3">Descrição</h2>

							<p>Velas Votivas de 7 dias.</p>
							<p>Peso Liquido: 260g.</p>
							<p>Embalagem: 12 unidades brancas</p>
							<p>Prazo de Validade: Indeterminado</p>
							<p>Composto: Parafina, Corante, Pavio e Celofane</p>
							<p>Medidas: Diâmetro = 5,0 cm e Altura = 15 cm</p>

							<br />

							<p>
								Duração: cerca de 7 dias, podendo variar para mais ou para menos, devido a várias
								condições como vento, recipiente, umidade, temperatura do ambiente e lotes do pavio e da
								parafina.
							</p>

							<br />

							<p>Embrulhada em papel CELOFANE(plástico especial).</p>

							<br />

							<p>Caixa de envio REFORÇADA e sem folgas: velas intactas.</p>

							<br />

							<p>Marca da empresa no Celofane.</p>

							<br />

							<p>
								Agradecemos pela sua visita e preferência. Desejamos a todos boas compras e estamos
								sempre à disposição.
							</p>

							<br />

							<p>Atenciosamente</p>

							<p>Equipe XXX</p>
						</div>
					</section>

					<section className="flex flex-col w-full md:w-6/12 gap-3 p-3">
						<section className="flex flex-col gap-6 break-all">
							<div className="">
								<h1>Vela 7 Dias Branco 260g 5x15cm</h1>
							</div>

							<div className="">
								<span className="font-sans text-3xl cursor-default select-none mt-2">R$ 12,50</span>
							</div>

							{shipping ? (
								<div className="flex flex-col gap-2">
									<h3 className="mb-3">Previsão de entrega</h3>

									<div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6 inline-block mr-2"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>

										<span className="align-middle">{address.cep}</span>
									</div>

									<div>
										<span className="uppercase font-sans text-sm">
											{address.logradouro} - {address.bairro}, {address.localidade}, {address.uf}.
										</span>
									</div>

									{shipping.map((_shipping, key) => (
										<div className="flex gap-2 cursor-default bg-gray-50 p-2" key={key}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-full w-10 inline-block mr-2"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
												/>
											</svg>

											<div className="flex flex-col gap-1">
												<span className="align-middle font-bold">{_shipping.Nome}</span>

												<span className="align-middle">
													Dia da Postagem + {_shipping.PrazoEntrega}{' '}
													{Number(_shipping.PrazoEntrega) === 1 ? 'dia útil' : 'dias úteis'}
												</span>

												<span className="align-middle">R$ {_shipping.Valor}</span>
											</div>
										</div>
									))}

									<span className="text-gray-500">
										Os preços, prazos e tipos de entrega são validos apenas para este produto em
										consulta.
									</span>

									<button
										type="button"
										className="p-2 transition ease-in duration-200 uppercase rounded hover:bg-gray-800
										hover:text-white border focus:outline-none bg-gray-200"
										onClick={changeCep}
									>
										Alterar cep
									</button>
								</div>
							) : (
								<div className="flex flex-col gap-3">
									<label htmlFor="calcFrete" className="font-sans">
										Calcular frete e prazo
									</label>

									<div className="flex gap-3">
										<input
											type="cep"
											id="calcFrete"
											ref={inputCepRef}
											className={`w-full p-3 border ${cepInputError && 'border-red-500'}`}
											placeholder="00000-000"
											autoComplete="off"
											disabled={cepInputLoading}
										/>

										{cepInputLoading ? (
											<button type="button" className="focus:outline-none">
												<svg
													className="animate-spin -ml-1 mr-3 h-6 w-6 text-red-600"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
											</button>
										) : (
											<button type="button" className="px-2" onClick={calculateShipping}>
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
														strokeWidth="2"
														d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
													/>
												</svg>
											</button>
										)}
									</div>
								</div>
							)}

							<div className="">
								<p>Estoque disponível</p>

								<div className="flex gap-2 items-center mt-2">
									<select name="" id="" className="flex-1 p-2 appearance-none">
										{[...new Array(26).keys()].map(value => (
											<option value={value + 1} key={value}>
												{value + 1}
											</option>
										))}
									</select>

									<span className="">(26 disponíveis)</span>
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<button
									type="button"
									className="p-2 transition ease-in duration-200 uppercase rounded hover:bg-gray-800
									hover:text-white border focus:outline-none bg-gray-300"
									onClick={() => {}}
								>
									Comprar agora
								</button>

								<button
									type="button"
									className="p-2 transition ease-in duration-200 uppercase rounded hover:bg-gray-800
									hover:text-white border focus:outline-none bg-gray-200"
									onClick={() => {}}
								>
									Adicionar ao Carrinho
								</button>
							</div>
						</section>

						<hr />
					</section>
				</section>
			</main>

			<ScrollTop />

			<Footer />
		</>
	)
}

export default ProductPage
