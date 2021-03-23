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
  const [searchInput, setSearchInput] = useState("");

  // get initial list of movies on loading
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  // search for movies when search input changes
  useEffect(() => {
    if (searchInput.length > 3) {
      getMovies(SEARCH_API + searchInput);
    }
  }, [searchInput]);

  async function getMovies(API) {
    const response = await fetch(API);
    const jsonData = await response.json();
    setMovies(jsonData.results);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchInput) {
      getMovies(SEARCH_API + searchInput);
      setSearchInput("");
    }
  };

  // const onChangeHandler = (e) => {
  //   setSearchInput(e.target.value);
  //   if (e.target.value.length > 3) {
  //     getMovies(SEARCH_API + searchInput);
  //     // for using promise, not async/await
  //     // fetch(SEARCH_API + searchInput)
  //     //   .then((res) => res.json())
  //     //   .then((data) => setMovies(data.results));
  //   }
  // };

  return (
    <div>
      {/* change header to Search component */}
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="searchBar"
            placeholder="Search movies..."
            value={searchInput}
            // onChange={onChangeHandler}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </header>
      <div className="movieContainer">
        {movies /*.length > 0*/ &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}

export default App;
