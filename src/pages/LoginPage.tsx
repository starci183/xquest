import { Button, Image } from "@nextui-org/react"
import React, { useContext } from "react"
import { RootContext } from "../hooks"
import { CurrentPage } from "../hooks/useRootReducer"

export const LoginPage = () => {
	const { reducer } = useContext(RootContext)!
	const [, dispatch] = reducer

	return (
		<div className="grid place-items-center h-full w-full">
			<Image src="x-quest-logo.png"/>
			<div className="gap-4 flex flex-col w-full"> 
				<Button
					onPress={() =>
						dispatch({
							type: "SET_CURRENT_PAGE",
							payload: CurrentPage.SelectChainPage,
						})
					}
					color="warning"
				>
        Create new wallet
				</Button>
				<Button color="warning" variant="bordered">
        Import an existed wallet
				</Button>
			</div>
		</div>
	)
}
