import React, { useEffect, useState } from 'react'
import { GoArrowUp } from 'react-icons/go'

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
				<GoArrowUp className="text-gray-500 group-hover:text-black transition-colors duration-300" size={24} />
			</button>
		</div>
	)
}

export default ScrollTop
