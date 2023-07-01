import React, { useContext, useState } from 'react'
import AppLogo from '../../../Logo/GETFLIX-logo.png'
import style from '../../../Styles/signup/SignUP.module.css'
import styled from 'styled-components'
import { UserSingup } from '../../../Context/SignupContext'
import { useNavigate } from 'react-router-dom'



export default function SignUp() {

  const {userData,setUserData}=useContext(UserSingup)
  const [Accordation, SetAccordion] = useState(0)
  const [UserEmail, SetUserEmail] = useState('')
  const Navigate=useNavigate()


  function showAccordation(value) {
    if (Accordation === value) {
      SetAccordion(0)
    } else {
      SetAccordion(value)
    }
  }

  function InputOverlay() {
    let Overlay = document.getElementsByClassName(`${style.emailOverlay}`)
    Overlay[0].style.top = '12px'
    Overlay[0].style.fontSize = '13px'
    Overlay[1].style.top = '12px'
    Overlay[1].style.fontSize = '13px'
  }

  function InputBlur(e) {
    if(e.target.value===''){
    let Overlay = document.getElementsByClassName(`${style.emailOverlay}`)
    Overlay[0].style.top = '25px'
    Overlay[0].style.fontSize = '17px'
    Overlay[1].style.top = '25px'
    Overlay[1].style.fontSize = '17px'
    }
  }

  function SetEmailAndNavigate(){
    console.log(UserEmail.includes('@'))
    if(UserEmail==''||!UserEmail.includes('@')){alert('Please enter email address')}
    else{
      setUserData({...userData, 'email':UserEmail})
      Navigate('/signup/step')
    }
  }

  return (
    <div>
      <div className={style.landingDiv}>
        {/* for background img */}
        <div className={style.Div1_backgroundImg}></div>

        {/* position absolute for placeing top */}
        <div className={style.Div1_Content}>
          <nav>
            <img className={style.AppLogo} src={AppLogo} alt="" />
            <div>
              <div className={style.LanguageSelecter}>
                <span>&#127760;</span>
                <select>
                  <option>English</option>
                  <option>हिन्दी</option>
                </select>
              </div>
              <button onClick={()=>{Navigate('/login')}}>Sign In</button>
            </div>
          </nav>

          <div className={style.Div1_heading}>
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h4>Ready to watch? Enter your email to create or restart your membership.</h4>

            <div className={style.getStarted}>
              <span className={style.emailOverlay}>Email address</span>
              <input type="email" value={UserEmail} onChange={(e)=>SetUserEmail(e.target.value)} onFocus={()=>InputOverlay()} onBlur={InputBlur}/>
              <button onClick={()=>SetEmailAndNavigate()}>Get Started {'>'} </button>
            </div>
          </div>
        </div>
      </div>


      {/* enjoy on tv */}
      <div className={style.Div2_onTV}>
        <div>
          <div className={style.Div2_heading}>
            <h1>Enjoy on your TV</h1>
            <h3>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</h3>
          </div>
          <div className={style.Div2_ImgVedio}>
            <video className={style.VedioBackground} autoPlay loop muted src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-in-0819.m4v"></video>
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="" />
          </div>
        </div>
      </div>


      {/* Download your shows */}
      <div className={style.Downlode_shows}>
        <div className={style.div3_imgBox}>
          <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="" />
          <div className={style.Div3_img_overlay}>
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png" alt="" />
            <div>
              <p>Stranger Things</p>
              <p>Downloading...</p>
            </div>
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif" alt="" />
          </div>
        </div>
        <div className={style.div3_headings}>
          <h1>Download your shows to watch offline</h1>
          <h3>Save your favourites easily and always have something to watch.</h3>
        </div>
      </div>



      {/* watch every where  */}
      <div className={style.Div4_enjoy}>
        <div>
          <div className={style.Div2_heading}>
            <h1>Watch everywhere</h1>
            <h3>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</h3>
          </div>
          <div className={style.Div4_ImgVedio}>
            <video className={style.Div4_VedioBackground} autoPlay loop muted src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices-in.m4v"></video>
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-in.png" alt="" />
          </div>
        </div>
      </div>


      <div className={style.Downlode_shows}>
        <div className={style.div3_imgBox}>
          <img src="https://occ-0-2087-2186.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVr8nYuAg0xDpXDv0VI9HUoH7r2aGp4TKRCsKNQrMwxzTtr-NlwOHeS8bCI2oeZddmu3nMYr3j9MjYhHyjBASb1FaOGYZNYvPBCL.png?r=54d" alt="" />
        </div>
        <div className={style.div3_headings}>
          <h1>Create profiles for kids</h1>
          <h3>Send children on adventures with their favourite characters in a space made just for them—free with your membership.</h3>
        </div>
      </div>


      <div className={style.Div6_FAQ}>
        <h1>Frequently Asked Questions</h1>
        <div className={style.accordation}>
          <AccordWrapper accordation={Accordation} >
            <div className='QAcard'>
              <div onClick={() => showAccordation(1)}>
                <h3>What is Netflix?</h3>
                <p>+</p>
              </div>
              <p>
                Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices. <br /><br />
                You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!</p>
            </div>

            <div className='QAcard'>
              <div onClick={() => showAccordation(2)}>
                <h3>How much does Netflix cost?</h3>
                <p>+</p>
              </div>
              <p>Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts.</p>
            </div>

            <div className='QAcard'>
              <div onClick={() => showAccordation(3)}>
                <h3>Where can I watch?</h3>
                <p>+</p>
              </div>
              <p>Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. <br /><br />
                You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere</p>
            </div>
            <div className='QAcard'>
              <div onClick={() => showAccordation(4)}>
                <h3>How do I cancel?</h3>
                <p>+</p>
              </div>
              <p>Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.</p>
            </div>
            <div className='QAcard'>
              <div onClick={() => showAccordation(5)}>
                <h3>What can I watch on Netflix?</h3>
                <p>+</p>
              </div>
              <p>Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.</p>
            </div>
            <div className='QAcard'>
              <div onClick={() => showAccordation(6)}>
                <h3>Is Netflix good for kids?</h3>
                <p>+</p>
              </div>
              <p>The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. <br /><br />
                Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.</p>
            </div>
          </AccordWrapper>

        </div>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        <div className={`${style.getStarted} ${style.div6_Input}`}>
          <span className={style.emailOverlay}>Email address</span>
          <input type="email" value={UserEmail} onChange={(e)=>SetUserEmail(e.target.value)} onFocus={()=>InputOverlay()} onBlur={InputBlur}/>
          <button  onClick={()=>SetEmailAndNavigate()} >Get Started {'>'} </button>
        </div>
      </div>

      <footer className={style.footer}>
        <div>
          <h3>Questions? Call 000-800-919-1694</h3>
          <ul>
            <li>FAQ</li>
            <li>Help Centre</li>
            <li>Account</li>
            <li>Media Centre</li>
            <li>Investor Relations</li>
            <li>Jobs</li>
            <li>Ways to Watch</li>
            <li>Terms of Use</li>
            <li>Privacy</li>
            <li>Cookie Preferences</li>
            <li>Corporate Information</li>
            <li>Contact Us</li>
            <li>Speed Test</li>
            <li>Legal Notices</li>
            <li>Only on Netflix</li>
          </ul>

          <div className={style.LanguageSelecter}>
            <span>&#127760;</span>
            <select>
              <option>English</option>
              <option>हिन्दी</option>
            </select>
          </div>
          <p>Netflix India</p>

        </div>
      </footer>

    </div>
  )
}

