import NavBar from "./components/Navbar.js";
import getHeaderMovies, { HeaderMovies } from "./components/HeadMovies.js";
import renderSlide from "./scripts/slidefunc.js";
import renderGenres, { Genres } from "./components/Genres.js";
import createMovies, { Movies } from "./components/Movies.js";

const body = document.querySelector("#App");

// createMovies();

// setTimeout(() => {
//   getHeaderMovies().then(() => {
//     renderGenres();
//     renderElements();
//     renderSlide();
//   });
// }, 1000);

Promise.all([createMovies(), getHeaderMovies()]).then(() => {
  setTimeout(() => {
    renderGenres();
    renderElements();
    renderSlide();
  }, 500);
});

function renderElements() {
  body.innerHTML = `
    <header class="w-full relative text-xs font-light lg:text-sm">
        ${NavBar}
        ${HeaderMovies}
    </header>
    <main class="w-full relative top-10 lg:-top-2 xl:-top-10">
        ${Genres}
        ${Movies}
    </main>
`;
}
