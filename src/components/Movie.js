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

const getTrailer = (id) => {
  alert(`${id} was clicked`);
};

const Movie = ({ title, poster_path, overview, vote_average, id, API_KEY }) => {
  const [actorList, setActorList] = useState([]);

  const getMovieDetails = async (id, API_KEY) => {
    // Maybe add /movie/${id}/watch/providers (append?) in future
    const MOVIE_DETAILS = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`;

    const response = await fetch(MOVIE_DETAILS);
    const movieData = await response.json();
    console.log(`movieData`, movieData);
    //const credits = movieData.credits;
    const cast = await movieData.credits.cast;

    // Get list of first 5 actors/characters and save to state
    //https://api.themoviedb.org/3/person/{person_id}/images?api_key=<<api_key>>
    let topFive = [];
    // if there are less than 5 cast, only show how many there are
    // **Make DRY? / rearrange or use .map then if inside
    //if (cast.length < 5) {
      cast.forEach((cast) => {
      if (topFive.length < 5) {
        const actorDetails = {
          id: cast.id,
          name: cast.name,
          character: cast.character,
          profilePic: cast.profile_path,
        };
        topFive.push(actorDetails)
      }
    });
    setActorList(topFive);
    // for (let i = 0; i < cast.length; i++) {
    //   const actorDetails = {
    //     id: cast[i].id,
    //     name: cast[i].name,
    //     character: cast[i].character,
    //     profilePic: cast[i].profile_path,
    //   };
    //   topFive.push(actorDetails);
    // }
    // } else {
    //   for (let i = 0; i < 5; i++) {
    //     const actorDetails = {
    //       id: cast[i].id,
    //       name: cast[i].name,
    //       character: cast[i].character,
    //       profilePic: cast[i].profile_path,
    //       // profilePic: (
    //       //   <img src={ IMAGE_API + cast[i].profile_path } alt="profile" />
    //       // ), ---moved this to return statement
    //     };
    //     topFive.push(actorDetails);
    //   }
    // }
    //setActorList(topFive);
    //setActorList(...actorList, cast);
  };
  console.log(`actorList`, actorList);

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

          {actorList.length > 0 &&
            actorList.map((actor) => {
              return (
                <div className="actorInfo" key={actor.id}>
                  Character: {actor.character}
                  Played by: {actor.name}
                  <img src={IMAGE_API + actor.profilePic} alt="profile" />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Movie;
