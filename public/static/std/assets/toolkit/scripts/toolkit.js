/******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/ 		if(installedModules[moduleId])
        /******/ 			return installedModules[moduleId].exports;
        /******/
        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = installedModules[moduleId] = {
            /******/ 			exports: {},
            /******/ 			id: moduleId,
            /******/ 			loaded: false
            /******/ 		};
        /******/
        /******/ 		// Execute the module function
        /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Flag the module as loaded
        /******/ 		module.loaded = true;
        /******/
        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(0);
    /******/ })
/************************************************************************/
/******/ ([
    /* 0 */
    /***/ (function(module, exports, __webpack_require__) {

        /**
         *  SCRIPTS USED WHEN VIEWING TOOLKIT
         */

            // Helpers
        var isMobileLayout = __webpack_require__(16);

        /* ALL COMPONENTS */
        var mainNavigation = __webpack_require__(2);
        var Collapser = __webpack_require__(3);
        var filterMobile = __webpack_require__(4);
        var chooseCard = __webpack_require__(5);
        var toggleSelector = __webpack_require__(6);
        var radioMenu = __webpack_require__(7);
        var modal = __webpack_require__(8);
        var slickSlider = __webpack_require__(9);
        var qtyPlus = __webpack_require__(10);
        var sizeMenu = __webpack_require__(11);
        var autoCollapser = __webpack_require__(12);
        var quickCart = __webpack_require__(14);
        var popover = __webpack_require__(13);
        var imageZoom = __webpack_require__(15);
        // var brandCarousel = require('./components/global/brandCarousel.js');
        // var Counters = require('./components/global/counters.js');
        // var Maps = require('./components/global/maps.js');


        // Cookie notice
        // var handleCookies = require('./helpers/02_handleCookies.js');
        // handleCookies();

        svg4everybody();

        $(function () {
            $('#form-newsletter').parsley();
        });

        /* LOAD THEM */
        mainNavigation();
        filterMobile();
        isMobileLayout();
        Collapser();
        chooseCard();
        toggleSelector();
        radioMenu();
        sizeMenu();
        slickSlider();
        qtyPlus();
        modal();
        autoCollapser();
        quickCart();
        popover();
        imageZoom();

        /***/ }),
    /* 1 */,
    /* 2 */
    /***/ (function(module, exports) {

        function mainNavigation() {

            $(document).ready(function () {

                "use strict";

                var MOBILE_OPEN = 'mobile-dropdown-open';

                var screenSize = $(window).innerWidth();
                $(window).resize(function () {
                    screenSize = $(window).innerWidth();
                    if (screenSize > 992) {
                        $('.main-nav__item--with-dropdown').each(function () {
                            $(this).removeClass(MOBILE_OPEN);
                            $(this).find('.sub-nav').css('height', 'auto');
                        });
                        $('html').removeClass('nav-open');
                        $('.main-nav').removeClass('open');
                        $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').removeClass('open');
                    } else {
                        $('.main-nav__item--with-dropdown').each(function () {
                            //$(this).find('.sub-nav').css('height', 0);
                        });
                    }
                    return screenSize;
                });

                $('.main-nav__item--with-dropdown').click(function () {
                    if (screenSize < 993) {
                        var self = $(this);
                        var sub_nav = $(this).find('.sub-nav');
                        self.toggleClass(MOBILE_OPEN);
                        if (!self.hasClass(MOBILE_OPEN)) {
                            $(this).find('.sub-nav').animate({
                                height: 0
                            }, 400);
                        } else {
                            sub_nav.animate({
                                height: sub_nav[0].scrollHeight
                            }, 400, function () {
                                sub_nav.height('auto');
                            });
                        }
                    }
                });

                $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function () {
                    $(this).toggleClass('open');
                    $('html').toggleClass('nav-open');
                    $('.main-nav').toggleClass('open');
                });
            });
        }

        module.exports = mainNavigation;

        /***/ }),
    /* 3 */
    /***/ (function(module, exports) {

        function Collapser() {

            "use strict";

            var COLLAPSER_TRIGGER = '.js-collapser-trigger',
                COLLAPSER_EXPANDED = 'collapser--expanded';

            // window.removeEventListener('optimizedResize', showHideElements);
            // window.addEventListener('optimizedResize', showHideElements);

            showHideElements();
            $(COLLAPSER_TRIGGER).off('click', onClick);
            $(COLLAPSER_TRIGGER).on('click', onClick);

            function onClick(event) {
                if($(this).hasClass('off-event')){
                    return false;
                }

                // toggle expanded class
                $(this).toggleClass(COLLAPSER_EXPANDED);

                // if collapser data attribute is set then also toggle expanded class on that target
                var $collapser = $('#' + this.getAttribute('data-target'));

                if ($collapser.length) {

                    $collapser.height($collapser[0].scrollHeight);
                    $collapser.toggleClass(COLLAPSER_EXPANDED);

                    if (!$collapser.hasClass(COLLAPSER_EXPANDED)) {

                        $collapser.animate({
                            height: 0
                        }, 400);
                    } else {

                        $collapser.height(0);

                        $collapser.animate({
                            height: $collapser[0].scrollHeight
                        }, 400, function () {
                            $collapser.height('auto');
                        });
                    }
                }

                // check to see if it's part of an accordion and collapse all other trigger elements with the same accordion value
                var _this = this;

                $('.' + COLLAPSER_EXPANDED + '[data-accordion=' + this.getAttribute('data-accordion') + ']').each(function (index) {
                    if (_this != this) {
                        // remove expanded class
                        $(this).removeClass(COLLAPSER_EXPANDED);

                        // if collapser data attribute is set then also remove expanded class on that
                        var $collapser2 = $('#' + this.getAttribute('data-target'));
                        $collapser2.removeClass(COLLAPSER_EXPANDED);
                        $collapser2.animate({
                            height: 0
                        }, 400);
                    }
                });
            }

            function showHideElements() {
                $(COLLAPSER_TRIGGER).each(function (i) {
                    // hide collapser if not needed
                    showHideElement(this);
                });
            }

            function showHideElement(element) {
                var $item = $('#' + element.getAttribute('data-target'));

                if ($item.length) {
                    var minHeight = parseInt($item.css('min-height'), 10);
                    var $prevElement = $(element).prev();

                    if (minHeight != 0 && $item[0].scrollHeight <= minHeight + 2) {
                        $(element).hide();
                    } else {
                        $(element).show();
                    }
                }
            }
        }

        module.exports = Collapser;

        /***/ }),
    /* 4 */
    /***/ (function(module, exports) {

        function filterMobile() {

            if (window.innerWidth < 768) {
                $(".filter__btn").on('click', function () {
                    $(this).toggleClass('filter-open');
                });
            } else {
                $(".filter__btn").on('click', function () {
                    Event.preventDefault();
                });
            }
        }

        module.exports = filterMobile;

        /***/ }),
    /* 5 */
    /***/ (function(module, exports) {

        function chooseCard() {

            "use strict";

            var CHOOSECARD = '.choose-cards__item',
                FABRICCHOOSECARD = '.fabric-module__thumbs--item',
                ACTIVE_CHOOSECARD = 'choose-cards__active',
                SELECTOR_BAR = '.selector__bar',
                ZOOMIMAGE = '#fabric-module-zoom',
                ZOOMIMAGEBACKUP = '#fabric-module-zoom-backup',
                FABRICMODULE = '#fabric-module',
                FABRICMODULE_THUMBS = '.fabric-module__thumbs',
                FABRICTITLE = '.fabic-module__thumbs--title';

            function loadBackgroundFirst(url) {
                $('.fabric-module__image--loader').fadeIn();
                $(ZOOMIMAGE).imagesLoaded({ background: true }).done(function (instance) {
                    $('.fabric-module__image--loader').hide();
                    $(ZOOMIMAGE).fadeTo(96, 1, function () {
                        $(ZOOMIMAGEBACKUP).css("background-image", "url(" + url + ")");
                        $(ZOOMIMAGE).css("opacity", 0);
                    });
                });
            }

            $(CHOOSECARD).on('click', onClick);

            function onClick(event) {
                if ($(event.target).hasClass('icon-info') || $(event.target).parent().hasClass('icon-info')) {
                    return false;
                }
                if ($(event.target).hasClass('choose-cards__item--more') || $(event.target).parent().hasClass('choose-cards__item--more')) {

                    // IF CLICKED ON RESIZE ICON
                    var $tempTarget = $(this).data('target'),
                        $newUrl = $tempTarget,
                        $collection = $(this).data('collection'),
                        $collectionValue = $collection.replace(/\-/g, ' '),
                        //$createTitle = $tempTarget.replace(/\-/g, ' ');
                        $createTitle = $(this).data('title');
                    $(ZOOMIMAGE).css("background-image", "url(" + $newUrl + ")");
                    loadBackgroundFirst($newUrl);
                    $(FABRICMODULE).modal("show");
                    $('#fabric-module .selector__bar--value span:first-of-type').html($collectionValue);
                    $('#' + $collection).prop('checked', true);
                    $('input[data-codeid="'+$collection+'"]').prop('checked', true);
                    $(FABRICMODULE_THUMBS + '[data-targetgroup="fabric-module-collection"]').each(function (index) {
                        $(this).hide();
                    });
                    $(FABRICMODULE_THUMBS + '[data-target=' + $collection + ']').each(function (index) {
                        $(this).show();
                    });
                    $(CHOOSECARD + '[data-targetgroup="fabric-module-card"]').each(function (index) {
                        $(this).removeClass(ACTIVE_CHOOSECARD);
                    });
                    $(FABRICCHOOSECARD + '[data-target="' + this.getAttribute('data-target') + '"]').each(function (index) {
                        $(this).addClass(ACTIVE_CHOOSECARD);
                    });
                    $(FABRICTITLE).html($createTitle);
                    // DON'T CHANGE CHOOSECARD ACTIVE STATE
                    return false;
                }
                var $cardValue = this.getAttribute('data-label');
                $(CHOOSECARD + '[data-targetgroup=' + this.getAttribute('data-targetgroup') + ']').each(function (index) {
                    $(this).removeClass(ACTIVE_CHOOSECARD);
                });
                $(SELECTOR_BAR + '[data-target=' + this.getAttribute('data-targetgroup') + ']').each(function (index) {
                    $(this).find('.selector__bar--value span:first-of-type').html($cardValue);
                });
                $(this).toggleClass(ACTIVE_CHOOSECARD);

                if (typeof applyProductSelection !== 'undefined' && typeof applyProductSelection === 'function') {
                    applyProductSelection(this);
                }
            }
        }

        module.exports = chooseCard;

        /***/ }),
    /* 6 */
    /***/ (function(module, exports) {

        function toggleSelector() {

            "use strict";

            var TOGGLE_BTN = '.toggle-js',
                TOGGLE_ACTIVE = 'toggle-active',
                TOGGLE_CONTAINER = '.toggle-container',
                TOGGLE_CONTAINER_EXPANDED = 'toggle-container--expanded';

            $(TOGGLE_BTN).on('click', onClick);

            function onClick(event) {
                $(TOGGLE_BTN + '[data-togglegroup=' + this.getAttribute('data-togglegroup') + ']').each(function (index) {
                    $(this).removeClass(TOGGLE_ACTIVE);
                });
                $(TOGGLE_CONTAINER + '[data-togglegroup=' + this.getAttribute('data-togglegroup') + ']').each(function (index) {
                    if ($(this).hasClass('no-animation')) {
                        $(this).hide();
                    } else {
                        $(this).slideUp();
                    }
                    $(this).removeClass(TOGGLE_CONTAINER_EXPANDED);
                });
                $(TOGGLE_CONTAINER + '[data-toggle=' + this.getAttribute('data-toggle') + ']').each(function (index) {
                    if ($(this).hasClass('no-animation')) {
                        $(this).show();
                    } else {
                        $(this).slideDown();
                    }
                    $(this).addClass(TOGGLE_CONTAINER_EXPANDED);
                });
                $(this).toggleClass(TOGGLE_ACTIVE);
            }
        }

        module.exports = toggleSelector;

        /***/ }),
    /* 7 */
    /***/ (function(module, exports) {

        function radioMenu() {

            "use strict";

            var RADIO_ITEM = '.radio-menu__btn',
                RADIO_CHOOSE_CARDS = '.radio-menu__choose-cards';

            $(RADIO_ITEM).on('click', onClick);

            function onClick(event) {
                $(RADIO_CHOOSE_CARDS + '[data-targetgroup=' + this.getAttribute('data-targetgroup') + ']').each(function (index) {
                    $(this).hide();
                });
                $(RADIO_CHOOSE_CARDS + '[data-target=' + this.getAttribute('data-target') + ']').each(function (index) {
                    $(this).show();
                });
            }
        }

        module.exports = radioMenu;

        /***/ }),
    /* 8 */
    /***/ (function(module, exports) {

        function modal() {

            "use strict";

            $('.modal').on('shown.bs.modal', function (e) {
                $('.product-slider__view').slick("setPosition", 0);
            });
        }

        module.exports = modal;

        /***/ }),
    /* 9 */
    /***/ (function(module, exports) {

        function slickSlider() {

            "use strict";

            var PRODCUT_SLIDER_VIEW = '.product-slider__view',
                DISABLE_RESIZE_CONFIGURATOR = '.disable-resize-configurator',
                SHOW_DOWNLOAD_CONFIGURATOR = '.show-download-configurator';

            $('.product-slider__view').slick({
                slidesToShow: 1,
                draggable: false,
                prevArrow: $('slick-prev'),
                nextArrow: $('slick-next')
            });

            $('.fade-slider__view').slick({
                dots: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                arrows: false,
                autoplay: true,
                autoplaySpeed: 4000
            });

            // adding a classname to parent containing prev and next arrows
            // to be able to turn those off on emersya slide
            // get current slide on init, that is emersya slide
            if ( $('#emersyaIframe').length > 0 ) {
                console.log("emersya exists");
                var emersyaSlide = $('.product-slider__large-image .slick-current').eq(0);
                console.log(emersyaSlide);
                // get data-slick-index
                var currentIndex = emersyaSlide.attr('data-slick-index');
                console.log(currentIndex);
                // if data-slick-index = 0 set class emersya-slide on parent div.
                if (currentIndex == 0) {
                    $('.product-slider__large-image').addClass('emersyaSlide');
                    // hide prev and next
                    $('.product-slider__large-image.emersyaSlide .slick-prev').hide();
                    $('.product-slider__large-image.emersyaSlide .slick-next').hide();
                    
                } else {
                    $('.product-slider__large-image').removeClass('emersyaSlide');
                }
            } else {
                console.log("no emersya slide");
            }
            

            $('li.product-slider__thumbnail[data-slide]').click(function (e) {
                e.preventDefault();
                var currentSlide = $(PRODCUT_SLIDER_VIEW).slick('slickCurrentSlide');
                var slideIndex = $(this).data('slide');
                console.log("slideIndex: " + slideIndex);
                if ( $('#emersyaIframe').length > 0 ) {
                    console.log("emersya exists");
                    if (slideIndex != 0) {
                        $('.product-slider__large-image.emersyaSlide .slick-prev').show();
                        $('.product-slider__large-image.emersyaSlide .slick-next').show();
                        $('.product-slider__large-image').removeClass('emersyaSlide');
                    } else {
                        $('.product-slider__large-image').eq(0).addClass('emersyaSlide');
                        $('.product-slider__large-image.emersyaSlide .slick-prev').hide();
                        $('.product-slider__large-image.emersyaSlide .slick-next').hide();
                    }
                }

                if (currentSlide != slideIndex) {
                    $(".product-slider__view").slick('slickGoTo', slideIndex);
                }
                if ($(PRODCUT_SLIDER_VIEW).slick('slickCurrentSlide') > 0) {
                    $(SHOW_DOWNLOAD_CONFIGURATOR).hide();
                    $(DISABLE_RESIZE_CONFIGURATOR).css('display', 'block');
                }
                else {
                    $(DISABLE_RESIZE_CONFIGURATOR).hide();
                    $(SHOW_DOWNLOAD_CONFIGURATOR).css('display', 'block');
                }
            });
            $('.slick-next').click(function (e) {
                $(PRODCUT_SLIDER_VIEW).slick('slickGoTo', $(PRODCUT_SLIDER_VIEW).slick('slickCurrentSlide') + 1);
                if ($(PRODCUT_SLIDER_VIEW).slick('slickCurrentSlide') > 0) {
                    console.log('yes show it');
                    $(SHOW_DOWNLOAD_CONFIGURATOR).hide();
                    $(DISABLE_RESIZE_CONFIGURATOR).css('display', 'block');
                }
                else {
                    $(DISABLE_RESIZE_CONFIGURATOR).hide();
                    $(SHOW_DOWNLOAD_CONFIGURATOR).css('display', 'block');
                }

                if ( $('#emersyaIframe').length > 0 ) {
                    console.log("emersya exists");
                    // get currentIndex 
                    var currentIndex = $('.product-slider__large-image .slick-current').eq(0).attr('data-slick-index');
                    console.log(currentIndex);
                    // hide arrow icons on emersya slide
                    if (currentIndex != 0) {
                        $('.product-slider__large-image.emersyaSlide .slick-prev').show();
                        $('.product-slider__large-image.emersyaSlide .slick-next').show();
                        $('.product-slider__large-image').removeClass('emersyaSlide');
                    } else {
                        $('.product-slider__large-image').eq(0).addClass('emersyaSlide');
                        $('.product-slider__large-image.emersyaSlide .slick-prev').hide();
                        $('.product-slider__large-image.emersyaSlide .slick-next').hide();
                    }
                }
            });
            $('.slick-prev').click(function (e) {
                $(PRODCUT_SLIDER_VIEW).slick('slickGoTo', $(PRODCUT_SLIDER_VIEW).slick('slickCurrentSlide') - 1);
                if ($(PRODCUT_SLIDER_VIEW).slick('slickCurrentSlide') > 0) {
                    $(SHOW_DOWNLOAD_CONFIGURATOR).hide();
                    $(DISABLE_RESIZE_CONFIGURATOR).css('display', 'block');
                }
                else {
                    $(DISABLE_RESIZE_CONFIGURATOR).hide();
                    $(SHOW_DOWNLOAD_CONFIGURATOR).css('display', 'block');
                }
                if ( $('#emersyaIframe').length > 0 ) {
                    console.log("emersya exists");
                    // get currentIndex 
                    var currentIndex = $('.product-slider__large-image .slick-current').eq(0).attr('data-slick-index');
                    console.log(currentIndex);
                    // hide arrow icons on emersya slide
                    if (currentIndex != 0) {
                        $('.product-slider__large-image.emersyaSlide .slick-prev').show();
                        $('.product-slider__large-image.emersyaSlide .slick-next').show();
                        $('.product-slider__large-image').removeClass('emersyaSlide');
                    } else {
                        $('.product-slider__large-image').eq(0).addClass('emersyaSlide');
                        $('.product-slider__large-image.emersyaSlide .slick-prev').hide();
                        $('.product-slider__large-image.emersyaSlide .slick-next').hide();
                    }
                }
            });
        }

        module.exports = slickSlider;

        /***/ }),
    /* 10 */
    /***/ (function(module, exports) {

        function qtyPlus() {

            "use strict";

            var QTYPLUS = '.qtyplus',
                QTYMINUS = '.qtyminus';

            $(QTYPLUS).click(function (e) {
                e.preventDefault();
                var fieldName = $(this).attr('field');
                var currentVal = parseInt($('#' + fieldName).val());
                if (!isNaN(currentVal)) {
                    $('#' + fieldName).val(currentVal + 1);
                } else {
                    $('#' + fieldName).val(1);
                }

                var quantity = $("#form_quantity").val();
                var price = $("#configurator__price").html().substr(2);
                $("#configurator__price_total").html(defaultCurrency+' '+(parseFloat(price) * parseInt(quantity)));
            });

            $(QTYMINUS).click(function (e) {
                e.preventDefault();
                var fieldName = $(this).attr('field'),
                    currentVal = parseInt($('#' + fieldName).val()),
                    ZERO_ONE = $(this).hasClass('oak');
                if (!ZERO_ONE) {
                    if (!isNaN(currentVal) && currentVal > 1) {
                        $('#' + fieldName).val(currentVal - 1);
                    } else {
                        $('#' + fieldName).val(1);
                    }
                }

                var quantity = $("#form_quantity").val();
                var price = $("#configurator__price").html().substr(2);
                $("#configurator__price_total").html(defaultCurrency+' '+(parseFloat(price) * parseInt(quantity)));
            });


            //Element Sofas
            var QTYPLUS1 = '.qtyplus1',
                QTYMINUS1 = '.qtyminus1';

            $(QTYPLUS1).click(function (e) {
                e.preventDefault();
                var maxVal = $('.sofaModel.choose-cards__active').attr('data-max-coffee-tables');
                var fieldName = $(this).attr('field');
                var currentVal = parseInt($('#' + fieldName).val());
                if(currentVal == maxVal){
                    return;
                }
                else if (!isNaN(currentVal)) {
                    $('#' + fieldName).val(currentVal + 1);
                } else {
                    $('#' + fieldName).val(1);
                }

                if (typeof applyProductSelection !== 'undefined' && typeof applyProductSelection === 'function') {
                    applyProductSelection();
                }
                
                // var quantity = $("#form_quantity").val();
                // var price = $("#configurator__price").html().substr(2);
                // $("#configurator__price_total").html(defaultCurrency+' '+(parseFloat(price) * parseInt(quantity)));
            });

            $(QTYMINUS1).click(function (e) {
                e.preventDefault();
                console.log(fieldName)
                var fieldName = $(this).attr('field'),
                    currentVal = parseInt($('#' + fieldName).val()),
                    ZERO_ONE = $(this).hasClass('oak');
                if (!isNaN(currentVal) && currentVal > 0) {
                    $('#' + fieldName).val(currentVal - 1);
                } else {
                    $('#' + fieldName).val(0);
                }

                if (typeof applyProductSelection !== 'undefined' && typeof applyProductSelection === 'function') {
                    applyProductSelection();
                }
                // var quantity = $("#form_quantity").val();
                // var price = $("#configurator__price").html().substr(2);
                // $("#configurator__price_total").html(defaultCurrency+' '+(parseFloat(price) * parseInt(quantity)));
            });
        }

        module.exports = qtyPlus;

        /***/ }),
    /* 11 */
    /***/ (function(module, exports) {

        function sizeMenu() {

            "use strict";

            var SIZE_ITEM = '.size-menu__btn',
                SELECTOR_BAR = '.selector__bar',
                COLLAPSER_EXPANDED = 'collapser--expanded';

            $(SIZE_ITEM).on('click', onClick);

            function onClick(event) {
                var $sizeValue = this.getAttribute('data-label');
                var $collapser = $('#' + this.getAttribute('data-targetgroup'));
                $(SELECTOR_BAR + '[data-target=' + this.getAttribute('data-targetgroup') + ']').each(function (index) {
                    $(this).toggleClass(COLLAPSER_EXPANDED);

                    $(this).find('.selector__bar--value span:first-of-type').html($sizeValue);

                    if ($collapser.length) {

                        $collapser.height($collapser[0].scrollHeight);
                        $collapser.toggleClass(COLLAPSER_EXPANDED);

                        if (!$collapser.hasClass(COLLAPSER_EXPANDED)) {

                            $collapser.animate({
                                height: 0
                            }, 400);
                        } else {

                            $collapser.height(0);

                            $collapser.animate({
                                height: $collapser[0].scrollHeight
                            }, 400, function () {
                                $collapser.height('auto');
                            });
                        }
                    }
                });

                $(this).siblings(":radio").prop('checked', true);
                if (typeof applyProductSelection !== 'undefined' && typeof applyProductSelection === 'function') {
                    applyProductSelection(this);
                }
            }


            $('input[type=radio][name=breedte]').change(function() {
                var width = $(this).val();
                $('.top-shelf').each(function() {
                    //alert($(this).html());
                    $(this).html( '<span>'+width+'cm</span>' );
                });
                $('.bottom-shelf').each(function() {
                    $(this).html( '<span>'+width+'cm</span>' );
                });

                if($(this).val() == '200'){
                    $('.shelve_200').show();

                    $('.shelve_290').hide();
                    $('.shelve_2x100').hide();
                }
                else if($(this).val() == '290'){
                    $('.shelve_200').show();
                    $('.shelve_290').show();
                    $('.shelve_2x100').show();
                }
                else{
                    $('.shelve_200').hide();
                    $('.shelve_290').hide();
                    $('.shelve_2x100').hide();
                }
            });

        }

        module.exports = sizeMenu;

        /***/ }),
    /* 12 */
    /***/ (function(module, exports) {

        function autoCollapser() {

            "use strict";

            var AUTO_COLLAPSE = '.webshop-description';

            $(AUTO_COLLAPSE).each(function (index) {
                var children = $(this).children(),
                    arrShow = [],
                    arrHide = [];
                for (var i = 0; i < children.length; i++) {
                    if (i < 1) {
                        $(children[i]).show();
                        //arrShow.push(children[i]);
                        //children[i].remove();
                    } else {
                        $(children[i]).hide();
                        //arrHide.push(children[i]);
                        //children[i].remove();
                    }
                }
                //$('.webshop-description').append(arrShow);
                //$('#more-description').append(arrHide);
            });
        }

        module.exports = autoCollapser;

        /***/ }),
    /* 13 */
    /***/ (function(module, exports) {

        function popover() {

            "use strict";

            $('[data-toggle="popover"]').popover({
                placement: 'top',
                html: true
            });
            $(document).on("click", ".popover .popover__close", function () {
                $(this).parents(".popover").popover('hide');
            });
        }

        module.exports = popover;

        /***/ }),
    /* 14 */
    /***/ (function(module, exports) {

        function quickCart() {

            "use strict";

            var QUICK_CARTLAUNCH = '.quick-cart__launch',
                QUICK_CART = '#quick-cart';

            $('body').click(function (e) {
                if ($(this).hasClass('cart-open')) {
                    $(QUICK_CART).removeClass('quick-cart__open');
                    $(this).removeClass('cart-open');
                }
            });

            $(QUICK_CARTLAUNCH).on('click', onClick);

            function onClick(event) {
                event.preventDefault();
                $(QUICK_CART).toggleClass('quick-cart__open');
                $('body').toggleClass('cart-open');
                return false;
            }
        }

        module.exports = quickCart;

        /***/ }),
    /* 15 */
    /***/ (function(module, exports) {

        function imageZoom() {

            "use strict";

            $('.no-touchevents .fabric-module__image')
            // tile mouse actions
                .on('mouseover', function () {
                    $(this).children('.fabric-module__image--zoom').css({ 'transform': 'scale(2.8)' });
                }).on('mouseout', function () {
                $(this).children('.fabric-module__image--zoom').css({ 'transform': 'scale(1)' });
            }).on('mousemove', function (e) {
                $(this).children('.fabric-module__image--zoom').css({ 'transform-origin': (e.pageX - $(this).offset().left) / $(this).width() * 100 + '% ' + (e.pageY - $(this).offset().top) / $(this).height() * 100 + '%' });
            });
        }

        module.exports = imageZoom;

        /***/ }),
    /* 16 */
    /***/ (function(module, exports) {

        function isMobileLayout() {
            return window.innerWidth < 768;
        }

        module.exports = isMobileLayout;

        /***/ })
    /******/ ]);
//# sourceMappingURL=toolkit.js.map