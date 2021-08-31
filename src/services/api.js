import axios from 'axios'

const API_HOST = 'https://api.themoviedb.org/3'
const API_KEY = '9ab769d6a8c8f22e795518d5aa96368b'
export const IMG_HOST = 'https://image.tmdb.org/t/p/w220_and_h330_face'
export const IMG_IMDB = 'https://image.tmdb.org/t/p/w500'

export const getMovies = async (type) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${API_HOST}/movie/${type}?page=1&api_key=${API_KEY}`
    })
    return response
  }catch(error) {
    console.log(error)
    return error.config
  }
}

export const getMovieDetail = async (id) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${API_HOST}/movie/${id}?api_key=${API_KEY}`
    })
    return response
  }catch(error) {
    console.log(error)
    return error.config
  }
}

export const getMovieCredit = async (id) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${API_HOST}/movie/${id}/credits?api_key=${API_KEY}&language=en-US&page=1`
    })
    return response
  }catch(error) {
    return error
  }
}


export const multiSearch = async (query, page=1) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${API_HOST}/search/multi?query=${query}&page=${page}&api_key=${API_KEY}`,
    })
    return response
  } catch(error) {
    return error
  }
}
