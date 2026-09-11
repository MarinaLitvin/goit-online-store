import { refs } from "./refs.js";

function handleEscape(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

export function openModal() {
  refs.modal.classList.add("modal--is-open");

  document.addEventListener("keydown", handleEscape);
}

export function closeModal() {
  refs.modal.classList.remove("modal--is-open");

  document.removeEventListener("keydown", handleEscape);
}