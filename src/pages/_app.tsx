import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { CartContextProvider } from '../contexts/cart'

import 'tailwindcss/tailwind.css'
import '../styles/global.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<CartContextProvider>
			<Head>
				<meta content="width=device-width, initial-scale=1" name="viewport" />
			</Head>

			<Component {...pageProps} />
		</CartContextProvider>
	)
}

export default MyApp
