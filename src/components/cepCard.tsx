import axios from 'axios'
import { CepResponse, PrecoPrazoEvent } from 'correios-brasil/dist'
import { addDays } from 'date-fns'
import Cookie from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { GrLocation } from 'react-icons/gr'
import { HiOutlineSearch, HiOutlineTruck } from 'react-icons/hi'
import { ImSpinner9 } from 'react-icons/im'

import { useCart } from '../contexts/cart'
import { getShippingCodeName } from '../utils/correios'
import { formatCurrency, formatCurrencyToValue } from '../utils/formatCurrency'

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
						<GrLocation className="inline-block mr-2" size={24} />

						<span className="align-middle">{address.cep}</span>
					</div>

					<div>
						<span className="uppercase font-sans text-sm">
							{address.logradouro} - {address.bairro}, {address.localidade}, {address.uf}.
						</span>
					</div>

					{shipping.map((_shipping, key) => (
						<div
							className={`flex gap-2 p-2 rounded border shadow ${
								selectedShipping?.Codigo === _shipping.Codigo
									? 'bg-green-700 text-white'
									: 'bg-gray-50 hover:bg-gray-100'
							} transition-colors duration-300 cursor-pointer`}
							onClick={() => selectShipping(_shipping)}
							key={key}
						>
							<HiOutlineTruck
								className={`inline-block h-full mr-2 ${
									selectedShipping?.Codigo === _shipping.Codigo && 'text-white'
								}`}
								size={40}
							/>

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
							<ImSpinner9 className="animate-spin -ml-1x mr-3x text-gray-700" size={24} />
						</button>
					) : (
						<button
							type="submit"
							className="absolute inset-y-0 right-0 px-4 focus:outline-none border-l"
							disabled={cepInputLoading}
						>
							<HiOutlineSearch className="text-gray-700" size={24} />
						</button>
					)}
				</form>
			)}
		</div>
	)
}

export default CepCard
