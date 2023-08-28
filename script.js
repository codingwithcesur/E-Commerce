const thumbnails = document.querySelectorAll(".product-thumbnail");
const mainImage = document.querySelector(".main-img");
const modalImg = document.querySelector("#modal-img");
const modalThumbnails = document.querySelectorAll(".modal-thumbnail");
const modalArrows = document.querySelectorAll(".modal-arrows");
const navCartIcon = document.querySelector(".nav-cart-icon");
const plusMinus = document.querySelectorAll(".plus-minus");
const addToCart = document.querySelector(".add-to-cart");
const productTitle = document.querySelector(".product-title");
const shoppingCartBody = document.querySelector(".card-body");
const navAvatar = document.querySelector(".nav-avatar");
const discountedPrice = document.querySelector(".discounted-price");
let counter = 0;

const itemsOnCart = (() => {
  let items = {};
  return { items };
})();

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

navCartIcon.addEventListener("click", () => {
  const shoppingCart = document.querySelector(".shopping-cart");
  shoppingCart.classList.toggle("d-none");
});

plusMinus.forEach((element) => {
  element.addEventListener("click", () => {
    const input = element.parentElement.querySelector("input");
    if (element.classList.contains("plus")) {
      input.value++;
    } else {
      if (input.value > 0) {
        input.value--;
      }
    }
    discountedPrice.textContent = `$${input.value * 125}.00`;
  });
});

addToCart.addEventListener("click", () => {
  const input = document.querySelector(".quantity-display");

  const addProduct = () => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const img = document.createElement("img");
    const span = document.createElement("span");
    shoppingCartBody.appendChild(div);
    div.classList.add("d-flex", "mb-2", "gap-2");
    img.setAttribute("src", mainImage.getAttribute("src"));
    p.textContent = productTitle.textContent + " x ";
    p.classList.add("d-flex", "align-items-center");
    span.textContent = input.value;
    span.classList.add("quantity");
    div.appendChild(img);
    div.appendChild(p);
    p.appendChild(span);
  };

  const checkEmpty = () => {
    if (
      shoppingCartBody.querySelector("p").textContent ===
      "- Your cart is empty. -"
    ) {
      return true;
    } else {
      return false;
    }
  };

  if (checkEmpty()) {
    shoppingCartBody.querySelector("p").remove();
    addProduct();
    itemsOnCart.items[productTitle.textContent] = input.value;
  } else if (itemsOnCart.items[productTitle.textContent]) {
    const quantity = document.querySelectorAll(".quantity");
    quantity.forEach((element) => {
      if (
        element.parentElement.textContent ===
        productTitle.textContent +
          " x " +
          itemsOnCart.items[productTitle.textContent]
      ) {
        itemsOnCart.items[productTitle.textContent] =
          parseInt(itemsOnCart.items[productTitle.textContent]) +
          parseInt(input.value);
        element.textContent = itemsOnCart.items[productTitle.textContent];
      }
    });
  } else {
    addProduct();
    itemsOnCart.items[productTitle.textContent] = input.value;
  }
});

navAvatar.addEventListener("click", () => {
  navAvatar.classList.toggle("avatar-active");
});

const makeActive = (element) => {
  const active = document.querySelectorAll(".thumb-active");
  active.forEach((element) => {
    element.classList.remove("thumb-active");
  });
  element.classList.add("thumb-active");
};
