import React, { useContext } from 'react'
import logo from '../../Logo/GETFLIX-logo.png'
import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverTrigger } from '@chakra-ui/react'
import { NavLink, useLocation, useNavigate} from 'react-router-dom'
import style from '../../Styles/otherComponent/HomeNav.module.css'
import { useState } from 'react'
import { Auth } from '../firebaseConfig'
import { UserSingup } from '../../Context/SignupContext'

export default function HomeNavbar() {
  const Navigate=useNavigate()
  const Location=useLocation()
  const [prevRoute, setPrevRoute] = useState('')
  const [timeInterval, setTimeInterval] = useState()

  // dummy data for natification hover
  let notification = [{
    img: 'https://dnm.nflximg.net/api/v6/kvDymu0eXRyicIuSUzvRrxrm5dU/AAAABQPD0afQEfPcdRN_mUeRp3sCLi412v8F8we15XCs1Q2XwL8ALz3DbAi6pACyytiN3_oUTxhVvU9Vc620cKsji3p6PUiLRSlimjGOZ6Bx2YvouWoel8-tD9fFYKwZ3V96iNdLGJx7_i8LRMI.jpg?r=6d6',
    title: 'Coming on 27th july',
    postedOn: '15 july'
  }]


  // debounce to reduce request
  function debounce(e){
    if(timeInterval){
      clearTimeout(timeInterval);  
    }
    setTimeInterval(setTimeout(() => {
      handleSearch(e)
    },1500))
  }


  // function to handle search
  function handleSearch(e){
    if(e.target.value===''){
      Navigate(prevRoute) 
      setPrevRoute('')
    }else{
    if(e.target.value.length>=1 && Location.pathname!=='/search'){
      setPrevRoute(Location.pathname)
      Navigate(`/search?q=${e.target.value}`,{state:{q:e.target.value}})
     }
    }
  }


  return (
    <div id='navbar' className={style.Navbar}>
      <img src={logo} alt="getflix" onClick={()=>Navigate('/')}/>
      <div>
        <div className={style.hymbergur}>
          <Popover trigger='hover'>
            <PopoverTrigger>
              <button className={style.hymbergurBtn}>Browse<span className="material-symbols-outlined">arrow_drop_down</span></button>
            </PopoverTrigger>
            <PopoverContent bg='black' border='none' marginTop='10px' width='250px'>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody bg='black' border='none' p="0px" >
                <div className={style.hymbergurContent}>
                  <NavLink to="/" className={({ isActive }) => isActive ? `${style.Active}` : `${style.InACtive}`}>Home</NavLink>
                  <NavLink to="/movies" className={({ isActive }) => isActive ? `${style.Active}` : `${style.InACtive}`}>Movies</NavLink>
                  <NavLink to="/newAndPopular" className={({ isActive }) => isActive ? `${style.Active}` : `${style.InACtive}`}>New & popular</NavLink>
                  <NavLink to="/myList" className={({ isActive }) => isActive ? `${style.Active}` : `${style.InACtive}`}>My List</NavLink>
                  <NavLink to="/ByLanguage" className={({ isActive }) => isActive ? `${style.Active}` : `${style.InACtive}`}>Browse By Languages</NavLink>
                </div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
        <div className={style.navlinks}>
          <NavLink to="/" className={({ isActive }) => isActive ? `${style.Active}` : `${style.InACtive}`}>Home</NavLink>
          <NavLink to="/movies" className={({ isActive }) => isActive ? `${style.Active}` : `${style.InACtive}`}>Movies</NavLink>
          <NavLink to="/newAndPopular" className={({ isActive }) => isActive ? `${style.Active}` : `${style.InACtive}`}>New & popular</NavLink>
          <NavLink to="/MyList" className={({ isActive }) => isActive ? `${style.Active}` : `${style.InACtive}`}>My List</NavLink>
          <NavLink to="/ByLanguage" className={({ isActive }) => isActive ? `${style.Active}` : `${style.InACtive}`}>Browse By Languages</NavLink>
        </div>
        <div className={style.serchbar}>
          <input type="text" placeholder='Titles, people, genres' id='searchbar' onChange={debounce}/>
          <NavLink>Children</NavLink>
          <Popover trigger='hover' placement='bottom-end'>
            <PopoverTrigger>
              <span style={{ cursor: 'pointer' }} className="material-symbols-outlined"> notifications </span>
            </PopoverTrigger>
            <PopoverContent bg='black' border='none' marginTop='10px' width='300px'>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody bg='black' border='none' p="0px">
                <div className={style.notificationDiv}>
                  {notification.length === 0 ? 'No New Notification' : ''}
                  {notification?.map((data) => <div key={Date.now()} className={style.notificationAlert}>
                    <img src={data.img} alt="" />
                    <div>
                      <h3>{data.title}</h3>
                      <p>{data.postedOn}</p>
                    </div>
                  </div>)
                  }
                </div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Popover trigger='hover' placement='bottom-end' >
            <PopoverTrigger>
              <img className={style.profileIcon} src="https://occ-0-2086-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3_ez064IsBGdXjVUT59G5IRuFdqZlCJCneepU.png?r=229" alt="Profile" />
            </PopoverTrigger>
            <PopoverContent bg='black' border='none' width='250px' marginTop='10px'>
              <PopoverArrow bg='white' />
              <PopoverCloseButton />
              <PopoverBody bg='black' border='none'>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: "15px" }}>
                  <img src="https://occ-0-2086-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABcJE6sna7-v-fDszqTSTLqoNLNTV8u6FCGOehw7JKWVmU-oLMoXYX6K0f2nKdOFZcATnH9GAw2kgTZTxZj1cEPt9GYnRYbc.png?r=54d" alt="" />
                  <p>Children</p>
                </div>
                <div className={style.profileDiv} >
                  <span className="material-symbols-outlined">edit</span>
                  <p>Manage Profiles</p>
                  <span className="material-symbols-outlined">swap_horizontal_circle</span>
                  <p onClick={()=>Navigate('/transferProfile')}>Transfer Profile</p>
                  <span className="material-symbols-outlined">person</span>
                  <p onClick={()=>Navigate('/account')}>Account</p>
                  <span className="material-symbols-outlined">help</span>
                  <p onClick={()=>Navigate('/help')}>Help Center</p>
                </div>
              </PopoverBody>
              <PopoverFooter>
                <NavLink style={{ textAlign: 'center', display: 'block' }} to="/logout">Sing out of Netflix</NavLink>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </div>

      </div>

    </div>
  )
}
