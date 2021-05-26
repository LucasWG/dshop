import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import Footer from '../components/footer'
import Header from '../components/header'
import ScrollTop from '../components/scrollTop'

const Home: NextPage = () => {
	//

	return (
		// TEMP
		<div className="flex flex-col justify-between h-screen">
			<Head>
				<title>{process.env.NEXT_PUBLIC_NAME}</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6">
				<h1>HOME</h1>
			</main>

			<ScrollTop />

			<Footer />
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	//

	return {
		props: {}
	}
}

export default Home
