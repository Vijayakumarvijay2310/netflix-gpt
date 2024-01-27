import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addPopularMovies } from '../utils/movieSlice';
import { API_OPTIONS } from '../utils/constants';

const usePopularMovies = () => {
    //Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const getNowPlayingMovies = async() =>{
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
    const jsonData = await data.json();
    dispatch(addPopularMovies(jsonData.results))
  }

  useEffect(()=>{
    getNowPlayingMovies()
  },[])

}

export default usePopularMovies;