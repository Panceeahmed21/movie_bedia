import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "flowbite";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Movies from "./components/Movies/Movies";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Watchlist from "./components/Watchlist/Watchlist";
import NotFound from "./components/NotFound/NotFound";
import NowPlaying from "./components/NowPlaying/NowPlaying";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import WhishlistContextProvider from "./Context/WhishlistContext";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  let routing = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "moviesDetails/:id", element: <MovieDetails /> },
        { path: "watchList", element: <Watchlist /> },
        { path: "nowPlaying", element: <NowPlaying /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <WhishlistContextProvider>
        <RouterProvider router={routing}></RouterProvider>
        <Toaster></Toaster>
      </WhishlistContextProvider>
    </>
  );
}

export default App;
