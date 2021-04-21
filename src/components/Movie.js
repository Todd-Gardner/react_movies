import React, { useState } from "react";

const IMAGE_API = `https://image.tmdb.org/t/p/w1280`;

const setVoteClass = (vote) => {
  if (vote >= 7.5) {
    return "green";
  } else if (vote >= 5) {
    return "yellow";
  } else {
    return "red";
  }
};

const Movie = ({
  title,
  poster_path,
  overview,
  vote_average,
  release_date,
  id,
  API_KEY,
  setMovieData,
  openModal,
}) => {
  // const [actorList, setActorList] = useState([]);
  const [movieInfo, setMovieInfo] = useState([]);

  // Will be in seperate Component...
  const getMovieDetails = async (id, API_KEY) => {
    // Maybe add /movie/${id}/watch/providers (append?) in future
    const MOVIE_DETAILS = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`;

    const response = await fetch(MOVIE_DETAILS);
    const movieData = await response.json();
    console.log(`movieData`, movieData);
    setMovieInfo(movieData);
    setMovieData(movieData);
    openModal(movieInfo.id);
  };

  // right here... need to extract the youtube key maybe set 'movieDetails/Data on HOVER
  //  maybe do in the main app cmpt when all the movies load...

  // Will be in seperate Component
  // const getTrailer = async (key) => {
  //   const YOUTUBE_API = `https://www.youtube.com/watch?v=${key}`;
  //   console.log(`movieInfo`, movieInfo);
  //   const videos = await movieInfo.videos.results;
  //   console.log(`videos`, videos);
  // };
  const showDetails = () => {};

  return (
    <div
      className="movieCard"
      onClick={() => {
        getMovieDetails(id, API_KEY); //.then(openModal(id));
      }}
    >
      <div className="movie">
        <img
          src={
            poster_path
              ? IMAGE_API + poster_path
              : "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
          }
          alt={title}
        />
        <div className="movieInfo">
          <h3>
            {title}({release_date.substring(0, 4)})
          </h3>
          <span className={`tag ${setVoteClass(vote_average)}`}>
            {vote_average}
          </span>
        </div>

        <div className="movieOverview">
          <h2>{title}</h2>
          <p>{overview}</p>
          <button onClick={() => showDetails()}>Movie Details + Trailer</button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
