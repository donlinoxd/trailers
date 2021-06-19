export default function renderSlide() {
  setTimeout(() => {
    let nextBtns = document.querySelectorAll(".next");
    let prevBtns = document.querySelectorAll(".prev");
    let index = 0;

    nextBtns.forEach((next) => {
      next.addEventListener("click", (e) => {
        nextSlide(e.target);
      });
    });

    prevBtns.forEach((prev) => {
      prev.addEventListener("click", (e) => {
        prevSlide(e.target);
      });
    });

    setTimeout(function repeat() {
      nextSlide(nextBtns[0]);

      setTimeout(repeat, 4500);
    }, 4500);

    function nextSlide(btn) {
      let wrapper = btn.parentElement.nextElementSibling;
      let slider = wrapper.firstElementChild;
      let offsetWidth = screen.width;
      let offsetLeft = slider.offsetLeft;

      // ScrollBy: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy
      if (wrapper.classList.contains("category-wrapper")) {
        wrapper.scrollBy({
          left: offsetWidth,
          behavior: "smooth",
        });
        return;
      }

      slider.style.left = `-${-offsetLeft + offsetWidth}px`;

      if (index === 3) {
        slider.style.left = "0px";
        index = 0;
        return;
      }

      index++;
    }

    function prevSlide(btn) {
      let wrapper = btn.parentElement.nextElementSibling;
      let slider = wrapper.firstElementChild;
      let offsetWidth = btn.parentElement.offsetWidth;
      let offsetLeft = slider.offsetLeft;

      // ScrollBy: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy
      if (wrapper.classList.contains("category-wrapper")) {
        wrapper.scrollBy({
          left: -offsetWidth,
          behavior: "smooth",
        });
        return;
      }

      slider.style.left = `${offsetLeft + offsetWidth}px`;

      if (index === 0) {
        slider.style.left = `-${offsetWidth * 3}px`;
        index = 3;
        return;
      }

      index--;
    }
  }, 2000);
}
