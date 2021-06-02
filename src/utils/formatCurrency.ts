import currency from 'currency.js'

const currencyOptions = {
	symbol: 'R$',
	separator: '.',
	decimal: ',',
	precision: 2
}

export const formatCurrency = (value: number | string) => currency(value, currencyOptions).format()

export const formatCurrencyToValue = (value: number | string) => currency(value, currencyOptions).value

// const formatter = new Intl.NumberFormat('pt-BR', {
// 	style: 'currency',
// 	currency: 'BRL'
// })

// export const formatCurrency = (value: number) => formatter.format(value)
