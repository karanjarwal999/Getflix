import React from 'react'
import style from '../../../Styles/signup/Step2.module.css'
import SingupNav from './SingupNav'
import SingupFooter from './SingupFooter'
import { useNavigate } from 'react-router-dom'

export default function Step2() { 
  const Navigate=useNavigate()

  return (
    <div className={style.step2_content}>
      <SingupNav/>
      <div >
            <span className="material-symbols-outlined">task_alt</span>
            <p>STEP <b>2</b> OF <b>3</b></p>
            <h3>Choose your Plan.</h3>
            <div>
              <p><span className="material-symbols-outlined">done</span> No commitments, cancel <br /> anytime.</p>
              <p><span className="material-symbols-outlined">done</span> Everything on Netflix for <br /> one low price.</p>
              <p><span className="material-symbols-outlined">done</span> No ads and no extra fees. Ever.</p>
            </div>
            <button onClick={()=>{Navigate('/signup/plan')}}>Next</button>
          </div>
          <SingupFooter />
    </div>
  )
}
