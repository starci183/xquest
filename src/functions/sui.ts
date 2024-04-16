import { SuiClient } from "@mysten/sui.js/client"
import { getZkLoginSignature } from "@mysten/zklogin"
const FULLNODE_URL = "https://fullnode.devnet.sui.io"
export const suiClient = new SuiClient({ url: FULLNODE_URL })

export type OpenIdProvider = "Google" | "Twitch" | "Facebook"

export type PartialZkLoginSignature = Omit<
	Parameters<typeof getZkLoginSignature>["0"]["inputs"],
	"addressSeed"
>;

export type AccountData = {
    provider: OpenIdProvider;
    userAddress: string;
    zkProofs: PartialZkLoginSignature;
    ephemeralPrivateKey: string;
    userSalt?: string;
    sub?: string;
    aud?: string;
    maxEpoch: number;
}

export const fetchBalance = async (account: AccountData) => {
	const balance =  await suiClient.getBalance({
		owner: account.userAddress,
		coinType: "0x2::sui::SUI",
	})
	console.log(balance)
	return balance
}
