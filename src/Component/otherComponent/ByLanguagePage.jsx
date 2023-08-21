import React, { useEffect, useState } from 'react'
import { Div } from './Mylist'
import HomeFooter from './HomeFooter'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import MovieCard from './MovieCard'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import style from '../../Styles/otherComponent/Homepage.module.css'
import { SendToast, playVideofullScreen } from '../../store/dataFunction'

export default function ByLanguagePage() {
  const dispatch = useDispatch()
  const [Data, setData] = useState([])
  const [language, setLanguage] = useState('en')
  const [loading, setLoading] = useState(true)
  const [RandomNumber, setRandomNumber] = useState(0)
  const [expandModal, setExpandModal] = useState(true)
  const [ModalData, setModalData] = useState({})

  // getting data from store
  const MyList = useSelector((store) => store.MyList)
  const movieData = useSelector((store) => store.data)
  const myLiked = useSelector((store) => store.MyLiked)
  const { isOpen, onOpen, onClose } = useDisclosure()

  // fetching vedio Id from youtube  api
  const toast = useToast()
  const fetchVedio = (data, category) => {
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${data.title}&key=AIzaSyAH-pBMcZ5CutrybeG4fSnDwjqUz5Swe0w`)
      .then(response => setModalData({ data: data, vedioId: response.data.items[0].id.videoId, category: category }))
      .catch((err)=>{
        SendToast(toast,"cannot play video","deu to youtube api limit exceeded we cannot play video")
        setModalData({ data: data, vedioId: "notFound", category: category })
      })
  }

  // manage popup modal 
  const ManageModal = async (id, vedioId, category) => {
    setExpandModal(false)
    setRandomNumber(Math.floor(Math.random() * 7))
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
          // setModalData({ data: res.data, vedioId: 'notFound', category: res.data.genres[0].name })
          fetchVedio(res.data,res.data.genres[0].name)
          onOpen()
        } else {
          setModalData({ data: res.data, vedioId: vedioId, category: res.data.genres[0].name })
          onOpen()
        }
      })
  }

  // scrolling to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])


  // sorting data as page select value or default value (uk)
  useEffect(() => {
    setLoading(true)
    let Movies = movieData.reduce((acc, item) => {
      let data = item.data.filter((item) => item.original_language === language)
      return [...acc, ...data]
    }, [])
    Movies = Movies.filter((item, index, self) => {
      return index === self.findIndex((i) => i.id === item.id);
    })
    setLoading(false)
    setData(Movies)
  }, [language, movieData])


  // option data for selesct tag
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "uk", label: "Ukrainian" },
    { value: "ja", label: "Japanese" },
    { value: "pl", label: "Polish" },
    { value: "zh", label: "Chinese" },
    { value: "fr", label: "French" },
    { value: "es", label: "Spanish" },
    { value: "cn", label: "Chinese" },
    { value: "th", label: "Thai" },
    { value: "ko", label: "Korean" },
    { value: "id", label: "Indonesian" },
    { value: "de", label: "German" },
    { value: "fi", label: "Finnish" },
    { value: "it", label: "Italian" },
  ];


  return (
    <Div>
      <div className='selectDiv'>
        <h1>Browse by Original Audio</h1>
        <select onChange={(e) => setLanguage(e.target.value)}>
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className='myList_container'>
        {loading ? <h1 className='emptyListMessage'>Loading...</h1> : null}
        {Data.length === 0 && !loading ? <h1 className='emptyListMessage'>No results Found.</h1> : null}
        <div>
          {
            Data.map((item) =>
              <div key={item.id} className='myListCardOuterDiv'>
                <MovieCard category={""} ManageModal={ManageModal} data={item} index={false} />
              </div>
            )
          }
        </div>
      </div>
      <HomeFooter relative={true} />

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
                  <iframe title='movie' id='videoFrame' src={`https://www.youtube.com/embed/${ModalData.vedioId}?showinfo=0&controls=0&autoplay=1&mute=1&loop=1`}></iframe>
                </div>
              }
              <span className={style.modalImageOverlay}></span>
              <div className={style.modalIframeOverlay}>
                <h3>{ModalData.data?.title}</h3>
                <div className={style.ModalbuttonDiv}>
                  <button onClick={playVideofullScreen}><span id='boldIcon' className="material-symbols-outlined">play_arrow</span>Play</button>
                  <button onClick={() => dispatch({ type: 'update_MyList', payload: ModalData.data?.id })}>
                    {MyList.includes(ModalData.data?.id) ?
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
                  <span style={{ color: '#46D369' }}>9{Math.floor(Math.random() * 10)}% Match</span>
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
                {console.log(ModalData)}
                {movieData.map((el) => el.title === ModalData.category ?
                  el.data.slice(RandomNumber, RandomNumber + 12).map((data) =>
                    <div key={data.id} className={style.likeThisCard}>
                      <img onClick={() => ManageModal(data.id, '', ModalData.category)} src={`https://image.tmdb.org/t/p/original${data.image}`} alt="" />
                      <div>
                        <div>
                          <div onClick={() => ManageModal(data.id, '', ModalData.category)}>
                            <span style={{ color: '#46D369' }}>9{RandomNumber}% Match</span>
                            <p><span>U/A 16+</span><span>{ModalData.data?.release_date.slice(0, 4)}</span></p>
                          </div>
                          <button onClick={() => dispatch({ type: 'update_MyList', payload: data.id })}>
                            {MyList.includes(data.id) ?
                              <span className="material-symbols-outlined">check_circle</span> :
                              <span className="material-symbols-outlined">add_circle</span>}
                          </button>
                        </div>
                        <h3 onClick={() => ManageModal(data.id, '', ModalData.category)}>{data.title?.length > 30 ? data.title?.substring(0, 30) + '...' : data.title}</h3>
                        <p onClick={() => ManageModal(data.id, '', ModalData.category)}>{data.description?.substring(0, 80) + '...'}</p>
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
    </Div>
  )
}
