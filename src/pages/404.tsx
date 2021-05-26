import Head from 'next/head'
import React from 'react'
import Footer from '../components/footer'
import Header from '../components/header'

const E404: React.FC = () => {
	return (
		// TEMP
		<div className="flex flex-col justify-between h-screen">
			<Head>
				<title>404 - {process.env.NEXT_PUBLIC_NAME}</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6">
				<div className="flex items-center justify-center gap-3">
					<div className="font-bold text-lg">404</div>

					<div className="border h-12"></div>

					<div className="font-sans text-lg">This page could not be found.</div>
				</div>
			</main>

			<Footer />
		</div>
	)
}

export default E404
