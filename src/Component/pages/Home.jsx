import React, { useEffect } from 'react'
import HomeNavbar from '../otherComponent/HomeNavbar'
import HomeRoutes from '../../Routes/HomeRoutes'
import { getMovieCategoryList } from '../../store/dataFunction'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch()
  const movieData = useSelector((store) => store.data)

  useEffect(() => {
    // to fetch  movies data
    if(movieData.length===0){
      dispatch(getMovieCategoryList)
    }

    // scroll event to make navbar background black  after scrolling
    let navbar = document.getElementById('navbar')
    function scroll() {
      if (window.scrollY > 30) {
        navbar.style.backgroundColor = 'black'
      } else if (window.scrollY < 30) {
        navbar.style.background = 'linear-gradient(rgba(0, 0, 0, 0.627) ,transparent)'
      }
    }
    window.addEventListener('scroll', scroll)

    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <div style={{color:'white'}}>
      <HomeNavbar/>
      <HomeRoutes/>
    </div>
  )
}