const AccordWrapper = styled.div`
  width: 100%;
  
  .QAcard{
    width: 100%;
    cursor: pointer;
  }

  .QAcard>div{
    margin-top:10px;
    padding: 25px;
    background-color: rgb(46, 46, 46);
    font-size:27px;
    display :flex;
    justify-content:space-between;
    font-weight:none !important;
    
  }
  .QAcard>div:hover{
    background-color: rgb(67, 67, 67);
  }

  .QAcard>div>p{
    font-size:35px;
  }

  .QAcard>p{
    padding: 27px;
    font-size: 27px;
    margin-top:2px;
    background-color: rgb(46, 46, 46);
  }

  @media only screen and (max-width: 950px) {
  .QAcard>p{
    font-size:20px;
    padding: 20px;
    }
  .QAcard>div{
      font-size:20px;
      padding: 20px;
    }
    .QAcard>div>h3{
      font-size:25px;
    }
    .QAcard>div>p{
      font-size:25px;
    }
  }
  @media only screen and (max-width: 500px) {

  .QAcard>p{
    font-size:15px;
    padding: 20px;
    }

  .QAcard>div{
      font-size:15px;
      padding: 15px;
    }
    .QAcard>div>p{
      font-size:15px;
    }
  }




  .QAcard:nth-child(1)>p{
    display:${({ accordation }) => accordation === 1 ? 'block' : 'none'}
  }
  .QAcard:nth-child(2)>p{
    display:${({ accordation }) => accordation === 2 ? 'block' : 'none'}
  }
  .QAcard:nth-child(3)>p{
    display:${({ accordation }) => accordation === 3 ? 'block' : 'none'}
  }
  .QAcard:nth-child(4)>p{
    display:${({ accordation }) => accordation === 4 ? 'block' : 'none'}
  }
  .QAcard:nth-child(5)>p{
    display:${({ accordation }) => accordation === 5 ? 'block' : 'none'}
  }
  .QAcard:nth-child(6)>p{
    display:${({ accordation }) => accordation === 6 ? 'block' : 'none'}
  }


  .QAcard:nth-child(1)>div>p{
    transform: rotate(${({ accordation }) => accordation === 1 ? '45deg' : '0deg'})
  }
  .QAcard:nth-child(2)>div>p{
    transform: rotate(${({ accordation }) => accordation === 2 ? '45deg' : '0deg'})
  }
  .QAcard:nth-child(3)>div>p{
    transform: rotate(${({ accordation }) => accordation === 3 ? '45deg' : '0deg'})
  }
  .QAcard:nth-child(4)>div>p{
    transform: rotate(${({ accordation }) => accordation === 4 ? '45deg' : '0deg'})
  }
  .QAcard:nth-child(5)>div>p{
    transform: rotate(${({ accordation }) => accordation === 5 ? '45deg' : '0deg'})
  }
  .QAcard:nth-child(6)>div>p{
    transform: rotate(${({ accordation }) => accordation === 6 ? '45deg' : '0deg'})
  }

  
`