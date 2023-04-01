import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext()

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userToken, setUserToken] = useState('')
  async function getLoggedIn() {
    const response = await axios.get('loggedIn')
    const { isLoggedIn, userToken } = response.data
    setUserToken(userToken)
    setLoggedIn(isLoggedIn)
  }
  useEffect(() => {
    getLoggedIn()
  }, [])
  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, userToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthContextProvider }
