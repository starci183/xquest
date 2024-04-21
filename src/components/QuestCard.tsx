import { Button, Card, CardBody, Spacer, Image } from "@nextui-org/react"
import React from "react"

export const QuestCard = () => {
	return (
		<Card shadow="none" className="border border-divider p-4">
			<CardBody>
				<Button color="warning" variant="bordered" className="w-fit">
          Done
				</Button>
				<Spacer y={4}/>
				<div className="font-bold"> Newbie Quest </div> 
				<div className="text-foreground-400 text-sm"> Complete Newbie Quest to unlock Treasures. </div>
				<Spacer y={4}/> 
				<div className="flex items-center justify-between">
					<div className="flex gap-2 items-center">
						<div className="text-sm">Reward: </div>
						<div className="flex gap-2 items-center"> <Image removeWrapper src="/treasure-chest.svg" className="w-6 h-6" /> <div className="text-sm">X 3</div> </div>
					</div>
					<Button> Claim </Button>
				</div>
			</CardBody>
		</Card>
	)
}
