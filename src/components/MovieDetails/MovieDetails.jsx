import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WhishlistContext } from "../../Context/WhishlistContext";
import toast from "react-hot-toast";

export default function MovieDetails() {
  let { id } = useParams();
  let [movieDetails, setMoviesDetails] = useState({});
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

  function getMovieDetails() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmNhODY4Nzg4NDM0ZDE4OTI4MjdlNWMyNzMyMDhiMiIsIm5iZiI6MTY5ODE0NjI2My40OTMsInN1YiI6IjY1MzdhN2Q3NDFhYWM0MDBhYTA3ZjFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hhidvaa-B2hPKB8g2-OIjuOdi4RPRxwxShFps2y3dSg",
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMoviesDetails(res);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getMovieDetails();
  }, []);
  return (
    <>
      {movieDetails ? (
        <>
          {" "}
          <div className="flex flex-wrap flex:col items-center">
            <div className="w-full md:w-1/2 px-2">
              <img
                className="w-full md:w-[80%] rounded-full hover:skew-x-3 hover:skew-y-3  transition-all duration-30"
                src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
                alt=""
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium my-5 md:my-0">
                  {movieDetails?.title}
                </h2>{" "}
                <span className="text-2xl text-[#FFDF00]">
                  {movieDetails.vote_average}
                  <i className="fa-solid fa-star"></i>
                </span>
              </div>
              {movieDetails?.genres ? (
                <>
                  <ul className="flex items-center flex-wrap ">
                    {movieDetails?.genres?.map((genre) => {
                      return (
                        <li className="mr-2 border rounded-full px-3 py-1 my-2 text-red-600">
                          {genre?.name}
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                ""
              )}
              <h4 className="text-xl my-2 font-medium">OverView : </h4>
              <p className="text-gray-600 mb-6">{movieDetails?.overview}</p>
              {movieDetails?.production_companies ? (
                <>
                  <h4 className="text-xl my-2 font-medium">
                    Production Companies :{" "}
                  </h4>
                  <ul className="flex items-center my-3">
                    {movieDetails?.production_companies?.map((count) => {
                      return (
                        <li className="mr-2">
                          <img
                            className="w-[80px]"
                            src={`https://image.tmdb.org/t/p/w500/${count?.logo_path}`}
                            alt=""
                          />
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                ""
              )}
              {movieDetails?.spoken_languages ? (
                <>
                  <h4 className="text-xl mt-6 font-medium">
                    Spoken Languages :{" "}
                  </h4>
                  <ul className="flex items-center my-3">
                    {movieDetails?.spoken_languages?.map((lan) => {
                      return <li className="mr-2">{lan?.name}</li>;
                    })}
                  </ul>
                </>
              ) : (
                ""
              )}
              <h4 className="text-xl my-2 font-medium">Release Date : </h4>
              <div className="flex justify-between items-center  w-full my-3">
                <span className="text-xl  ">
                  {new Date(movieDetails?.release_date).toDateString()}
                </span>
                <button
                  onClick={() => {
                    addToWatchFn(movieDetails?.id);
                  }}
                >
                  {" "}
                  <i className="fa-solid fa-heart bg-red-600 text-white text-2xl p-2 rounded-full"></i>
                </button>
              </div>
              {/* <h4 className="text-xl my-2 font-medium">Vote Average : </h4> */}
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen flex items-center justify-center  w-full">
          <span class="loader"></span>
        </div>
      )}
    </>
  );
}
