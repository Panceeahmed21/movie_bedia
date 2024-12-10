import React, { useContext, useEffect, useState } from "react";
import { WhishlistContext } from "../../Context/WhishlistContext";
import toast from "react-hot-toast";

export default function WatchList() {
  let [watchList, setWatchList] = useState([]);

  let { getWatchList, deleteWatchMovie } = useContext(WhishlistContext);

  async function getWatchLisFn() {
    let res = await getWatchList();
    setWatchList(res.results);
  }

  async function deleteWatchMovieFn(movieID) {
    let res = await deleteWatchMovie(movieID);

    if (res.success == true) {
      toast.success("Movie is removed successfully", {
        position: "bottom-right",
      });
      getWatchLisFn();
    } else {
      toast.error("Error occurred", {
        position: "bottom-right",
      });
    }
  }
  useEffect(() => {
    getWatchLisFn();
  }, []);

  return (
    <>
      {watchList?.length !== 0 ? (
        watchList?.length > 0 ? (
          watchList?.map((watch) => {
            return (
              <div
                className="relative overflow-x-auto shadow-md sm:rounded-lg"
                key={watch?.id}
              >
                <table className="w-full text-sm text-left rtl:text-right ">
                  <tbody>
                    <tr className="bg-white border-b ">
                      <td className="p-4">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${watch?.backdrop_path}`}
                          className="w-16 md:w-32 max-w-full max-h-full rounded-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-lg">
                        {watch?.title}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            deleteWatchMovieFn(watch?.id);
                          }}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })
        ) : (
          <p className="text-2xl text-center">No movies in your watchlist</p>
        )
      ) : (
        <div className="h-screen flex items-center justify-center  w-full">
          <span class="loader"></span>
        </div>
      )}
    </>
  );
}
