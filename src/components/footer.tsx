import Link from 'next/link'
import React from 'react'

import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { FiTwitter } from 'react-icons/fi'

const Footer: React.FC = () => {
	//

	return (
		<footer className="bg-gray-800 pt-5 sm:mt-10">
			<div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
				<div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
					<div className="text-xs uppercase text-gray-400 font-medium mb-6">Getting Started</div>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Installation
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Release Notes
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Upgrade Guide
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Using with Preprocessors
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Optimizing for Production
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Browser Support
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							IntelliSense
						</a>
					</Link>
				</div>

				<div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
					<div className="text-xs uppercase text-gray-400 font-medium mb-6">Core Concepts</div>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Utility-First
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Responsive Design
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Hover, Focus, &amp; Other States
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Dark Mode
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Adding Base Styles
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Extracting Components
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Adding New Utilities
						</a>
					</Link>
				</div>

				<div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
					<div className="text-xs uppercase text-gray-400 font-medium mb-6">Customization</div>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Configuration
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Theme Configuration
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Breakpoints
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Customizing Colors
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Customizing Spacing
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Configuring Variants
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Plugins
						</a>
					</Link>
				</div>

				<div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
					<div className="text-xs uppercase text-gray-400 font-medium mb-6">Community</div>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							GitHub
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Discord
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							Twitter
						</a>
					</Link>

					<Link href="/">
						<a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
							YouTube
						</a>
					</Link>
				</div>
			</div>

			{/* Copyright Bar */}
			<div className="pt-2">
				<div
					className="flex pb-5 px-3 m-auto pt-5 border-t border-gray-500 text-gray-400 text-sm flex-col
					md:flex-row max-w-6xl gap-5 items-center"
				>
					<div className="mt-2">© Copyright {new Date().getFullYear()}. All Rights Reserved.</div>

					<div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex order-first md:order-none gap-2">
						<Link href="/">
							<a>
								<FaFacebookF size={18} />
							</a>
						</Link>

						<Link href="/">
							<a>
								<FiTwitter size={18} />
							</a>
						</Link>

						<Link href="/">
							<a>
								<FaYoutube size={18} />
							</a>
						</Link>

						<Link href="/">
							<a>
								<FaLinkedin size={18} />
							</a>
						</Link>

						<Link href="/">
							<a>
								<FaInstagram size={18} />
							</a>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
