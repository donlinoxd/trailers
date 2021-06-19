import displayMovies, { noResult } from "./displayMovies.js";
import slider from "./slidefunc.js";

const TMDB_API_KEY = "d58f6f3c2d26e1aeac08e1c8018c1f33";
const BASE_URL = "https://api.themoviedb.org/3/";

const searchForm = document.querySelector("#search-form");
const search = document.querySelector("#search");

const main = document.querySelector("main");
const container = document.querySelector("main .container");

let query = window.location.search.slice(8);
let pageNum = 1;

window.addEventListener("DOMContentLoaded", () => {
  getSearchMovies(query);

  search.addEventListener("input", (e) => {
    container.innerHTML = "";
    getSearchMovies(search.value);
  });

  searchForm.addEventListener("submit", () => {
    getSearchMovies(query);
  });
  slider();
});

function getSearchMovies(query) {
  if (!query) {
    noResult();
    return;
  }

  fetch(
    `${BASE_URL}search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=${pageNum}&include_adult=false`
  )
    .then((response) => response.json())
    .then((data) => {
      if (pageNum > data.total_pages && data.total_pages) return;

      displayMovies(data.results);
    })
    .catch((err) => {
      console.log("error", err);

      main.innerHTML = `
            <div class="w-full h-screen container mx-auto flex justify-center items-center flex-col">
                <h2 class="my-6 text-xl">Sorry! Something horrible has occurred. Refresh your internet connection if possible. Thank you very much.</h2>
            </div>
            `;
    });
}

window.addEventListener("scroll", () => {
  // Scrolled to bottom of main element
  if (window.innerHeight + window.pageYOffset >= main.offsetHeight) {
    ++pageNum;
    getSearchMovies(query);
  }
});
