import React from "react";

import "./MovieList.scss";

import MovieCard from "../MovieCard/MovieCard";

const MovieList = ({ movies }) => {
  return (
    <div className="movie_list">
      <h2>Most popular movies</h2>
      <div className="movies">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
