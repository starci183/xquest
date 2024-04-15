import { useReducer } from "react"

export enum CurrentPage {
    LoginPage,
    SelectChainPage,
	SuiZkLoginPage
  }
  
export interface RootState {
   currentPage: CurrentPage
}

export interface SetCurrentPageAction {
    type: "SET_CURRENT_PAGE";
    payload: CurrentPage;
}

export type RootAction =
    | SetCurrentPageAction

const initialState: RootState = {
	currentPage: CurrentPage.LoginPage
}

export const reducer = (state: RootState = initialState, action: RootAction): RootState => {
	switch (action.type) {
	case "SET_CURRENT_PAGE":
		return {
			...state,
			currentPage: action.payload
		}
	default:
		return state
	}
}

export const useRootReducer = () => {
	return useReducer(reducer, initialState)
}