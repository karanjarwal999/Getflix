import React, { useContext, useState } from 'react'
import style from '../../../Styles/signup/Step0.module.css'
import { useNavigate } from 'react-router-dom'
import SingupNav from './SingupNav'
import SingupFooter from './SingupFooter'


export default function SignUPStep0() {
  let Navigate = useNavigate()

  return (

    <div className={style.mainDiv}>
      <SingupNav />
      <div className={style.contentDiv}>
        <div className={style.content}>
          <img src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png" alt="DevicePhoto" />
          <p style={{ fontSize: '12px' }}>STEP <b>1</b> OF <b>3</b></p>
          <h3>Finish setting up your account</h3>
          <p>Netflix is personalised for you. Create a password to watch on any device at any time</p>
          <button onClick={()=>Navigate('/signup/step1')}>Next</button>
        </div>
      </div>
      <SingupFooter />
    </div>
  )
}
