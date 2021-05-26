import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import Footer from '../components/footer'
import Header from '../components/header'
import ScrollTop from '../components/scrollTop'

const Home: NextPage = () => {
	//

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_NAME}</title>
			</Head>

			<Header />

			<main className="container mx-auto px-6 my-28">
				<h1>HOME</h1>
			</main>

			<ScrollTop />

			<Footer />
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	//

	return {
		props: {}
	}
}

export default Home
