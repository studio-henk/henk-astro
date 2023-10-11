document.addEventListener("DOMContentLoaded", () => {
  // observe modal events
  const baseModal = document.querySelector("base-modal");

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        console.log("A child node has been added or removed.");
      } else if (mutation.type === "attributes") {
        console.log(`The ${mutation.attributeName} attribute was modified.`);
        if (mutation.attributeName === "open") {
          // check if modal has this attr now
          if (baseModal.hasAttribute("open")) {
            handleModalOpenEvent();
          }
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(baseModal, config);

  const couponInput = document.querySelector("base-modal #txt_couponcode");
  const discountButton = document.querySelector("base-modal #discountButton");
  const invalidMessageElement = document.querySelectorAll(
    "#txt_couponcode ~ .molecule-input-label__message-invalid"
  )[0];

  function handleModalOpenEvent() {
    // focus input
    couponInput.focus();
    // set change listener on input
    couponInput.addEventListener("keyup", inputChanged, false);
  }

  let couponIsValid;

  function inputChanged() {
    // noinspection TypeScriptUnresolvedReference
    let couponValidity = couponInput.validity;
    couponIsValid = couponInput.validity.valid;
    console.log("input has changed: " + couponIsValid);
    if (couponIsValid) {
      // enable button
      discountButton.removeAttribute("disabled");
    } else {
      if (!discountButton.hasAttribute("disabled")) {
        discountButton.setAttribute("disabled", "");
      }
    }
  }

  function setDiscount() {
    const totalPrice = document
      .querySelector(".cost-section__data_total")
      .innerText.replace("€", "");
    console.log(totalPrice);
    const totalPriceAsNumber = Number(totalPrice);
    const discountAmount = totalPriceAsNumber * 0.1;
    const discountTemplate = `<p class="cost-section__label"><small>Discount 10%</small></p><p class="cost-section__data"><small>€${discountAmount.toFixed(
      2
    )}</small></p>`;
    const discountedPrice = totalPrice - discountAmount;
    // cost-section_discount
    document.querySelector(".cost-section_discount base-modal").style.display =
      "none";
    document.querySelector(".cost-section_discount").innerHTML =
      discountTemplate;
  }

  // close the modal if button clicked
  if (discountButton) {
    discountButton.addEventListener("click", () => {
      // console.log('clicked');

      if (couponIsValid) {
        // const baseModal = document.querySelector('base-modal');
        baseModal.removeAttribute("open");
        // noinspection TypeScriptUnresolvedReference
        baseModal.closeModal();
        setDiscount();
      }
      // else {
      //   // check if empty or invalid entry
      //   if (couponValidity.valueMissing) {
      //     console.log("emptyyyyyy");
      //     // show error msg
      //     invalidMessageElement.style.display = 'block';
      //   }
      //   return;
      // }
    });
  }
});