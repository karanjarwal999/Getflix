import React, {useRef, useState } from 'react'
import MovieCard from './MovieCard'
import style from '../../Styles/otherComponent/MovieList.module.css'

export default function MoviesList({ MovieData}) {
  const { title, data } = MovieData
  const listRef = useRef('')
  let [scrollvalue, setScrollValue] = useState(0)


  function scrolllist(direction) {
    let img = document.querySelector(`.${style.moviesList}>div>img`)
    let scroll = img.clientWidth * 4
    if (direction === 'right'&& scrollvalue<scroll*(20/4)) {
      listRef.current.scrollLeft = scrollvalue + scroll
      setScrollValue((prev) => prev + scroll)
    }else{
      if(scrollvalue>0){
      listRef.current.scrollLeft = scrollvalue - scroll
      setScrollValue((prev) => prev - scroll)}
    }
  }

  return (
    <div className={style.moviesListOuterDiv}>
      <h1 className={style.categoryTitle}>{title}<span className="material-symbols-outlined"><span>Explore All</span>arrow_forward_ios</span></h1>

      {/* left right button to scroll */}
      <button onClick={() => scrolllist("left")} className={style.PreviousButton}><span className="material-symbols-outlined">arrow_back_ios</span></button>
      <button onClick={() => scrolllist("right")} className={style.NextButton}><span className="material-symbols-outlined">arrow_forward_ios</span></button>

      {/* appending movies of  category */}
      <div ref={listRef} className={style.moviesList}>
        {
          data?.map((singledata, index) => <MovieCard key={singledata.id}  data={singledata} index={index === 0} />)
        }
      </div>
    </div>
  )
}
