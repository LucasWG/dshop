import React, { createContext, useContext, useState } from 'react'

type Item = {
	uid: string
	name?: string
	desc?: string
	image?: string
	price?: number
	quant: number
	available: number
}

type CartContextData = {
	items: Item[]
	addItemToCart(item: Item): void
	removeItemToCart(uid: string): void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export const CartContextProvider: React.FC = ({ children }) => {
	const [items, setItems] = useState<Item[]>([])

	const addItemToCart = (item: Item) => {
		// TODO: RECEBER APENAS O UID E QUANTIDADE
		// TODO: BUSCAR PRODUTO NO BANCO PELO UID, PARA MANTER INFORMAÇÕES DO PRODUTO ATUALIZADAS.

		let existingItem = items.findIndex(value => value.uid === item.uid)
		let newItems = [...items]

		if (existingItem !== -1) {
			let newQuant = newItems[existingItem].quant + item.quant

			newQuant = newQuant > item.available ? item.available : newQuant

			if (newQuant === 0) {
				let newItemsFiltered = newItems.filter((_, index) => index !== existingItem)

				newItems = newItemsFiltered
			} else {
				newItems[existingItem] = { ...newItems[existingItem], quant: newQuant }
			}
		} else {
			newItems.push(item)
		}

		setItems(newItems)
	}

	const removeItemToCart = async (uid: string) => {
		let newItemsFiltered = items.filter(value => value.uid !== uid)

		setItems(newItemsFiltered)
	}

	return <CartContext.Provider value={{ items, addItemToCart, removeItemToCart }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
