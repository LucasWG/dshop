import { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'

import 'tailwindcss/tailwind.css'

import '../styles/global.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<meta content="width=device-width, initial-scale=1" name="viewport" />
			</Head>

			<Component {...pageProps} />
		</>
	)
}

export default MyApp
