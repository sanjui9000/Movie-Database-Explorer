Movie database explorer using [The Movie Database API](https://developers.themoviedb.org/3/getting-started).

# Features
1. On the home page, We can see a list of the [popular movies](https://developers.themoviedb.org/3/movies/get-popular-movies), a search bar, and pagination like `previous | ${current page number} | next`.
2. If I [search](https://developers.themoviedb.org/3/search/search-movies) for a movie, We can see a list of the movies whose title matches my search.
3. If I click on a [movie](https://developers.themoviedb.org/3/movies), it takes us to a page where I see more info about that movie.

# Instructions
1. Run "npm install"
2. Run "npm start"

# Design and implementation decisions that can be built given a longer time frame
1. Data for latest 10 pages can be cached(Maybe LRU cache)
2. We can add debouncing for search functionality so that we do not make a lot of requests to the API.
3. Add lazy loading for images.
4. Make the website responsive to support tablet and mobile.
5. Can add CSS animations to make UI look better.
6. Move constants to their own file so to make component files cleaner.
