import React, { useState } from 'react'
import { styled } from 'styled-components'
import logo from '../../../Logo/GETFLIX-logo.png'
import { Auth } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom'

export default function HelpPage() {
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
                <h2>Help Center</h2>
                <input type="text" placeholder='What do you need help with ?' />
            </nav>
            <div>
                <div className='Help_quickQuestion'>
                    <h3>Hii, {name}</h3>
                    <p>Recommended for you</p>
                    <div>
                        <p><span class="material-symbols-outlined">description</span>How to keep your account secure</p>
                        <p><span class="material-symbols-outlined">description</span>Parental controls on Netflix</p>
                        <p><span class="material-symbols-outlined">description</span>How to change your plan</p>
                    </div>
                </div>
                <div className='Help_AllQuestions'>
                    <div className='Help_Opretions'>
                        <div>
                            <h2>Manage My Account</h2>
                            <p>Plans and Pricing</p>
                            <p>I received an email stating there was a new sign-in to my account</p>
                            <p>How to change your plan</p>
                        </div>
                        <div>
                            <h2> Can't Watch</h2>
                            <p>How to change or reset your password</p>
                            <p>Netflix says to sign up when trying to sign in</p>
                            <p>Netflix says, 'This app is not compatible with your device'.</p>
                        </div>
                        <div>
                            <h2>Billing Questions</h2>
                            <p>How to pay for Netflix</p>
                            <p>Billing and Payments</p>
                            <p>Netflix Gift Cards</p>
                        </div>
                        <div>
                            <h2>Watching Netflix</h2>
                            <p>How to create, change, or delete profiles</p>
                            <p>How to watch Netflix on your TV</p>
                            <p>How to download titles to watch offline</p>
                        </div>
                    </div>
                    <div className='Help_QuickLinks'>
                        <h2>Quick Links</h2>
                        <p>Content Grievances in India</p>
                        <p>Request TV shows or movies</p>
                        <p>Update email</p>
                        <p>Update password</p>
                        <p>Update payment method</p>
                        <p>Cancel account</p>
                        <p>Review payment history</p>
                    </div>
                </div>
            </div>
            <footer>
                <h4>Need more help ?</h4>
                <button>Contact Us</button>
                <hr />
                <p>Terms of Use</p>
                <p>Privacy</p>
                <p>Cookie Preferences</p>
                <p>Corporate Information</p>
            </footer>
        </Div>
    )
}


