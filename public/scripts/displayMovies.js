import variables from "../utilities/variables.js";
import NavBar from "../components/Navbar.js";
import displayGenres, { Genres } from "../components/Genres.js";

displayGenres();
export default function displayMovies(result) {
  //   if (!result.length) {
  //     noResult();
  //     return;
  //   }

  let content = "";

  result.forEach((movie) => {
    let { poster_path, title, id } = movie;

    if (!poster_path) return;

    content += `
                <div class="inline-block col-span-1 cursor-pointer">
                    <img 
                    class="rounded-md"
                    src="${variables.IMG_BASE_URL + poster_path}" 
                    alt="${title}" 
                    id="${id}">
                </div>
            `;
  });

  renderMovies(content);
}

let movies = "";
function renderMovies(content) {
  const body = document.querySelector("body");
  movies = movies + content;

  body.innerHTML = `
    <header class="w-full relative text-xs font-light lg:text-sm">
        ${NavBar}
    </header>
    <main class="w-full relative top-10 lg:-top-2 xl:-top-10">
    ${Genres}

        <div class="w-full container mx-auto pt-4 px-4 lg:px-8
                    grid grid-cols-3 gap-x-1 gap-y-6 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7">
            ${movies}
        </div>
    </main>
`;
}
// export function noResult() {
//   main.innerHTML = `
//       <div class="w-full h-screen container mx-auto flex justify-center items-center flex-col px-8">
//          <h2 class="my-6">There were no results found for "keyword" in your search.</h2>
//          <ul class="list-disc flex flex-col">
//              <em class="font-light mb-3">Suggestions:</em>
//              <li class="font-extralight mx-4">Try a new keyword</li>
//              <li class="font-extralight mx-4">Looking for a movie trailer?</li>
//              <li class="font-extralight mx-4">Try using a movie title</li>
//              <li class="font-extralight mx-4">Try a genre like comedy, romance, horror, or adventure</li>
//          </ul>
//      </div>
//    `;
// }
