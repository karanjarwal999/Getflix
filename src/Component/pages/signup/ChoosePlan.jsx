import React, { useState } from 'react'
import style from '../../../Styles/signup/choosePlan.module.css'
import SingupFooter from './SingupFooter'
import SingupNav from './SingupNav'
import PlanCard from '../../otherComponent/PlanCard'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function ChoosePlan() {
  const [plan, setPlan] = useState(1)
  const toast = useToast()
  const [flag,setFlag]=useState(false)
  const Navigate =useNavigate()

  const dataArray = [
                    { plan: 'Premium', price: 649, description: ['Our best video quality in 4K and HDR', 'Watch on your TV, computer, mobile phone and tablet'] },
                    { plan: 'Standard', price: 499, description: ['Great video quality in 1080p', 'Watch on your TV, computer, mobile phone and tablet'] },
                    { plan: 'Budget', price: 199, description: ['Good video quality in 720p', 'Watch on your TV, computer, mobile phone and tablet'] },
                    { plan: 'Mobile', price: 149, description: ['Good video quality in 480p', 'Watch on your mobile phone and tablet'] }  ]

    function handleClick(){
      setFlag(true)

      toast({
        title: `Subscribed to ${dataArray[plan-1].plan} plan`,
        description:'redirecting to Home page',
        position: 'top',
        isClosable: true,
        status:'success',
        duration: 3000,
      })

      setTimeout(() => {
        setFlag(false)
        Navigate('/')
      }, 3000);
    }


  return (
    <div style={{ backgroundColor: 'white' }}>
      <SingupNav bgcolor={'white'} />
      <div className={style.card} style={{ background: 'white' }}>
        <span className={style.step}>STEP <b>3</b> OF <b>3</b></span>
        <h2 className={style.heading}>Choose the plan that’s right for you</h2>
        <p><span className="material-symbols-outlined">done</span>Watch all you want. Ad-free.</p>
        <p><span className="material-symbols-outlined">done</span>Recommendations just for you.</p>
        <p><span className="material-symbols-outlined">done</span>Change or cancel your plan anytime.</p>

        <div className={style.planDiv}>
          <PlanCard plan={plan} setPlan={setPlan} value={1} data={dataArray[0]}/>
          <PlanCard plan={plan} setPlan={setPlan} value={2} data={dataArray[1]}/>
          <PlanCard plan={plan} setPlan={setPlan} value={3} data={dataArray[2]}/>
          <PlanCard plan={plan} setPlan={setPlan} value={4} data={dataArray[3]}/>
        </div>

        <div className={style.bottomInfo}>
          <p>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our <span style={{ color: '#0071eb' }}>Terms of Use</span> for more details.</p>
          <p>Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.</p>
        </div>
        <button disabled={flag} onClick={()=>handleClick()}>{flag?<img src="https://cdn.shopify.com/extensions/05048db8-2be5-47a6-b0d7-c3bcf88a769c/5.3.0/assets/loader-white.png" alt="" />:'Next'}</button>

      </div>
      <SingupFooter />
    </div>
  )
}
