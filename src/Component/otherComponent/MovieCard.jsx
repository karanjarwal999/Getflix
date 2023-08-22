import React, { useState } from 'react'
import style from '../../Styles/otherComponent/movieCard.module.css'
import { Tooltip } from '@chakra-ui/react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

export default function MovieCard({ data, index, ManageModal, category,}) {
  const [vedioId, setVedioId] = useState('')
  const [hover, setHover] = useState(false)
  const [timeInterval, setTimeInterval] = useState()
  const myList = useSelector((store) => store.MyList)
  const myLiked = useSelector((store) => store.MyLiked)
  const myReminder = useSelector((store) => store.MyReminder)
  const dispatch = useDispatch()


  function playVideofullScreen() {
    let iframe = document.getElementsByTagName('iframe')
    if (vedioId === '') {
      ManageModal(data.id, vedioId, category)
    } else {
      if (iframe[0].requestFullscreen) {
        iframe[0].requestFullscreen();
      } else if (iframe[0].webkitRequestFullscreen) { /* Safari */
        iframe[0].webkitRequestFullscreen();
      } else if (iframe[0].msRequestFullscreen) { /* IE11 */
        iframe[0].msRequestFullscreen();
      }
    }
  }

  function fetchVedio() {
    // fetching vedio Id to play
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${data.title}&key=${process.env.REACT_APP_YOUTUBE_API}`)
      .then(response => {
        setVedioId(response.data.items[0].id.videoId);
        console.log(response.data.items[0].id.videoId)
      })
      .catch(err => setVedioId('notFound'))
  }


  function mouseHover() {
    setHover(true)
    // condition to check that we have  alredy Id, if it then no need to request
    if (vedioId === '') {
      // setting time interveal to api request 
      setTimeInterval(setTimeout(() => {
        console.log('fetchinf Data.....')
        fetchVedio()
        // setVedioId('notFound')
      }, 1000))
    }
  }

  function mouseLeft() {
    setHover(false)
    // if mouse left card before 2 second if will clear timeInterval 
    // so we can reduces api request and server load 
    clearTimeout(timeInterval)
  }

  return (
    <div onMouseEnter={mouseHover} onMouseLeave={mouseLeft} className={index ? style.firstCardDiv : style.CardDiv}>

      {/* it replace img with iFrame on hover  */}
      {vedioId !== '' && hover && vedioId !== 'notFound' ?
        <div className={style.youtubeContainer}>
          <iframe title='movie' src={`https://www.youtube.com/embed/${vedioId}?showinfo=0&controls=0&autoplay=1&mute=1`}></iframe>
        </div>
        :
        <img onClick={() => ManageModal(data.id, vedioId, category)} className={style.cardImage} src={`https://image.tmdb.org/t/p/original${data.image}`} alt="" />
      }

      <p className={style.imageReplacement}>
        {vedioId !== '' && hover && vedioId !== 'notFound' ?
          <img onClick={() => ManageModal(data.id, vedioId, category)} style={{ borderRadius: '5px' }} src={`https://image.tmdb.org/t/p/original${data.image}`} alt={data.title} />
          : `${data.title}`}
      </p>
      {/* p tag to display titile when image is failed to load */}
      {/* and it show poster , to cover empty time between switching from img to iFrame  on hover*/}

      {/* botton btns that display on hover */}
      <div className={style.buttonDiv} >
        <div>
            <div>
              {/* buttons  are wraped by tool tip here  ( tololtip-->button-->span ) */}
              <button style={{ color: 'white' }} onClick={playVideofullScreen}>
                <span id='boldIcon' className="material-symbols-outlined ">play_circle</span>
              </button>
              <Tooltip hasArrow label={!myList.includes(data.id) ? 'Add to My List' : 'Remove From My List'} fontSize='20px' fontWeight={'600'} bg='white' color='black' placement='top'>
                <button onClick={() => dispatch({ type: 'update_MyList', payload: data.id })}>
                  {myList.includes(data.id) ?
                    <span className="material-symbols-outlined">check_circle</span> :
                    <span className="material-symbols-outlined">add_circle</span>}
                </button>
              </Tooltip>
              <Tooltip hasArrow label={!myLiked.includes(data.id) ? 'Love it!' : 'Unlike'} fontSize='20px' fontWeight={'600'} bg='white' color='black' placement='top'>
                <button onClick={() => dispatch({ type: 'update_MyLiked', payload: data.id })}>
                  <span id={myLiked.includes(data.id) ? 'boldIcon' : ''}
                    style={{ color: `${myLiked.includes(data.id) ? 'white' : 'rgb(183, 182, 182)'}` }} className="material-symbols-outlined">favorite</span>
                </button>
              </Tooltip>
            </div>
          <Tooltip hasArrow label='More info' fontSize='20px' fontWeight={'600'} bg='white' color='black' placement='top'>
            <button onClick={() => ManageModal(data.id, vedioId, category)}>
              <span className="material-symbols-outlined">arrow_drop_down_circle</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
