import React, { useEffect, useState } from "react";

import "./MovieDetails.scss";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { FaHeart } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

import { API_KEY } from "../../constants";

const MOVIE_DETAILS_POSTER_URL = "http://image.tmdb.org/t/p/w185";
const MOVIE_BACKDROP_URL = "http://image.tmdb.org/t/p/w1280";
const PRODUCTION_COMPANIES_LOGO_URL = "http://image.tmdb.org/t/p/w154";
const MOVIE_DETAILS_FETCH_ERROR =
  "There was an error fetching movie details. Please try again later.";

const MovieDetails = ({
  history,
  match: {
    params: { movie },
  },
}) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie}?api_key=${API_KEY}&language=en-US`
        );
        if (!res.ok) throw new Error(MOVIE_DETAILS_FETCH_ERROR);

        const results = await res.json();
        setMovieDetails(results);
      } catch (err) {
        setErrorMessage(err.message);
      }
    };

    fetchMovieDetails();
  }, [movie]);

  const {
    poster_path: posterPath,
    backdrop_path: backdropPath,
    vote_count: voteCount,
    vote_average: voteAverage,
    release_date: releaseDate,
    production_countries: productionCountries,
    production_companies: productionCompanies,
    popularity,
    overview,
    tagline,
    homepage,
    runtime,
    genres,
    title,
  } = movieDetails;

  const imagePath = posterPath
    ? `${MOVIE_DETAILS_POSTER_URL}${posterPath}`
    : `${process.env.PUBLIC_URL}/Assets/No_image.png`;

  const backdropImagePath = backdropPath
    ? `${MOVIE_BACKDROP_URL}${backdropPath}`
    : `${process.env.PUBLIC_URL}/Assets/Not-available.png`;

  const getProductionCompanyLogos = () => (
    <div className="production_companies">
      <h2>Production companies</h2>
      <div className="production_company_images">
        {productionCompanies.map(
          ({ logo_path }, index) =>
            logo_path && (
              <img
                key={index}
                alt="production_company"
                src={`${PRODUCTION_COMPANIES_LOGO_URL}${logo_path}`}
              />
            )
        )}
      </div>
    </div>
  );

  const getMovieDescription = () => (
    <div>
      <p>{overview}</p>
    </div>
  );

  const getMovieMetrics = () => (
    <div className="movie_metrics">
      <span>
        <strong>Release date:</strong> {releaseDate}
      </span>
      <span>
        <strong>Runtime:</strong> {runtime + " min"}
      </span>
      <span>
        <strong>Production countries:</strong>{" "}
        {productionCountries.map((country) => country.iso_3166_1).join(", ")}
      </span>
      <span>
        <strong>Popularity:</strong> {popularity}
      </span>
    </div>
  );

  const getMovieOverview = () => (
    <div className="movie_overview_details">
      <div className="movie_overview_title">{title}</div>
      <div className="movie_overview_tagline">{tagline}</div>
      <span>
        <FaHeart color="red" />
        <span className="movie_overview_votes">{`${voteCount} votes`}</span>
      </span>
      <div>
        <FcRating />
        <span className="movie_overview_average">{`${voteAverage} / 10`}</span>
      </div>
      <div>
        {genres.map((genre, index) => (
          <span key={index} className="movie_overview_genre_tag">
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <AiOutlineClose
        onClick={() => history.goBack()}
        color={errorMessage ? "black" : "white"}
        size={30}
        className="close_button"
      />
      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        Object.keys(movieDetails).length !== 0 && (
          <div className="movie_details">
            {homepage && (
              <a href={homepage}>
                <FiExternalLink
                  color="white"
                  size={40}
                  className="movie_details_external_link"
                />
              </a>
            )}
            <div className="movie_details_container">
              <img
                src={imagePath}
                alt="cover"
                className="movie_details_cover"
              />

              <div
                className="movie_details_hero"
                style={{
                  backgroundImage: `url(${backdropImagePath})`,
                }}
              >
                {getMovieOverview()}
              </div>

              <div className="movie_details_description">
                {getMovieMetrics()}
                {getMovieDescription()}
                <hr />
                {getProductionCompanyLogos()}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default MovieDetails;
