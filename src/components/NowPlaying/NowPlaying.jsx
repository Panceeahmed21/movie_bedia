import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WhishlistContext } from "../../Context/WhishlistContext";

export default function NowPlaying() {
  let [nowMovies, setNowMovies] = useState([]);
  let { addToWatch } = useContext(WhishlistContext);

  async function addToWatchFn(movieID) {
    let res = await addToWatch(movieID);
    console.log(res);

    if (res.success == true) {
      toast.success("Movie is added to watchlist", {
        position: "bottom-right",
      });
    } else {
      toast.error("Error occurred", {
        position: "bottom-right",
      });
    }

    console.log(res);
  }

  function getNowPlaying() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmNhODY4Nzg4NDM0ZDE4OTI4MjdlNWMyNzMyMDhiMiIsIm5iZiI6MTY5ODE0NjI2My40OTMsInN1YiI6IjY1MzdhN2Q3NDFhYWM0MDBhYTA3ZjFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hhidvaa-B2hPKB8g2-OIjuOdi4RPRxwxShFps2y3dSg",
      },
    };

    fetch("https://api.themoviedb.org/3/movie/now_playing", options)
      .then((res) => res.json())
      .then((res) => {
        setNowMovies(res.results);
        console.log(res.results);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getNowPlaying();
  }, []);
  return (
    <div className="flex flex-wrap">
      {nowMovies.length > 0 ? (
        nowMovies.map((movie) => {
          let releaseData = new Date(movie.release_date);

          return (
            <div
              className="w-full md:w-1/4 px-4 py-4 text-center"
              key={movie.id}
            >
              <Link to={`/moviesDetails/${movie.id}`}>
                <img
                  className="rounded-lg hover:skew-x-6 hover:skew-y-6 transition-all duration-300 "
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                />
                <h2 className="text-xl mt-3">{movie.title}</h2>
              </Link>

              <div className="flex justify-between items-center  w-full my-3">
                <span className="text-xl  ">{releaseData.toDateString()}</span>
                <button
                  onClick={() => {
                    addToWatchFn(movie.id);
                  }}
                >
                  {" "}
                  <i className="fa-solid fa-heart bg-red-600 text-white text-2xl p-2 rounded-full"></i>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="h-screen flex items-center justify-center  w-full">
          <span class="loader"></span>
        </div>
      )}
    </div>
  );
}
