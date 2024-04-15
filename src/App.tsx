import React, { useContext, useEffect } from "react"
import { LoginPage, SelectChainPage, SuiZkLoginPage } from "./pages"
import { NextUIProvider } from "@nextui-org/react"
import { RootContext, RootProvider } from "./hooks"
import { CurrentPage } from "./hooks/useRootReducer"
import { jwtDecode } from "jwt-decode"
import { getExtendedEphemeralPublicKey, jwtToAddress } from "@mysten/zklogin"
import { getZkLoginSession, removeZkLoginSession } from "./functions/storage"
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519"
import { decodeSuiPrivateKey } from "@mysten/sui.js/cryptography"

export const App = () => {
	return (
		<NextUIProvider>
			<div className="light">
				<div className="container">
					<RootProvider>
						<WrappedApp />
					</RootProvider>
				</div>
			</div>
		</NextUIProvider>
	)
}

const keypairFromSecretKey = (privateKeyBase64: string): Ed25519Keypair => {
	const keyPair = decodeSuiPrivateKey(privateKeyBase64)
	return Ed25519Keypair.fromSecretKey(keyPair.secretKey)
}

const completeZkLogin = async () => {
	const urlFragment = window.location.hash.substring(1)
	const urlParams = new URLSearchParams(urlFragment)
	const jwt = urlParams.get("id_token")
	if (!jwt) {
		return
	}

	window.history.replaceState(null, "", window.location.pathname)

	const jwtPayload = jwtDecode(jwt)
	if (!jwtPayload.sub || !jwtPayload.aud) {
		console.warn("[completeZkLogin] missing jwt.sub or jwt.aud")
		return
	}

	const requestOptions = {
		method: "GET",
	}

	const saltResponse: { salt: string } | null = await fetch(
		"/test-salt.json",
		requestOptions
	)
		.then((res) => {
			console.debug("[completeZkLogin] salt service success")
			return res.json()
		})
		.catch((error: unknown) => {
			console.warn("[completeZkLogin] salt service error:", error)
			return null
		})
	if (!saltResponse) {
		return
	}

	const userSalt = BigInt(saltResponse.salt)
	const userAddr = jwtToAddress(jwt, userSalt)
	console.log(userAddr)

	const savedZkLoginSession = getZkLoginSession()
	if (!savedZkLoginSession) {
		console.warn("[completeZkLogin] missing session storage data")
		return
	}

	removeZkLoginSession()

	const ephemeralKeyPair = keypairFromSecretKey(
		savedZkLoginSession.ephemeralPrivateKey
	)
	const ephemeralPublicKey = ephemeralKeyPair.getPublicKey()
	const payload = JSON.stringify(
		{
			maxEpoch: savedZkLoginSession.maxEpoch,
			jwtRandomness: savedZkLoginSession.jwtRandomness,
			extendedEphemeralPublicKey:
        getExtendedEphemeralPublicKey(ephemeralPublicKey),
			jwt,
			salt: userSalt.toString(),
			keyClaimName: "sub",
		},
		null,
		2
	)

	await fetch("https://prover-dev.mystenlabs.com/v1", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: payload,
	})
		.then(res => {
			console.debug("[completeZkLogin] ZK proving service success")
			return res.json()
		})
		.catch((error: unknown) => {
			console.warn("[completeZkLogin] ZK proving service error:", error)
			return null
		})
}

const WrappedApp = () => {
	useEffect(() => {
		completeZkLogin()
	}, [])

	const { reducer } = useContext(RootContext)!
	const [state] = reducer
	const { currentPage } = state

	const renderPage = () => {
		switch (currentPage) {
		case CurrentPage.LoginPage:
			return <LoginPage />
		case CurrentPage.SelectChainPage:
			return <SelectChainPage />
		case CurrentPage.SuiZkLoginPage:
			return <SuiZkLoginPage />
		default:
			return null
		}
	}
	return renderPage()
}
