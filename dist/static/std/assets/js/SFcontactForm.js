const app = {
  delimiters: ["[[", "]]"],
  data() {
    return {
      appName: "appContactFormVue",
      locale: "",
      returnURL: "/thank-you",
      loading: true,
      errored: false,
      selectedCategory: "Producten",
      selectedReason: "Geen reden",
      subject: "Geen reden",
      emailError: false,
      emailFieldErrorMessage: "",
      nameError: false,
      nameErrorMessage: "",
      caseSelectError: false,
      caseSelectErrorMessage: "",
      reasonSelectError: false,
      reasonSelectErrorMessage: "",
      emailValid: null,
      recaptchaError: false,
      recaptchaErrorMessage: "",
    };
  },
  methods: {
    categoryChanged() {
      this.selectedReason = "Geen reden";
      this.reasonChanged();
    },
    reasonChanged() {
      this.subject = this.selectedReason;
    },
    onSubmit(event) {

      event.preventDefault();
      const trimmedEmail = this.$refs.email.value.trim();
      const trimmedName = this.$refs.name.value.trim();

      if (
          !trimmedName ||
          !this.$refs.email.validity.valid ||
          !this.$refs['reasonSelectElement'].validity.valid ||
          !this.$refs['caseSelectElement'].validity.valid ||
          grecaptcha.getResponse() === "") {
        // console.log('something not valid : ' + grecaptcha.getResponse());

        this.showError(trimmedEmail, trimmedName);
        event.preventDefault();
        // console.log('Form submit prevented');
      }
    },
    emailInput() {
      // Trim email value before validation
      const trimmedEmail = this.$refs.email.value.trim();

      if (this.$refs.email.validity.valid) {
        this.hideError();
      } else {
        this.showError(trimmedEmail, this.$refs.name.value);
      }

      this.emailValid = this.$refs.email.validity.valid;
    },
    showError(trimmedEmail, trimmedName) {
      /* email field */
      if (this.$refs.email.validity.tooShort && trimmedEmail.length < this.$refs.email.minLength) {
        this.emailFieldErrorMessage = this.locale === 'nl' ? `Email-adres dient minstens ${this.$refs.email.minLength} tekens te bevatten; Nu slechts ${trimmedEmail.length}.` : `Email should be at least ${this.$refs.email.minLength} characters; you entered ${trimmedEmail.length}.`;
        this.emailError = true;
      } else if (!this.$refs.email.validity.valid) {
        this.emailFieldErrorMessage = this.locale === 'nl' ? "Vul een e-mailadres in." : "You need to enter an email address.";
        this.emailError = true;
      } else {
        this.emailFieldErrorMessage = "";
        this.emailError = false;
      }

      /* recaptcha */
      if (grecaptcha.getResponse() === "") {
        this.recaptchaErrorMessage = this.locale === 'nl' ? "Graag bewijzen dat u een mens bent!" : "Please prove you are a human!";
        this.recaptchaError = true;
      } else {
        this.recaptchaErrorMessage = "";
        this.recaptchaError = false;
      }

      /* name field */
      if (!trimmedName) {
        this.nameErrorMessage = this.locale === 'nl' ? "Vul hier uw naam in AUB." : "Please enter your name.";
        this.nameError = true;
      } else {
        this.nameErrorMessage = "";
        this.nameError = false;
      }

      /* case select dropdown */
      if (!this.$refs['caseSelectElement'].validity.valid) {
        this.caseSelectErrorMessage = this.locale === 'nl' ? "U dient een optie uit de lijst te kiezen." : "Please pick an option from the list.";
        this.caseSelectError = true;
      } else {
        this.caseSelectErrorMessage = "";
        this.caseSelectError = false;
      }

      /* reason select dropdown */
      if (!this.$refs['reasonSelectElement'].validity.valid) {
        this.reasonSelectErrorMessage = this.locale === 'nl' ? "U dient een optie uit de lijst te kiezen." : "Please pick an option from the list.";
        this.reasonSelectError = true;
      } else {
        this.reasonSelectErrorMessage = "";
        this.reasonSelectError = false;
      }

    },
    hideError() {
      this.emailFieldErrorMessage = "";
    },
  },
  created() {
    // console.log(this.appName + " created");
  },
  mounted() {
    // Find all elements with the class 'hide-if-no-js'
    const elements = document.querySelectorAll('.hide-if-no-js');

    // Remove the 'hide-if-no-js' class from each element
    elements.forEach(element => {
      element.classList.remove('hide-if-no-js');
    });

    // console.log(this.appName + " mounted");
    this.locale = this.$refs.sf_form.getAttribute('data-locale');
    this.$refs.sf_form.setAttribute("novalidate", "novalidate");
    this.$refs.email.removeAttribute("pattern");
    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been rendered
      this.loading = false;
    });
  },
};

Vue.createApp(app).mount("#app-vue-contact-form");