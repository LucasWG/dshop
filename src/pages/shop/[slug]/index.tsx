import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'

import CepCard from '../../../components/cepCard'
import Footer from '../../../components/footer'
import Header from '../../../components/header'
import ScrollTop from '../../../components/scrollTop'
import { useCart } from '../../../contexts/cart'
import { formatCurrency } from '../../../utils/formatCurrency'

const ProductPage: React.FC = () => {
	const router = useRouter()
	const { addItemToCart } = useCart()

	const [mockItem, setMockItem] = useState({
		uid: 'd6f475bd-5a74-48b6-8b94-4045dc0ceb2c',
		name: `PRODUCT TEST #d6f475bd-5a74-48b6-8b94-4045dc0ceb2c`,
		desc: `PRODUCT DESCRIPTION - d6f475bd-5a74-48b6-8b94-4045dc0ceb2c`,
		image: 'product-image-placeholder.jpg',
		price: 121.6,
		quant: 1,
		available: 8
	})

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

					<section className="flex flex-col w-full md:w-4/12 gap-3 p-3">
						<section className="flex flex-col gap-6 break-all">
							<div className="mb-2">
								<h1>Vela 7 Dias Branco 260g 5x15cm</h1>
							</div>

							{!!mockItem.available && (
								<div className="">
									<span className="font-sans text-3xl cursor-default select-none mt-2">
										{formatCurrency(mockItem.price)}
									</span>
								</div>
							)}

							<div className="">
								{!!mockItem.available ? (
									<p className="">Estoque disponível</p>
								) : (
									<p className="text-red-800">indisponível</p>
								)}

								{!!mockItem.available && (
									<>
										<div className="flex gap-2 items-center mt-2">
											<select
												name=""
												id=""
												className="flex-1 p-2 appearance-none"
												onChange={event =>
													setMockItem({ ...mockItem, quant: Number(event.target.value) })
												}
											>
												{[...new Array(mockItem.available).keys()].map(value => (
													<option value={value + 1} key={value}>
														{value + 1}
													</option>
												))}
											</select>

											<span className="font-extralight text-sm text-gray-500">
												{mockItem.available > 1
													? `(${mockItem.available} disponíveis)`
													: `(${mockItem.available} disponível)`}
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
									onClick={() => {
										addItemToCart(mockItem)

										return router.push(`/shop/cart#${router.query?.slug}`)
									}}
								>
									Comprar agora
								</button>

								<button
									type="button"
									className="flex items-center justify-center gap-3 p-3 border rounded-md text-gray-600
									hover:text-gray-900 hover:border-gray-300 hover:bg-gray-200 transition-colors
									duration-300 mt-3 bg-gray-100"
									onClick={() => addItemToCart(mockItem)}
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

export default ProductPage
