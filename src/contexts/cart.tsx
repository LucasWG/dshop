import axios from 'axios'
import currency from 'currency.js'
import React, { createContext, useContext, useEffect, useState } from 'react'

type Coupon = { coupon: string; discount: number }

type OrderDetails = {
	subtotal: number
	Coupon: number
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
	orderDetails: OrderDetails
	addItemToCart(product: Product): void
	removeItemToCart(id: string): void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export const CartContextProvider: React.FC = ({ children }) => {
	const [cartItems, setCartItems] = useState<Product[]>([])
	const [orderDetails, setOrderDetails] = useState<OrderDetails>({} as OrderDetails)

	const [shippingSelected, setShippingSelected] = useState()

	const [coupon, setCoupon] = useState<Coupon>({} as Coupon)

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

		const total = subtotal

		setOrderDetails(obj => {
			return { ...obj, subtotal, total }
		})
	}

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

	useEffect(orderDetailsCalculate, [cartItems])

	return (
		<CartContext.Provider value={{ cartItems, orderDetails, addItemToCart, removeItemToCart }}>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => useContext(CartContext)
