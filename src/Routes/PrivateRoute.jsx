import { useState } from "react"
import { Auth } from "../Component/firebaseConfig"
import SignUp from "../Component/pages/signup/SignUp"
import SignupContext from "../Context/SignupContext"

export default function PrivateRoute({children}) {
  const [logState,setlogState]=useState(false)
  Auth.onAuthStateChanged((user)=>user?setlogState(true):setlogState(false))
  
 
  return logState?children:<SignupContext><SignUp/></SignupContext>
}
