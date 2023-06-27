$(function() {

    "use strict";

    function EqualHeight (container, element) {

        // reset
        $(element, container).css({
            height: 'auto'
        });

        $(container).each(function () {

            var $currentContainer = $(this),
                row = 1,
                count = 1,
                nrItems = $(element, $currentContainer).length,
                heights = [],
                itemsInRow = $currentContainer.data('items-in-row');

            $(element, $currentContainer).each(function () {
                if (count >= (row * itemsInRow)) {

                    heights.push($(this).height());

                    var min = ((row * itemsInRow) - itemsInRow);
                    var max = min + itemsInRow;

                    // apply height current row
                    $(element, $currentContainer).slice(min, max).height(Math.max.apply(Math, heights));

                    heights = [];
                    row++;
                } else if (count < nrItems) {
                    heights.push($(this).height());
                } else {

                    // last item
                    heights.push($(this).height());
                    var min = ((row * itemsInRow) - itemsInRow);
                    $(element, $currentContainer).slice(min).height(Math.max.apply(Math, heights));
                    heights = [];
                }

                count++;
            });
            // }
        });
    }

    $('.product-configuration').imagesLoaded().done( function( instance ) {
        EqualHeight('.js-equalheight', '.js-equalheight-item');
    });
    $( window ).resize(function() {
        $('.product-configuration').imagesLoaded().done( function( instance ) {
            EqualHeight('.js-equalheight', '.js-equalheight-item');
        });
    });
});