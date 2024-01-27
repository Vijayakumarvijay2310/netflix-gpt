import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondryContainer = () => {
  const movies = useSelector(store => store.movies)

  return (
    movies.nowPlayingmovies && movies.popularMovies && (
      <div className='w-screen bg-black'>
        <div className="-mt-52 pl-12 relative z-20">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingmovies}/>
      <MovieList title={"Popular Movies"} movies={movies.popularMovies}/>
      <MovieList title={"Trending Playing"} movies={movies.nowPlayingmovies}/>
      <MovieList title={"Watching Playing"} movies={movies.nowPlayingmovies}/>
       </div>
    </div>
    )
  );
};

export default SecondryContainer;