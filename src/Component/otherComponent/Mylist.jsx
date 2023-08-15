import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import HomeFooter from './HomeFooter'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import MovieCard from './MovieCard'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Tooltip, useDisclosure } from '@chakra-ui/react'
import style from '../../Styles/otherComponent/Homepage.module.css'

export default function Mylist() {
  const dispatch = useDispatch()
  const [myList, setMyList] = useState([])
  const [RandomNumber, setRandomNumber] = useState(0)
  const [expandModal, setExpandModal] = useState(false)
  const [ModalData, setModalData] = useState({})
  const storeList = useSelector((store) => store.MyList)
  const movieData = useSelector((store) => store.data)
  const myLiked = useSelector((store) => store.MyLiked)
  const { isOpen, onOpen, onClose } = useDisclosure()


  // manage popup modal
  const ManageModal=(id, vedioId)=>{
    onClose()
    setRandomNumber(Math.floor(Math.random() * 7))
    setExpandModal(false)

    myList.forEach((el) => {
      if (el.id === id) {
        if (vedioId === '') {
          // setModalData({ "data": el, vedioId: "notFound", category: el.genres[0].name })
          fetchVedio(el,el.genres[0].name)
        } else {
          setModalData({ "data": el, vedioId: vedioId, category: el.genres[0].name })
        }
      }
    })
    onOpen()

  }

  // fetching vedio id from youtube api
  const fetchVedio=(data, category)=>{
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${data.title}&key=AIzaSyAH-pBMcZ5CutrybeG4fSnDwjqUz5Swe0w`)
      .then(response => setModalData({ data: data, vedioId: response.data.items[0].id.videoId, category: category }))
  }


  // manage modal on clicking recommended movies
  const LikeThisModal=async(id, vedioId, category)=>{
    onClose()
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
          setModalData({ data: res.data, vedioId: 'notFound', category: category })
          // fetchVedio(res.data,category)
          onOpen()
        } else {
          setModalData({ data: res.data, vedioId: vedioId, category: category })
          onOpen()
        }
      })
  }


  // getting full data from movie id
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setMyList([])
    storeList?.forEach((movieId) => {
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTdkZTEwNmViNTRlYzlhYWZhYjlkNDNjYzIyMGE0OCIsInN1YiI6IjY0NzYwNTVkYzI4MjNhMDBjNDIxYzgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7qGZeU1ca2R-nft23Y2XFCVrRv9idUNrQCQARZV_puw'
        }
      })
        .then((res) => {
          setMyList((prev) => [...prev, { "adult": res.data.adult, "id": res.data.id, "backdrop_path": res.data.backdrop_path, "genres": res.data.genres, "title": res.data.title, "overview": res.data.overview, "production_companies": res.data.production_companies, "release_date": res.data.release_date, "image": res.data.backdrop_path }])
        })
    });
  }, [storeList])



  return (
    <Div>
      <h1 className='myList_heading'>My List</h1>
      <div className='myList_container'>
      {myList.length===0&&storeList.length!==0? <h1 className='emptyListMessage'>Loading...</h1>:null}
      {storeList.length===0? <h1 className='emptyListMessage'>You haven't added any titles to your list yet.</h1>:null}
        <div>
          {
            myList.map((item) =>
              
              <div key={item.id} className='myListCardOuterDiv'>
                <MovieCard  category={item.genres[0]} ManageModal={ManageModal} data={item} index={false} />
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
                  <iframe title='movie' src={`https://www.youtube.com/embed/${ModalData.vedioId}?showinfo=0&controls=0&autoplay=1&mute=1&loop=1`}></iframe>
                </div>
              }
              <span className={style.modalImageOverlay}></span>
              <div className={style.modalIframeOverlay}>
                <h3>{ModalData.data?.title}</h3>
                <div className={style.ModalbuttonDiv}>
                  <button><span id='boldIcon' className="material-symbols-outlined">play_arrow</span>Play</button>
                  <button onClick={() => dispatch({ type: 'update_MyList', payload: ModalData.data?.id })}>
                    {storeList.includes(ModalData.data?.id) ?
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
                      <img onClick={() => LikeThisModal(data.id, '', ModalData.category)} src={`https://image.tmdb.org/t/p/original${data.image}`} alt="" />
                      <div>
                        <div>
                          <div onClick={() => LikeThisModal(data.id, '', ModalData.category)}>
                            <span style={{ color: '#46D369' }}>9{RandomNumber}% Match</span>
                            <p><span>U/A 16+</span><span>{ModalData.data?.release_date.slice(0, 4)}</span></p>
                          </div>
                          <button onClick={() => dispatch({ type: 'update_MyList', payload: data.id })}>
                            {storeList.includes(data.id) ?
                              <span className="material-symbols-outlined">check_circle</span> :
                              <span className="material-symbols-outlined">add_circle</span>}
                          </button>
                        </div>
                        <h3 onClick={() => LikeThisModal(data.id, '', ModalData.category)}>{data.title?.length > 30 ? data.title?.substring(0, 30) + '...' : data.title}</h3>
                        <p onClick={() => LikeThisModal(data.id, '', ModalData.category)}>{data.description?.substring(0, 80) + '...'}</p>
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

export const Div = styled.div`
  color: white;
 
  .myList_heading{
    font-size: 2vw;
    position: fixed;
    padding: 6vw 2% 15px 4% ;
    width: 100%;
    background-color: black;
    z-index: 5;
    cursor: default;
    font-weight: 600;
  }
  .myList_container,.gridFormaterDiv{
    padding-top: 10vw;
    padding-left: 3%;
    min-height: 100vh;
    margin-bottom: 4vw;
  }

  .emptyListMessage{
      margin-top: 10vh;
      text-align: center;
      color: gray;
  }

  .myList_container>div{
    display: grid;
    grid-template-columns:repeat(6,15%);
    justify-content: space-around;
  }
  .myListCardOuterDiv{
    height: 170px;
  }

  /* for browse by language */
  .selectDiv{
    padding: 6vw 2% 15px 4% ;
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    z-index: 6;
    background-color: black;
  }
  .selectDiv>h1{
    font-size: 2vw;
    cursor: default;
  }
  .selectDiv>select{
    color: white;
    background-color: black;
    border: 1px solid white;
    padding: 0.5vw 0.5vw;
    font-size: 1.3vw;
    height: 80%;
  }


  @media screen and (max-width:1400px) {
    .myList_container>div{
      grid-template-columns:repeat(5,19%);
    }
  }
  @media screen and (max-width:1250px) {
    .myList_container>div{
      grid-template-columns:repeat(4,230px);
    }
  }
  @media screen and (max-width:1000px) {
    .myList_heading{
      font-size: 3.5vw;
    }
    .myList_container>div{
      display: flex;
      flex-wrap: wrap;
    }
    .myListCardOuterDiv{
        width: 230px;
        /* height: auto; */
    }
    .gridFormaterDiv{
      padding-top: 13vw;
    }
  }
  @media screen and (max-width:750px) {
    .myList_heading{
      font-size: 4vw;
      padding: 8vw 0px 10px 4% ;
    }
    .myList_container>div{
      display: grid;
      grid-template-columns: repeat(3,32%);
      justify-content: space-around;
   }
   .selectDiv{
    padding: 60px 2% 20px 4% ;
  }
   .selectDiv>h1{
     font-size: 3vw;
  }
   .selectDiv>select{
     font-size: 3vw;
  }
   .myListCardOuterDiv{
        width: 100%;
    }
    .gridFormaterDiv{
      padding-top: 16vw;
    }
    .myList_container{
      padding-top: 12vw;
    }
  }
  @media screen and (max-width:600px) {
    .myList_heading{
      font-size: 4vw;
      padding: 10vw 0px 5px 4% ;
    }
    .myListCardOuterDiv{
      height: 25vw;
    }
    .gridFormaterDiv{
      padding-top: 18vw;
    }
  }
  @media screen and (max-width:400px) {
    .myList_heading{
      font-size: 4vw;
      padding: 14vw 0px 5px 4% ;
    }
    .myListCardOuterDiv{
      height: 34vw;
    }
    .myList_container>div{
      grid-template-columns: repeat(2,48%);
   }
   .myList_container,.gridFormaterDiv{
     padding-left: 1%;
     padding-right: 1%;
     padding-top: 20vw;
    }
    .gridFormaterDiv{
      padding-top: 24vw;
    }
  }
  

 `