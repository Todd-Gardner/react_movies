import React from "react";

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

const Movie = ({ title, poster_path, overview, vote_average }) => (
  <div className="movie">
    <img src={IMAGE_API + poster_path} alt={title} />
    <div className="movieInfo">
      <h3>{title}</h3>
      <span className={`tag ${setVoteClass(vote_average)}`}>
        {vote_average}
      </span>
    </div>

    <div className="movieOverview">
      <h2>{title} Overview:</h2>
      <p>{overview}</p>
    </div>
  </div>
);

export default Movie;
