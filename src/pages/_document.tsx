import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<Html lang="pt-br">
				<Head>
					<meta charSet="utf-8" />

					<meta content="IE=edge" httpEquiv="X-UA-Compatible" />
					<meta name="robots" content="follow, index" />

					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap"
						rel="stylesheet"
					/>

					<link rel="icon" href="/favicon.ico" />
					{/* <link rel="shortcut icon" href="/favicon.png" type="image/png" /> */}
					{/* <link rel="shortcut icon" href="/favicon.svg" type="image/svg" /> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
