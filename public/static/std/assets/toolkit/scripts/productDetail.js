/*fb pixel event code*/
fbEventViewProduct(productId, productName, subTitle);
/*fb pixel event code*/
// gtag('event', 'page_view', {
//     'send_to': 'AW-966128643',
//     'ecomm_pagetype': 'product',
//     'ecomm_prodid': productId
// });

/*$('.choose-cards__item').unbind().on('click', applyProductSelection);
$('.size-menu__btn').unbind().on('click', applyProductSelection);*/

function updateModularCabinetShelves() {
    let shelvesCount1 = $("input:radio[name=hoogte]:checked").attr('data-shelves-count');
    let selectedWidth = $("input:radio[name=breedte]:checked").attr('data-value');
    let selectedHeight = $("input:radio[name=hoogte]:checked").attr('data-value');
    if (shelvesCount1 > 2) {
        for (let i1 = 2; i1 < shelvesCount1; i1++) {
            if (i1 === 2) {
                let nm = "plank_2_" + selectedHeight;
                let oakElementsCount = parseInt($('input[name=oak_count]').val());
                if (oakElementsCount > 0) {
                    $("input[name=" + nm + "]").each(function () {

                        if ($(this).val() != selectedWidth) {
                            $(this).parent().hide();
                        } else {
                            $(this).prop('checked', true);
                            $(this).parent().parent().parent().parent().not(".selector__static").find('.selector__bar--value span:first-of-type').html($(this).next().attr('data-label'));
                            $(".second_shelf_span").each(function () {
                                $(this).html(infoIconHtml.slice(1, -1));
                                $(this).parent().css('cursor', "default");
                                $(this).parent().addClass("off-event");
                            });
                        }
                    });
                } else {
                    $("input[name=" + nm + "]").each(function () {
                        if (jQuery.inArray($(this).val(), possibleShelfWidths[selectedWidth]) !== -1) {
                            $(this).parent().show();
                            $(".second_shelf_span").each(function () {
                                $(this).html(expandIconHtml.slice(1, -1));
                                $(this).parent().css('cursor', "pointer");
                                $(this).parent().removeClass("off-event");
                            });
                        }
                    });
                }
            } else {
                let nm = "plank_" + i1 + "_" + selectedHeight;
                let ob = $("input[name=" + nm + "]:checked");
                /*let nm = "plank_"+i1+"_" + selectedHeight;
                 let ob = $("input[name=" + nm + "]:checked")*/
                if (typeof ob !== "undefined" && jQuery.inArray($(ob).val(), possibleShelfWidths[selectedWidth]) !== -1) {
                    $(ob).parent().parent().parent().parent().not(".selector__static").find('.selector__bar--value span:first-of-type').html($(ob).next().attr('data-label'));
                }
                /*else{
                     ob = $("input[name=" + nm + "][id='no_shelf']");
                     alert("hello: "+$(ob).attr('id'));
                     $(ob).prop('checked', true);
                     $(ob).parent().parent().parent().parent().not( ".selector__static" ).find('.selector__bar--value span:first-of-type').html($(this).next().attr('data-label'));
                 }*/

            }
        }
    }
}


if (productCategoryId == 13041) {
    $('input[type=radio][name=zitkussen]').on('click', applyProductSelection);
}

var priceForFB = '';
applyProductSelection();

