import Head from 'next/head'
import React from 'react'

import Footer from '../../components/footer'
import Header from '../../components/header'
import { useCart } from '../../contexts/cart'

const Checkout: React.FC = () => {
	const {} = useCart()

	return (
		<>
			<Head>
				<title>Checkout - {process.env.NEXT_PUBLIC_NAME}</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6">
				<div className="font-bold text-2xl font-serif text-center">CHECKOUT</div>
			</main>

			<Footer />
		</>
	)
}

export default Checkout
