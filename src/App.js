import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";

// get API key from local .env
const { REACT_APP_TMDB_API_KEY } = process.env;

// list of tmdb API urls
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort=popularity.desc&api_key=${REACT_APP_TMDB_API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${REACT_APP_TMDB_API_KEY}&query=`;
// const IMAGE_API = `https://image.tmdb.org/t/p/w1280`;
// const TRAILER = ``;

TODO:
// *** Change readme and create github repo ***
// change movie search to include actors in results
// add actor name/link to the result card(s). Link will search actors other movies
// add button for trailer to result card
// add modal for trailer (trailer from tmdb/imbd or youtube). Get API key if needed
// FIX: or get rid of form onSubmit. Not displaying results before clearing field -> because onChange defaults to featured movies...
// CHANGE: header etc into own component(s)
// MAYBE: change display to rows with featured, top rated, favorites sections. If do this have movie preview at top of page (not modal) on desktop. keep modal on mobile
// if adding favorites, will need to set up a database to save them
// *** make sure env variables aren't being seen. Need to add server or do on back end? ***
// -----

function App() {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // get initial list of movies on loading
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  // search for movies when search input changes
  useEffect(() => {
    if (searchInput.length >= 3) {
      getMovies(SEARCH_API + searchInput);
    } else {
      // does this make too many calls? Save featured to local storage first?
      getMovies(FEATURED_API)
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
