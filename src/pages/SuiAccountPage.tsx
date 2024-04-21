import React, { useContext, useEffect } from "react"
import { RootContext } from "../hooks"
import { computeDenomination, fetchBalance, formatAddress } from "../functions"
import {
	Button,
	Card,
	CardBody,
	Chip,
	Divider,
	Spacer,
	Tab,
	Tabs,
	User,
	Image,
	Link,
	Tooltip,
} from "@nextui-org/react"
import {
	SuiAccountContext,
	SuiAccountProvider,
} from "../hooks/SuiAccountProvider"
import {
	ArrowUpIcon,
	BuildingStorefrontIcon,
	ExclamationTriangleIcon,
	HeartIcon,
	HomeIcon,
	QuestionMarkCircleIcon,
	ShareIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline"
import { CurrentTab } from "../hooks/useSuiAccountReducer"
import { QuestCard, RewardCard } from "../components"
import { AppleIcon, ShirtIcon, SyringeIcon, TractorIcon } from "lucide-react"

export const WrappedSuiAccountPage = () => {
	const { reducer } = useContext(RootContext)!
	const [state, dispatch] = reducer
	const { sessions } = state
	const { sui } = sessions
	const { account, balance } = { ...sui }

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

	console.log(account?.userAddress)

	const { reducer: suiAccountReducer } = useContext(SuiAccountContext)!
	const [suiAccountState, suiAccountDispatch] = suiAccountReducer

	return (
		<div className="grid place-items-center h-full w-full">
			<Tabs
				aria-label="suiAccounts"
				onSelectionChange={(value) =>
					suiAccountDispatch({
						type: "SET_CURRENT_TAB",
						payload: value as CurrentTab,
					})
				}
				selectedKey={suiAccountState.currentTab}
				disableAnimation
				classNames={{
					tabList: "gap-2 bg-background p-0 w-full",
					tab: "bg-background",
					base: "bg-background w-full ",
					panel: "w-full mt-4 p-0",
				}}
			>
				<Tab
					key="home"
					title={
						<div className="flex gap-2 items-center">
							<HomeIcon className="w-5 h-5" />
							<div className="text-sm"> Home </div>
						</div>
					}
				>
					<Tabs
						aria-label="Options"
						classNames={{
							base: "w-full",
							tabList: "w-full",
							panel: "w-full mt-4 p-0",
						}}
					>
						<Tab key="farm" title="Farm">
							<div className="flex justify-between items-center">
								<div>
									<div className="flex items-center gap-2">
										<div className="text-sm">Total Spend</div>
										<Tooltip content="I am a tooltip">
											<QuestionMarkCircleIcon className="w-3.5 h-3.5" />
										</Tooltip>
									</div>
									<Spacer y={1}/>
									<div className="flex gap-2 items-center">
										<User
											avatarProps={{
												src: "/token-b.svg",
												size: "sm"
											}} 
											name="0"
											description="0.0 $"
										/>
									</div>
								</div>
								<div>
									<div className="flex items-center gap-2">
										<div className="text-sm">BPEP Can claim</div>
										<Tooltip content="I am a tooltip">
											<QuestionMarkCircleIcon className="w-3.5 h-3.5" />
										</Tooltip>
									</div>
									<Spacer y={1}/>
									<div className="flex gap-2 items-center">
										<User
											avatarProps={{
												src: "/token-b.svg",
												size: "sm"
											}} 
											name="0"
											description="0.0 $"
										/>
									</div>
								</div>
								<Button> Claim </Button>
							</div>
							<Spacer y={4}/>
							<div className="relative">
								<div className="absolute z-20 w-full h-full grid place-items-center">
									<div className="grid place-items-center text-secondary-foreground">
										<ExclamationTriangleIcon className="w-3.5 h-3.5"/>
										<div className="text-sm"> Need a pet at level 7 to unlock the feature. </div>
									</div>		
								</div>
								<Image src="/dummy.png"/>
							</div>
							<Spacer y={4}/>
							<div className="flex gap-4">
								<Card shadow="none" className="border border-divider flex-1">
									<CardBody>
										<Chip className="absolute"> Lv 1</Chip>	
										<div className="w-full h-full flex place-items-end">
											<div className="p-6">
												<div className="w-16 h-16 place-items-end grid">
													<Image removeWrapper className="object-cover" src="/cat.png"/>
												</div>	
											</div>	
										</div>
										
									</CardBody>
								</Card>
								<div>
									<div className="font-bold"> Tiny Cat </div>
									<Spacer y={2}/>
									<div className="flex gap-1 items-center">
										<HeartIcon className="w-4 h-4"/>
										<HeartIcon className="w-4 h-4"/>
										<HeartIcon className="w-4 h-4"/>
									</div>
									<Spacer y={2}/>
									<div className="flex gap-4 items-center">
										<div className="flex flex-col items-center">
											<Button variant="light" size="lg" isIconOnly>
												<AppleIcon/>
											</Button>
										Feed
										</div>
										<div className="flex flex-col items-center">
											<Button variant="light" size="lg" isIconOnly>
												<SyringeIcon/>
											</Button>
										Heal
										</div>
										<div className="flex flex-col items-center">
											<Button variant="light" size="lg" isIconOnly>
												<TractorIcon/>
											</Button>
										Farm
										</div>
										<div className="flex flex-col items-center">
											<Button variant="light" size="lg" isIconOnly>
												<ShirtIcon/>
											</Button>
										Wear
										</div>
									</div>
									<Spacer y={2}/>
									<Button variant="bordered" color="warning" fullWidth startContent={<ArrowUpIcon className="w-3.5 h-3.5"/>}> Upgrade </Button>
								</div>
							</div>
							<Spacer y={4}/>
							<div className="flex gap-4">
								<Card shadow="none" isPressable className="border border-divider w-32 h-32">
									<CardBody className="p-0">
										<Image removeWrapper src="/home.png"/>
									</CardBody>
								</Card>
								<Card shadow="none" isPressable className="border border-divider w-32 h-32">
									<CardBody>
										<Chip className="absolute"> Lv 1</Chip>	
										<Image removeWrapper src="/cat.png"/>	
									</CardBody>
								</Card>
							</div>
						</Tab>
						<Tab key="pve" title="PvE">
							<div className="flex justify-between items-center">
								<div>
									<div className="flex items-center">
										<div className="text-sm">Total Spend</div>
										<QuestionMarkCircleIcon className="w-3.5 h-3.5" />
									</div>
								</div>
							</div>
						</Tab>
						<Tab key="pvp" title="PvP">
							<Card>
								<CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
								</CardBody>
							</Card>
						</Tab>
					</Tabs>
				</Tab>
				<Tab
					key="quest"
					title={
						<div className="flex gap-2 items-center">
							<QuestionMarkCircleIcon className="w-5 h-5" />
							<div className="text-sm"> Quest </div>
						</div>
					}
				>
					<div className="gap-4 flex items-center">
						<User
							avatarProps={{
								src: "/token-1.svg",
							}}
							classNames={{
								name: "font-semibold",
							}}
							name={"0.00"}
							description={"$0"}
						/>
						<User
							avatarProps={{
								src: "/token-2.svg",
							}}
							classNames={{
								name: "font-semibold",
							}}
							name={"0.00"}
							description={"$0"}
						/>
					</div>
					<Spacer y={4} />
					<Divider />
					<Spacer y={4} />
					<QuestCard />
					<Spacer y={4} />
					<QuestCard />
					<Spacer y={4} />
					<RewardCard />
				</Tab>
				<Tab
					key="store"
					title={
						<div className="flex gap-2 items-center">
							<BuildingStorefrontIcon className="w-5 h-5" />
							<div className="text-sm"> Store </div>
						</div>
					}
				>
					<Card>
						<CardBody></CardBody>
					</Card>
				</Tab>
				<Tab
					key="share"
					title={
						<div className="flex gap-2 items-center">
							<ShareIcon className="w-5 h-5" />
							<div className="text-sm"> Share </div>
						</div>
					}
				>
					<Card>
						<CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
						</CardBody>
					</Card>
				</Tab>
				<Tab
					key="user"
					title={
						<div className="flex gap-2 items-center">
							<UserCircleIcon className="w-5 h-5" />
							<div className="text-sm"> User </div>
						</div>
					}
				>
					<div className="grid place-items-center">
						<Chip
							size="lg"
							variant="bordered"
							startContent={
								<Image removeWrapper src="/sui-logo.svg" className="w-4 h-4" />
							}
						>
              SUI
						</Chip>
						<Spacer y={4} />
						<div className="font-bold">
							<span className="text-[60px]">
								{computeDenomination(balance ?? BigInt(0), 9)}
							</span>{" "}
							<span className="text-xl">SUI</span>
						</div>
						<Spacer y={4} />
						<Link
							color="foreground"
							isExternal
							showAnchorIcon
							href={`https://suiscan.xyz/devnet/account/${account?.userAddress}`}
						>
							{formatAddress(account?.userAddress)}
						</Link>
					</div>
				</Tab>
			</Tabs>
		</div>
	)
}

export const SuiAccountPage = () => (
	<SuiAccountProvider>
		<WrappedSuiAccountPage />
	</SuiAccountProvider>
)
