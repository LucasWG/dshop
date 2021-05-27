const formatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL'
})

export const formatCurrency = (value: number) => formatter.format(value)
