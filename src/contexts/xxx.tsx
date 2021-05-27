import React, { createContext, useContext } from 'react'

type XxXContextData = {}

const XxXContext = createContext<XxXContextData>({} as XxXContextData)

export const XxXContextProvider: React.FC = ({ children }) => {
	//

	return <XxXContext.Provider value={{}}>{children}</XxXContext.Provider>
}

export const useXxX = () => useContext(XxXContext)
