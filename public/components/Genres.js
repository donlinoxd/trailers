import genreList from "../utilities/genreList.js";

export let Genres = "";

export default function displayGenres() {
  let slider = "";

  genreList.genres.forEach((genre) => {
    slider += `
              <form class="relative object-cover font-light mx-0.5 sm:mx-1 overflow-y-hidden scrollbar-hide">
                  <input type="hidden" value="${genre.id}" name="query">
                  <button class="focus:outline-none" formaction="/movie/genre.html" formmethod="GET" type="submit">
                      <img class="w-24 sm:w-40 rounded-md cursor-pointer 
                            transition-all duration-500 hover:transform hover:scale-125" src="/public/img/genre${genre.id}.jpg" alt="${genre.name}" id="${genre.id}">
                  </button>
  
                  <div class="bg-custom-black bg-opacity-50 w-full h-full absolute top-0 pointer-events-none"></div>
                  <span class="absolute top-2/4 left-2/4 border-t-2 border-b-2 text-center
                              transform -translate-x-1/2 -translate-y-1/2
                              text-xs sm:text-sm pointer-events-none">${genre.name}</span>
              </form>
        `;
  });

  Genres = `
        <section class="relative w-full mb-6">
              <div class='absolute top-0 left-0 w-full h-full hidden md:block'>
                  <i class='bx bxs-chevron-left prev z-10 absolute text-2xl top-1/2 transform -translate-y-1/2 left-2 cursor-pointer opacity-50 hover:opacity-100'></i>
                  <i class='bx bxs-chevron-right next z-10 absolute text-2xl top-1/2 transform -translate-y-1/2 right-2 cursor-pointer opacity-50 hover:opacity-100'></i>
              </div>
  
              <div class="category-wrapper relative w-full h-16 sm:h-24 overflow-x-scroll scrollbar-hide">
                  <div class="slider absolute left-0 flex w-1000 sm:w-1000-sm" >
                      ${slider}
                  </div>
              </div>
        </section>
    `;
}
