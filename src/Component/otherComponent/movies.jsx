import React, { useEffect, useRef, useState } from 'react'
import style from '../../Styles/otherComponent/movies.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieCategoryList } from '../../store/dataFunction'
import MoviesList from './MoviesList'
import Loader from './Loader'
import HomeFooter from './HomeFooter'

export default function Movies() {
  const dispatch = useDispatch()
  const [bannerMovie, setBannerMovie] = useState('')

  // getting data from store
  const movieData = useSelector((store) => store.data)
  const movieList = useSelector((store) => store.fetchList)
  const fetchNumber = useSelector((store) => store.fetchNumber)

  if (movieData.length > 0 && bannerMovie === '') {
    setBannerMovie(movieData[0]?.data[Math.floor(Math.random() * (20))])
  }

  useEffect(() => {
    // to fetch category of movies
    dispatch(getMovieCategoryList)

    // scroll event to make navbar back after scrolling
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
    <div style={{ position: 'relative',paddingBottom:'100px'}}>
      {/* creting top banner */}
      <div className={style.banner}>

        {bannerMovie.image?.length > 0 ?
        // deu to this condition it will show black background instead of img when data is not fetched
          <img src={`https://image.tmdb.org/t/p/original${bannerMovie.image}`} alt="" /> :
          <p className={style.bannerReplacement}></p>
        }

        {/* taking a p tag to give image blackish effect */}
        <p className={style.blurBackground}></p>

        {bannerMovie.title?.length > 0 ?
          // deu to this condition it will not show movie details when data is not fetched
          <div className={style.bannerInfoDiv}>
            <h3>{bannerMovie.title?.length > 30 ? bannerMovie.title?.substring(0, 30) + '...' : bannerMovie.title}</h3>
            <p>{bannerMovie.description?.substring(0, 120) + '...'}</p>
            <div>
              <button><span className="material-symbols-outlined">play_arrow</span> Play</button>
              <button><span className="material-symbols-outlined">info</span> More Info</button>
            </div>
          </div>
          : null
        }

      </div>

      {/* append all category list and loader when data is not fetched */}
      <div className={style.listMainDiv}>

        {movieData.map((element, index) =><MoviesList key={index} MovieData={element} />)}
        {movieData?.length < 19 ? <Loader /> : null}

      </div>
      <HomeFooter/>
    </div>
  )

}
