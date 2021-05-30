import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'

type ImageWithFallbackProps = {
	src: string
	fallbackSrc: string
} & ImageProps

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallbackSrc, ...rest }) => {
	const [imgSrc, setImgSrc] = useState(src)

	return <Image {...rest} src={imgSrc} onError={() => setImgSrc(fallbackSrc)} />
}
