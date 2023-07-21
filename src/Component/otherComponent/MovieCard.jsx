import React from 'react'
import style from '../../Styles/otherComponent/movieCard.module.css'

export default function MovieCard({ data, index }) {
  return (
    <div className={index ? style.firstCardDiv : style.CardDiv}>
      <img className={style.cardImage} src={`https://image.tmdb.org/t/p/original${data.image}`} alt="" />
      <p className={style.imageReplacement}>{data.title}</p>
      {/* p tag to display titile when image is failed to load */}
      {/*<div className={style.buttonDiv} >
            <div>
              <button><span style={{fontSize:'10px'}} class="material-symbols-outlined">play_circle</span></button>
              <button><span style={{fontSize:'10px'}} class="material-symbols-outlined">add_circle</span></button>
              <div className={style.movieLike}>
                <button><span style={{fontSize:'10px'}} class="material-symbols-outlined">thumb_up</span></button>
                <button><span style={{fontSize:'10px'}} class="material-symbols-outlined">thumb_up</span></button>
                <button className={style.doubleLike}><span style={{fontSize:'10px'}} class="material-symbols-outlined">thumb_up</span><span class="material-symbols-outlined">thumb_up</span></button>
              </div>
            </div>
            <button></button>
          </div>*/}
    </div>
  )
}
