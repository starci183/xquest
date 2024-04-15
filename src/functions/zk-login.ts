import {
	generateNonce,
	generateRandomness,
} from "@mysten/zklogin"
import { SuiClient } from "@mysten/sui.js/client"
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519"
import { saveZkLoginSession } from "./storage"

export interface RandomessAndNonce {
  randomness: string;
  nonce: string;
}

export enum AuthProviderEnum {
  Google,
  Facebook,
}

export const zkLogin = async (
	providerEnum: AuthProviderEnum = AuthProviderEnum.Google
) => {
	const FULLNODE_URL = "https://fullnode.devnet.sui.io"

	const suiClient = new SuiClient({ url: FULLNODE_URL })
	const { epoch } = await suiClient.getLatestSuiSystemState()
	const maxEpoch = Number(epoch) + 2

	const ephemeralKeyPair = new Ed25519Keypair()
	const randomness = generateRandomness()

	const nonce = generateNonce(
		ephemeralKeyPair.getPublicKey(),
		maxEpoch,
		randomness
	)

	let url: string

	switch (providerEnum) {
	case AuthProviderEnum.Google: {
		const redirectUrl = window.location.href
		const clientId = "577757506042-ovo8q5jhvnqtkl4mkd73ll72k709rsbf.apps.googleusercontent.com"
		url =  `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=id_token&redirect_uri=${redirectUrl}&scope=openid&nonce=${nonce}`
		break
	}
	default:
		url = ""
	}

	saveZkLoginSession({
		ephemeralPrivateKey: ephemeralKeyPair.getSecretKey(),
		jwtRandomness: randomness,
		maxEpoch
	})
	window.location.replace(url)
}
