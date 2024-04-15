import React from "react"
import { Button } from "@nextui-org/react"
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth"
import { auth as firebaseAuth} from "../firebase"
import { FacebookIcon } from "./FacebookIcon"

export const LoginWithFacebookButton = () => {
	const provider = new FacebookAuthProvider()
    
	const onPress = async () => {
		try{
			const credential = await signInWithPopup(firebaseAuth, provider)
			const token = await credential.user.getIdToken()
			console.log(token)
		} catch(ex){
			console.log(ex)
		}
	}

	return (
		<Button color="warning" startContent={<FacebookIcon size={40} />} onPress={onPress} variant="bordered" className="w-full h-12">
			<div className="w-[120px] text-end">
               Login with Facebook
			</div>     
		</Button>
	)
}
