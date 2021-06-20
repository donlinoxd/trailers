import variables from "../utilities/variables.js";

// const year = new Date().getFullYear();
export let Movies = "";

let index = 0;
class Movie {
  constructor(category, url) {
    this.category = category;
    this.url = url;
    this.movies = this.getMovies();
  }

  getMovies() {
    return fetch(this.url)
      .then((response) => response.json())
      .then((data) => {
        this.displayMovies(data.results);
        return data.results;
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  displayMovies(movies) {
    let section = "";
    let slider = "";

    movies.forEach((movie) => {
      let { id, poster_path, title } = movie;
      if (!poster_path) return;

      slider += `
            <div class="object-cover font-light m-0.5 text-center sm:m-1 inline-block">
                <img 
                class="movie-card w-28 sm:w-48 rounded-md cursor-pointer"
                data-id="${id}"
                src="${variables.IMG_BASE_URL_300 + poster_path}"
                alt="${title}">
            </div>
            `;
    });

    section = `
        <section class="relative my-2 md:my-4 lg:my-6 xl:my-8">
            <h2 class="mx-4 text-lg sm:text-xl cursor-pointer inline-block">${this.category} ></h2>

            <div class="absolute top-0 w-full h-5/6 hidden md:block">
                <i class="bx bxs-chevron-left prev z-10 absolute left-2 top-2/4 transform translate-y-1/2 text-3xl cursor-pointer opacity-50 hover:opacity-100 hidden lg:block"></i>
                <i class="bx bxs-chevron-right next z-10 absolute right-2 top-2/4 transform translate-y-1/2 text-3xl cursor-pointer opacity-50 hover:opacity-100 hidden lg:block"></i>
            </div>

            <div class="category-wrapper relative w-full h-48 overflow-x-scroll scrollbar-hide sm:h-80"> 
                <div class="slider absolute left-0 whitespace-nowrap">
                    ${slider}
                </div>
            </div>
        </section>
    `;

    Movies += section;
  }
}

export default async function createMovies() {
  const upcoming = new Movie(
    "Upcoming in Theatres",
    `${variables.BASE_URL}movie/upcoming?api_key=${variables.TMDB_API_KEY}&language=en-US&page=2`
  );

  const actionThriller = new Movie(
    `Action Thriller`,
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=28%2C53`
  );

  const topRated = new Movie(
    "Top Rated Movies",
    `${variables.BASE_URL}movie/top_rated?api_key=${variables.TMDB_API_KEY}&language=en-US&page=1`
  );

  const actionAdventure = new Movie(
    "Action & Adventure",
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=28%2C12`
  );

  const popular = new Movie(
    "Popular Now",
    `${variables.BASE_URL}movie/popular?api_key=${variables.TMDB_API_KEY}&language=en-US&page=1`
  );

  const romance = new Movie(
    "Romantic Movies",
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=10749`
  );

  const sciFi = new Movie(
    `Sci-Fi Movies`,
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=878`
  );

  const western = new Movie(
    "Western Movies",
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=37`
  );

  const horror = new Movie(
    "Horror",
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=27`
  );

  const romanticComedy = new Movie(
    "Romantic Comedy",
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=10749%2C35`
  );

  const documentaries = new Movie(
    "Documentaries",
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=99`
  );

  const family = new Movie(
    "Family Movies",
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=10751`
  );

  const animation = new Movie(
    "Animation",
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=16`
  );

  const comedy = new Movie(
    "Comedy Movie",
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=35`
  );

  const drama = new Movie(
    "Drama",
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=18`
  );

  const fantasy = new Movie(
    "Fantasy Movies",
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=14`
  );

  const musicRomance = new Movie(
    "Music & Romance",
    `${variables.BASE_URL}discover/movie?api_key=${variables.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=10402%2C10749`
  );
}
// function showDetails(id) {
//   fetch(`${BASE_URL}movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`)
//     .then((response) => response.json())
//     .then((data) => {
//       let desc = document.querySelector(".description");

//       desc.innerHTML = `
//       <img
//       src = ${IMG_BASE_URL + data.backdrop_path}
//       alt = ${data.title} />
//       <h3>${data.title}</h3>
//       <p>${data.overview}</p>
//       <span>Imdb: ${data.vote_average}</span>
//       <button>Play Trailer</button>
//       `;
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   getTrailer(id);
// }

// function getTrailer(id) {
//   fetch(`${BASE_URL}/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`)
//     .then((response) => response.json())
//     .then((data) => {
//       const trailers = data.results.filter(
//         (result) => result.site === "YouTube"
//       );

//       if (!trailers.length) {
//         console.log("no trailer");
//       }

//       console.log(trailers);
//       const button = document.querySelector("button");
//       const trailer = document.querySelector(".trailer");

//       button.addEventListener("click", () => {
//         trailer.innerHTML = `
//             <iframe
//                 src = ${YOUTUBE_BASE_URL + trailers[0].key}
//                 height = 200
//                 width = 300
//                 title = ${trailers[0].name}
//                 autoplay
//             ></iframe>
//         `;
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
