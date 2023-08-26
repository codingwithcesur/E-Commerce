const thumbnails = document.querySelectorAll(".product-thumbnail");
const mainImage = document.querySelector(".main-img");
let counter = 0;

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    counter = thumbnail.getAttribute("data-number");
    makeActive(thumbnail);
    mainImage.setAttribute("src", `images/image-product-${counter}.jpg`);
  });
});

const makeActive = (element) => {
  const active = document.querySelectorAll(".thumb-active");
  active.forEach((element) => {
    element.classList.remove("thumb-active");
  });
  element.classList.add("thumb-active");
};
