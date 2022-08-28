import React from 'react'
import movieDb from '../api/movieDB'
import { MoviesDBResponse, Movie, MovieDetails, MovieCast } from '../interfaces/movies'

interface State {
  nowPlaying: Movie[]
  popular: Movie[]
  topRated: Movie[]
  upcoming: Movie[]
}

interface MovieDetailsProps {
  movieDetails?: MovieDetails
  cast: any[]
}

const INITIAL_MOVIES_STATE = {
  nowPlaying: [],
  popular: [],
  topRated: [],
  upcoming: []
} as State

const INITIAL_DETAILS_STATE = {
  movieDetails: undefined,
  cast: []
} as MovieDetailsProps

export const useMovies = () => {
  const [movies, setMovies] = React.useState<State>(INITIAL_MOVIES_STATE)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const nowPlaying = movieDb.get<MoviesDBResponse>('/now_playing')
      const popularMovies = movieDb.get<MoviesDBResponse>('/popular')
      const topRatedMovies = movieDb.get<MoviesDBResponse>('/top_rated')
      const upcomingMovies = movieDb.get<MoviesDBResponse>('/upcoming')

      const resps = await Promise.all([nowPlaying, popularMovies, topRatedMovies, upcomingMovies])

      setMovies({
        nowPlaying: resps[0].data.results,
        popular: resps[1].data.results,
        topRated: resps[2].data.results,
        upcoming: resps[3].data.results
      })
      setIsLoading(false)
    })()
  }, [])

  return { movies, isLoading }
}

export const useMovieDetils = (movieId: number) => {
  const [movieDetails, setMovieDetails] = React.useState<MovieDetailsProps>(INITIAL_DETAILS_STATE)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const movieDetailsPromise = movieDb.get<MovieDetails>(`/${movieId}`)
      const castPromise = movieDb.get<MovieCast>(`/${movieId}/credits`)
      const [movieDetailsResp, castResp] = await Promise.all([movieDetailsPromise, castPromise])
      setMovieDetails({
        movieDetails: movieDetailsResp.data,
        cast: castResp.data.cast
      })
      setIsLoading(false)
    })()
  }, [])

  return {
    movieDetails,
    isLoading
  }
}
