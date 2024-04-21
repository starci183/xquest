import numeral from "numeral"

export const computeDenomination = (amount: bigint, decimals = 18, fractionDigits = 5) => {
	const decimalMultiplier = 10 ** fractionDigits
	const divisor = 10 ** decimals
	const result = Number(amount * BigInt(decimalMultiplier) / BigInt(divisor))
	return numeral(result / decimalMultiplier).format("0.0a")
}
