import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../../firebaseConfig'
import SingupFooter from '../signup/SingupFooter'
import { styled } from 'styled-components'
import logo from '../../../Logo/GETFLIX-logo.png'
import { Badge } from '@chakra-ui/react'

export default function EditAccount() {
    const Navigate = useNavigate()
    const [name, setName] = useState('')
    const [isAuth, setIsAuth] = useState(true)
    Auth.onAuthStateChanged((user) => { setName(user.displayName) })
    Auth.onAuthStateChanged((user) => !user ? setIsAuth(false) : null)

    if (!isAuth) {
        Navigate('/signup')
    }
    return (
        <Div>
            <nav>
                <img src={logo} alt="" />
            </nav>
            <div className='account_outerDiv'>
                <div className='account_highScreen'>
                   <h1 style={{color:'black'}}>Account</h1>
                   <p style={{color:'black'}}><span   className="material-symbols-outlined">video_library</span>Member Since Jan 2023</p>
                   <hr />
                   <div className='Account_cardDiv'>
                     <div className='account_leftDiv'>
                        <h2>MEMBERSHIP & BILLING</h2>
                        <button>Cancel Membership</button>
                     </div>
                     <div className='Acount_flexDiv'>
                        <div>
                            <p style={{color:'black'}}><b>santoshkakarwal1@gmail.com</b></p>
                            <p>Password: ********</p>
                            <p>Phone: </p>
                        </div>
                        <div>
                            <p className='blueText'>Change email</p>
                            <p className='blueText'>Change password</p>
                            <p className='blueText'>Add phone number</p>
                        </div>
                     </div>
                     <hr />
                     <div className='Acount_flexDiv'>
                        <div style={{color:'black'}}><span style={{position:'relative',top:'5px'}}   className="material-symbols-outlined">qr_code_scanner</span> s•••@ybl</div>
                        <div>
                            <p className='blueText'>Manage payment info</p>
                            <p className='blueText'>Billing details</p>
                        </div>
                     </div>
                     <hr />
                     <div className='Acount_flexDiv'>
                        <p></p>
                        <p className='blueText'>Redeem gift card or promo code</p>
                     </div>
                   </div>
                   <hr />
                   <div className='Account_cardDiv'>
                     <div className='account_leftDiv'>
                        <h2>PLAN DETAILS</h2>
                     </div>
                     <div className='Acount_flexDiv'>
                        <div>
                            <p style={{color:'black'}}><b>Basic</b> <span style={{position:'relative',top:'9px',fontSize:'30px',marginLeft:'10px'}}   className="material-symbols-outlined">hd</span></p>
                        </div>
                        <div>
                            <p className='blueText'>Change plan</p>
                        </div>
                     </div>
                   </div>
                   <hr />
                   <div className='Account_cardDiv'>
                     <div className='account_leftDiv'>
                        <h2>SECURITY & PRIVACY</h2>
                     </div>
                     <div className='Acount_flexDiv'>
                        <div className='account_LimitP'>
                            <p >Control access to this account, view the most recently active devices and more.</p>
                        </div>
                        <div>
                            <p className='blueText'>Manage access and devices</p>
                            <p className='blueText'>Sign out of all devices</p>
                        </div>
                     </div>
                   </div>
                   <hr />
                   <div className='Account_cardDiv'>
                     <div className='account_leftDiv'>
                        <h2>PROFILE & PARENTAL CONTROLS</h2>
                     </div>
                     <div className='Acount_flexDiv'>
                        <div style={{display:'flex'}}>
                            <img  src="https://occ-0-4875-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABR2_CnwLC_fGf1EGaAxpU3cAzAwjj4q3yVg_n99iZREET5eSWAZ_B0kemHB5GOEPXtk7ekGULELzDrWZk4WCAULubeSwxTg_UQ.png?r=229" alt="" />
                            <div>
                                <p style={{color:'black'}}><b>Saantosh</b></p>
                                <p>All Maturity Ratings</p>
                            </div>
                        </div>
                        <div className='account_expandingDiv'>
                        <span   className="material-symbols-outlined">keyboard_arrow_down</span>
                        </div>
                     </div>
                     <hr style={{margin:'10px 0px'}}/>
                     <div className='Acount_flexDiv'>
                        <div style={{display:'flex'}}>
                            <img src="https://occ-0-4875-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbqbhi8-Nn1PYzNqtVnV-IS4araSjQ5-WZZA5ysMX8ft4CtovMvyxSxWryGtjD7vlbgpCsSHtgN0BheEkEyHYdxAH5nYD8PpcA.png?r=54d" alt="" />
                            <div>
                                <p>बच्चों के लिए</p>
                                <p>U/A 7+ and below</p>
                            </div>
                        </div>
                        <div className='account_expandingDiv'>
                        <span   className="material-symbols-outlined">keyboard_arrow_down</span>
                        </div>
                     </div>
                   </div>
                   <hr />
                   <div className='Account_cardDiv'>
                     <div className='account_leftDiv'>
                        <h2>SETTINGS</h2>
                     </div>
                     <div className='Acount_flexDiv'>
                        <div>
                            <p className='blueText' style={{textAlign:'start'}}>Turn off profile transfers <Badge ml='1' bg='#0F84FA' color='white'>New</Badge></p>
                            <p className='blueText' style={{textAlign:'start'}}>Test participation</p>
                            <p className='blueText' style={{textAlign:'start'}}>Manage download devices</p>
                        </div>
                        <div>
                        </div>
                     </div>
                   </div>
                   <hr />
                </div>
                <div className="account_smallScreen">
                    
                </div>
            </div>
            <SingupFooter />
        </Div>
    )
}

