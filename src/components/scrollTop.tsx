import React, { useEffect, useState } from 'react'

const ScrollTop: React.FC = () => {
	const [goToTopEnabled, setGoToTopEnabled] = useState(false)

	const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

	useEffect(() => {
		const handleScroll = () => {
			let scrolled = document.scrollingElement.scrollTop

			setGoToTopEnabled(scrolled >= 140)
		}

		if (typeof window !== `undefined`) {
			window.addEventListener('scroll', handleScroll)
		}

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	if (!goToTopEnabled) return null

	return (
		<div className="fixed bottom-10 right-10 leading-none transition-all delay-700 duration-300 ease-in-out">
			<button type="button" className="bg-white border-2 rounded-full p-2 shadow-md group" onClick={scrollTop}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-gray-500 group-hover:text-black transition-colors duration-300"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
				</svg>
			</button>
		</div>
	)
}

export default ScrollTop
