import React, { useContext } from "react"
import {
	Card,
	CardBody,
	CardFooter,
	Image,
	Link,
} from "@nextui-org/react"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { RootContext } from "../hooks"
import { CurrentPage } from "../hooks/useRootReducer"

export const SelectChainPage = () => {
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
							payload: CurrentPage.LoginPage,
						})
					}
				>
					<ArrowLeftIcon className="w-10 h-10" strokeWidth={2} />
				</Link>
				<div className="text-4xl font-semibold"> Select Chain </div>
			</div>
			<Card isPressable onPress={() => dispatch({
				type: "SET_CURRENT_PAGE",
				payload: CurrentPage.SuiZkLoginPage
			})}>
				<CardBody>
					<Image
						classNames={{
							img: "object-contain h-full w-full",
							wrapper: "aspect-square w-20 h-20",
						}}
						className=""
						src="sui-logo.svg"
					/>
				</CardBody>
				<CardFooter>
					<div className="w-full text-center">SUI</div>
				</CardFooter>
			</Card>
		</div>
	)
}
