import React, { useEffect, useState } from "react";
import VideoPreview from "./VideoPreview";

// The movie display modal
const MovieDetails = ({ credits, videos, title, overview, releaseDate }) => {
  //let { credits, videos, movieData } = props
  const IMAGE_API = `https://image.tmdb.org/t/p/w1280`; //also im Movies.js
  //console.log(`props`, props)
  // const credits = movieData.movieData.credits
  // const videos = movieData.movieData.videos
  console.log(`credits`, credits);
  console.log(`videos`, videos);

  const [actorList, setActorList] = useState();
  const [videoKey, setVideoKey] = useState();

  useEffect(() => {
    if (credits && videos) {
      const ytKey = videos.results[0].key;
      const cast = credits.cast;
      console.log(`cast`, cast);
      console.log(`ytKey`, ytKey);
      setVideoKey(ytKey);

      // Get top five actors
      let topFive = [];
      cast.forEach((cast) => {
        if (topFive.length < 5) {
          const actorDetails = {
            id: cast.id,
            name: cast.name,
            character: cast.character,
            profilePic: cast.profile_path,
          };
          topFive.push(actorDetails);
        }
      });
      setActorList(topFive);
    }
  }, [credits, videos]);
  console.log(`actorList`, actorList);
  // const ytKey = videos.results[0].key

  return (
    <div className="detailsContainer">
      <h2>{title}</h2>
      <h5>Released: {releaseDate}</h5>
      {videos ? <VideoPreview videoKey={videoKey} /> : "Sorry, no prieview...."}
      <div className="movieDetails">
        <div className='movieDescription'>{overview}</div>
        <div className="actorInfo">
          <h4>Actors:</h4>
          {actorList &&
            actorList.map((actor) => {
              return (
                <div className="" key={actor.id}>
                  Character: {actor.character}<br/>
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

export default MovieDetails;
