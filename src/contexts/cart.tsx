import axios from 'axios'
import { PrecoPrazoEvent } from 'correios-brasil/dist'
import currency from 'currency.js'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { formatCurrencyToValue } from '../utils/formatCurrency'

import { definitions } from '../utils/types/supabase'

interface ICorreiosPrecoPrazo extends PrecoPrazoEvent {
	Nome: string
}

type OrderDetails = {
	subtotal: number
	coupon: number
	tax: number
	total: number
}

type Product = {
	id: string
	name: string
	price: number
	available: number
	slug: string
	images: string
	qtd: number
}

type CartContextData = {
	cartItems: Product[]
	coupon: definitions['_coupons']
	orderDetails: OrderDetails
	selectedShipping: ICorreiosPrecoPrazo | null
	selectShipping(_shipping: ICorreiosPrecoPrazo): void
	removeShipping(): void
	addItemToCart(product: Product): void
	addCoupon(cpn: string): Promise<boolean>
	removeCoupon(): void
	removeItemToCart(id: string): void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export const CartContextProvider: React.FC = ({ children }) => {
	const [cartItems, setCartItems] = useState<Product[]>([])
	const [orderDetails, setOrderDetails] = useState<OrderDetails>({} as OrderDetails)

	const [coupon, setCoupon] = useState<definitions['_coupons'] | null>(null)

	const [selectedShipping, setSelectedShipping] = useState<ICorreiosPrecoPrazo | null>(null)

	const selectShipping = (_shipping: ICorreiosPrecoPrazo) => setSelectedShipping(_shipping)

	const removeShipping = () => setSelectedShipping(null)

	const addItemToCart = (product: Product) => {
		let existingItem = cartItems.findIndex(value => value.id === product.id)

		let newItems = [...cartItems]

		if (existingItem !== -1) {
			let newAmount = newItems[existingItem].qtd + product.qtd

			newAmount = newAmount > product.available ? product.available : newAmount

			if (newAmount === 0) {
				let newItemsFiltered = newItems.filter((_, index) => index !== existingItem)

				newItems = newItemsFiltered
			} else {
				newItems[existingItem] = { ...newItems[existingItem], qtd: newAmount }
			}
		} else {
			newItems.push(product)
		}

		const xxx = newItems.map(item => ({ id: item.id, qtd: item.qtd }))

		localStorage.setItem('__ds-trac', JSON.stringify(xxx))

		setCartItems(newItems)
	}

	const removeItemToCart = (id: string) => {
		let newItemsFiltered = cartItems.filter(value => value.id !== id)

		const xxx = newItemsFiltered.map(item => ({ id: item.id, qtd: item.qtd }))

		localStorage.setItem('__ds-trac', JSON.stringify(xxx))

		setCartItems(newItemsFiltered)
	}

	const orderDetailsCalculate = () => {
		const subtotal = cartItems.reduce((previousValue, currentValue) => {
			let cValue = currency(currentValue.price)
			let itemPriceTotal = cValue.multiply(currentValue.qtd)
			let sumWithPreviousValue = itemPriceTotal.add(previousValue).value

			return sumWithPreviousValue
		}, 0)

		const cpn = coupon ? (coupon.discount * subtotal) / 100 : 0

		const total = subtotal - cpn + (selectedShipping ? formatCurrencyToValue(selectedShipping?.Valor) : 0)

		setOrderDetails(obj => {
			return { ...obj, subtotal, coupon: cpn, total }
		})
	}

	const addCoupon = async (cpn: string): Promise<boolean> => {
		const { data: _coupon } = await axios.get(`/api/shop/cart/coupon`, { params: { cpn } })

		if (_coupon?.error) return false

		setCoupon(_coupon)

		return true
	}

	const removeCoupon = () => setCoupon(null)

	useEffect(() => {
		let storedItems = JSON.parse(localStorage.getItem('__ds-trac'))

		const getAllItemsFromTheCart = async (items: { id: string; qtd: number }[]) => {
			const asyncRes = await Promise.all(
				items.map(async ({ id, qtd }) => {
					const { data } = await axios.get<Product>(`/api/shop/cart/${id}`)

					return { ...data, qtd: qtd > data.available ? data.available : qtd }
				})
			)

			setCartItems(asyncRes)
		}

		if (storedItems) getAllItemsFromTheCart(storedItems)
	}, [])

	useEffect(orderDetailsCalculate, [cartItems, coupon, selectedShipping])

	useEffect(() => {
		if (cartItems.length <= 0) removeShipping()
	}, [cartItems])

	return (
		<CartContext.Provider
			value={{
				cartItems,
				coupon,
				orderDetails,
				selectedShipping,
				selectShipping,
				removeShipping,
				addCoupon,
				removeCoupon,
				addItemToCart,
				removeItemToCart
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => useContext(CartContext)
