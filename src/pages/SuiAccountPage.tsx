import React, { useContext, useEffect } from "react"
import { RootContext } from "../hooks"
import { fetchBalance } from "../functions"
import { Button } from "@nextui-org/react"

export const SuiAccountPage = () => {
	const { reducer } = useContext(RootContext)!
	const [state, dispatch] = reducer
	const { sessions } = state
	const { sui } = sessions
	const { account } = { ...sui }

	useEffect(() => {
		const handleEffect = async () => {
			if (!account) return
			const { totalBalance } = await fetchBalance(account)
			dispatch({
				type: "SET_SUI_SESSION_BALANCE",
				payload: BigInt(totalBalance),
			})
		}
		handleEffect()
	}, [])
	console.log(account)
	return (
		<div className="grid place-items-center h-full w-full">
			<div className="flex gap-4">
				<Button variant="light">Home</Button>
				<Button variant="light">Quest</Button>
				<Button variant="light">Store</Button>
				<Button variant="light">Share</Button>
				<Button variant="light">Profile</Button>
			</div>
		</div>
	)
}
