const thumbnails = document.querySelectorAll(".product-thumbnail");
const mainImage = document.querySelector(".main-img");
const modalImg = document.querySelector("#modal-img");
const modalThumbnails = document.querySelectorAll(".modal-thumbnail");
const modalArrows = document.querySelectorAll(".modal-arrows");
let counter = 0;

thumbnails.forEach((thumbnail) => {
  counter = thumbnail.getAttribute("data-number");
  thumbnail.style.backgroundImage = `url(images/image-product-${counter}-thumbnail.jpg)`;
  thumbnail.addEventListener("click", () => {
    counter = thumbnail.getAttribute("data-number");
    makeActive(thumbnail);
    mainImage.setAttribute("src", `images/image-product-${counter}.jpg`);
  });
});

mainImage.addEventListener("click", () => {
  const imgSrc = mainImage.getAttribute("src");
  modalImg.style.backgroundImage = `url(${imgSrc})`;
  modalImg.classList.add("product-modal");
});

modalThumbnails.forEach((thumbnail) => {
  counter = thumbnail.getAttribute("data-number");
  thumbnail.style.backgroundImage = `url(images/image-product-${counter}-thumbnail.jpg)`;
  thumbnail.addEventListener("click", () => {
    counter = thumbnail.getAttribute("data-number");
    makeActive(thumbnail);
    modalImg.style.backgroundImage = `url(images/image-product-${counter}.jpg)`;
  });
});

counter = 1;

modalArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    if (arrow.classList.contains("modal-arrow-left")) {
      counter--;
      if (counter < 1) {
        counter = 4;
      }
      modalImg.style.backgroundImage = `url(images/image-product-${counter}.jpg)`;
      makeActive(modalThumbnails[counter - 1]);
    } else {
      counter++;
      if (counter > 4) {
        counter = 1;
      }
      modalImg.style.backgroundImage = `url(images/image-product-${counter}.jpg)`;
      makeActive(modalThumbnails[counter - 1]);
    }
  });
});

const makeActive = (element) => {
  const active = document.querySelectorAll(".thumb-active");
  active.forEach((element) => {
    element.classList.remove("thumb-active");
  });
  element.classList.add("thumb-active");
};
