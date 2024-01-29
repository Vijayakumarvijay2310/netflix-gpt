import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondryContainer from "./SecondryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";



const Browse = () => {
  const showGpt = useSelector(store => store.gpt.showGptSearch)
  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header/>
      {showGpt ? <GptSearch/> : 
      <>
      <MainContainer/>
      <SecondryContainer/>
      </>
      }
    </div>
  )
}

export default Browse