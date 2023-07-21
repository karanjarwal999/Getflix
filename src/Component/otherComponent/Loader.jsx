import React from 'react'
import { styled } from 'styled-components'

export default function Loader() {
  return (
    <Div>
      <p className='Loader_title'></p>
      <div className='Loader_flexDiv'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Div>
  )
}

const Div= styled.div`
 margin-left: 4vw;

.Loader_title{
    height: 20px;
    width: 90px;
    background-color: #1A1A1A;
    margin-bottom: 10px;
}
.Loader_flexDiv{
   display:grid;
   grid-template-columns: repeat(20,auto);
   gap:10px;
   overflow: hidden;
   height: 130px;
}
.Loader_flexDiv>div{
    width: 230px;
    background-color:#1A1A1A;
    border-radius: 5px;
}

`