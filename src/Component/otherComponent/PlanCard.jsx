import React from 'react'
import style from './../../Styles/otherComponent/PlanCard.module.css'

    export default function PlanCard({plan,setPlan,value,color='red',data}) {
    return (
        <div className={style.outerdiv} onClick={()=>setPlan(value)}
        style={{boxShadow:plan===value?' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px':null}} >
            <div className={style.upperDiv}  
            style={{backgroundColor:plan===value?color:'white',color:plan===value?'white':'black'}} >
                <span style={{display:plan===value?'block':'none',color:'black'}}><span class="material-symbols-outlined">done</span></span>
                <div>
                    <h3>{data.plan}</h3>
                    <h4>₹ {data.price}/mo.</h4>
                </div>
            </div>
            <div className={style.lowerDiv}>
                <div><span>&#8226;</span><p>{data.description[0]}</p></div>
                <div><span>&#8226;</span><p>{data.description[1]}</p></div>
                <div><span>&#8226;</span><p>Downloads available</p></div>
            </div>
        </div>
    )
}


