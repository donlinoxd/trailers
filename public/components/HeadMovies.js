import variables from "../utilities/variables.js";
import genreList from "../utilities/genreList.js";

export let HeaderMovies = "";

export default function getHeaderMovies() {
  return fetch(
    `${variables.BASE_URL}trending/movie/day?api_key=${variables.TMDB_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      createHeaderMovies(data.results);
      return data.results;
    })
    .catch((error) => {
      console.log(error);
    });
}

function createHeaderMovies(results) {
  const slider = document.createElement("div");

  results.forEach((result, index) => {
    if (index < 4) {
      let genres = getGenres(result);
      let ul = document.createElement("ul");
      let {
        release_date,
        backdrop_path,
        poster_path,
        title,
        overview,
        vote_average,
        id,
      } = result;

      genres.forEach((genre) => {
        ul.innerHTML += `
            <li class="bg-custom-light-gray bg-opacity-30 rounded px-3 py-1 mx-2">${genre}</li>
            `;
      });

      let date = new Date(release_date);
      let releaseDate = `${date.getDate()} - ${
        date.getMonth() + 1
      } - ${date.getFullYear()}`;

      slider.innerHTML += `
              <div class="w-screen relative inline-block">
                  <div class="w-full object-cover relative">
                      <picture class="w-full header-movie" data-id="${id}">
                          <source media="(min-width: 640px)"
                                  srcset=${
                                    variables.IMG_BASE_URL + backdrop_path
                                  }>
                          <img
                          class="w-full" src=${
                            variables.IMG_BASE_URL_500 + poster_path
                          }
                          alt=${title}>
                      </picture>

                      <div class="absolute top-0 w-full h-full bg-header-gradient lg:bg-header-gradient-lg"></div>
                  </div>

                  <div class="absolute w-full flex items-end justify-center px-8 pt-8
                              sm:bottom-0 sm:h-full sm:flex-col sm:items-start sm:pt-20 lg:px-12">
                      <div class="hidden my-5 relative py-2 sm:block">
                          <h2 class="text-4xl font-normal font-oxygen">
                          ${title}</h2>

                          <div
                              class="absolute bottom-0 left-0 w-11/12 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-custom-blue">
                              <span class="absolute h-1 w-1 rounded-full right-0 -top-1/2 bg-custom-blue"></span>
                          </div>
                      </div>

                      <ul class="flex justify-center w-full absolute -top-4 text-custom-white
                                  sm:static sm:justify-start sm:my-2">
                          ${ul.innerHTML}
                      </ul>

                      <div class="hidden sm:block w-1/2 sm:my-2 max-h-20 overflow-y-scroll scrollbar-hide">
                          <p>${overview}</p>
                      </div>

                      <div class="hidden font-extralight font-normal
                                  sm:block sm:my-2">
                          <strong>${releaseDate}</strong>
                          <strong><i class="bx bxs-star ml-6 mr-2 text-yellow-400"></i>${vote_average}</strong>
                      </div>

                  </div>
              </div>
          `;
    }
  });

  HeaderMovies = `
      <div class="absolute w-full h-full">
          <i class="prev bx bxs-chevron-left z-10 absolute left-2 lg:left-3 top-2/4 text-5xl opacity-30 cursor-pointer
                  hover:opacity-100"></i>
          <i class="next bx bxs-chevron-right z-10 absolute right-2 top-2/4 lg:right-3 text-5xl opacity-30 cursor-pointer
                  hover:opacity-100"></i>
      </div>
      <div class="wrapper w-full overflow-x-hidden relative">
          <div class="slider relative w-full-x5">
              ${slider.innerHTML}
          </div>
          <div class="w-full flex justify-center pt-8
                      sm:absolute sm:bottom-0 sm:left-0 sm:justify-start sm:px-8
                      lg:px-12 lg:bottom-16 xl:bottom-32">
              <button class="flex justify-center items-center bg-custom-red px-4 py-2 rounded mr-8 text-base 
                        focus:outline-none sm:my-2 watch-btn movie-card hover:animate-bounce">
                  <i class="bx bx-play text-white mr-1 pointer-events-none"></i> Watch Trailer
              </button>

              <div class="sm:hidden flex flex-col items-center info-btn movie-card">
                  <i class="bx bx-info-square text-2xl pointer-events-none"></i>
                  <span class="pointer-events-none">Info</span>
              </div>
          </div>
      </div>
    `;
}

function getGenres(result) {
  const [genre1, genre2, genre3] = result.genre_ids;

  return genreList.genres
    .filter((genre) => {
      return genre.id == genre1 || genre.id == genre2 || genre.id == genre3;
    })
    .map((genre) => {
      return genre.name;
    });
}
