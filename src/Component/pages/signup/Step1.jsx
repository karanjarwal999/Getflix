import React, { useContext, useState } from 'react'
import style from '../../../Styles/signup/Step1.module.css'
import { UserSingup } from '../../../Context/SignupContext'
import SingupNav from './SingupNav'
import SingupFooter from './SingupFooter'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { Auth } from '../../firebaseConfig'
import { useToast } from '@chakra-ui/react'


export default function Step1() {
  const { userData, setUserData } = useContext(UserSingup)
  const [isLoding, SetIsLoading] = useState(false)
  const Navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    emailOverlay()
  }, [])

  
  //validate password and  moving password input overlay to top
  function managePasswordOverlay(e) {
    let overlay = document.getElementsByClassName('passwordOverlay')

    // to palce overlay at top when value is not empty
    if (e.target.value !== '') {
      overlay[0].style.bottom = '27px'
      overlay[0].style.fontSize = '12px'
    }

    if (e.target.value === '') {
      overlay[0].style.bottom = '45px'
      document.getElementById('SetPassMessage').style.display = 'block'
      document.getElementById('SetPassMessage').innerText = '⊙ password is Required'
    }
    else if (e.target.value.length < 6) {
      overlay[0].style.bottom = '45px'
      document.getElementById('SetPassMessage').style.display = 'block'
      document.getElementById('SetPassMessage').innerText = '⊙ password must be atleast 6 characters'
    }
    else {
      document.getElementById('SetPassMessage').style.display = 'none'
    }

  }


  // moving email input overlay to top
  function emailOverlay() {
    let emailInput = document.getElementById('email')
    let emailOverlay = document.getElementsByClassName('emailOverlay')
    if (emailInput.value !== '') {
      emailOverlay[0].style.bottom = '27px'
      emailOverlay[0].style.fontSize = '12px'
    }
  }

  function NameOverlay() {
    let nameInput = document.getElementById('name')
    let nameOverlay = document.getElementsByClassName('nameOverlay')
    if (nameInput.value !== '') {
      nameOverlay[0].style.bottom = '27px'
      nameOverlay[0].style.fontSize = '12px'
    }
  }


  // function to create account
  function handleSubmit() {
    function sendToast(message, status) {
      toast({
        title: message,
        status: status,
        duration: 2000,
        isClosable: true,
        position:'top'
      })
    }

    if (userData.name === '' ) {
      sendToast('Please enter name', 'warning')
    }
    else if (userData.email === '' || userData.password === '') {
      sendToast('Please enter valid email or password', 'warning')
    }
    else if(!userData.email.includes('@')||!userData.email.includes('.com')){
      sendToast('Email should contain @ and .com', 'warning')
    }
    else if(userData.password.length<6){
      sendToast('Password should Contain at least 6 character', 'warning')
    }
    else {
      SetIsLoading(true)
      createUserWithEmailAndPassword(Auth, userData.email, userData.password)
        .then(() => {
          sendToast('Account created sucessfully', 'success')
          updateProfile(Auth.currentUser, { displayName: userData.name })
          .then(() => {SetIsLoading(false)})
          .catch((err) =>console.log(err))

          setTimeout(() => {
            Navigate('/signup/step2')
          }, 2000);

        })
        .catch((err) => {
          sendToast(err.message, 'error')
          SetIsLoading(false)
        })
    }

    
  }

  return (
    <div className={style.mainDiv}>
      <SingupNav />
      <div className={style.contentDiv}>
        <div className={style.content}>
          <p style={{ fontSize: '12px' }}> STEP <b>2 </b>OF <b>3</b></p>
          <h3>Create a password to start your membership</h3>
          <p>Just a few more steps and you're done! We hate paperwork, too.</p>
          <div>
            <input id='name' type="text" onChange={(e) => { setUserData({ ...userData, name: e.target.value }); NameOverlay() }} />
            <p className='nameOverlay'>Name</p>
          </div>
          <div>
            <input id='email' type="email" value={userData.email} onChange={(e) => { setUserData({ ...userData, email: e.target.value }); emailOverlay() }} />
            <p className='emailOverlay'>Email</p>
          </div>
          <div>
            <input type="password" id='password'
              onChange={(e) => { setUserData({ ...userData, password: e.target.value }); managePasswordOverlay(e) }} />
            <p className='passwordOverlay'>Add a Password</p>
            <span id='SetPassMessage'></span>
          </div>
          <button disabled={isLoding} onClick={() => handleSubmit()}>{isLoding ? <img src="https://cdn.shopify.com/extensions/05048db8-2be5-47a6-b0d7-c3bcf88a769c/5.3.0/assets/loader-white.png" alt="" /> : 'Next'}</button>
        </div>
      </div>
      <SingupFooter />
    </div>
  )
}
