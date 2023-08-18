import { useContext, useState } from "react"
import { Auth } from "../Component/firebaseConfig"
import SignUp from "../Component/pages/signup/SignUp"
import SignupContext, { UserSingup } from "../Context/SignupContext"

export default function PrivateRoute({children}) {
  const [logState,setlogState]=useState(false)
  Auth.onAuthStateChanged((user)=>{
    if(user){
      setlogState(true)
    }else{
      setlogState(false)
    }
  })
  
 
  return logState?children:<SignupContext><SignUp/></SignupContext>
}
