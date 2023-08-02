function shOpenModal(event) {
  // prevent link href
  event.preventDefault();
  // set class modalOpen to modal
  document.querySelector("#setMoreModal").classList.add("modalOpen");
  let thisHREF = event.target.href;
  // set body to overflow hidden to prevent scrolling in modal
  document.body.style.overflow = "hidden";
  // set iframe src to thisHREF
  document.querySelector("#setMoreIframe").src = thisHREF;
  // Add event listener to modal
  const setMoreModal = document.querySelector("#setMoreModal");
  setMoreModal.addEventListener("click", shCloseModal, false);
}

function shCloseModal(event) {
  // prevent button default if any
  event.preventDefault();
  const setMoreModal = document.querySelector("#setMoreModal");
  // remove class modalOpen to modal
  setMoreModal.classList.remove("modalOpen");
  // remove body to overflow hidden to prevent scrolling in modal
  document.body.style.overflow = "";
}
