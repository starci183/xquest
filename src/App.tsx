import React, { useContext, useEffect } from "react"
import { LoginPage, SelectChainPage, SuiZkLoginPage } from "./pages"
import { NextUIProvider } from "@nextui-org/react"
import { RootContext, RootProvider } from "./hooks"
import { CurrentPage } from "./hooks/useRootReducer"
import { completeZkLogin } from "./functions"
import { SuiAccountPage } from "./pages/SuiAccountPage"

export const App = () => {
	return (
		<NextUIProvider>
			<div className="light">
				<div className="container">
					<RootProvider>
						<WrappedApp />
					</RootProvider>
				</div>
			</div>
		</NextUIProvider>
	)
}


const WrappedApp = () => {
	const { reducer } = useContext(RootContext)!
	const [state, dispatch] = reducer
	const { currentPage } = state

	useEffect(() => {
		const handleEffect = async () => {
			const res = await completeZkLogin()
			if (res === null) return 
			dispatch({
				type: "SET_SUI_SESSION_ACCOUNT",
				payload: res
			})
			dispatch({
				type: "SET_CURRENT_PAGE",
				payload: CurrentPage.SuiAccountPage
			})
		}
		handleEffect()
	}, [])

	const renderPage = () => {
		switch (currentPage) {
		case CurrentPage.LoginPage:
			return <LoginPage />
		case CurrentPage.SelectChainPage:
			return <SelectChainPage />
		case CurrentPage.SuiZkLoginPage:
			return <SuiZkLoginPage />
		case CurrentPage.SuiAccountPage: 
			return <SuiAccountPage />
		default:
			return null
		}
	}
	return renderPage()
}
