import React from "react";

import "./MovieCard.scss";

const IMAGE_URL = "http://image.tmdb.org/t/p/w500";

const MovieCard = ({
  movie: {
    poster_path: posterPath,
    id,
    original_title: originalTitle,
    release_date: releaseDate,
    vote_average: voteAverage,
  },
}) => {
  const imagePath = posterPath
    ? `${IMAGE_URL}${posterPath}`
    : `${process.env.PUBLIC_URL}/Assets/No_image.png`;

  return (
    <a href={`/movies/${id}`} className="movie">
      <img src={imagePath} alt="" className="movie_poster" />
      <div className="movie_title">{originalTitle}</div>
      <div className="movie_info">
        <span className="movie_length">{`${voteAverage} / 10`}</span>
        {releaseDate && <span className="movie_year">{releaseDate.split("-")[0]}</span>}
      </div>
    </a>
  );
};

export default MovieCard;
