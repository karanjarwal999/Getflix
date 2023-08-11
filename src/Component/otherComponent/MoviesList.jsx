import React, {useRef, useState } from 'react'
import MovieCard from './MovieCard'
import style from '../../Styles/otherComponent/MovieList.module.css'
import { styled } from 'styled-components'

export default function MoviesList({ MovieData,ManageModal,released}) {
  const { title, data } = MovieData
  const listRef = useRef('')
  let [scrollvalue, setScrollValue] = useState(0)
  


  function scrolllist(direction) {
    let img = document.querySelector(`.${style.moviesList}>div>img`)
    let scroll = img.clientWidth * 2 + 20
    if (direction === 'right'&& scrollvalue<scroll*(20/2)) {
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
      <Div len={`${data.length}`} ref={listRef} className={style.moviesList}>
        {
          data?.map((singledata, index) =>
           singledata.image?
           <MovieCard key={singledata.id} category={title}  ManageModal={ManageModal} data={singledata} index={index === 0} released={released}/>:null)
        }
      </Div>
    </div>
  )
}


const Div= styled.div`
  display: grid;
  grid-template-columns: ${({len})=>(len<=6?"repeat(6,230px)":`repeat(${len},230px)`)};

  @media screen and (max-width: 600px) {
    grid-template-columns: ${({len})=>(len<=3?"repeat(3,180px)":`repeat(${len},180px)`)};
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: ${({len})=>(len<=3?"repeat(3,140px)":`repeat(${len},140px)`)};
  }

  @media screen and (max-width: 350px) {
    grid-template-columns: ${({len})=>(len<=3?"repeat(3,40vw)":`repeat(${len},40vw)`)};
  } 

`