const Div = styled.div`
color: white;

nav{
    background-color: #0e0000;
    padding: 25px 5%;
}
nav>img{
    width: 200px;
}
nav>h2{
    font-size: 33px;
    font-weight: 600;
    text-align: center;
    padding-bottom: 14px;
    cursor: pointer;
}
nav>input{
    width: 70%;
    padding:9px 16px 9px 52px;
    color: black;
    border-radius: 5px;
    display: block;
    margin: auto;
    background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrXK07oJ88wIYac1fYL3H4YxhOxjaH3uzwrQ);
    background-repeat: no-repeat;
    background-size:3%;
    background-position-y: 50%;
    background-position-x: 1%;
}
nav>input:focus{
   outline: none;
}

.Help_quickQuestion{
    background-color: whitesmoke;
    padding: 24px 5%;
    color: black;
    border-bottom: 0.5px solid lightgray ;
}
.Help_quickQuestion>h3{
    font-size: 24px;
    font-weight: 600;
}
.Help_quickQuestion>div{
    display: flex;
    gap: 20px;
    margin-top: 16px;
}
.Help_quickQuestion>div>p{
   padding: 16px;
   box-shadow: rgba(50, 50, 50, 0.2) 0px 2px 10px 0px;
   border-radius: 5px;
   cursor: pointer;
}
.Help_quickQuestion>div>p:hover{
  color:#e50914;
  text-decoration: underline;
  text-underline-offset:2px;
}
.Help_quickQuestion>div>p:hover>span{
  color: black;
}
.Help_quickQuestion>div>p>span{
    position: relative;
    top: 3px;
    margin-right: 10px;
}
.Help_AllQuestions{
    padding: 48px 5%;
    background-color: white;
    color: black;
    display: grid;
    grid-template-columns:76% 20%;
    justify-content: space-between;
}
.Help_Opretions{
    display: grid;
    grid-template-columns:repeat(4,23%);
    justify-content: space-between;
}
.Help_Opretions>div>h2,.Help_QuickLinks>h2{
    font-weight: 600;
    font-size: 23px;
    margin-bottom: 24px;
    cursor: default;
}
.Help_Opretions>div>p,.Help_QuickLinks>p{
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 16px;
}
.Help_Opretions>div>p:hover,.Help_QuickLinks>p:hover{
   color: #e50914;
   text-decoration: underline;
}

footer{
    padding: 24px 5% 40px 5%;
    background: linear-gradient(to right top,black,black,black,rgb(114, 9, 9));
}
footer>p{
    font-size: 15px;
    margin-bottom: 16px;
}
footer>h4{
    font-weight: 600;
    display: inline;
    margin-right: 32px;
}
footer>button{
   background-color: white;
   color: black;
   padding: 5px 15px;
   border-radius: 5px;
   font-weight: 600;
}
footer>hr{
    margin:16px 0px 40px 0px
}

@media screen and (max-width:1350px){
    .Help_AllQuestions{
    grid-template-columns:68% 28%;
    justify-content: space-between;
}
    .Help_Opretions{
        grid-template-columns:repeat(2,46%);
    }
}
@media screen and (max-width:900px){
    .Help_AllQuestions{
        padding: 30px 5%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .Help_Opretions{
        display: grid;
        grid-template-columns:repeat(2,48%);
        justify-content: space-between;
        margin-bottom: 20px;
    }
    nav>img{
        width: 150px;
    }
}

@media screen and (max-width:750px){
    .Help_quickQuestion>div{
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 16px;
    }
    .Help_quickQuestion>div>p{
        padding: 10px;
        box-shadow: rgba(50, 50, 50, 0.2) 0px 2px 10px 0px;
        border-radius: 5px;
        font-size: 18px;
    }
    nav>input{
        width: 80%;
        padding:9px 16px 9px 7%;
        background-size:5%;
    }
}

@media screen and (max-width:600px){
    .Help_Opretions{
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 20px;
    }
    footer>h4{
        display: block;
        margin-right: 0px;
        margin-bottom:10px;
    }
    footer>button{
        width: 100%;
        padding: 5px 15px;
        border-radius: 5px;
        font-weight: 600;
    }
    nav>img{
        width: 100px;
    }
    nav>h2{
        text-align: start;
        padding-bottom: 0px;
        padding-top: 20px;
    }
    nav>input{
        width: 100%;
        padding:9px 16px 9px 7%;
        background-size:5%;
    }
}


@media screen and (max-width:400px){
    .Help_Opretions>div>p,.Help_QuickLinks>p{
        font-size: 14px;
        margin-bottom: 7px;
    }
    .Help_Opretions>div>h2,.Help_QuickLinks>h2{
        font-size: 18px;
        margin-bottom: 10px;
    }
    .Help_Opretions{
       gap: 15px;
    }
    footer>p{
        font-size: 14px;
        margin-bottom: 10px;
    }
    footer{
        padding: 24px 5% 20px 5%;
        background: linear-gradient(to right top,black,black,black,rgb(114, 9, 9));
    }
    .Help_quickQuestion>h3{
        font-size: 18px;
        font-weight: 600;
    }
    .Help_quickQuestion>p{
        font-size: 12px;
    }
    .Help_quickQuestion>div>p{
        padding: 7px;
        border-radius: 3px;
        font-size: 14px;
    }
    footer>hr{
        margin:16px 0px 25px 0px
    }
    nav>img{
        width: 100px;
    }
    nav>h2{
        font-size: 22px;
    }
    nav>input{
        padding:9px 5px 9px 7%;
        background-size:5%;
        font-size: 15px;
    }

}
`