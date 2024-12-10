import { createContext } from "react";

export let WhishlistContext = createContext("");

export default function WhishlistContextProvider({ children }) {
  function addToWatch(movieID) {
    console.log(movieID);

    const options = {
      method: "POST",
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieID,
        watchlist: true,
      }),
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmNhODY4Nzg4NDM0ZDE4OTI4MjdlNWMyNzMyMDhiMiIsIm5iZiI6MTY5ODE0NjI2My40OTMsInN1YiI6IjY1MzdhN2Q3NDFhYWM0MDBhYTA3ZjFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hhidvaa-B2hPKB8g2-OIjuOdi4RPRxwxShFps2y3dSg",
      },
    };

    return fetch(
      `https://api.themoviedb.org/3/account/20616058/watchlist`,
      options
    )
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);
  }

  function getWatchList() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmNhODY4Nzg4NDM0ZDE4OTI4MjdlNWMyNzMyMDhiMiIsIm5iZiI6MTY5ODE0NjI2My40OTMsInN1YiI6IjY1MzdhN2Q3NDFhYWM0MDBhYTA3ZjFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hhidvaa-B2hPKB8g2-OIjuOdi4RPRxwxShFps2y3dSg",
      },
    };

    return fetch(
      "https://api.themoviedb.org/3/account/20616058/watchlist/movies",
      options
    )
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteWatchMovie(movieID) {
    const options = {
      method: "POST",
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieID,
        watchlist: false,
      }),
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmNhODY4Nzg4NDM0ZDE4OTI4MjdlNWMyNzMyMDhiMiIsIm5iZiI6MTY5ODE0NjI2My40OTMsInN1YiI6IjY1MzdhN2Q3NDFhYWM0MDBhYTA3ZjFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hhidvaa-B2hPKB8g2-OIjuOdi4RPRxwxShFps2y3dSg",
      },
    };

    return fetch(
      `https://api.themoviedb.org/3/account/20616058/watchlist`,
      options
    )
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <WhishlistContext.Provider
      value={{ addToWatch, getWatchList, deleteWatchMovie }}
    >
      {children}
    </WhishlistContext.Provider>
  );
}
