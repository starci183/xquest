export interface ZkLoginSession {
  maxEpoch: number;
  jwtRandomness: string;
  ephemeralPrivateKey: string;
}

export const saveZkLoginSession = (session: ZkLoginSession) =>
	localStorage.setItem("zkLoginSession", JSON.stringify(session))

export const getZkLoginSession = () : ZkLoginSession | null => {
	const sessionString = localStorage.getItem("zkLoginSession")
	const session = sessionString ? JSON.parse(sessionString) : null 
	return session
}

export const removeZkLoginSession = () => {
	localStorage.removeItem("zkLoginSession",)
}