const NavBarDesktop = {
  name: "NavBarDesktop",
  mastheadSelector: document.querySelector(".masthead-desktop"),
  lastScrollTop: 0,
  init: function () {
    console.log("init");

    // Hide Header on on scroll down
    let didScroll;
    // let lastScrollTop = 0;
    const delta = 250;
    let navbarHeight = NavBarDesktop.mastheadSelector.offsetHeight;
    console.log(navbarHeight);

    // $(window).scroll(function (event) {
    //   didScroll = true;
    // });
    window.addEventListener("scroll", function (event) {
      didScroll = true;
    });

    setInterval(
      function () {
        if (didScroll) {
          NavBarDesktop.hasScrolled(
            NavBarDesktop.lastScrollTop,
            delta,
            navbarHeight
          );
          didScroll = false;
        }
      },

      250
    );
  },
  hasScrolled: function (lastScrollTop, delta, navbarHeight) {
    // let st = document.documentElement.scrollTop;
    var st =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    // console.log("top: " + st);

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      console.log("scroll down");
      // $("header").removeClass("nav-down").addClass("nav-up");
      document.querySelector(".masthead-desktop").classList.remove("nav-down");
      document.querySelector(".masthead-desktop").classList.add("nav-up");
    } else {
      // Scroll Up
      console.log("scroll up");

      if (
        st + window.innerHeight <
        Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        )
      ) {
        document.querySelector(".masthead-desktop").classList.remove("nav-up");
        document.querySelector(".masthead-desktop").classList.add("nav-down");
      }
    }

    NavBarDesktop.lastScrollTop = st;
  },
};

export { NavBarDesktop };

// Hide Header on on scroll down
// var didScroll;
// var lastScrollTop = 0;
// var delta = 250;
// var navbarHeight = $(".masthead-desktop").outerHeight();
// console.log(navbarHeight);

// $(window).scroll(function (event) {
//   didScroll = true;
// });

// setInterval(
//   function () {
//     if (didScroll) {
//       hasScrolled();
//       didScroll = false;
//     }
//   },

//   250
// );

// function hasScrolled() {
//   var st = $(this).scrollTop();
//   console.log("top: " + st);

//   // Make sure they scroll more than delta
//   if (Math.abs(lastScrollTop - st) <= delta) return;

//   // If they scrolled down and are past the navbar, add class .nav-up.
//   // This is necessary so you never see what is "behind" the navbar.
//   if (st > lastScrollTop && st > navbarHeight) {
//     // Scroll Down
//     console.log("scroll down");
//     $("header").removeClass("nav-down").addClass("nav-up");
//   } else {
//     // Scroll Up
//     console.log("scroll up");
//     if (st + $(window).height() < $(document).height()) {
//       $("header").removeClass("nav-up").addClass("nav-down");
//     }
//   }

//   lastScrollTop = st;
// }
