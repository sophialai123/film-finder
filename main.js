
const tmdbKey = '16c7e5338c8f279191c0c0eb7bcd8ed6';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

//async await function to return a promise
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    // use await to fetch API
    const response = await fetch(urlToFetch);
    if (response.ok) {
      //neet to use await keyword 
      const jsonResponse = await response.json();
      const genresArray = jsonResponse.genres;
      console.log(genresArray)
      return genresArray
    } else {
      throw new Error(error)
    }

  } catch (error) {
    console.log(error)

  }

};

getGenres()


//Get a Random Movie
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const moviesResults = jsonResponse.results;
      console.log(moviesResults)
      return moviesResults;
    } else {
      throw new Error(error)
    }
  } catch (error) {
    console.log(error)
  }

}

getMovies()


const getMovieInfo = async (movie) => {

  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`
  // const movieEndpoint = `/movie/5`; // pass an movie id 
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  console.log(urlToFetch)
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      console.log(jsonResponse);
      return movieInfo;
    } else {
      throw new Error(error)
    }

  } catch (error) {
    console.log(error)
  }

};

getMovieInfo()



// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };


  //call getMovies function and await its return,
  const movies = await getMovies();

  //helper function defined in helpers.js
  const randomMovie = getRandomMovie(movies);

  const info = await getMovieInfo(randomMovie)

  //call displayMovie(), passing info as the argument.
  displayMovie(info)
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;