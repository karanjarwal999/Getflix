import React, { createContext, useState } from 'react'


export const UserSingup= createContext()

export default function SignupContext({children}) {

    let [userData, setUserData]=useState({
        email: '',
        password: '',
    })

  return (
    <UserSingup.Provider value={{userData,setUserData}}>
        {children}
    </UserSingup.Provider>
    )
}
