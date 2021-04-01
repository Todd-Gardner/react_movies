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

const getMovieDetails = async (id, API_KEY) => {
  const MOVIE_DETAILS = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`;

  const response = await fetch(MOVIE_DETAILS);
  const jsonData = await response.json();
  console.log(`jsonData`, jsonData);
};

const getTrailer = (id) => {
  alert(`${id} was clicked`);
};

const Movie = ({ title, poster_path, overview, vote_average, id, API_KEY }) => {
  return (
    <div
      className="movieCard"
      onClick={() => {
        getMovieDetails(id, API_KEY);
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
          <h3>{title}</h3>
          <span className={`tag ${setVoteClass(vote_average)}`}>
            {vote_average}
          </span>
        </div>

        <div className="movieOverview">
          <h2>{title} Overview:</h2>
          <p>{overview}</p>
          <button onClick={() => getTrailer(id)}>Watch Trailer</button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
