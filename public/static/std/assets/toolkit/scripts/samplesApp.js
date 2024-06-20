/**
 * samplesApp.js
 *
 * @author Nirusu | nils hendriks <info@nirusu.me>
 * @version 0.0.1
 * @date 2022-05-12 • 15:54 - CEST
 * @file Manages the Vue app for samples
 *
 * @todo check function toggleCartStatus, IDE says it is unused
 * @todo check unused parameter cartData
 * @todo check unused prop modalSampleID
 */

var app = new Vue({
  delimiters: ['[[', ']]'],
  el: "#samplesApp",
  data: {
    appname: "samples-app",
    debug: false,
    errored: false,
    loading: true,
    locale: "",
    hostname: "",
    filtersApplied: false,
    filterIsOpen: false,
    filterGroupColorIsExpanded: true,
    filterGroupMaterialIsExpanded: false,
    filterGroupStructureIsExpanded: false,
    filterGroupOutdoorIsExpanded: true,
    checkedColors: [],
    checkedMats: [],
    checkedStructures: [],
    checkedOutdoor: false,
    filtersChecked: false,
    numSamplesShown: 13,
    cart: [],
    quickCart: [],
    QuickShopModalVisible: false,
    quickCartIsOpen: false,
    cartIsExpanded: false,
    selectedVariant: 2,
    modalData: '',
    filterColors: [],
    filterColorsLabelsNL: [
      "Zwart",
      "Wit",
      "Beige",
      "Bruin",
      "Licht Bruin",
      "Grijs",
      "Licht Grijs",
      "Groen",
      "Licht Groen",
      "Donker Groen",
      "Blauw",
      "Licht Blauw",
      "Donker Blauw",
      "Rood",
      "Oranje",
      "Roze",
      "Geel"
    ],
    filterMaterials: [],
    filterMaterialsLabelsNL: [
      "Eiken",
      "Walnoot",
      "HPL",
      "Iroko",
      "Wol",
      "Recycled wol",
      "Katoen",
      "Rec. katoen",
      "Recycled PET",
      "Synthetisch",
      "Rec. synthetisch",
      "Hennep"
    ],
    filterStructures: [],
    filterStructuresLabelsNL: [
      "Grof geweven",
      "Fijn geweven",
      "Fluweel",
      "Teddy"
    ],
    samples: [],
  },
  methods: {
    fixSamples: function () {
      // console.log('fixing samples...');
      this.samples.forEach(item => {
        // check for structure data
        // fix them if false
        if (Array.isArray(item.structure) === false) {
          item.structure = [];
        }
      })
    },
    updateCart: function (sampleData) {
      // add item to cart
      this.quickCart.push(sampleData);
      // close modal
      this.hideQuickShopModal();
      this.quickCartIsOpen = true;

      // items in cart can not be selected again
      // set attribute to disabled?
      sampleData.sampleInCart = true;

      // set cart data to localStorage
      this.setCartLocalStorage();
    },
    removeFromCart: function (index, sampleData, id) {
      this.quickCart.splice(index, 1);

      // set incart flag of this sample
      const thisSampleData = this.getSampleByID(id);
      thisSampleData[0].sampleInCart = false;

      this.setCartLocalStorage();

      // if cart empty hide cart
      // if (this.quickCartItemsCount < 1) {
      //     this.quickCartIsOpen = false;
      // } else {
      //     this.quickCartIsOpen = true;
      // }
      // shorter notation: set quickcartisopen to true if count 1 or more
      this.quickCartIsOpen = this.quickCartItemsCount >= 1;
    },
    updateQuickShopModal: function (index, sample) {
      this.selectedVariant = index;
      this.modalData = sample;
      // show modal
      this.QuickShopModalVisible = true;
      // prevent page from scrolling
      document.querySelector('body').style.overflow = "hidden";
    },
    hideQuickShopModal: function () {
      this.QuickShopModalVisible = false;
      // allow page to scroll again
      document.querySelector('body').style.overflow = "unset";
    },
    toggleCartCollapse() {
      this.cartIsExpanded = !this.cartIsExpanded;
    },
    toggleColorCollapse() {
      this.filterGroupColorIsExpanded = !this.filterGroupColorIsExpanded;
    },
    toggleMaterialCollapse() {
      this.filterGroupMaterialIsExpanded = !this.filterGroupMaterialIsExpanded;
    },
    toggleStructureCollapse() {
      this.filterGroupStructureIsExpanded = !this.filterGroupStructureIsExpanded;
    },
    showFilter() {
      this.filterIsOpen = true;
      document.querySelector('body').style.overflow = "hidden";
    },
    closeFilter() {
      this.filterIsOpen = false;
      document.querySelector('body').style.overflow = "unset";
    },
    clearFilter() {
      // reset all filters
      this.checkedColors = [];
      this.checkedMats = [];
      this.checkedStructures = [];
      this.checkedOutdoor = false;
      this.closeFilter();
    },
    filteredSamplesByGroupAndFilter3(groupName) {
      let unfilteredsamples = this.samples;
      // color filters
      let colorFilterNum = this.checkedColors.length;
      // material filter
      let matsFilterNum = this.checkedMats.length;
      // structure filter
      let structuresFilterNum = this.checkedStructures.length;
      // outdoor filter, true or false
      // @todo change to sustainable
      let outdoorFilter = this.checkedOutdoor;

      return unfilteredsamples.filter((item) => {
        // no filter
        if (colorFilterNum < 1 && matsFilterNum < 1 && structuresFilterNum < 1 && outdoorFilter === false) {
          return item.sampleGroup === groupName;
        }
        // color filter only
        else if (colorFilterNum > 0 && matsFilterNum < 1 && structuresFilterNum < 1) {
          if (outdoorFilter === false) {
            // console.log('color only and also outdoor all')
            return item.sampleGroup === groupName && (this.checkedColors.filter(element => item.colorGroup.includes(element)).length > 0);
          } else {
            // console.log('color and outdoor true only')
            return item.sampleGroup === groupName && (this.checkedColors.filter(element => item.colorGroup.includes(element)).length > 0 && item.sustainable === true);
          }
        }
        // mat filter only
        else if (colorFilterNum < 1 && matsFilterNum > 0 && structuresFilterNum < 1) {
          if (outdoorFilter === false) {
            // console.log('mats only and also outdoor false and true')
            return item.sampleGroup === groupName && (this.checkedMats.filter(element => item.typeOfMaterial.includes(element)).length > 0);
          } else {
            // console.log('mats only and also outdoor true only')
            return item.sampleGroup === groupName && (this.checkedMats.filter(element => item.typeOfMaterial.includes(element)).length > 0 && item.sustainable === true);
          }
        }
        // structure filter only
        else if (structuresFilterNum > 0 && colorFilterNum < 1 && matsFilterNum < 1) {
          // console.log(structuresFilterNum);
          if (outdoorFilter === false) {
            console.log('STRUCTURES FILTER only')
            return item.sampleGroup === groupName && (this.checkedStructures.filter(element => item.structure.includes(element)).length > 0);
          } else {
            // console.log('mats only and also outdoor true only')
            return item.sampleGroup === groupName && (this.checkedStructures.filter(element => item.structure.includes(element)).length > 0 && item.sustainable === true);
          }
        }
        // outdoor filter only
        else if (outdoorFilter === true && colorFilterNum < 1 && matsFilterNum < 1 && structuresFilterNum < 1) {
          // console.log('outdoor only');
          return item.sampleGroup === groupName && item.sustainable === true;
        }
        // color filter and mat filter
        else if (colorFilterNum > 0 && matsFilterNum > 0 && structuresFilterNum < 1) {
          // console.log('color AND material');
          if (outdoorFilter === false) {
            // console.log('color and mats, outdoor false and true')
            return item.sampleGroup === groupName && (this.checkedColors.filter(element => item.colorGroup.includes(element)).length > 0 && this.checkedMats.filter(element => item.typeOfMaterial.includes(element)).length > 0);
          } else {
            // console.log('color and mats, outdoor true')
            return item.sampleGroup === groupName && (this.checkedColors.filter(element => item.colorGroup.includes(element)).length > 0 && this.checkedMats.filter(element => item.typeOfMaterial.includes(element)).length > 0) && item.sustainable === true;
          }
        }
        // color AND structure
        else if (colorFilterNum > 0 && matsFilterNum < 1 && structuresFilterNum > 0) {
          // console.log('color AND structure');
          if (outdoorFilter === false) {
            // console.log('color and mats, outdoor false and true')
            return item.sampleGroup === groupName && (this.checkedColors.filter(element => item.colorGroup.includes(element)).length > 0 && this.checkedStructures.filter(element => item.structure.includes(element)).length > 0);
          } else {
            // console.log('color and mats, outdoor true')
            return item.sampleGroup === groupName && (this.checkedColors.filter(element => item.colorGroup.includes(element)).length > 0 && this.checkedStructures.filter(element => item.structure.includes(element)).length > 0) && item.sustainable === true;
          }
        }
        // material AND structure
        else if (colorFilterNum < 1 && matsFilterNum > 0 && structuresFilterNum > 0) {
          // console.log('material AND structure');
          if (outdoorFilter === false) {
            // console.log('color and mats, outdoor false and true')
            return item.sampleGroup === groupName && (this.checkedMats.filter(element => item.typeOfMaterial.includes(element)).length > 0 && this.checkedStructures.filter(element => item.structure.includes(element)).length > 0);
          } else {
            // console.log('color and mats, outdoor true')
            return item.sampleGroup === groupName && (this.checkedMats.filter(element => item.typeOfMaterial.includes(element)).length > 0 && this.checkedStructures.filter(element => item.structure.includes(element)).length > 0) && item.sustainable === true;
          }
        }
        // color AND material AND structures
        else if (colorFilterNum > 0 || matsFilterNum > 0 || structuresFilterNum > 0) {
          // console.log('color AND material AND structure');
          if (outdoorFilter === false) {
            // console.log('color and mats, outdoor false and true')
            return item.sampleGroup === groupName && (this.checkedColors.filter(element => item.colorGroup.includes(element)).length > 0 && this.checkedMats.filter(element => item.typeOfMaterial.includes(element)).length > 0 && this.checkedStructures.filter(element => item.structure.includes(element)).length > 0);
          } else {
            // console.log('color and mats, outdoor true')
            return item.sampleGroup === groupName && (this.checkedColors.filter(element => item.colorGroup.includes(element)).length > 0 && this.checkedMats.filter(element => item.typeOfMaterial.includes(element)).length > 0 && this.checkedStructures.filter(element => item.structure.includes(element)).length > 0) && item.sustainable === true;
          }
        }

      });
    },
    getSampleByID(id) {
      let filteredsamples2 = this.samples

      filteredsamples2 = filteredsamples2.filter((item) => {
        return (item.id === id)
      })
      return filteredsamples2;
    },
    setCartLocalStorage(cartData) {
      localStorage.setItem('quickCart', JSON.stringify(this.quickCart));
      console.log('localStorage has been set with cartData');
    },
    getCartLocalStorage() {
      // localstorage has cart item and more than 0 items
      if ("quickCart" in localStorage && localStorage.length > 0 && localStorage.getItem("quickCart") !== "[]") {
        this.quickCart = JSON.parse(localStorage.getItem('quickCart'));
        console.log('localStorage has been fetched and contains ' + this.quickCart.length + ' items.');
        this.quickCartIsOpen = true;
        // we need to check which samples are in cart
        // and set their incart flag
        this.isInCart();
      } else {
        console.log('no localStorage was discovered');
        this.quickCartIsOpen = false;
      }

    },
    clearLocalStorage() {
      localStorage.removeItem('quickCart');
      console.log('localStorage for quickCart has been cleared');
    },
    isInCart() {
      this.quickCart.forEach(item => {
        const sampleInCartData = this.getSampleByID(item.id);
        sampleInCartData[0].sampleInCart = true;
      })

    },
    sendToOrderCart() {
      // if (!this.hostname.includes('studio-henk.nl')) {
      //     console.log('host not henk');
      //     alert('adding items only works on HENK domain');
      // } else {
      // let url = "/en/cart/add?item=";
      let url = "/" + this.locale + "/cart/add?item=";
      // construct this url by loping through items in quickCart array and appending it to url
      this.quickCart.forEach(item => {
        // add to url
        url += item.id + ",";
      })
      // strip last pipe character from url
      url = url.slice(0, -1);
      url = url += "&qty=1&doNotRedirect=true";
      //alert(url);

      axios.get(url)
        .then(function (response) {
          console.log(response);
          // clear quickCart localstorage if repsonse success
          if (response.data.success) {
            // show the redirected response
            console.log('response ok');
            this.clearLocalStorage();
            // send to cart list page
            // location.assign('/en/cart/list/');
            location.assign('/' + this.locale + '/cart/list/');
          }
          if (response.status === 200) {
            console.log('response 200, success');
          }
          if (response.status === 404) {
            console.log('response 404');
          }
          if (response.status === 301 || response.status === 302) {
            // show the redirecting response
            console.log('response NOT ok: 301 or 302');
          }
        }.bind(this))
        .catch(function (error) {
          // console.log(error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // console.log(error.request);
            console.log('no response received');
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          // console.log(error.config);
          console.log(error.toJSON());
        });
      // }
    },
    getFilterColorNameStripped(filterColor) {
      // filterColor names can contain spaces
      // CSS variables can not contain spaces
      // So strip the spaces from the names
      // .replace(/\s/g, '');
      let strippedFilterColor = filterColor.replace(/\s/g, '');
      return strippedFilterColor;
    },
    pricingAsStrings(currency) {
      let newNum = Number(currency);
      // convert to string with 2 decimals
      if (Number.isInteger(newNum)) {
        // console.log('integer: ' + newNum);
        newNum = newNum.toFixed(0);
      } else {
        newNum = newNum.toFixed(2);
      }
      if (this.locale === 'nl') {
        newNum = newNum.replace(/\./g, ",");
      }
      return newNum;
    },
    loadDataLocal() {
      // Assuming your JSON file is named sample-data.json
      const sampleDataUrl = 'public/data/get-sample-product.json';

      // Load data from the JSON file using fetch
      fetch(sampleDataUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the JSON response
        })
        .then(data => {
          // Update samples data property with the loaded data
          this.samples = data["sample-products"];
          this.filterColors = data.filters.fabricColors;
          this.filterMaterials = data.filters.materials;
          this.filterStructures = data.filters.fabricStructure;
          this.loading = false;
          // NProgress.done();
          this.fixSamples();
          // get items already in quickCart
          this.getCartLocalStorage();
        })
        .catch(error => {
          console.error('There was a problem fetching the data:', error);
          this.errored = true; // Set errored flag if there's an error
        });
    },
    loadData() {
      const root = document.querySelector("html");
      const rootLang = root.getAttribute("lang");
      this.locale = rootLang;
      // set url according to domain name ie localhost or preprop or studio-henk
      const hostname = location.hostname;
      this.hostname = hostname; // set flag for later use

      // if (!hostname.includes('studio-henk.nl')) {
      //     console.log('hostname does not include studio-henk');
      //     // netlify version
      //     // @todo: both 1070 and main
      //     url = "/"+rootLang+"/get-sample-product";
      // } else {
      console.log('hostname includes studio-henk');
      // set url according to locale (NL or EN in lowercase)
      url = "/" + rootLang + "/get-sample-product";
      // }
      // load data
      // NProgress.configure({ parent: '.samples__canvas' });
      this.loading = true;
      axios
        .get(url)
        .then(response => {
          if (response.status === 200) {
            console.log('response for GET onload is success');
            this.samples = response.data["sample-products"]
            this.filterColors = response.data.filters.fabricColors
            this.filterMaterials = response.data.filters.materials
            this.filterStructures = response.data.filters.fabricStructure
            this.loading = false;
            // NProgress.done();
            this.fixSamples();
            // get items already in quickCart
            this.getCartLocalStorage();
          } else {
            console.log('response is an EPIC fail');
            this.errored = true
          }
        })
        .catch(error => {
          console.log('error: ' + error)
          this.errored = true
        })
    }
  },
  computed: {
    modalImage: function () {
      return this.modalData.imageMedium;
    },
    modalsampleID: function () {
      return this.modalData.id;
    },
    modalsampleData: function () {
      return this.modalData;
    },
    calcCartTotal: function () {
      const cartPrices = [];
      this.quickCart.forEach(
        item => cartPrices.push(parseFloat(item.price))
      );
      return cartPrices.reduce((a, b) => a + b, 0);
    },
    quickCartItemsCount: function () {
      return this.quickCart.length;
    },
    cartItemsCount: function () {
      return this.cart.length;
    },
    numResults() {
      let woodsamplesNum = this.filteredSamplesByGroupAndFilter3('Wood').length;
      let hplsamplesNum = this.filteredSamplesByGroupAndFilter3('HPL').length;
      let fabricsamplesNum = this.filteredSamplesByGroupAndFilter3('Fabric').length;
      this.numSamplesShown = woodsamplesNum + hplsamplesNum + fabricsamplesNum;
      return woodsamplesNum + hplsamplesNum + fabricsamplesNum;
    },
    numOfCheckedFilters() {
      if (this.checkedOutdoor === true) {
        return this.checkedColors.length + this.checkedMats.length + this.checkedStructures.length + 1;
      } else {
        return this.checkedColors.length + this.checkedMats.length + this.checkedStructures.length;
      }
    },
    checkFilters() {
      // color filters
      let colorFilterNum = this.checkedColors.length;
      // material filter
      let matsFilterNum = this.checkedMats.length;
      // structure filter
      let structuresFilterNum = this.checkedStructures.length;
      // outdoor filter, true or false
      let outdoorFilter = this.checkedOutdoor;

      // filters array
      // let filters = [{ "color": colorFilterNum }, { "materials": matsFilterNum }, { "structures": structuresFilterNum}, {"outdoor": outdoorFilter}];
      let filters = [{ "color": this.checkedColors }, { "materials": this.checkedMats }, { "structures": this.checkedStructures }, { "outdoor": this.checkedOutdoor }];

      // check if any is checked
      if (colorFilterNum > 0 || matsFilterNum > 0 || structuresFilterNum > 0 || outdoorFilter === true) {
        this.filtersChecked = true;
      } else {
        this.filtersChecked = false;
      }
      return this.filtersChecked;
    }
  },
  created() {
    console.log('app created');
    // this.loadData();
    this.loadDataLocal();

  },
  mounted() {
    // this.$nextTick(function () {
    //     // Code that will run only after the
    //     // entire view has been rendered
    // });
    console.log('app mounted');
  }
});