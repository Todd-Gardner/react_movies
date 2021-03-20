import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";

// get API key from local .env
const { REACT_APP_TMDB_API_KEY } = process.env;

// list of tmdb API urls
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort=popularity.desc&api_key=${REACT_APP_TMDB_API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${REACT_APP_TMDB_API_KEY}&query=`;
// const IMAGE_API = `https://image.tmdb.org/t/p/w1280`;
// const TRAILER = ``;

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getFeaturedMovies() {
      const response = await fetch(FEATURED_API);
      const jsonResponse = await response.json();
      setMovies(jsonResponse.results);
    }
    getFeaturedMovies();
  }, []);

  return (
    <div className="movieContainer">
      {movies /*.length > 0*/ &&
        movies.map((movie) => <Movie key={movie.id} {...movie} />)}
    </div>
  );
}

export default App;
