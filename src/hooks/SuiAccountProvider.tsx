"use client"
import React, {
	ReactNode,
	createContext,
	useMemo,
} from "react"

import { SuiAccountAction, SuiAccountState, useSuiAccountReducer } from "./useSuiAccountReducer"

export interface SuiAccountContextValue {
  reducer: [SuiAccountState, React.Dispatch<SuiAccountAction>];
}

export const SuiAccountContext = createContext<SuiAccountContextValue | null>(
	null
)

const WrappedSuiAccountProvider = ({ children }: { children: ReactNode }) => {
	const reducer = useSuiAccountReducer()

	const suiAccountContextValue: SuiAccountContextValue = useMemo(
		() => ({
			reducer,
		}),
		[reducer]
	)

	return (
		<SuiAccountContext.Provider value={suiAccountContextValue}>
			{children}
		</SuiAccountContext.Provider>
	)
}

export const SuiAccountProvider = ({ children }: { children: ReactNode }) => (
	<WrappedSuiAccountProvider>{children}</WrappedSuiAccountProvider>
)