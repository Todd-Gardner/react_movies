import React, { useEffect, useState } from "react";
import YouTubePlayer from "react-player/youtube";

// The movie display (to be a modal...?)
const VideoPreview = ({videoKey}) => {
  const youTube_API = "https://www.youtube.com/watch?v=";
  const key = videoKey || "BdJKm16Co6M";
  // const [trailer, setTrailer] = useState();
  // useEffect(() => {
  //   preview(youTube_API, videoKey);
  // }, []);
  // const preview = async (youTube_API, videoKey) => {
  //   const response = await fetch(youTube_API + videoKey, {
  //     headers: {
  //       "Content-Type": "text/html",
  //     },
  //     mode: "no-cors",
  //     //  'Access-Control-Allow-Origin' : '*'
  //   });
  //   const data = await response;
  //   console.log(`data`, data);
  //   setTrailer(data);
  //};

  return (
    <div className="video">
      <YouTubePlayer className="videoPlayer" url={`${youTube_API}${key}`} />
    </div>
  );
};

export default VideoPreview;
