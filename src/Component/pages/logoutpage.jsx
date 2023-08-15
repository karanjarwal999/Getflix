import React, { useEffect } from 'react'
import logo from './../../Logo/GETFLIX-logo.png'
import { useNavigate } from 'react-router-dom'
import style from './../../Styles/logout.module.css'
import { Auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'

export default function Logoutpage() {
    const Navigate = useNavigate()
    useEffect(()=>{
        // signout with firebase
        signOut(Auth)

        // redirect to signup page after 30 sec 
        let time= setTimeout(() => {
            Navigate('/signup')
        }, 30000);

        return()=>{
            clearTimeout(time)
        }
    },[])

    return (
        <div className={style.outerDiv}>
            <nav className={style.navbar}>
                <img src={logo} alt="getflix" />
                <button onClick={() => Navigate('/login')}>Sign IN</button>
            </nav>
            <div className={style.mainDIv}>
                <div>
                    <h3>Leaving So Soon?</h3>
                    <p>Just so you know, you don’t always need to sign out of Netflix. It’s only necessary if you’re on a shared or public computer.</p>
                    <p>You’ll be redirected to Netflix.com in 30 seconds.</p>
                    <button onClick={() => Navigate('/signup')}>Go Now</button>
                </div>
                <footer className={style.footer}>
                    <div className={style.FooterBlackBackground}></div>
                    <div className={style.footerDiv}>
                        <p>Questions? Call 000-800-919-1694</p>
                        <ul>
                            <li>FAQ</li>
                            <li>Help Center</li>
                            <li>Terms of Use</li>
                            <li>Privacy</li>
                            <li>Cookie Preferences</li>
                            <li>Corporate Information</li>
                        </ul>
                        <div className={style.LanguageSelecter}>
                            <span>&#127760;</span>
                            <select>
                                <option>English</option>
                                <option>हिन्दी</option>
                            </select>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