function applyProductSelection(elementInAction) {
    if (productCategoryId == 13392 && $.inArray(productmodelObjCode, ['OB2L', 'OB3L', 'OB4L', 'OB5L', 'OB6L']) == -1) {
        updateModularCabinetShelves();
    }

    var productData = getSelectedProductCode(elementInAction);
    var productCode = productData.productSku;
    //var image_name = productData.productImg;

    $("li.product-slider__thumbnail").first().trigger("click");
    
    productCode = productCode.replace(".","PNT");
    $.ajax({
        url: "/" + language + "/get-price/" + productCode,
        /*data: {sku : productCode},*/
        success: function (result) {
            if (result.success) {
                if (result.productCategoryId == 378087 && $("#configurator__price").html() != '') {
                    window.location.href = result.url;
                }

                if (result.productCategoryId == 1641826 && $("#configurator__price").html() != '') {
                    window.location.href = result.url;
                }
                
                if (result.productCategoryId == 1984029 && $("#configurator__price").html() != '') {
                    window.location.href = result.url;
                }
                
                if (result.productCategoryId == 2022915 && $("#configurator__price").html() != '') {
                    window.location.href = result.url;
                }
                
                if (result.productCategoryId == 13042 && $("#configurator__price").html() != '' && productCode.indexOf('TRAC') !== -1) {
                    window.location.href = result.url;
                }

                if (result.productCategoryId == 13044 && $("#configurator__price").html() != '' && jQuery.inArray(productmodelObjCode, ['CHECC','TRACLCOC','TRACRCOC']) !== -1) {
                    window.location.href = result.url;
                }
                
                var lightingProducts = [1908134, 1908133, 1908135];
                if (result.productCategoryId == 149171 && lightingProducts.indexOf(result.productId) !== -1 && $("#configurator__price").html() != '') {
                    if (window.location.pathname != result.url) {
                        window.location.href = result.url;
                    }
                }

                var quantity = $("#form_quantity").val();
                var price = parseFloat(result.price);
                let txt = result.deliveryWeek + "-" + (result.deliveryWeek + 1);
                $("#product_delivery_time").html(txt);
                if (result.productCategoryId == 13392) {
                    var oak_quantity = parseFloat($("#oak_count").val());
                    price += parseFloat(oakElementsProductPrice) * oak_quantity;
                }
                $("#configurator__price").html(defaultCurrency + ' ' + price);
                $("#configurator__price_total").html(defaultCurrency + ' ' + (parseFloat(price) * parseInt(quantity)));
                priceForFB = parseFloat(price);
                $("#configurator_product_id").val(result.productId);

                if($("#2d_div").is(":visible")){
                    var productData = getSelectedProductCode('','ImageData');
                    image_name = productData.productImg;
                } 

                emersyaConfig = result.emersyaConfig;
                if ($("#3d_div").is(":visible")) {
                    startConfigurationGroup();
                }

                console.log("modelObjectCode: " + modelObjectCode);
                if (productName != "Elements Outdoor Coffee Table") {
                    //alert(image_name);
                    $('#first_image_1').attr('src', image_name);
                    $('#first_image_2').attr('src', image_name);
                    $('#first_image_3').attr('src', image_name);
                    $('#first_image_4').attr('src', image_name);
                }
            } else {
                alert('Product not found.');
            }
        }
    });
}



