import variables from "./utilities/variables.js";
import displayMovies from "./scripts/displayMovies.js";

let pageNum = 1;

setTimeout(() => {
  const genreCard = document.querySelectorAll("img.genre-card");

  genreCard.forEach((genre) => {
    genre.addEventListener("click", () => {
      console.log(genre.id);
      getGenreMovies(genre.id);
    });
  });

  console.log(genreCard);
}, 2000);

// FUNCTIONS HERE
function getGenreMovies(id) {
  console.log(id);

  fetch(
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=${pageNum}&with_genres=${id}&with_watch_monetization_types=flatrate`
  )
    .then((response) => response.json())
    .then((data) => {
      //   if (pageNum > data.total_pages) return;

      displayMovies(data.results);
    })
    .catch((err) => {
      console.log("error", err);
      console.log("Please do something about this!");
    });
}
