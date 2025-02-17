import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const previousLocation = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Ошибка при получении информации о фильме:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Link to={previousLocation.current}>Go back</Link>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <h2>Дополнительная информация</h2>
      <ul>
        <li>
          <Link to={`cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`reviews`}>Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