function redirectToCart() {
    if (productCategoryId == 13392) {
        /*Modular Cabinet*/
        var frameTypeCode = $("input:radio[name=hoogte]:checked").attr('frameTypeCode')
        var qty = $("#form_quantity").val();
        var productId = $("#configurator_product_id").val();
        mainProductJsonObj = {productId: productId, quantity: qty};
        /*fb event for add to cart*/
        var price = $("#configurator__price_total").html();
        price = price.split(" ");
        price = price[1];
        price = price.replace(/&nbsp;/g, '');
        price = price.replace(/\./g, '');
        price = price.replace(/\,/g, ".");
        price = price.replace(/ /g, "");
        price = price.replace(/&nbsp;/g, "");
        var qty = $("#form_quantity").val();
        if (qty && qty !== undefined) {
            priceForFB = priceForFB * parseInt(qty);
        }
        console.log(fbEventAddToCart([productId], priceForFB, 'EUR'));
        /*fb pixel event caLL*/
        fbEventAddToCart([productId], priceForFB, 'EUR');
        /*fb event for add to cart
        gtag event*/
        gtag('event', 'add_to_cart', {
            'send_to': 'AW-966128643',
            'ecomm_pagetype': "product",
            'ecomm_totalvalue': price,
            'items': [{
                'ecomm_prodid': productId,
                'google_business_vertical': 'retail'
            }]
        });
        /*gtag event*/
        var oakVariation = $("input:radio[name=change-oak]:checked").val();
        oakVariation = false;
        jsonObj = [];
        if (oakVariation == 'oak-different') {
            for (var i = 1; i <= 10; i++) {
                var elementFinish = $('#afwerking-eiken-element-' + i + ' .choose-cards__active:visible').attr('data-value');
                if (typeof elementFinish !== "undefined") {
                    jsonObj.push(elementFinish);
                }
            }
        } else {
            /*var elementFinish = $('#afwerking-eiken-element .choose-cards__active:visible').attr('data-value');*/
            var elementFinish = $('.shelfFinish.choose-cards__active').attr('data-value');
            if (typeof elementFinish !== "undefined") {
                var elementCount = $('#oak_count').val();
                for (var i = 1; i <= elementCount; i++) {
                    jsonObj.push(elementFinish);
                }
            }
        }

        let selectedWidth = $("input:radio[name=breedte]:checked").attr('data-value');
        let width = $("input:radio[name=breedte]:checked").val();
        let height = $("input:radio[name=hoogte]:checked").val();
        let shelvesCount = $("input:radio[name=hoogte]:checked").attr('data-shelves-count');
        let selectedShelfFinish = $('.shelfFinish.choose-cards__active').attr('data-value');
        /*let topShelf = 'SH-' + selectedShelfFinish + '-' + width;
        let bottomShelf = 'SH-' + selectedShelfFinish + '-' + width;*/
        let topShelf = 'SH-MODU' + width + 'SH-' + selectedShelfFinish;
        let bottomShelf = 'SH-MODU' + width + 'SH-' + selectedShelfFinish;

        /*name = plank_<row_index>_<height>*/
        let shelvesJsonObj = [];
        shelvesJsonObj.push(topShelf);
        shelvesJsonObj.push(bottomShelf);

        let errorFound = false;
        for (let i = 2; i < shelvesCount; i++) {
            let nm = "plank_" + i + "_" + height;
            let selectedRadioObj = $("input:radio[name=" + nm + "]:checked");
            let selectedShelfWidth = "no_shelf";
            if (typeof selectedRadioObj !== "undefined" && (typeof possibleShelfWidths !== "undefined") && jQuery.inArray($(selectedRadioObj).val(), possibleShelfWidths[selectedWidth]) !== -1) {
                selectedShelfWidth = $(selectedRadioObj).val();
            }

            if (selectedShelfWidth != 'no_shelf') {
                if (selectedShelfWidth == '2x110') {
                    /*shelvesJsonObj.push('SH-' + selectedShelfFinish + '-110');
                    shelvesJsonObj.push('SH-' + selectedShelfFinish + '-110');*/
                    shelvesJsonObj.push('SH-MODU110SH-'+ selectedShelfFinish);
                    shelvesJsonObj.push('SH-MODU110SH-' +selectedShelfFinish);
                } else {
                    $("#error_shelve_" + i + "_" + height).hide();
                    if (typeof selectedShelfWidth !== "undefined") {
                        //shelvesJsonObj.push('SH-' + selectedShelfFinish + '-' + selectedShelfWidth);
                        shelvesJsonObj.push('SH-MODU' + selectedShelfWidth + 'SH-' + selectedShelfFinish);
                    } else {

                        $("#error_shelve_" + i + "_" + height).show();
                        errorFound = true;
                    }
                }
            }
        }

        if (errorFound && (frameTypeCode != 'OB2L' && frameTypeCode != 'OB3L' && frameTypeCode != 'OB4L' && frameTypeCode != 'OB5L' && frameTypeCode != 'OB6L')) {
            return false;
        }

        $.post("/cart/add/webshop/cabinet", {
            oakElementsData: jsonObj,
            mainProductData: mainProductJsonObj,
            shelvesData: shelvesJsonObj,
            amountOfOakElements: $('#oak_count').val(),
            shelvesCount: shelvesCount,
            shelfFinish: selectedShelfFinish
        }, function (result, status) {
            if (result.success) {
                window.location.href = '/' + language + '/cart/list';
            }
        });
    } else {
        var qty = $("#form_quantity").val();
        var productId = $("#configurator_product_id").val();
        /*fb pixel event caLL*/
        var price = $("#configurator__price_total").html();
        price = price.split(" ");
        price = price[1];
        price = price.replace(/&nbsp;/g, '');
        price = price.replace(/\./g, '');
        price = price.replace(/\,/g, ".");
        price = price.replace(/ /g, "");
        price = price.replace(/&nbsp;/g, "");
        var qty = $("#form_quantity").val();
        if (qty && qty !== undefined) {
            priceForFB = priceForFB * parseInt(qty);
        }

        console.log(fbEventAddToCart([productId], priceForFB, 'EUR'));


        fbEventAddToCart([productId], priceForFB, 'EUR');
        /*fb pixel event call
        gtag event*/
        gtag('event', 'add_to_cart', {
            'send_to': 'AW-966128643',
            'ecomm_pagetype': "product",
            'ecomm_totalvalue': price,
            'items': [{
                'ecomm_prodid': productId,
                'google_business_vertical': 'retail'
            }]
        });

        // window.location.href =  $.get("/"+ language + "/cart/add", {
        //     item: productId,
        //     qty: qty
        // });
        /*gtag event*/
        window.location.href = '/' + language + '/cart/add?item=' + productId + '&qty=' + qty;
    }
}


var moreDescVisibility = false;

function showHideMore(ths) {
    $('.webshop-description').each(function (index) {
        var children = $(this).children();
        for (var i = 0; i < children.length; i++) {
            if (i < 1) {
                $(children[i]).show();
            } else {
                if (moreDescVisibility) {
                    $(children[i]).hide();
                } else {
                    $(children[i]).show();
                }

            }
        }


        if (moreDescVisibility) {
            moreDescVisibility = false;
            $('#read_more_label').html(read_more);
        } else {
            moreDescVisibility = true;
            $('#read_more_label').html(read_less);
        }
    });
}

$(document).ready(function () {
    var val;
    $(".product-slider__thumbnail").each(function () {
        val = $(this).data('slide');
    });

    if (val == 0) {
        $(".slick-prev").css("display", "none");
        $(".slick-next").css("display", "none");
    }
})

function changeImageIcon(id, image) {
    $("#" + id).html('<img src="' + image + '" alt="">');
}


