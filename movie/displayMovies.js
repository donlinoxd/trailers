import displayGenres, { Genres } from "../public/components/Genres.js";
import renderOverview from "../public/components/OverviewModal.js";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";
const container = document.querySelector("main .container");
const main = document.querySelector("main");

displayGenres();
let genres = document.createElement("div");
genres.innerHTML = Genres;

main.insertBefore(genres, container);
export default function displayMovies(result) {
  if (!result.length) {
    noResult();
    return;
  }

  let content = "";

  result.forEach((movie) => {
    let { poster_path, title, id } = movie;

    if (!poster_path) return;

    content += `
                <div class="inline-block col-span-1 cursor-pointer">
                    <img 
                    class="rounded-md movie-card"
                    src="${IMG_BASE_URL + poster_path}" 
                    alt="${title}" 
                    data-id="${id}">
                </div>
            `;
  });

  container.innerHTML += content;

  renderOverview();
}

export function noResult() {
  main.innerHTML = `
      <div class="w-full h-screen absolute top-0 container mx-auto flex justify-center items-center flex-col px-8">
         <h2 class="my-6">There were no results found for "keyword" in your search.</h2>
         <ul class="list-disc flex flex-col">
             <em class="font-light mb-3">Suggestions:</em>
             <li class="font-extralight mx-4">Try a new keyword</li>
             <li class="font-extralight mx-4">Looking for a movie trailer?</li>
             <li class="font-extralight mx-4">Try using a movie title</li>
             <li class="font-extralight mx-4">Try a genre like comedy, romance, horror, or adventure</li>
         </ul>
     </div>

    ${Genres}
   `;
}
