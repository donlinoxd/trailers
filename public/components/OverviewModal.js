import variables from "../utilities/variables.js";

const body = document.querySelector("#App");

export default function renderOverview() {
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("movie-card")) {
      Promise.all([
        getMovieDetails(e.target.getAttribute("data-id")),
        getMovieKey(e.target.getAttribute("data-id")),
      ]).then((datas) => {
        createOverviewModal(datas);
      });
    }
  });
}

function getMovieDetails(id) {
  return fetch(
    `${variables.BASE_URL}movie/${id}/videos?api_key=${variables.TMDB_API_KEY}&language=en-US`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getMovieKey(id) {
  return fetch(
    `${variables.BASE_URL}movie/${id}?api_key=${variables.TMDB_API_KEY}&language=en-US`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function createOverviewModal(datas) {
  if (document.querySelector(".modal-wrapper")) {
    console.log("Don't give me a fucked!!!");
    return;
  }

  if (!datas[0].results.length) {
    alert("There isn't a video trailer available.");
    return;
  }

  let youtube_key = datas[0].results[0].key;
  let {
    genres,
    overview,
    poster_path,
    production_companies,
    production_countries,
    release_date,
    revenue,
    tagline,
    title,
    vote_average,
  } = datas[1];

  let companies = "";
  let countries = "";
  let genreList = "";

  production_companies.forEach((company, index) => {
    if (index > 3 && production_companies.length > 3) {
      companies += `${company.name}.`;
      return;
    }
    companies += `${company.name}, `;
  });

  production_countries.forEach((country, index) => {
    if (index > 3 && production_countries.length > 3) {
      countries += `and more`;
    } else if (index === production_countries.length - 1) {
      countries += `${country.name}.`;
    } else {
      countries += `${country.name}, `;
    }
  });

  genres.forEach((genre, index) => {
    if (index === genres.length - 1) {
      genreList += `${genre.name}.`;
      return;
    }
    genreList += `${genre.name}, `;
  });

  const container = document.createElement("div");
  body.style.overflow = "hidden";

  container.className =
    "modal-wrapper w-full h-screen fixed top-0 left-0 overflow-y-scroll scrollbar-hide z-10 bg-custom-black bg-opacity-30  backdrop-filter backdrop-blur-sm";
  container.innerHTML = `
        <div class="overview-modal max-w-full bg-gradient-to-b from-black via-black to-custom-black 
                    border border-custom-blue border-opacity-40 py-4 sm:py-10 rounded-md
                    absolute left-1/2 transform -translate-x-1/2 -translate-y-full transition-all duration-400"
              style="width: 40rem">   
            <div class="relative max-w-full" style="width: 40rem;">
                <div class="h-0 overflow-hidden" style="padding-bottom: 52.25%; padding-top: 30px;">
                    <iframe class="absolute top-0 left-0 w-full h-full"
                        src="${
                          variables.YOUTUBE_BASE_URL + youtube_key
                        }?autoplay=1&mute=1"></iframe>
                </div>
            </div>
            <div class="w-full">
                <div class="flex px-4 py-2 sm:py-4 sm:px-8 text-xs sm:text-sm">
                    <div class="w-4/12 object-cover mr-4" style="min-width: 110px;">
                        <img class="rounded-md w-full" src="${
                          variables.IMG_BASE_URL_300 + poster_path
                        }" alt="${title}">
                    </div>
                    <div class="flex flex-col space-y-1">
                        <div class="font-bold tracking-wider mb-2 text-base sm:text-lg">
                            <h2>${title}</h2>
                        </div>
                        <div class="flex">
                            <strong class="font-normal">${release_date}</strong>
                            <strong class="font-normal">${vote_average}</strong>
                        </div>
                        <div>
                            <span><strong class="font-light opacity-80">Genres: </strong>${genreList}</span>
                        </div>
                        <div>
                            <span><strong class="font-light opacity-80">Tagline: </strong>${tagline}</span>
                        </div>
                        <div>
                            <span><strong class="font-light opacity-80">Companies: </strong>${companies}</span>
                        </div>
                        <div>
                            <span><strong class="font-light opacity-80">Countries: </strong>${countries}</span>
                        </div>
                        <div>
                            <span><strong class="font-light opacity-80">Revenue: </strong>${revenue}</span>
                        </div>
                    </div>
                </div>
                <div class="px-4 sm:px-8 text-sm sm:text-base text-justify my-4">
                    <p style="text-indent: 3rem">${overview}</p>
                </div>
            </div>
            <div class="absolute top-0.5 left-2 sm:top-2 sm:left-3">
                <i class='bx bx-arrow-back text-xl sm:text-2xl cursor-pointer close-overview-modal'></i>
            </div>
        </div>
        `;
  body.append(container);
  openModal();
}

function openModal() {
  const overviewModal = document.querySelector(".overview-modal");

  setTimeout(() => {
    overviewModal.style.transform = "translate(-50%, 2%)";
  }, 100);

  closeModal();
}

function closeModal() {
  const overviewModal = document.querySelector(".overview-modal");
  const modalWrapper = document.querySelector(".modal-wrapper");
  const backBtn = document.querySelector(".close-overview-modal");

  window.addEventListener("click", (e) => {
    if (e.target == modalWrapper || e.target == backBtn) {
      overviewModal.style.transform = "translate(-50%, -100%)";
      setTimeout(() => {
        modalWrapper.remove();
        body.style.overflow = "visible";
      }, 100);
    }
  });
}
