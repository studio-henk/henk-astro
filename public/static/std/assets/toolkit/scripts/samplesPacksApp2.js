/**
 * samplesPacksApp2.js
 *
 * @author Nirusu | nils hendriks <info@nirusu.me>
 * @version 0.0.1
 * @date 2022-05-12 • 15:54 - CEST
 * @file Manages the Vue app for sample packs 2 the fullwidth slider
 *
 */

var samplesPacksApp2 = new Vue({
    delimiters: ['[[', ']]'],
    el: "#samples-packs-app2",
    data: {
        debug: true,
        loading: true,
        locale: "",
        hostname: "",
        packCart: [],
        appname: "samples-packs-app2",
        QuickShopModalVisible: false,
        modalData: '',
        samplesPacks: [],
    },
    methods: {
        updateCart: function (sampleData) {
            // add item to cart
            this.packCart.push(sampleData);
            // close modal
            this.hideQuickShopModal();

            // items in cart can not be selected again
            // set attribute to disabled?
            sampleData.samplePackInCart = true;

            // set packcart data to localStorage
            this.setPackCartLocalStorage();
            this.sendToOrderCart();
        },
        updateQuickShopModal: function (index, pack) {
            this.modalData = pack;
            // show modal
            this.QuickShopModalVisible = true;
            // prevent page from scrolling
            document.querySelector('body').style.overflow = "hidden";
            // add padding right to fill space of previous scrollbar
            document.querySelector('body').style.paddingRight = "15px";
        },
        hideQuickShopModal: function () {
            this.QuickShopModalVisible = false;
            // allow page to scroll again
            document.querySelector('body').style.overflow = "unset";
            document.querySelector('body').style.paddingRight = "unset";
        },
        getSampleByID(id) {
            let filteredsamples2 = this.samplesPacks

            filteredsamples2 = filteredsamples2.filter((item) => {
                return (item.id === id)
            })
            return filteredsamples2;
        },
        setPackCartLocalStorage(cartData) {
            localStorage.setItem('packCart', JSON.stringify(this.packCart));
            console.log(this.appname + ': localStorage has been set with pack cart Data');
        },
        getPackCartLocalStorage() {
            // localstorage has cart item and more than 0 items
            if ("packCart" in localStorage && localStorage.length > 0 && localStorage.getItem("packCart") !== "[]") {
                this.packCart = JSON.parse(localStorage.getItem('packCart'));
                console.log(this.appname + ': localStorage has been fetched and contains ' + this.packCart.length + ' items.');
                // we need to check which samples are in cart
                // and set their incart flag
                this.isInCart();
            } else {
                console.log(this.appname + ': no localStorage was discovered');
            }

        },
        isInCart() {
            this.packCart.forEach(item => {
                let allPacks = this.samplesPacks

                let thisPack = allPacks.filter((pack) => {
                    return (pack.id === item.id)
                })
                thisPack[0].samplePackInCart = true;
            })
        },
        clearLocalStorage() {
            localStorage.removeItem('packCart');
            console.log(this.appname + ': localStorage for packCart has been cleared');
        },
        sendToOrderCart() {
            // if (!this.hostname.includes('studio-henk.nl')) {
            //     alert('adding items only works on HENK domain, not on staging or netlify');
            //     this.clearLocalStorage();
            //     location.assign('/'+this.locale+'/cart/list/');
            // } else {
                let url = "/"+this.locale+"/cart/add?item=";
                // construct this url by loping through items in quickCart array and appending it to url
                this.packCart.forEach(item => {
                    // loop through this packs samples (products)
                    item.products.forEach(product => {
                        console.log(this.appname + ': product ID: ' + product.id);
                        // add to url
                        url += product.id+",";
                    })
                })
                // strip last pipe character from url
                url = url.slice(0, -1);
                url = url += "&qty=1&doNotRedirect=true";
                axios.get(url)
                    .then(function (response) {
                        console.log(this.appname + ': response: ' + response);
                        // clear quickCart localstorage if repsonse success
                        if (response.data.success) {
                          // show the redirected response
                          console.log('response ok');
                          this.clearLocalStorage();
                          // send to cart list page
                          location.assign('/'+this.locale+'/cart/list/');
                        }
                        if (response.status === 200 ) {
                            console.log('response 200, success');
                        }
                        if (response.status === 404 ) {
                            console.log('response 404');
                        }
                        if (response.status === 301 || response.status === 302) {
                          // show the redirecting response
                          console.log('response NOT ok: 301 or 302');
                        }
                    }.bind(this))
                    .catch(function (error) {
                        if (error.response) {
                          // The request was made and the server responded with a status code
                          // that falls out of the range of 2xx
                          console.log(error.response.data);
                          console.log(error.response.status);
                          console.log(error.response.headers);
                        } else if (error.request) {
                          // The request was made but no response was received
                          console.log('no response received');
                        } else {
                          // Something happened in setting up the request that triggered an Error
                          console.log('Error', error.message);
                        }
                        console.log(error.toJSON());
                    });
            // }
        },
        loadData() {
            const root = document.querySelector("html");
            const rootLang = root.getAttribute("lang");
            this.locale = rootLang;
            // set url according to domain name ie localhost or preprop or studio-henk
            const hostname = location.hostname;
            this.hostname = hostname; // set flag for later use

            // if (!hostname.includes('studio-henk.nl')) {
            //     console.log(this.appname + ': hostname does not include studio-henk.nl');
            //     // netlify version
            //     // @todo: both 1070 and main
            //     url = "/"+rootLang+"/get-sample-product";
            // } else {
                console.log(this.appname + ': hostname includes studio-henk.nl');
                // set url according to locale (NL or EN in lowercase)
                url = "/"+rootLang+"/get-sample-product";
            // }
            // load data
            this.loading = true;
            axios
                .get(url)
                .then(response => {
                    if (response.status === 200) {
                        console.log('response for GET onload is success');
                        this.samplesPacks = response.data["sample-packs"]
                        this.loading = false;
                        // get items already in quickCart
                        this.getPackCartLocalStorage();
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
        packCartItemsCount: function () {
            console.log('Items in PackCart: ' + this.packCart.length);
            return this.packCart.length;
        }
    },
    created() {
        console.group(this.appname + " group");
        this.loadData();
    },
    mounted() {
        this.$nextTick(function () {
            // Code that will run only after the
            // entire view has been rendered
            //console.log('packs in total: ' + this.samplesPacks.length);
        });
        console.log('%c' + this.appname + ': mounted', "color: yellow; font-style: italic; background-color: blue;padding: 2px");
    }
});
console.groupEnd();