const Div = styled.div`
    color: gray;
    font-size: 16px;
    cursor: default;

    .account_smallScreen{
        display: none;
    }
    nav{
        background-color: #0e0000;
        padding: 10px 5%;
    }
    nav>img{
        width: 200px;
    }
    .account_outerDiv{
        background-color: white;
    }
    .account_highScreen{
        width: 100%;
        max-width: 1024px;
        margin: auto;
        padding:40px 20px 0px 20px;
    }
    .account_highScreen>h1{
        display: inline;
        font-size: 34px;
    }
    .account_highScreen>p{
        display: inline;
        font-size: 14px;
        margin-left: 20px;
        position: relative;
        bottom: 10px;
        font-weight: 600;
        color: gray;
    }
    .account_highScreen>p>span{
        position: relative;
        top: 7px;
        margin-right: 5px;
        color: red;
    }
    .Account_cardDiv{
        position: relative;
        padding-left: 270px;
        margin: 20px 0px;
    }
    .account_leftDiv{
        position: absolute;
        left: 0;
        width: 250px;
    }
    .account_leftDiv>h2{
       font-size: 18px;
    }
    .Acount_flexDiv{
        display: flex;
        justify-content: space-between;
    }
    .blueText{
        color: #0073E6;
        text-align: end;
        padding: 4px;
        cursor: pointer;
    }
    .blueText:hover{
       text-decoration: underline;
       text-underline-offset:2px;
    }

    .account_LimitP{
        max-width: 300px;
    }
    .account_expandingDiv{
        display: flex;
        align-items: center;
    }
    .account_highScreen>hr{
        background-color: gray;
        border: none;
        height: 0.5px;
    }
    .Acount_flexDiv>div>img{
        width: 60px;
        margin-right: 15px;
        border-radius: 5px;
    }
    .Account_cardDiv>div>button{
        background-color: #e6e6e6bd;
        border-bottom: 2px solid lightgray;
        padding: 8px;
        width: 200px;
        font-size: 13px;
        color: black;
        margin-top: 10px;
    }


    @media screen and (max-width:900px){
        nav>img{
            width: 150px;
        }
        .Account_cardDiv{
            padding-left: 230px;
        }
        .account_leftDiv{
            width: 230px;
        }
    }
    
    @media screen and (max-width:800px){
        .account_leftDiv{
            position: static;
            width: auto;
            margin-bottom: 20px;
        }
        .Account_cardDiv{
            padding-left: 0px;
        }
        .account_LimitP{
            max-width: 50%;
        }
    }
    @media screen and (max-width:600px){
        nav>img{
            width: 100px;
        }
    }
    @media screen and (max-width:500px){
        .account_smallScreen{
            display: block;
        }
        .account_highScreen{
            display: none;
        }
    }
    @media screen and (max-width:400px){
        nav>img{
            width: 70px;
        }
    }
`