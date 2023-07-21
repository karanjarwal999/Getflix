import React from 'react'
import { styled } from 'styled-components'

export default function HomeFooter() {
  return (
    <div style={{width:'100%',display:'flex',justifyContent:'center'}}>

    <Div>
      <div className='homeFooterImgDiv'>
        <img src="https://tse1.mm.bing.net/th?id=OIP.g8oGbyvNBF5oRYTmy-kfpwHaHa&pid=Api&P=0&h=180" alt="facebook" />
        <img src="https://tse2.mm.bing.net/th?id=OIP.-jVGEoNnQM5h4r5JXJgxwQHaHa&pid=Api&P=0&h=180" alt="instagram" />
        <img src="https://tse3.mm.bing.net/th?id=OIP.KeRGrLB92Q0u_VrIm-3cUgHaHa&pid=Api&P=0&h=180" alt="twitter" />
        <img src="https://tse3.mm.bing.net/th?id=OIP.wI_EG-jUfY0YxbzufdbFKAHaHa&pid=Api&P=0&h=180" alt="youtube" />
      </div>
      <div className='homeFooterGridDiv'>
            <p>Audio Description</p>
            <p>Help Center</p>
            <p>Gifts Card</p>
            <p>media Center</p>
            <p>Investor Relations</p>
            <p>Jobs</p>
            <p>Terms to Use</p>
            <p>Privacy</p>
            <p>Legal Notices</p>
            <p>Cookie</p>
            <p>Corporate Information</p>
            <p>Contact Us</p>
      </div>
      <div className='homeFooterBottomDiv'>
        <p>Service Code</p>
        <p> @1997-2023 Netflix, inc.</p>
      </div>
    </Div>
    </div>
  )
}

const Div = styled.div`
font-size:13px;
color:#808080;
margin:auto;
max-width: 1000px;
position:absolute;
bottom:0;
width:100%;

div>img{
    border-radius: 100%;
    width: 30px;
}
.homeFooterImgDiv{
    display: flex;
    gap:20px;
    margin-bottom:15px;
}
.homeFooterGridDiv{
    display: grid;
    grid-template-columns: auto auto auto;
    row-gap:15px;
}
.homeFooterBottomDiv{
    margin :15px 0px;
}
.homeFooterBottomDiv>p:nth-child(1){
    border: 1px solid white;
    padding: 5px;
    margin-bottom:15px;
    display:inline-block;
}
.homeFooterBottomDiv>p:nth-child(1):hover{
    color:white;
}
`
