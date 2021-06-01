import axios from 'axios'
import { CepResponse, PrecoPrazoEvent } from 'correios-brasil/dist'
import React, { useEffect, useState } from 'react'

import { getShippingCodeName } from '../utils/correios'
import { formatCurrency, formatCurrencyToValue } from '../utils/formatCurrency'

import Cookie from 'js-cookie'
import { addDays } from 'date-fns'
import { useCart } from '../contexts/cart'

interface ICorreiosPrecoPrazo extends PrecoPrazoEvent {
	Nome: string
}

const CepCard: React.FC = () => {
	const { selectedShipping, selectShipping, removeShipping } = useCart()

	const [address, setAddress] = useState<CepResponse>(null)
	const [shipping, setShipping] = useState<ICorreiosPrecoPrazo[]>(null)

	const [cepInputLoading, setCepInputLoading] = useState(false)
	const [cepInputError, setCepInputError] = useState(false)

	const handleCep = async (cep: string) => {
		setCepInputLoading(true)
		setCepInputError(false)

		try {
			const cepResponse = await axios.get<CepResponse>(`/api/cep-validate`, { params: { cep } })

			const productShippingArgs = {
				sCepOrigem: '96817-000',
				sCepDestino: cep,
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

			calculateShippingData = calculateShippingData.sort(
				(a, b) => (formatCurrencyToValue(a.Valor) > formatCurrencyToValue(b.Valor) && 1) || -1
			)

			saveCookie('__ds-pec', cepResponse.data.cep.replace('-', ''))

			setAddress(cepResponse.data)
			setShipping(calculateShippingData)
			if (!selectedShipping) selectShipping(calculateShippingData[0])
		} catch (err) {
			setCepInputError(true)
		}

		setCepInputLoading(false)
	}

	const handleFormCepSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		handleCep(event.target[0].value)
	}

	const handleClearCep = () => {
		deleteCookie('__ds-pec')
		setAddress(null)
		setShipping(null)
		removeShipping()
	}

	// COOKIE	-------------------------------------------------------------------------------------------------------

	const saveCookie = (cookieName: string, value: string, expiresDay: number = 1): void => {
		Cookie.set(cookieName, value, {
			expires: addDays(new Date(), expiresDay),
			secure: process.env.NODE_ENV === 'production'
		})
	}

	const getCookie = (cookieName: string): string => Cookie.get(cookieName)

	const deleteCookie = (cookieName: string): void => Cookie.remove(cookieName)

	// COOKIE	-------------------------------------------------------------------------------------------------------

	useEffect(() => {
		let _cookie = getCookie('__ds-pec')

		if (_cookie) handleCep(_cookie)
	}, [])

	return (
		<div className="flex flex-col gap-6 bg-white rounded-md p-6 border">
			<label htmlFor="calculateShipping" className="text-xl font-bold font-serif text-gray-700">
				Previsão de entrega
			</label>

			{shipping ? (
				<div className="flex flex-col gap-2">
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
						<div
							className={`flex gap-2 p-2 rounded-lg ${
								selectedShipping?.Codigo === _shipping.Codigo
									? 'bg-gray-300 cursor-default'
									: 'bg-gray-50 hover:bg-gray-100 cursor-pointer'
							}`}
							onClick={() => selectShipping(_shipping)}
							key={key}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-full w-10 inline-block mr-2 text-gray-700"
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

								<span className="align-middle">{formatCurrency(_shipping.Valor)}</span>
							</div>
						</div>
					))}

					<span className="text-gray-500">
						Os preços, prazos e tipos de entrega são validos apenas para este produto em consulta.
					</span>

					<button
						type="button"
						className="flex items-center justify-center gap-3 p-3 border rounded-md text-gray-600
								hover:text-gray-900 hover:border-gray-300 hover:bg-gray-200 transition-colors
								duration-300 mt-3 bg-gray-100"
						onClick={handleClearCep}
					>
						<span>ALTERAR CEP</span>
					</button>
				</div>
			) : (
				<form className="relative" autoComplete="off" onSubmit={event => handleFormCepSubmit(event)}>
					<input
						type="text"
						id="calculateShipping"
						name="calculateShipping"
						className={`w-full py-3 pl-3 pr-16 border rounded-md bg-gray-50 focus:outline-none
						focus:border-gray-400 text-gray-700 ${cepInputError && 'border-red-600'} disabled:opacity-60`}
						placeholder="00000-000"
						disabled={cepInputLoading}
					/>

					{cepInputLoading ? (
						<button
							type="button"
							className="absolute inset-y-0 right-0 px-4 focus:outline-none border-l"
							disabled={cepInputLoading}
						>
							<svg
								className="animate-spin -ml-1x mr-3x h-6 w-6 text-gray-700"
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
						<button
							type="submit"
							className="absolute inset-y-0 right-0 px-4 focus:outline-none border-l"
							disabled={cepInputLoading}
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
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>
					)}
				</form>
			)}
		</div>
	)
}

export default CepCard
