import axios from 'axios'

const movieDb = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '2df616de2529f6b6a682e71e7081a4d5',
    language: 'en-US'
  }
})

export default movieDb
