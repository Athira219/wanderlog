import React, { createContext, useState } from 'react'

export const deleteWanderlogContext = createContext()
export const updatewanderlogContext = createContext()
export const CreateWanderlogContext = createContext()
 export const isAuthContext = createContext()
function ContextWanderlog({ children }) {
  const [deleteWnderlog, setDeleteWanderlog] = useState({})
  const [updateWanderrlog, setUpdateWanderlog] = useState({})
  const [createWanderlogPost, setCreateWanderlogPost] = useState({})
   const [authWanderlog,setAuthWanderlog] = useState(true)

  return (
    <div>
      <deleteWanderlogContext.Provider value={{ deleteWnderlog, setDeleteWanderlog }}>
        <updatewanderlogContext.Provider value={{ updateWanderrlog, setUpdateWanderlog }}>
          <CreateWanderlogContext.Provider value={{ createWanderlogPost, setCreateWanderlogPost }}>
            <isAuthContext.Provider value={{authWanderlog,setAuthWanderlog}}>
            {children}
            </isAuthContext.Provider>
          </CreateWanderlogContext.Provider>
        </updatewanderlogContext.Provider>

      </deleteWanderlogContext.Provider>

    </div>
  )
}

export default ContextWanderlog
