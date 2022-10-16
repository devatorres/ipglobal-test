import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import MoviesSearch from 'components/moviesSearch'
import useMovie from 'hooks/useMovie'
import formatDate from 'utils/formatDate'
import './styles.css'

type DetailMovieParams = {
  movieId: string
}

const DetailMovie: FC = () => {
  const { movieId } = useParams<DetailMovieParams>()
  const parsedMovieId: number = Number(movieId)
  const { movie, movieIsLoading, movieIsError } = useMovie({ parsedMovieId })

  if (movieIsLoading) return <div>Cargando...</div>
  if (movieIsError) return <Navigate to="/notfound" />
  if (!movie) return null

  return (
    <div>
      <header>
        <MoviesSearch />
      </header>
      <main>
        <img
          height={200}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          loading="lazy"
          alt="aa"
        />
        <p>{movie.title}</p>
        <p>{formatDate(new Date(movie.release_date))}</p>
        <p>{movie.adult ? 'Para adultos' : 'Para todos los publicos'}</p>
        <img
          height={200}
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          loading="lazy"
          alt="aa"
        />
        <p>Original idioma: {movie.original_language}</p>
        <p>Original TÍTULO: {movie.original_title}</p>
        <p>{movie.overview}</p>
        <p>Popularidad {movie.popularity}</p>
        <p>{movie.video ? 'Tiene video' : 'No tiene video'}</p>
        <p>Votacion {movie.vote_average}</p>
        <p>Votacion {movie.vote_count}</p>
      </main>
    </div>
  )
}

export default DetailMovie