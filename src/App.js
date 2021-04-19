import React, { useState, useEffect } from "react";

import Movie from "./components/Movie";
import MovieDetails from "./components/MovieDetails";
// get API key from local .env
const { REACT_APP_TMDB_API_KEY } = process.env;

// list of tmdb API urls
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort=popularity.desc&api_key=${REACT_APP_TMDB_API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${REACT_APP_TMDB_API_KEY}&language=en-US&query=`;
// const IMAGE_API = `https://image.tmdb.org/t/p/w1280`;
// const TRAILER = ``;

// use append_to_response to get more data using a single http request (API call). Use movie id:
// https://api.themoviedb.org/3/movie/157336?api_key=${REACT_APP_TMDB_API_KEY}&append_to_response=videos,images

// search movies, tv and actors:
// https://api.themoviedb.org/3/search/multi?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false
// https://api.themoviedb.org/3/search/multi?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US&query=jennifer&page=1

//TODO:
// refactor (ie. movieCard, moviesContainer etc)
// change movie search to include actors in results
// add actor name/link to the result card(s). Link will search actors other movies
// add button for trailer to result card
// add modal for trailer (trailer from tmdb/imbd or youtube). Get API key if needed
// FIX: or get rid of form onSubmit. Not displaying results before clearing field -> because onChange defaults to featured movies...
// CHANGE: header etc into own component(s)
// MAYBE: change display to rows with featured, top rated, favorites sections. If do this have movie preview at top of page (not modal) on desktop. keep modal on mobile
// if adding favorites, will need to set up a database to save them
// MAYBE: change the movie description to flip the card to display rather then sliding up onto the card OR make poster image resize so both are visible
// *** make sure env variables aren't being seen. Need to add server or do on back end? ***
// -----

function App() {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // get initial list of movies on loading
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  // auto-search for movies when search input changes
  useEffect(() => {
    if (searchInput.length >= 3) {
      getMovies(SEARCH_API + searchInput);
    } else {
      // does this make too many calls? Save featured to local storage first?
      // see below for possible solution
      getMovies(FEATURED_API);
    }
  }, [searchInput]);

  async function getMovies(API) {
    const response = await fetch(API);
    const movieData = await response.json();

    // Remove movies with a 0 rating
    const filteredMovies = movieData.results.filter(
      (movie) => movie.vote_average > 0
    );
    console.log(`filteredMovies`, filteredMovies);

    setMovies(filteredMovies);
  }

  // Only need the onSubmit if not using the 'auto-search'
  // NEED to modify! This sets input to "" - the auto-search shows Featured if less than 3 characters!
  // const handleOnSubmit = (e) => {
  //   e.preventDefault();

  //   if (searchInput) {
  //     getMovies(SEARCH_API + searchInput);
  //     setSearchInput("");
  //   }
  // };

  const toggleModal = (id) => {
    // **FIX** first movie takes 2 clicks to open
    if (id === movieData.id) {
      setModalOpen((modalOpen) => !modalOpen);
    }
  };

  return (
    <div className="app">
      {/* change header to a Search component */}
      <header>
        <form /*onSubmit={handleOnSubmit}*/>
          <input
            className="searchBar"
            placeholder="Search movies..."
            value={searchInput}
            // onChange={onChangeHandler}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </header>
      {modalOpen && (
        <MovieDetails
          releaseDate={movieData.release_date}
          overview={movieData.overview}
          credits={movieData.credits}
          videos={movieData.videos}
          title={movieData.title}
          poster_path={movieData.poster_path}
          //movieData={movieData}
        />
      )}
      <div className="movieContainer">
        {/* <VideoPreview videoKey="HqzWCNbX_wg" /> */}
        {/* {modalOpen ? (
          <MovieDetails
            releaseDate={movieData.release_date}
            overview={movieData.overview}
            credits={movieData.credits}
            videos={movieData.videos}
            title={ movieData.title }
            poster_path={movieData.poster_path}
            //movieData={movieData}
          />
        ) : (
          "modal"
        )} */}
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Movie
              key={movie.id}
              API_KEY={REACT_APP_TMDB_API_KEY}
              {...movie}
              setMovieData={(movieData) => {
                setMovieData((movieData, movieData));
              }}
              openModal={(id) => toggleModal(id)}
            />
          ))
        ) : (
          <div>Sorry, no matches found.</div>
        )}
      </div>
    </div>
  );
}

export default App;

// Maybe use onchangeHandler for performance (less rerenders?)
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
