export const formatAddress = (address?: string) => address ? `${address.slice(0, 4)}...${address.slice(-2)}` : null