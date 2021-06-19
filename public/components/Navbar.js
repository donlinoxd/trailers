const NavBar = `
        <nav class="px-4 py-3 flex justify-between items-center fixed w-screen z-10 bg-custom-black bg-opacity-50 backdrop-filter backdrop-blur-sm
                    md:p-5 lg:px-12">
            <a href="/index.html"><img src="/public/img/logo.svg" alt="Trailers.co Logo" class="w-28 sm:w-36 lg:w-44"></a>
            
            <form class="relative flex items-center" action="/movie/index.html" method="GET">
                <input class="w-28 h-8 rounded-full bg-custom-white bg-opacity-30 pl-4 pr-8 outline-none font-extralight tracking-wider
                        sm:w-56 lg:w-64" type="text" name="search">
                <button class="absolute right-2 cursor-pointer flex item-center justify-center focus:outline-none"><i class="bx bx-search-alt text-custom-blue text-xl"></i></button>
            </form>
        </nav>
        `;

export default NavBar;
