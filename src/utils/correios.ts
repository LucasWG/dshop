const shippingCodes = [
	{ codigo: '04014', name: 'SEDEX' },
	{ codigo: '04510', name: 'PAC' }
]

export const getShippingCodeName = (code: string): string => {
	const codeFiltered = shippingCodes.find(cod => cod.codigo === code)

	return codeFiltered.name
}
