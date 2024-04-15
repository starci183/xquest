import React from "react"
import { Button } from "@nextui-org/react"
import { GoogleIcon } from "./GoogleIcon"
import { zkLogin } from "../functions"

export const LoginWithGoogleButton = () => {
	const onPress = async () => {
		await zkLogin()
	}

	return (
		<Button
			color="warning"
			startContent={<GoogleIcon size={40} />}
			onPress={onPress}
			variant="bordered"
			className="w-full h-12"
		>
			<div className="w-[120px] text-end">Login with Google</div>
		</Button>
	)
}
