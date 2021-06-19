export default function slider() {
  setTimeout(() => {
    let nextBtns = document.querySelector(".next");
    let prevBtns = document.querySelector(".prev");

    nextBtns.addEventListener("click", (e) => {
      nextSlide(e.target);
    });

    prevBtns.addEventListener("click", (e) => {
      prevSlide(e.target);
    });

    function nextSlide(btn) {
      let wrapper = btn.parentElement.nextElementSibling;
      let offsetWidth = screen.width;

      // ScrollBy: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy
      wrapper.scrollBy({
        left: offsetWidth,
        behavior: "smooth",
      });
    }

    function prevSlide(btn) {
      let wrapper = btn.parentElement.nextElementSibling;
      let offsetWidth = btn.parentElement.offsetWidth;

      // ScrollBy: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy
      wrapper.scrollBy({
        left: -offsetWidth,
        behavior: "smooth",
      });
    }
  }, 2000);
}
