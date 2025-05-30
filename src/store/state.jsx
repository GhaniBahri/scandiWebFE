import { createContext, useContext, useState } from 'react';

const AppContext = createContext()

export function AppWrapper ({children}) {
    const [count, setCount] = useState(5) 
    return (
        <AppContext.Provider
            value={{
                count,
                setCount
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppcontext(){
    return useContext(AppContext)
}