import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WhishlistContext } from "../../Context/WhishlistContext";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Movies() {
  let [searchMovies, setSearchMovies] = useState([]);
  let [isSearch, setIsSearch] = useState(false);
  let { addToWatch } = useContext(WhishlistContext);

  async function getMovies() {
    return axios.get("https://api.themoviedb.org/3/movie/upcoming", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmNhODY4Nzg4NDM0ZDE4OTI4MjdlNWMyNzMyMDhiMiIsIm5iZiI6MTY5ODE0NjI2My40OTMsInN1YiI6IjY1MzdhN2Q3NDFhYWM0MDBhYTA3ZjFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hhidvaa-B2hPKB8g2-OIjuOdi4RPRxwxShFps2y3dSg",
      },
    });
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

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

  function getMoviesSearch(e) {
    if (e.target.value == "") {
      setIsSearch(false);
    } else {
      let myMovies = [...data?.data?.results];
      let filtered = myMovies.filter((movie) => {
        return movie.title.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setIsSearch(true);
      setSearchMovies(filtered);
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center  w-full">
        <span className="loader"></span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-screen flex text-center">
        <p className="text-3xl">{error}</p>
      </div>
    );
  }

  let list = isSearch ? searchMovies : data?.data?.results;
  return (
    <>
      <div className="mb-5 my-10">
        <input
          onInput={(e) => {
            getMoviesSearch(e);
          }}
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          placeholder="Search upcoming.."
          required
        />
      </div>

      <h2 className="text-2xl font-medium my-3">Upcoming</h2>

      <div className="flex flex-wrap">
        {list?.map((movie) => {
          let releaseData = new Date(movie.release_date);

          return (
            <div
              className="w-full md:w-1/4 px-4 py-4 text-center"
              key={movie?.id}
            >
              <Link to={`/moviesDetails/${movie?.id}`}>
                <img
                  className="rounded-lg hover:skew-x-6 hover:skew-y-6 transition-all duration-300 "
                  src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                  alt=""
                />
                <h2 className="text-xl mt-3">{movie?.title}</h2>
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
        })}
      </div>
    </>
  );
}
