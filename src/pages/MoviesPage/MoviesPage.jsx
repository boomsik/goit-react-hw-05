import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${query}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
              },
            }
          );
          setMovies(response.data.results);
        } catch (error) {
          console.error('Ошибка при поиске фильмов:', error);
        }
      };

      fetchMovies();
    }
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newQuery = form.elements.query.value.trim();
    setSearchParams({ query: newQuery });
  };

  return (
    <div className={styles.container}>
      <h1>Поиск фильмов</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Введите название фильма"
        />
        <button type="submit">Поиск</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
