import React, { useEffect, useState } from "react";
import VideoPreview from "./VideoPreview";

// The movie display modal
const MovieDetails = ({
  credits,
  videos,
  title,
  overview,
  releaseDate,
  poster_path,
  closeModal
}) => {
  const IMAGE_API = `https://image.tmdb.org/t/p/w1280`; //also in Movies.js

  const [actorList, setActorList] = useState();
  const [videoKey, setVideoKey] = useState();

  useEffect(() => {
    if (credits.cast.length > 0) {
      const cast = credits.cast;
      console.log(`cast`, cast);

      // Get top n actors
      let topActors = [];
      cast.forEach((cast) => {
        if (topActors.length < 10) {
          const actorDetails = {
            id: cast.id,
            name: cast.name,
            character: cast.character,
            profilePic: cast.profile_path,
          };
          topActors.push(actorDetails);
        }
      });
      setActorList(topActors);
    }

    // Find the 'YouTube video trailer' - if none, display the poster
    if (videos.results.length > 0) {
      const videoResults = videos.results;

      const video = videoResults.find((video, index) => {
        if (video.site === "YouTube"){//&& video.type === "Trailer") {
          return true;
        } else {
          return false;
        }
      });
      const ytKey = video.key;
      setVideoKey(ytKey);
    } else {
      // no video, show poster instead....
      setVideoKey("");
    }
  }, [credits, videos]);

  return (
    <div className="modal">
      <div className="detailsContainer">
        <div className="detailsHeader">
          <h2>
            {title}({releaseDate.substring(0, 4)})
          </h2>
          <button onClick={closeModal}>X</button>
        </div>
        <div className="movieDetails">
          <div className="movieDescription">{overview}</div>
          {videoKey ? (
            <VideoPreview videoKey={videoKey} />
          ) : (
            <div className="moviePoster">
              <img
                src={
                  { poster_path }
                    ? IMAGE_API + poster_path
                    : "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
                }
                alt={title}
              />
            </div>
          )}
        </div>
        <div className="actorInfoContainer">
          {actorList &&
            actorList.map((actor) => {
              return (
                <div className="actorInfo" key={actor.id}>
                  {/* {actor.character}
                <br />
                Played by: */}
                  {actor.name}
                  <img
                    src={
                      actor.profilePic
                        ? IMAGE_API + actor.profilePic
                        : "https://images.unsplash.com/photo-1616582607004-eba71ce01e07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=639&q=80"
                    }
                    alt="profile"
                  />
                </div>
              );
            })}
        </div>
        <button
          style={{
            width: "100%",
            margin: 5,
            color: "white",
            background: "#373b69",
          }}
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
