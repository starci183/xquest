import React, { useContext } from "react"
import { Link } from "@nextui-org/react"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { RootContext } from "../hooks"
import { CurrentPage } from "../hooks/useRootReducer"
import { LoginWithGoogleButton } from "../components"
import { LoginWithFacebookButton } from "../components/LoginWithFacebookButton"

export const SuiZkLoginPage = () => {
	const { reducer } = useContext(RootContext)!
	const [, dispatch] = reducer
	return (
		<div className="grid place-items-center h-full w-full">
			<div className="flex gap-2 items-center">
				<Link
					as="button"
					color="foreground"
					onPress={() =>
						dispatch({
							type: "SET_CURRENT_PAGE",
							payload: CurrentPage.SelectChainPage,
						})
					}
				>
					<ArrowLeftIcon className="w-10 h-10" strokeWidth={2} />
				</Link>
				<div className="text-4xl font-semibold"> SUI Zk Login </div>
			</div>
			<div className="w-full flex flex-col gap-4">
				<LoginWithGoogleButton/>
				<LoginWithFacebookButton/>
			</div>
		</div>
	)
}
