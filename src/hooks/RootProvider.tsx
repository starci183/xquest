"use client"
import React, {
	ReactNode,
	createContext,
	useMemo,
} from "react"

import {
	RootState,
	RootAction,
	useRootReducer
} from "./useRootReducer"

export interface RootContextValue {
  reducer: [RootState, React.Dispatch<RootAction>];
}

export const RootContext = createContext<RootContextValue | null>(
	null
)

const WrappedRootProvider = ({ children }: { children: ReactNode }) => {
	const reducer = useRootReducer()

	const rootContextValue: RootContextValue = useMemo(
		() => ({
			reducer,
		}),
		[reducer]
	)

	return (
		<RootContext.Provider value={rootContextValue}>
			{children}
		</RootContext.Provider>
	)
}

export const RootProvider = ({ children }: { children: ReactNode }) => (
	<WrappedRootProvider>{children}</WrappedRootProvider>
)