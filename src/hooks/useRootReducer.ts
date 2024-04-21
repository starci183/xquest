import { useReducer } from "react"
import { AccountData } from "../functions"

export enum CurrentPage {
	LoginPage,
	SelectChainPage,
	SuiZkLoginPage,
	SuiAccountPage
}

export interface SuiSession {
	account?: AccountData | null,
	balance?: bigint
}

export interface RootState {
	currentPage: CurrentPage,
	sessions: {
		sui: SuiSession | null
	}
}

export interface SetCurrentPageAction {
	type: "SET_CURRENT_PAGE";
	payload: CurrentPage;
}

export interface SetSuiSessionAccountAction {
	type: "SET_SUI_SESSION_ACCOUNT";
	payload: AccountData | null;
}

export interface SetSuiSessionBalanceAction {
	type: "SET_SUI_SESSION_BALANCE";
	payload: bigint;
}


export type RootAction =
	| SetCurrentPageAction | SetSuiSessionAccountAction | SetSuiSessionBalanceAction

const initialState: RootState = {
	currentPage: CurrentPage.LoginPage,
	sessions: {
		sui: null
	}
}

export const reducer = (state: RootState = initialState, action: RootAction): RootState => {
	switch (action.type) {
	case "SET_CURRENT_PAGE":
		return {
			...state,
			currentPage: action.payload
		}
	case "SET_SUI_SESSION_ACCOUNT": 
		return {
			...state,
			sessions: {
				...state.sessions,
				sui: {
					...state.sessions.sui,
					account: action.payload
				}
			}
		}
	case "SET_SUI_SESSION_BALANCE":
		return {
			...state,
			sessions: {
				...state.sessions,
				sui: {
					...state.sessions.sui,
					balance: action.payload
				}
			}
		}
	default:
		return state
	}
}

export const useRootReducer = () => {
	return useReducer(reducer, initialState)
}