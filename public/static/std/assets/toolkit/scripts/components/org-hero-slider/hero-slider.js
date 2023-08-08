      /**
       * base-slider.js
       *
       * @author Nirusu | nils hendriks <info@nirusu.me>
       * @version 0.0.1
       * @file Manages the slider for hero brick
       * @uses
       * @path web/static/std/assets/toolkit/scripts/components/org-hero-slider/hero-slider.js
       *
       */

      const heroSlider = {

          init: function () {
              // check if swiper files are there already
              // if no, load them and run swiper code
              // if yes, run swiper code
              // console.log(typeof Swiper);
              // check if swiper already available?
              if (typeof Swiper !== 'undefined') {
                  //console.log('its there?')
                  heroSlider.runSwiper();
              } else {
                console.log('loading swiper');
                heroSlider.loadSwiper();
              }
          },
          loadSwiper: function () {
            // load swiper js and css
            // css
            const cssFile = document.createElement("link")
            cssFile.href = "/static/std/assets/toolkit/styles/swiper-bundle.min.css"
            cssFile.media = "screen";
            cssFile.rel = "stylesheet";
            cssFile.type = "text/css";

            // js
            const jsFile = document.createElement("script");
            jsFile.src = "/static/std/assets/toolkit/scripts/swiper-bundle.min.js";

            // head element
            const head = document.querySelector('head');

            // add css
            head.append(cssFile);

            // add js
            head.append(jsFile);

            // check if css loaded
            cssFile.addEventListener('load', function(e) {
              console.log('CSS file loaded');
                // check if js loaded
                jsFile.addEventListener('load', function(e) {
                  console.log('file loaded');
                  heroSlider.runSwiper();
                });
            });

          },
          runSwiper: function () {
            // run swiper code
            const swiperhero = new Swiper('[data-swiper-id="swiper-hero"]', {
              // Optional parameters
              direction: 'horizontal',
              loop: false,
              slidesPerView: 1,
              initialSlide: 0,
              spaceBetween: 0,
              speed: 800,
              grabCursor: true,
autoplay: {
   delay: 4000,
 },

              //If we need pagination
              pagination: {
                  el: '.swiper-pagination-hero',
                  type: 'bullets',
                  clickable: true
              },

              // Navigation arrows
              navigation: false,

              // And if we need scrollbar
              // scrollbar: {
              //   el: '.swiper-scrollbar',
              // },
              breakpoints: {
                  768: {
                      slidesPerView: 1
                  }
              },
            });

          }

      }


      window.addEventListener("load", function () {
          heroSlider.init();
      });