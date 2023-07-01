import React from 'react'
import AppLogo from '../../../Logo/GETFLIX-logo.png'
import { useNavigate } from 'react-router-dom'
import style from '../../../Styles/signup/SingupNav.module.css'

export default function SingupNav({bgcolor='transparent'}) {
  let Navigate = useNavigate()

  
  return (
    <nav className={style.navbar} style={{backgroundColor:bgcolor}}>
    <img className={style.AppLogo} src={AppLogo} alt="" />
    <p onClick={() => Navigate('/login')}>Sing In</p>
  </nav>
  )
}
