import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function LogOutBtn() {

    const { getLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    async function logOut(){
        await axios.get('logout')
        await getLoggedIn()
        navigate("/")
    }
  return (
    <button onClick={ logOut }>Log Out</button>
  )
}

export default LogOutBtn

