import React, { useEffect, useState } from 'react'
import { Div } from './Mylist'
import HomeFooter from './HomeFooter'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import MovieCard from './MovieCard'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Tooltip, useDisclosure } from '@chakra-ui/react'
import style from '../../Styles/otherComponent/Homepage.module.css'
import { styled } from 'styled-components'
import MoviesList from './MoviesList'

export default function ByLanguagePage() {
  const dispatch = useDispatch()
  const [FlexData, setFlexData] = useState([])
  const [GridData, setGridData] = useState([])
  const [genres, setgenres] = useState('28')
  const [RandomNumber, setRandomNumber] = useState(0)
  const [expandModal, setExpandModal] = useState(true)
  const [ModalData, setModalData] = useState({})
  const [DisplayFormat, setDisplayFormat] = useState('grid')

  // getting store data
  const MyList = useSelector((store) => store.MyList)
  const movieData = useSelector((store) => store.data)
  const myLiked = useSelector((store) => store.MyLiked)
  const { isOpen, onOpen, onClose } = useDisclosure()

  // fetching vedio id from youtube api
  const fetchVedio = (data, category) => {
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${data.title}&key=AIzaSyAH-pBMcZ5CutrybeG4fSnDwjqUz5Swe0w`)
      .then(response => setModalData({ data: data, vedioId: response.data.items[0].id.videoId, category: category }))
  }

  // manage popup modal
  const ManageModal = async (id, vedioId, category) => {
    onClose()
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
          fetchVedio(res.data,category)
          onOpen()
        } else {
          setModalData({ data: res.data, vedioId: vedioId, category: res.data.genres[0].name })
          onOpen()
        }
      })
  }

  // scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])


  // convertinfg data in grid and flex format
  useEffect(() => {
    // grid Data
    // converting object(movieData) data into array data 
    let Movies = movieData.reduce((acc, item) => {
      let data = item.data.filter((item) => item.genre_ids.includes(+genres))
      return [...acc, ...data]
    }, [])
    // filtering ubique data in array
    Movies = Movies.filter((item, index, self) => {
      return index === self.findIndex((i) => i.id === item.id);
    })
    setFlexData(Movies)

    // grid data
    // filtering by genres id  to object(movieData).data
    Movies = movieData.map(element => ( {...element, data: element.data.filter((item) => item.genre_ids.includes(+genres))}));
    setGridData(Movies)
    console.log(Movies)

  }, [genres, movieData])

  
  // genres option data
  const genresOptions = [
    { value: "28", label: "Action" },
    { value: "12", label: "Adventure" },
    { value: "16", label: "Animation" },
    { value: "35", label: "Comedy" },
    { value: "80", label: "Crime" },
    { value: "99", label: "Documentary" },
    { value: "18", label: "Drama" },
    { value: "10751", label: "Family" },
    { value: "14", label: "Fantasy" },
    { value: "36", label: "History" },
    { value: "10402", label: "Music" },
    { value: "9648", label: "Mystery" },
    { value: "10749", label: "Romance" },
    { value: "878", label: "Science Fiction" },
    { value: "10770", label: "TV Movie" },
    { value: "53", label: "Thriller" },
    { value: "10752", label: "War" },
    { value: "37", label: "Western" }
  ];


  return (
    <Div>
      <Genres>
        <div>
          <h1>Movies</h1>
          <select onChange={(e) => setgenres(e.target.value)}>
            {genresOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span onClick={() => setDisplayFormat("grid")} id='boldIcon' className={`material-symbols-outlined ${DisplayFormat === 'grid' ? "active" : "Inactive"}`}>grid_view</span>
          <span onClick={() => setDisplayFormat("flex")} className={`material-symbols-outlined ${DisplayFormat === 'flex' ? "active" : "Inactive"}`} >list</span>
        </div>
      </Genres>
      {DisplayFormat==='grid'?<div className='myList_container'>
        {FlexData.length === 0 ? <h1 className='emptyListMessage'>Loading...</h1> : null}
        <div>
          {
            FlexData.map((item) =>
             item.image?
              <div key={item.id} className='myListCardOuterDiv'>
                <MovieCard category={""} ManageModal={ManageModal} data={item} index={false} />
              </div>
              :null
            )
          }
        </div>
      </div>:
      <div className='gridFormaterDiv' style={{paddingLeft:'0px'}}>
          {GridData.map((element, index) =>element.data.length>0? <MoviesList key={index} ManageModal={ManageModal} MovieData={element} />:null)}
      </div>}
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
                  <iframe title='movie' src={`https://www.youtube.com/embed/${ModalData.vedioId}?showinfo=0&controls=0&autoplay=1&mute=1&loop=1`}></iframe>
                </div>
              }
              <span className={style.modalImageOverlay}></span>
              <div className={style.modalIframeOverlay}>
                <h3>{ModalData.data?.title}</h3>
                <div className={style.ModalbuttonDiv}>
                  <button><span id='boldIcon' className="material-symbols-outlined">play_arrow</span>Play</button>
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


export const Genres = styled.div`
    padding: 6vw 2% 15px 4% ;
    position: fixed;
    display: flex;
    width: 100%;
    justify-content: space-between;
    z-index: 6;
    background-color: black;
  
  div{
    display: flex;
    align-items: center;
  }
  div>h1{
    font-size: 2vw;
    margin-right: 20px;
    cursor: default;
    font-weight: 600;
  }
  div>select{
    color: white;
    background-color: black;
    border: 1px solid white;
    padding: 0px 0.5vw;
    font-size: 1vw;
    height: 70%;
    cursor: pointer;
  }
  div>span{
    cursor: pointer;
    padding: 0.2vw 0.5vw;
    font-size: 1.5vw;
  }
  div>span:nth-child(2){
   font-size:1.9vw ;
   padding: 0px 0.5vw;
   margin-right: 20px;
  }
  .active{
    color: white;
    border: 1px solid white;
    border-left: 1px solid white;
  }
  .Inactive{
    color: gray;
    border: 1px solid gray;
  }
  .Inactive:hover{
    border: 1px solid white;
    color: white;
  }



  @media screen and (max-width: 900px){
    padding: 8vw 2% 15px 4% ;
    div>h1{
    font-size: 3vw;
  }
  div>select{
    font-size: 1.5vw;
  }
  }

  @media screen and (max-width: 600px){
    padding: 10vw 2% 15px 4% ;
    div>h1{
    font-size: 3.5vw;
  }
  div>select{
    font-size: 2vw;
  }
  div>span{
    font-size: 2.5vw;
  }
  div>span:nth-child(2){
   font-size:2.9vw ;
   margin-right: 10px;
  }
  }

  @media screen and (max-width: 400px){
    padding: 14vw 2% 15px 4% ;
    div>h1{
      margin-right: 10px;
    font-size: 4vw;
  }
  div>select{
    font-size: 2.5vw;
  }
  div>span{
    font-size: 3.5vw;
  }
  div>span:nth-child(2){
   font-size:3.9vw ;
   margin-right: 5px;
  }
  }




`