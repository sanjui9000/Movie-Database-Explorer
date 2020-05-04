import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import MovieList from "../MovieList/MovieList";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import PaginationContainer from "../PaginationContainer/PaginationContainer";

import { API_KEY } from "../../constants";

const REQUEST_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=`;
const MOVIE_FETCH_ERROR =
  "There was an error fetching movies. Please try again later.";

// Regex for checking any number greater than 0
const PAGE_NUMBER_REGEX = new RegExp("^[1-9][0-9]*$");

const Home = ({
  match: {
    params: { page },
  },
}) => {
  const isValidPage = PAGE_NUMBER_REGEX.test(page);

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(isValidPage ? page : 1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const FETCH_URL = searchTerm
        ? `${SEARCH_URL}${pageNumber}&query=${searchTerm}`
        : `${REQUEST_URL}${pageNumber}`;

      try {
        const res = await fetch(FETCH_URL);
        if (!res.ok) throw new Error(MOVIE_FETCH_ERROR);

        const { total_pages: totalPages, results, page } = await res.json();

        setTotalPages(totalPages);
        setPageNumber(page);
        setMovies(results);
      } catch (err) {
        setErrorMessage(err.message);
      }
    };

    fetchMovies();
  }, [pageNumber, searchTerm]);

  return errorMessage ? (
    <ErrorMessage message={errorMessage} />
  ) : (
    <>
      <Header setSearchTerm={setSearchTerm} setPageNumber={setPageNumber} />
      <MovieList movies={movies} />
      <PaginationContainer
        currentPage={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
    </>
  );
};

export default Home;
