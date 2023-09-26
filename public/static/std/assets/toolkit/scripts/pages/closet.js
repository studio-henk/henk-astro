$(function() {

    "use strict";

    var closet_rows_Value       = '.closet_rows',
        SIZEMENU                = '.closet_rows ul.size-menu',
        RESET                   = $('.closet_rows .selector__content').not( ".selector__static" ).find('.selector__bar--value span:first-of-type'),
        OAK_MIN                 = '.qtyminus.oak',
        OAK_MAX                 = '.qtyplus.oak',
        OAK_ELEMENT_SELECTOR    = '.oak-elements__selector',
        OAK_ELEMENT_MORE        = '.oak-elements__more',
        OAKCOLORS               = '.oak-elements__xcolors',
        CHOOSECARD              = '.choose-cards__item',
        SELECTOR_BAR            = '.selector__bar',
        ACTIVE_CHOOSECARD       = 'choose-cards__active';

    /*
    function firstCheck() {
        var startWidth  = $('input#width').val().slice(0,6),
            startHeight = $('input#height').val().slice(8,9);

        firstLastWidth(startWidth);
        changeOptionsWidth(startWidth.slice(0,3));
        heightAnimation(startHeight - 2);

        RESET.html('Maak een keuze');

    }
    firstCheck();


    function firstLastWidth(value) {
        $( closet_rows_Value ).each(function( index ) {
            var CONTENT = $(this).find('.selector__content');
            //CONTENT.first().find('.selector__bar--value span:first-of-type').html(value);
            //CONTENT.last().find('.selector__bar--value span:first-of-type').html(value);
        });
    }
    */

    function changeOptionsWidth(value) {
        $(SIZEMENU).each(function () {
            if (value == 110) {
                $(this).children('li:lt(2)').show();
                $(this).children('li:gt(1)').hide();
                RESET.html(makeChoiceLabel);
            }
            if (value == 200) {
                $(this).children('li:lt(3)').show();
                $(this).children('li:gt(2)').hide();
                RESET.html(makeChoiceLabel);
            }
            if (value == 290) {
                $(this).children('li').show();
                RESET.html(makeChoiceLabel);
            }
        });

        applyProductSelection();
    }

    function heightAnimation(showedDIV) {
        showedDIV = 'shelves_div_'+showedDIV;
        $( closet_rows_Value ).each(function( index ) {
            $(this).css('height', 0);
            $(this).removeClass('closet_rows__active');
            $(this).fadeOut(100);
            if ($(this).attr('id') == showedDIV) {
                $(this).css('height', 'auto');
                $(this).fadeIn(200);
            }
        })
    }

    $('input:radio[name=breedte]').on('click', function() {
        var $inputID = $(this).attr( "id" ),
            $inputDATA = $(this).val(),
            $inputValue = $inputID.slice(0, 5);

        //firstLastWidth($inputValue);
        changeOptionsWidth($inputDATA);
        $('.top-shelf').html('<span>'+$(this).val()+' cm</span>');
        $('.bottom-shelf').html('<span>'+$(this).val()+' cm</span>');
    });

    $('input:radio[name=hoogte]').on('click', function() {
        RESET.html(makeChoiceLabel);
        var inputDATA = $(this).attr('data-value');
        heightAnimation(inputDATA);
        var frameTypeCode = $("input:radio[name=hoogte]:checked").attr('frameTypeCode');
        if(typeof frameTypeCode !== 'undefined' && frameTypeCode != 'OB2L' && frameTypeCode != 'OB3L' && frameTypeCode != 'OB4L' && frameTypeCode != 'OB5L' && frameTypeCode != 'OB6L'){
            updateModularCabinetShelves();
        }
    });

    $( OAK_MAX ).click(function(e){
        e.preventDefault();

        //var maxVal = 10;
        var maxVal = $("input:radio[name=breedte]:checked").attr('data-max-oak-elements')
        if (typeof changeCabinetWidth === "function") {
            //Oblique Cabinet
            maxVal = maxOakCount;
        }

        var fieldName   = $(this).attr('field'),
            currentVal  = parseInt($('input[name='+fieldName+']').val());
        if (!isNaN(currentVal) && currentVal === 1) {
            $(OAK_ELEMENT_SELECTOR).slideDown();
        } else {
            // if (!isNaN(currentVal) && currentVal === 2 ) {
            //     $('.oak-elements__xcolors').hide();
            //     $(OAK_ELEMENT_MORE).slideDown();
            // } else {
                if (currentVal > maxVal) {
                    // alert('boem max 10 melding');
                    $('.oak-elements__text').slideDown();
                    $('input[name='+fieldName+']').val(maxVal);
                } else {
                    $('.oak-elements__xcolors .selector:nth-of-type(' + currentVal + ')').show();
                }
            // }
        }

        if (typeof applyProductSelection === "function") {
            applyProductSelection();
        }
    });

    $( OAK_MIN ).click(function(e) {
        e.preventDefault();
        var maxVal = 10;
        if (typeof changeCabinetWidth === "function") {
            //Oblique Cabinet
            maxVal = maxOakCount;
        }

        var fieldName = $(this).attr('field'),
            currentVal = parseInt($('input[name='+fieldName+']').val()),
            ZERO_ONE = $(this).hasClass('oak');
        if (ZERO_ONE) {
            if (!isNaN(currentVal) && currentVal === 1) {
                $('input[name='+fieldName+']').val(currentVal - 1);
                $(OAK_ELEMENT_SELECTOR).slideUp();
            } else if (!isNaN(currentVal) && currentVal > 1) {
                if (!isNaN(currentVal) && currentVal === 2) {
                    $('input[name='+fieldName+']').val(currentVal - 1);
                    if ($('input[name=change-oak]:checked').is('#oak-different')) {
                        $(OAK_ELEMENT_SELECTOR).slideDown();
                        function resetRadio(){
                            $('#oak-same').prop('checked', true);
                            $('#oak-different').prop('checked', false);
                        }
                        setTimeout(resetRadio, 500);
                    }
                    //$(OAK_ELEMENT_MORE).slideUp();
                } else {
                    $('input[name='+fieldName+']').val(currentVal - 1);
                    $('.oak-elements__xcolors .selector:nth-of-type(' + currentVal + ')').hide();
                    if (currentVal === 10) {
                        $('.oak-elements__text').slideUp();
                    }
                }
            } else {
                $('input[name='+fieldName+']').val(0);
            }
        }

        if(currentVal <= maxVal){
            $('.oak-elements__text').slideUp();
        }

        if (typeof applyProductSelection === "function") {
            applyProductSelection();
        }
    });

    $('input[name=change-oak]').on('change', function() {
        var inputValue = $(this).attr('id');
        if (inputValue === 'oak-different') {
            $( OAKCOLORS ).slideDown();
            $(OAK_ELEMENT_SELECTOR).slideUp();
        }
        else {
            $(OAK_ELEMENT_SELECTOR).slideDown();
            $( OAKCOLORS ).slideUp();
        }
    });

    $('.oak-elements .icon-close').click(function (e) {
        $('.oak-elements__text').slideUp();
    });

    var FIRSTCARD = '.oak-elements__xcolors .selector:first-of-type';
    $( '.oak-elements__selector .choose-cards__item' ).click(function(event) {

        var $cardValue = this.getAttribute('data-value'),
            $cardData = this.getAttribute('data-targetgroup');

        //$(FIRSTCARD).find('.selector__bar--value span:first-of-type').html($cardValue);
        if ($cardData === 'afwerking-eiken-element') {
            $( SELECTOR_BAR + '[data-target=' + this.getAttribute('data-targetgroup') + '-1]').each(function (index) {
                //$(this).find('.selector__bar--value span:first-of-type').html($cardValue);
            });
        }
        $(this).toggleClass(ACTIVE_CHOOSECARD);
        $( CHOOSECARD + '[data-target=' + this.getAttribute('data-target') ).toggleClass(ACTIVE_CHOOSECARD);
    });

    $('.oak-elements__xcolors .selector:first-of-type .choose-cards__item').click(function (e) {
        var $cardValue = this.getAttribute('data-value');
        $( SELECTOR_BAR + '[data-target=' + this.getAttribute('data-targetgroup') + '-1]').each(function (index) {
            //$(this).find('.selector__bar--value span:first-of-type').html($cardValue);
        });
        $(this).toggleClass(ACTIVE_CHOOSECARD);
        $( CHOOSECARD + '[data-target=' + this.getAttribute('data-target') ).toggleClass(ACTIVE_CHOOSECARD);
    });

});