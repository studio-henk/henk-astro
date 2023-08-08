// STICKY SHOPPINGCART //
$(function() {

    "use strict";

    var shoppingCart = $('#checkout-summary-scroll');
    var offset = shoppingCart.offset();
    var topPadding = 130;
    var formHeight = $('.checkout').height();
    var cartHeight = shoppingCart.height();
    var maxScroll = formHeight - cartHeight;
    $( window ).resize(function() {
        if (window.innerWidth > 768) {
            formHeight = $('.checkout').height();
            cartHeight = shoppingCart.height();
            maxScroll = formHeight - cartHeight + 45;
        }
    });
    if (window.innerWidth > 768) {
        function scroll() {
            $(window).scroll(function() {
                var scroll = $(window).scrollTop() + 85;
                if (scroll > offset.top) {
                    if ($(window).scrollTop() < maxScroll) {
                        shoppingCart.stop().animate({
                            marginTop: $(window).scrollTop() - offset.top + topPadding
                        });
                    }
                } else {
                    shoppingCart.stop().animate({
                        marginTop: 0
                    });
                }
            });
        }
        scroll();
    }
});