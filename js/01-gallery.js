import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

gallery.addEventListener("click", openGalleryItemInModal);

initializationOfGalleryMarkup(createGalleryMarkup(galleryItems));

function createElementOfMarkup(Item) {
  const { preview, original, description } = Item;

  return `<div class="gallery__item">
             <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
             </a>
          </div>`;
}

function createGalleryMarkup(galleryMarkupItems) {
  const galleryMarkup = galleryMarkupItems
    .map((galleryItem) => createElementOfMarkup(galleryItem))
    .join("");

  return galleryMarkup;
}

function initializationOfGalleryMarkup(markup) {
  gallery.insertAdjacentHTML("beforeend", markup);
}

function openGalleryItemInModal(Event) {
  Event.preventDefault();

  const instance = basicLightbox.create(
    `<img src="${Event.target.dataset.source}">`
  );

  instance.show();

  window.addEventListener("keydown", modalClose);

  function modalClose({ code }) {
    const escKeyCode = "Escape";

    if (code === escKeyCode) {
      window.removeEventListener("keydown", modalClose);
      onEscKeyDown();
    }
  }

  function onEscKeyDown() {
    instance.close();
  }
}
