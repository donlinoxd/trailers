import displayMovies from "./displayMovies.js";
import displayGenres from "../public/components/Genres.js";
import slider from "./slidefunc.js";

const TMDB_API_KEY = "d58f6f3c2d26e1aeac08e1c8018c1f33";
const BASE_URL = "https://api.themoviedb.org/3/";

const main = document.querySelector("main");

let query = window.location.search.slice(7);
displayGenres();

window.addEventListener("DOMContentLoaded", () => {
  let pageNum = 1;
  getGenreMovies(query);

  function getGenreMovies(query) {
    fetch(
      `${BASE_URL}discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=${pageNum}&with_genres=${query}&with_watch_monetization_types=flatrate`
    )
      .then((response) => response.json())
      .then((data) => {
        if (pageNum > data.total_pages) return;

        displayMovies(data.results);
      })
      .catch((err) => {
        console.log("error", err);
        console.log("Please do something about this!");
      });
  }
  slider();
  window.addEventListener("scroll", () => {
    // Scrolled to bottom of main element
    if (window.innerHeight + window.pageYOffset >= main.offsetHeight) {
      ++pageNum;
      getGenreMovies(query);
    }
  });
});
