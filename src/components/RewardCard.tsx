import { Button, Card, CardBody, Spacer, Image } from "@nextui-org/react"
import React from "react"

export const RewardCard = () => {
	return (
		<Card shadow="none" className="border border-divider p-4">
			<CardBody className="grid place-items-center">
				<div className="text-2xl font-bold">
                    Reward
				</div>
				<Spacer y={2}/>
				<Image className="w-[100px] h-[100px]" removeWrapper src="/treasure-chest.svg"/>
				<Spacer y={2}/>
				<Button color="warning"> Open </Button>
			</CardBody>
		</Card>
	)
}
