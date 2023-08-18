import React, { useState } from 'react'
import SingupFooter from '../signup/SingupFooter'
import logo from '../../../Logo/GETFLIX-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Auth } from '../../firebaseConfig'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'

export default function TransferProfile() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const Navigate = useNavigate()
    const [name, setName] = useState('')
    Auth.onAuthStateChanged((user) => !user ? Navigate('/signup') : null)
    Auth.onAuthStateChanged((user) => {
        setName(user.displayName);
        if (user.isAnonymous) {
                onOpen()
        }
    })

    return (
        <Div>
            <nav>
                <Link to={'/'}><img src={logo} alt="" /></Link>
                <Link to='/logout'>Sign Out</Link>
            </nav>
            <div className='centerDiv'>
                <h2>Start your profile transfer</h2>
                <div>
                    <img src="https://occ-0-4875-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYBrc8qH7QHWbxtOAZakDaIoT2JRVjPSVDpUbU7hRBmVZI7MzB900pwFnanVjKDR4qQmw-bDF-Gf2rrNn6zS6A6mjpFBp_A.png?r=229" alt="" />
                    <p>{name}</p>
                </div>
                <p>Transfer a different profile</p>
                <button>Start Profile Transfer</button>
                <span>Learn More</span>
                <div className='descriptionDiv'>
                    <h3>We made it easy to transfer this profile</h3>
                    <div>
                    <span   className="material-symbols-outlined">eyeglasses</span><p>Transfer recommendations, viewing history, My List, saved games, settings and more</p>
                    <span   className="material-symbols-outlined">account_box</span><p>Own your account, or join an existing account, and keep everything you love about this profile</p>
                    <span   className="material-symbols-outlined">offline_share</span><p>We’ll leave a backup copy of this profile on the original account</p>
                        <span></span><p>*Saved games will not be included in the backup copy.</p>
                    </div>
                </div>
            </div>
            <SingupFooter />
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered>
                <AlertDialogOverlay bg='rgba(0, 0, 0, 0.813)'/>
                <AlertDialogContent>
                    <AlertDialogHeader pb='0px'>Anonymous Call</AlertDialogHeader>
                    <AlertDialogBody>
                        You can't access this page deu to Anonymous account
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={()=>Navigate('/')}>
                            Back to Home
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={()=>{signOut(Auth);Navigate('/signup/step1')}}>
                            Create Account
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Div>
    )
}


const Div = styled.div`
box-sizing: border-box;
background-color: white;

nav{
    padding: 0% 4%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    border-bottom: 0.5px solid lightgray;
}
nav>a>img{
    width: 200px;
}
nav>a{
   font-weight: 600;
}
nav>a:hover,.centerDiv>p:hover,.centerDiv>span:hover{
   text-decoration: underline;
   text-underline-offset: 2px;
   cursor: pointer;
}
.centerDiv{
    width: 100%;
    max-width: 500px;
    margin: auto;
    text-align: center;
    padding: 20px 32px 60px;
}
.centerDiv>h2{
   font-size: 32px;
}
.centerDiv>p{
   font-size: 18px;
   color: #0071EB;
   padding-bottom: 35px;
}
.centerDiv>div:nth-child(2){
    display:flex;
    margin: 35px 0px;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 20px;
    font-weight: 700;
}
.centerDiv>div>img{
   border-radius: 10px;
}
.centerDiv>span{
   font-size: 18px;
   font-weight: 600;
   padding:15px 0px 35px 0px;
   display: block;
}
.centerDiv>button{
   font-size: 18px;
   font-weight: 600;
   background-color: #E50941;
   color: white;
   display: block;
   margin: auto;
   width: 80%;
   border-radius: 5px;
   padding: 10px 0px;
   font-size: 19px;
}
.descriptionDiv>h3{
    font-size: 23px;
    font-weight: 600;
}
.descriptionDiv>div{
    display: grid;
    text-align: start;
    margin:20px;
    line-height: 25px;
    justify-content: space-between;
    grid-template-columns: 10% 85%;
    row-gap: 15px;
}
.descriptionDiv>div>span{
   color: #E50941;
}


@media screen and (max-width:750px){
    nav{
        padding: 0% 4%;
        height: 75px;
    }
    nav>a>img{
        width: 150px;
    } 
}
@media screen and (max-width:520px){
    nav{
        padding: 0% 4%;
        height: 45px;
    }
    nav>a>img{
        width: 100px;
    } 
    .centerDiv>h2{
    font-size: 25px;
    }
    .descriptionDiv>h3{
        font-size: 20px;
        font-weight: 600;
    }
    .descriptionDiv>div{
        margin:10px;
        font-size: 17px;
        line-height: 22px;
        grid-template-columns: 10% 88%;
        row-gap: 15px;
    }
    .centerDiv{
        padding: 20px 10px 40px;
    }
    .centerDiv>div:nth-child(2){
        margin: 20px 0px;
    }
    .centerDiv>p{
        padding-bottom: 25px;
    }
}
@media screen and (max-width:400px){
    .centerDiv>div:nth-child(2){
    display:flex;
    flex-direction: column;
    font-weight: 600;
    gap: 10px;
    }
}
`