import React, { useEffect, useState } from 'react'
import style from '../../Styles/otherComponent/Homepage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useDisclosure, Tooltip } from '@chakra-ui/react'
import MoviesList from './MoviesList'
import Loader from './Loader'
import HomeFooter from './HomeFooter'
import axios from 'axios'

export default function HomePage() {
  const dispatch = useDispatch()
  const [bannerMovie, setBannerMovie] = useState('')
  const [ModalData, setModalData] = useState({})
  const [RandomNumber, setRandomNumber] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [expandModal, setExpandModal] = useState(false)
  const [bannerLoaded,serBannerLoaded]=useState(false)
  
  
  // getting data from store
  const myList = useSelector((store) => store.MyList)
  const myLiked = useSelector((store) => store.MyLiked)
  const movieData = useSelector((store) => store.data)


  // setting random movie for banner
  if (movieData.length > 0 && bannerMovie === '') {
    setBannerMovie(movieData[0]?.data[Math.floor(Math.random() * (20))])
    setTimeout(() =>{serBannerLoaded(true)},0)
  }


  // manage popup modal 
  async function ManageModal(id, vedioId, category) {
    onClose()
    setRandomNumber(Math.floor(Math.random()*7))
    setExpandModal(false)
    // getting more data of movie
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTdkZTEwNmViNTRlYzlhYWZhYjlkNDNjYzIyMGE0OCIsInN1YiI6IjY0NzYwNTVkYzI4MjNhMDBjNDIxYzgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7qGZeU1ca2R-nft23Y2XFCVrRv9idUNrQCQARZV_puw'
      }
    })
      .then((res) => {
        // checking for vedioid , if not call the function to get id
        if (vedioId === '') {
          // setModalData({ data: res.data, vedioId: 'notFound', category:category||res.data.genres[0].name })
          fetchVedio(res.data,category)
          onOpen()
        } else {
          setModalData({ data: res.data, vedioId: vedioId, category:category||res.data.genres[0].name })
          onOpen()
        }
      })


    // fetching vedio id from youtube api
    function fetchVedio(data, category) {
      axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${data.title}&key=AIzaSyAH-pBMcZ5CutrybeG4fSnDwjqUz5Swe0w`)
        .then(response => setModalData({ data: data, vedioId: response.data.items[0].id.videoId, category: category }))
    }
  }


  // scrolling to top on page load
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[])


  return (
    <div className={style.movieOuterDiv}>
      {/* creting top banner */}
      <div className={style.banner}>

        {bannerLoaded ?
          // deu to this condition it will show black background instead of img when data is not fetched
          <img src={`https://image.tmdb.org/t/p/original${bannerMovie.image}`} alt="" /> :
          <p style={{paddingTop: '56.28%'}} className={style.bannerReplacement}></p>
        }

        {/* taking a p tag to give image blackish effect to banner */}
        <p className={style.blurBackground}></p>

        {bannerMovie.title?.length > 0 ?
          // deu to this condition it will not show movie details when data is not fetched
          <div className={style.bannerInfoDiv}>
            <h3>{bannerMovie.title?.length > 30 ? bannerMovie.title?.substring(0, 30) + '...' : bannerMovie.title}</h3>
            <p>{bannerMovie.description?.substring(0, 120) + '...'}</p>
            <div>
              <button onClick={() => ManageModal(bannerMovie.id, "", 'Action')}><span className="material-symbols-outlined" id='boldIcon'>play_arrow</span> Play</button>
              <button onClick={() => ManageModal(bannerMovie.id, "", 'Action')}><span className="material-symbols-outlined">info</span> More Info</button>
            </div>
          </div>
          : null
        }

      </div>

      {/* append all category list and loader when data is not fetched */}
      <div className={style.listMainDiv}>

        {movieData.map((element, index) => <MoviesList key={index} ManageModal={ManageModal} MovieData={element} />)}
        {movieData?.length < 19 ? <Loader /> : null}

      </div>

      <HomeFooter />

      {/* popup modal  */}
      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <ModalOverlay />
        <ModalContent bg={'#1A1A1A'} color={'white'} marginTop={'30px'}>
          <ModalCloseButton />
          <ModalBody p={'0px'}>
            <div className={style.modalVedioDiv}>
              {ModalData.vedioId === 'notFound' ?
                <img className={style.modalPoster} src={`https://image.tmdb.org/t/p/original${ModalData.data?.backdrop_path}`} alt={ModalData.title} /> :
                <div className={style.modalIframe}>
                  <iframe title='movie' src={`https://www.youtube.com/embed/${ModalData.vedioId}?showinfo=0&controls=0&autoplay=1&mute=1&loop=1`}></iframe>
                </div>
              }
              <span className={style.modalImageOverlay}></span>
              <div className={style.modalIframeOverlay}>
                <h3>{ModalData.data?.title}</h3>
                <div className={style.ModalbuttonDiv}>
                  <button><span id='boldIcon' className="material-symbols-outlined">play_arrow</span>Play</button>
                  <button onClick={() => dispatch({ type: 'update_MyList', payload: ModalData.data?.id })}>
                    {myList.includes(ModalData.data?.id) ?
                      <span className="material-symbols-outlined">check_circle</span> :
                      <span className="material-symbols-outlined">add_circle</span>}
                  </button>
                  <button onClick={() => dispatch({ type: 'update_MyLiked', payload: ModalData.data?.id })}>
                    <span id={myLiked.includes(ModalData.data?.id) ? 'boldIcon' : ''} className="material-symbols-outlined">favorite</span></button>
                </div>
              </div>
              <button onClick={onClose}>X</button>
            </div>
            <div className={style.modalMidInfo}>
              <div>
                <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ color: '#46D369' }}>9{RandomNumber}% Match</span>
                  <span>{ModalData.data?.release_date.slice(0, 4)}</span>
                  <span className="material-symbols-outlined">hd</span>
                  <Tooltip hasArrow label='Audio description and subtitle for the deaf and hard of hearing are available' fontSize='17px' fontWeight={'500'} bg='white' color='black' placement='top'><span className="material-symbols-outlined">audio_description</span></Tooltip>
                  <Tooltip hasArrow label='Audio description and subtitle for the deaf and hard of hearing are available' fontSize='17px' fontWeight={'500'} bg='white' color='black' placement='top'><span className="material-symbols-outlined">chat</span></Tooltip>
                </p>
                <p>{ModalData.data?.overview}</p>
              </div>
              <div>
                <p title='HardCoded'>Cast : <span>SamCorlett, Leo Suter, Frida Gustavsson, more</span></p>
                <p>Genres : {ModalData.data?.genres.map((data, ind) => <span key={ind}>{data.name}, </span>)}</p>
                <p>This Show is <span> Awesome</span></p>
              </div>
            </div>
            <div className={style.ModalMoreLikeThis} style={{ height: `${expandModal ? 'auto' : '800px'}` }}>
              <h2>More Like This</h2>
              <div className={style.moreLikeThisDiv}>
                {movieData.map((el) => el.title === ModalData.category ?
                  el.data.slice(RandomNumber, RandomNumber+12).map((data,ind) =>
                    <div key={ind} className={style.likeThisCard} >
                      <img onClick={()=>ManageModal(data.id,'',ModalData.category)} src={`https://image.tmdb.org/t/p/original${data.image}`} alt="" />
                      <div>
                        <div>
                          <div onClick={()=>ManageModal(data.id,'',ModalData.category)}>
                            <span style={{ color: '#46D369' }}>9{Math.floor(Math.random() * 10)}% Match</span>
                            <p><span>U/A 16+</span><span>{ModalData.data?.release_date.slice(0, 4)}</span></p>
                          </div>
                          <button onClick={() => dispatch({ type: 'update_MyList', payload:data.id })}>
                            {myList.includes(data.id) ?
                              <span className="material-symbols-outlined">check_circle</span> :
                              <span className="material-symbols-outlined">add_circle</span>}
                          </button>
                        </div>
                        <h3 onClick={()=>ManageModal(data.id,'',ModalData.category)}>{data.title?.length > 30 ? data.title?.substring(0, 30) + '...' : data.title}</h3>
                        <p onClick={()=>ManageModal(data.id,'',ModalData.category)}>{data.description?.substring(0, 80) + '...'}</p>
                      </div>
                    </div>)
                  : null)}
              </div>
            </div>
            <button className={style.expandBtn} onClick={() => setExpandModal((prev) => !prev)}><span className="material-symbols-outlined">{expandModal ? 'expand_circle_up' : 'expand_circle_down'}</span></button>
            <div className={style.modalBottomInfo}>
              <h2>About {ModalData.data?.title}</h2>
              <p>Production Companies : {ModalData.data?.production_companies.map((data, ind) => <span key={ind}>{data.name}, </span>)}</p>
              <p>Release Date : <span>{ModalData.data?.release_date}</span></p>
              <p>Genres : {ModalData.data?.genres.map((data, ind) => <span key={ind}>{data.name}, </span>)}</p>
              <p>This Show is <span> Awesome</span></p>
              <p title='HardCoded'>Maturity rating : <span> <span>U/A 16+</span><span>suitable for person aged 16 and above and under partial guidance for people under age of 16</span></span></p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

    </div>

  )

}

