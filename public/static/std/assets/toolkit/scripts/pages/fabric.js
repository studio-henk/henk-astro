$(function() {

    "use strict";

    var FABRIC_ITEM = '.fabric-module-menu__btn',
        FABRICMODULE_THUMBS = '.fabric-module__thumbs',
        SELECTOR_BAR = '.selector__bar',
        COLLAPSER_EXPANDED = 'collapser--expanded',
        FABRICCHOOSECARD = '.fabric-module__thumbs--item',
        ZOOMIMAGE = '#fabric-module-zoom',
        ZOOMIMAGEBACKUP = '#fabric-module-zoom-backup',
        FABRICTITLE = '.fabic-module__thumbs--title';

    $( FABRIC_ITEM ).on('click', onClick);

    function onClick(event) {

        $( FABRICMODULE_THUMBS + '[data-targetgroup=' + this.getAttribute('data-targetgroup') + ']' ).each(function (index) {
            $(this).hide();
        });
        $( FABRICMODULE_THUMBS + '[data-target=' + this.getAttribute('data-target') + ']' ).each(function (index) {
            $(this).show();
        });

        var $sizeValue = this.getAttribute('data-value');
        var $collapser = $('#' + this.getAttribute('data-targetgroup'));
        $( SELECTOR_BAR + '[data-target=' + this.getAttribute('data-targetgroup') + ']').each(function (index) {
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
    }

    function loadBackground(url) {
        $('.fabric-module__image--loader').fadeIn();
        $(ZOOMIMAGE).imagesLoaded( { background: true} )
            .done( function( instance ) {
                $('.fabric-module__image--loader').hide();
                $( ZOOMIMAGE ).fadeTo( 96 , 1, function() {
                    $(ZOOMIMAGEBACKUP).css("background-image","url("+ url +")");
                    $(ZOOMIMAGE).css( "opacity", 0 );
                });
            })
    }

    $( FABRICCHOOSECARD ).on('click', function() {
        var $colorThumb = this.getAttribute('data-target'),
            //$newUrl = '/themes/studio-henk-v2/dist/assets/toolkit/images/fabric/large/'+ $colorThumb + '.jpg',
            $newUrl = $colorThumb,
            $colorTitle = this.getAttribute('data-name');

        $(ZOOMIMAGE).css("background-image","url("+ $newUrl +")");
        loadBackground($newUrl);

        $(FABRICTITLE).html($colorTitle);
    });

});