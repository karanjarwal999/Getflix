import axios from "axios";


// step 1
// function to fetch list of movie category 
export const getMovieCategoryList = (dispatch) => {
  axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b97de106eb54ec9aafab9d43cc220a48')
    .then((res) => {
      // adding data to store
      dispatch({ type: 'update_List', payload: res.data.genres });

      // calling next function to fetch  action(1) movie list of stating
      dispatch(fetchOnlyAction(0, res.data.genres))
    })
    .catch((err) => console.log(err))
}




// step 2
// this function fetch only action movie from list instead of fetch all just to decreses home page banner rendering time 
const fetchOnlyAction = (num, fetchlist) => async (dispatch) => {
  let movies = []
  let temp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b97de106eb54ec9aafab9d43cc220a48_&with_genres=${fetchlist[num].id}`, {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTdkZTEwNmViNTRlYzlhYWZhYjlkNDNjYzIyMGE0OCIsInN1YiI6IjY0NzYwNTVkYzI4MjNhMDBjNDIxYzgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7qGZeU1ca2R-nft23Y2XFCVrRv9idUNrQCQARZV_puw'
    }
  })

  // Restructureing data and taking only key:value that are needed
  let newdata = temp.data.results.map((data) => ({ "id": data.id, "original_language": data.original_language, "original_title": data.original_title, "description": data.overview, "image": data.backdrop_path, "title": data.title, "release_date": data.release_date, "genre_ids": data.genre_ids }))

  movies.push({ title: fetchlist[num].name, data: newdata })
  num++
  dispatch({ type: "update_moviesData", payload: movies })
  // updating store with action movies 

  dispatch(fetchNext_4Movies(num, fetchlist))
  dispatch(New_popular)
}




// step 3
// This functionn fetch 4 4 sets of movies data to Decrease rendering time
const fetchNext_4Movies = (num, fetchlist) => async (dispatch) => {
  let movies = []

  // fetching next 4 movies list starting from num
  for (let i = num; i < num + 4; i++) {

    if (fetchlist[i]) {
      let temp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b97de106eb54ec9aafab9d43cc220a48_&with_genres=${fetchlist[i].id}`, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTdkZTEwNmViNTRlYzlhYWZhYjlkNDNjYzIyMGE0OCIsInN1YiI6IjY0NzYwNTVkYzI4MjNhMDBjNDIxYzgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7qGZeU1ca2R-nft23Y2XFCVrRv9idUNrQCQARZV_puw'
        }
      })

      // Restructureing data and taking only key:value that are needed
      let newdata = temp.data.results.map((data) => ({ "id": data.id, "original_language": data.original_language, "original_title": data.original_title, "description": data.overview, "image": data.backdrop_path, "title": data.title, "release_date": data.release_date, "genre_ids": data.genre_ids }))

      
      movies.push({ title: fetchlist[i].name, data: newdata })
    }
  }
  num = num + 4
  dispatch({ type: "update_moviesData", payload: movies })

  // if num is less then fetchlist.length then it will fetch next four movie by calling itself again
  if (num < fetchlist.length) {
    dispatch(fetchNext_4Movies(num, fetchlist))
  }
}


// fetchinfg data for new and popular page
const New_popular = async (dispatch) => {
  let movies = []
  let apiendpoints = ["top_rated", "now_playing", "upcoming"]

  for (let i = 0; i < 3; i++) {

    let temp = await axios.get(`https://api.themoviedb.org/3/movie/${apiendpoints[i]}`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTdkZTEwNmViNTRlYzlhYWZhYjlkNDNjYzIyMGE0OCIsInN1YiI6IjY0NzYwNTVkYzI4MjNhMDBjNDIxYzgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7qGZeU1ca2R-nft23Y2XFCVrRv9idUNrQCQARZV_puw'
      }
    })

    // Restructureing data and taking only key:value that are needed
    let newdata = temp.data.results.map((data) => ({ "id": data.id, "original_language": data.original_language, "original_title": data.original_title, "description": data.overview, "image": data.backdrop_path, "title": data.title, "release_date": data.release_date }))

    if (apiendpoints[i] === 'upcoming') { 
      movies.push({ title: apiendpoints[i], data: newdata.slice(5,20) }) 
    }
    else { movies.push({ title: apiendpoints[i].split('_').join(' '), data: newdata }) }
  }

  dispatch({ type: "update_New_popular", payload: movies })

}


export function playVideofullScreen() {
  let iframe = document.getElementById('videoFrame')
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) { /* Safari */
    iframe.webkitRequestFullscreen();
  } else if (iframe.msRequestFullscreen) { /* IE11 */
    iframe.msRequestFullscreen();
  }
}