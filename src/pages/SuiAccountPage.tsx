import React, { useContext, useEffect } from "react"
import { RootContext } from "../hooks"
import { fetchBalance } from "../functions"
import { Card, CardBody, Divider, Spacer, Tab, Tabs, User } from "@nextui-org/react"
import { SuiAccountContext, SuiAccountProvider } from "../hooks/SuiAccountProvider"
import { BuildingStorefrontIcon, HomeIcon, QuestionMarkCircleIcon, ShareIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import { CurrentTab } from "../hooks/useSuiAccountReducer"

export const WrappedSuiAccountPage = () => {
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

	const { reducer : suiAccountReducer } = useContext(SuiAccountContext)!
	const [ suiAccountState, suiAccountDispatch ] = suiAccountReducer

	return (
		<div className="grid place-items-center h-full w-full">
			<Tabs aria-label="suiAccounts" onSelectionChange={(value) => suiAccountDispatch({
				type: "SET_CURRENT_TAB",
				payload: value as CurrentTab
			})} selectedKey={suiAccountState.currentTab} disableAnimation classNames={{
				tabList: "gap-2 bg-background p-0 w-full",
				tab: "bg-background",
				base: "bg-background w-full ",
				panel: "w-full mt-4"
			}}>
				<Tab key="home" title={
					<div className="flex gap-2 items-center">
						<HomeIcon className="w-5 h-5"/>
						<div className="text-sm"> Home </div>
					</div>
				}>
					<Card>
						<CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</CardBody>
					</Card>  
				</Tab>
				<Tab key="quest" title={
					<div className="flex gap-2 items-center">
						<QuestionMarkCircleIcon className="w-5 h-5"/>
						<div className="text-sm"> Quest </div>
					</div>
				}>
					<div className="gap-4 flex items-center">
						<User avatarProps={
							{
								src: "/token-1.svg"
							}
						} classNames={{
							name: "font-semibold"
						}} name={"0.00"} description={"$0"}/>
						<User avatarProps={
							{
								src: "/token-2.svg"
							} 
						} classNames={{
							name: "font-semibold"
						}} name={"0.00"} description={"$0"}/>
					</div>
					<Spacer y={4}/>
					<Divider/>
				</Tab>
				<Tab key="store" title={
					<div className="flex gap-2 items-center">
						<BuildingStorefrontIcon className="w-5 h-5"/>
						<div className="text-sm"> Store </div>
					</div>
				}>
					<Card>
						<CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</CardBody>
					</Card>  
				</Tab>
				<Tab key="share" title={
					<div className="flex gap-2 items-center">
						<ShareIcon className="w-5 h-5"/>
						<div className="text-sm"> Share </div>
					</div>
				}>
					<Card>
						<CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</CardBody>
					</Card>  
				</Tab>
				<Tab key="user" title={
					<div className="flex gap-2 items-center">
						<UserCircleIcon className="w-5 h-5"/>
						<div className="text-sm"> User </div>
					</div>
				}>
					<Card>
						<CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</CardBody>
					</Card>  
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
