var restrictionsJsonObj = jQuery.parseJSON(restrictions);
var defaultRoundSelectionJsonObj = jQuery.parseJSON(defaultRoundSelection);
var dataConfigurationJsonObj = jQuery.parseJSON(dataConfiguration);

//All the default selections shape-wise
var defaultSelectionsJsonObj = jQuery.parseJSON(defaultSelections);
var clickCount = 0;

var frameGroupClickCount = 0;

var topLengths = [];
var topWidths = [];
var topThicknesses = [];
var topDiameters = [];
var topShapes = [];
var topEdgeTypes = [];
var topFinishes = [];
var frameTypes = [];
var frameTypesGroups = [];
var frameFinishes = [];

var frameTypesAllowed = [];
var frameTypesGroupsAllowed = [];
var topDiametersAllowed = [];

var selectedTopShape;
var selectedFrameType;
var selectedFrameTypeGroup;
var selectedFrameFinish;
var selectedTopEdgeType;
var selectedTopFinish;

var selectedLength;
var selectedWidth;
var selectedThickness;
var selectedDiameter;

var emersyaConfig;

var homeDesk = false;

// Second, this function should handle undetermined number of parameters (so arguments should be used)
function intersect(args) {
    //var args = arguments;
    // if no array is passed then return empty array
    if (args.length == 0) return [];
    return args.reduce((a, b) => a.filter(c => b.includes(c)));

    // for optimisation lets find the smallest array
    var imin = 0;
    for (var i = 1; i < args.length; i++)
        if (args[i].length < args[imin].length) imin = i;
    var smallest = Array.prototype.splice.call(args, imin, 1)[0];

    return smallest.reduce(function(a, e) {
        for (var i = 0; i < args.length; i++)
            if (args[i].indexOf(e) == -1) return a;
        a.push(e);
        return a;
    }, []);
}

function selectDefaultRound() {
    $('.frameType.choose-cards__active').removeClass('choose-cards__active');
    $('.frameFinish.choose-cards__active').removeClass('choose-cards__active');
    $('.topEdgeType.choose-cards__active').removeClass('choose-cards__active');
    $('.topFinish.choose-cards__active').removeClass('choose-cards__active');

    //console.log('#frameType_'+defaultRoundSelectionJsonObj.frameType);
    $('#frameType_' + defaultRoundSelectionJsonObj.frameType).addClass("choose-cards__active");
    $('#frameFinish_' + defaultRoundSelectionJsonObj.frameFinish).addClass("choose-cards__active");
    $('#topEdgeType_' + defaultRoundSelectionJsonObj.topEdgeType).addClass("choose-cards__active");
    $('#topFinish_' + defaultRoundSelectionJsonObj.topFinish).addClass("choose-cards__active");

    var radioElement = '#topDiameter_' + defaultRoundSelectionJsonObj.topDiameter + ' :radio';
    $(radioElement).prop('checked', true);
    $('#diameter_label').html($(radioElement).attr('data-value') + defaultDimensionUnit);

    var radioElement = '#topThickness_' + defaultRoundSelectionJsonObj.topThickness + ' :radio';
    $(radioElement).prop('checked', true);

    //$('#topDiameter_'+defaultRoundSelectionJsonObj.topDiameter).click();
}

function setAllowedSelections() {
    topLengths = [];
    topWidths = [];
    topThicknesses = [];
    topDiameters = [];
    topShapes = [];
    topEdgeTypes = [];
    topFinishes = [];
    frameTypes = [];
    frameTypesGroups = [];
    frameFinishes = [];

    frameTypesAllowed = [];
    Allowed = [];
    topDiametersAllowed = [];

    selectedTopShape = $('.topShape.choose-cards__active').attr('data-value');
    selectedFrameType = $('.frameType.choose-cards__active').attr('data-value');
    selectedFrameTypeGroup = $('.frameTypeGroup.choose-cards__active').attr('data-value');
    selectedFrameFinish = $('.frameFinish.choose-cards__active').attr('data-value');
    selectedTopEdgeType = $('.topEdgeType.choose-cards__active').attr('data-value');
    selectedTopFinish = $('.topFinish.choose-cards__active').attr('data-value');

    selectedLength = $("input:radio[name=rectangular_lengte]:checked").attr('data-value');
    selectedWidth = $("input:radio[name=rectangular_breedte]:checked").attr('data-value');
    selectedThickness = $("input:radio[name=rectangular_dikte]:checked").attr('data-value');
    selectedDiameter = $("input:radio[name='round_diameter']:checked").attr('data-value');
    
    if(selectedThickness == "3.6" && selectedTopShape != "SQOC"){	
        selectedLength = "160";	
        selectedWidth = "90";	
        selectedThickness = "3";	
    }	


    var selectionJson = getSelectionRestrictions(selectedLength, selectedWidth, selectedThickness, selectedDiameter, selectedTopShape, selectedTopFinish, selectedTopEdgeType, selectedFrameType, selectedFrameFinish);
    $.each(selectionJson, function(index1, configuration) {
        if (!(selectedTopShape == 'RD' && (index1 == 'topLengthRestrictions' || index1 == 'topWidthRestrictions')) &&
            !(selectedTopShape != 'RD' && index1 == 'topDiameterRestrictions')
        ) {
            $.each(configuration, function(index2, configurationElement) {
                // console.log(configurationElement);
                if (index2 == 'topLengths') {
                    topLengths.push(configurationElement);
                }

                if (index2 == 'topWidths') {
                    topWidths.push(configurationElement);
                }

                if (index2 == 'topThicknesses') {
                    topThicknesses.push(configurationElement);
                }

                if (index2 == 'topDiameters') {
                    if (index1 != 'frameTypeRestrictions') {
                        topDiameters.push(configurationElement);
                    } else {
                        topDiametersAllowed.push(configurationElement);
                    }
                }

                if (index2 == 'topShapes') {
                    topShapes.push(configurationElement);
                }

                if (index2 == 'topEdgeTypes') {
                    topEdgeTypes.push(configurationElement);
                }

                if (index2 == 'topFinishes') {
                    if (index1 == 'frameTypeRestrictions' || index1 == 'topShapeRestrictions') {
                        topFinishes.push(configurationElement);
                    }
                }

                if (index2 == 'frameTypes') {
                    if (index1 != 'topDiameterRestrictions') {
                        frameTypes.push(configurationElement);
                    } else {
                        frameTypesAllowed.push(configurationElement);
                    }
                }
                // console.log('index2--------' + index2)
                if (index2 == 'frameFinishes') {
                    // console.log("frameFinishes--------" + configurationElement);
                    frameFinishes.push(configurationElement);
                }
            });
        }
    });

    // console.log("topWidths1");
    // console.log(topWidths);



    topLengths = intersect(topLengths);
    topWidths = intersect(topWidths);
    topThicknesses = intersect(topThicknesses);
    topDiameters = intersect(topDiameters);
    topShapes = intersect(topShapes);
    frameFinishes = intersect(frameFinishes);
    topFinishes = intersect(topFinishes);
    topEdgeTypes = intersect(topEdgeTypes);
    //restrictedFrameTypes = intersect(frameTypes);
    frameTypes = dataConfigurationJsonObj['shapeFrameTypes'][selectedTopShape];
    frameTypesGroups = dataConfigurationJsonObj['shapeFrameTypesGroups'][selectedTopShape];

    frameTypesAllowed = frameTypes;
    frameTypesGroupsAllowed = frameTypesGroups;
    // console.log("------------------***********------------" + frameFinishes);
    // console.log("topWidths2");
    // console.log(topWidths);

    //Hard Coding Start
    /*if (selectedTopShape == 'BLB' && !(selectedLength == '350' || selectedLength == '400')) {
        removeItemOnce(topWidths, '120');
    }*/
    if ((selectedTopShape == 'BLB' || selectedTopShape == 'PAPE') && !(selectedLength == '350' || selectedLength == '400')) {
        removeItemOnce(topWidths, '120');
    }
    if (selectedTopShape == 'SQOC' ) {	
        topLengths.push("79");	
        topWidths.push("79");	
        topThicknesses.push("3.6");	
    }
    //Hard Coding End

    topDiametersAllowed = intersect(topDiametersAllowed);
}



function selectFrameByGroup(elementInAction) {
    selectedFrameTypeGroup = $('.frameTypeGroup.choose-cards__active').attr('data-value');
    selectedDiameter = $("input:radio[name='round_diameter']:checked").attr('data-value');
    selectedTopShape = $('.topShape.choose-cards__active').attr('data-value');
    $.ajax({
        url: "/configurator/get-frame-by-group",
        data: { frameGroupId: selectedFrameTypeGroup, length: selectedLength, width: selectedWidth, thickness: selectedThickness, diameter: selectedDiameter, shape: selectedTopShape },
        success: function(result) {
            if (result.success) {
                $('.frameType').removeClass("choose-cards__active");
                $("#frameType_" + result.frameTypeCode).addClass("choose-cards__active");
                selectedFrameType = result.frameTypeCode;
                applySelection1(elementInAction);
            } else {
                alert('An issue.');
                if (frameGroupClickCount == 0) {
                    if (selectedTopShape == 'RD') {
                        var groupDiameterAllowed = $('.frameTypeGroup.choose-cards__active').data('diameter-allowed');
                        showHideRadioElement('topDiameter_', groupDiameterAllowed);
                    } else {
                        showHideRadioElement('topLength_', topLengths);
                        showHideRadioElement('topWidth_', topWidths);
                    }
                    showHideElement('topFinish_', topFinishes);
                    showHideElement('topEdgeType_', topEdgeTypes);
                    showHideRadioElement('topThickness_', topThicknesses);

                    selectFrameByGroup(elementInAction);
                    frameGroupClickCount = 1;
                }
            }
        }
    });

    return selectedFrameType;
}

function applySelection(elementInAction) {
    if ($(elementInAction).hasClass('frameTypeGroup') || $(elementInAction).hasClass('topDiameter')) {
        if (selectedTopShape == 'RD') {
            var groupDiameterAllowed = $('.frameTypeGroup.choose-cards__active').data('diameter-allowed');
            showHideRadioElement('topDiameter_', groupDiameterAllowed);
        }

        frameGroupClickCount = 0;
        selectFrameByGroup(elementInAction);
    } else {
        applySelection1(elementInAction);
    }

}

function applySelection1(elementInAction) {
    homeDesk = false;
    if ($("input:radio[name=rectangular_breedte]:checked").attr('data-value') == '60' || $("input:radio[name=rectangular_breedte]:checked").attr('data-value') == '70') {
        console.log('Home Desk');
        homeDesk = true;
    }

    if ($('.frameType.choose-cards__active').attr('data-same-top-frame-finish') == 'Y') {
        $('#step-five').hide();
        if ($(elementInAction).hasClass('topFinish')) {
            selectedTopFinish = $('.topFinish.choose-cards__active').attr('data-value');

            $('.frameFinish').removeClass("choose-cards__active");
            $('#frameFinish_' + selectedTopFinish).addClass("choose-cards__active");
        } else if ($(elementInAction).hasClass('frameFinish')) {
            selectedFrameFinish = $('.frameFinish.choose-cards__active').attr('data-value');

            $('.topFinish').removeClass("choose-cards__active");
            $('#topFinish_' + selectedFrameFinish).addClass("choose-cards__active");
        } else if ($(elementInAction).hasClass('frameType')) {
            $('.topFinish').removeClass("choose-cards__active");
            $('#topFinish_3041').addClass("choose-cards__active");

            $('.frameFinish').removeClass("choose-cards__active");
            $('#frameFinish_3041').addClass("choose-cards__active");
        }
    } else {
        $('#step-five').show();
    }
    if ($('.frameType.choose-cards__active').attr('data-same-top-frame-finish') == 'Y') {
        selectedFrameFinish = $('.topFinish.choose-cards__active').attr('data-value');
    } else {
        selectedFrameFinish = $('.frameFinish.choose-cards__active').attr('data-value');
    }

    selectedTopShape = $('.topShape.choose-cards__active').attr('data-value');
    selectedFrameType = $('.frameType.choose-cards__active').attr('data-value');
    selectedFrameFinish = $('.frameFinish.choose-cards__active').attr('data-value');
    selectedTopEdgeType = $('.topEdgeType.choose-cards__active').attr('data-value');
    selectedTopFinish = $('.topFinish.choose-cards__active').attr('data-value');

    selectedLength = $("input:radio[name=rectangular_lengte]:checked").attr('data-value');
    selectedWidth = $("input:radio[name=rectangular_breedte]:checked").attr('data-value');
    selectedThickness = $("input:radio[name=rectangular_dikte]:checked").attr('data-value');
    selectedDiameter = $("input:radio[name='round_diameter']:checked").attr('data-value');

    //Hard Coding Start
    if (selectedTopShape == 'RCOC') {
        $('.topFinish').hide();
        $('#topFinish_0007').show();
        $('#topFinish_0006').show();
    } else {
        $('#topFinish_0007').hide();
        $('#topFinish_0006').hide();
    }
    //Hard Coding End


    if ($("#3d_div").is(":visible") && $(elementInAction).hasClass('topShape')) {
        show2dView();
        show3dView();
    }

    // if (selectedTopShape == 'RD') {
    //     if (!$("input[name='round_diameter']").is(':checked')) {
    //         var radioElement = '#topDiameter_' + defaultRoundSelectionJsonObj.topDiameter + ' :radio';
    //         $(radioElement).prop('checked', true);
    //     }
    // }

    showHideElement('topFinish_', topFinishes);
    showHideElement('topEdgeType_', topEdgeTypes);
    showHideRadioElement('topLength_', topLengths);
    showHideRadioElement('topWidth_', topWidths);
    showHideRadioElement('topThickness_', topThicknesses);

    if (selectedTopShape != 'RD') {
        if (homeDesk) {
            showHomeDeskFrames(elementInAction);
        } else {
            hideHomeDeskFrames();
        }
    }

    if (elementInAction && ($(elementInAction).hasClass('topDiameter') || ($(elementInAction).hasClass('topShape') && selectedTopShape == 'RD'))) {
        showHideFrameTypeElement('frameType_', frameTypes, frameTypesAllowed);
        //showHideFrameTypeGroupElement('frameTypeGroup_', frameTypesGroups, frameTypesGroupsAllowed);
        setAllowedSelections();
    }

    setAllowedSelections();
    updateSpecification();
    setAllowedSelections();
    showHideDimensionUL(selectedTopShape);
    setAllowedSelections();

    showHideElement('frameType_', frameTypes);
    showHideElement('frameTypeGroup_', frameTypesGroups);
    showHideElement('topEdgeType_', topEdgeTypes);

    showHideElement('frameFinish_', frameFinishes);
    showHideRadioElement('topLength_', topLengths);
    showHideRadioElement('topWidth_', topWidths);
    showHideRadioElement('topThickness_', topThicknesses);
    showHideElement('topFinish_', topFinishes);
    if (selectedTopShape == 'RD') {
        var groupDiameterAllowed = $('.frameTypeGroup.choose-cards__active').data('diameter-allowed');

        showHideRadioElement('topDiameter_', groupDiameterAllowed);
        selectDeselectDiameterElement('topDiameter_', topDiameters, groupDiameterAllowed);
    }
    showHideElement('topFinish_', topFinishes);

    if (onLoadSkuFound) {
        $('.frameType.choose-cards__active').removeClass('choose-cards__active');

        $('.frameTypeGroup.choose-cards__active').removeClass('choose-cards__active');
        $('.frameFinish.choose-cards__active').removeClass('choose-cards__active');
        $('.topEdgeType.choose-cards__active').removeClass('choose-cards__active');
        $('.topFinish.choose-cards__active').removeClass('choose-cards__active');

        var onLoadSelectionObj = jQuery.parseJSON(onLoadSelection);
        $('#frameType_' + onLoadSelectionObj.frameType).addClass("choose-cards__active");

        $('#frameTypeGroup_' + onLoadFrameTypeGroup).addClass("choose-cards__active");
        $('#frameFinish_' + onLoadSelectionObj.frameFinish).addClass("choose-cards__active");
        $('#topEdgeType_' + onLoadSelectionObj.topEdgeType).addClass("choose-cards__active");
        $('#topFinish_' + onLoadSelectionObj.topFinish).addClass("choose-cards__active");

        onLoadSkuFound = false;
        //applySelection1(elementInAction);

        selectedFrameType = $('.frameType.choose-cards__active').attr('data-value');
        selectedFrameFinish = $('.frameFinish.choose-cards__active').attr('data-value');
        selectedTopEdgeType = $('.topEdgeType.choose-cards__active').attr('data-value');
        selectedTopFinish = $('.topFinish.choose-cards__active').attr('data-value');
    }

    if (selectedTopShape == 'RD') {
        var groupDiameterAllowed = $('.frameTypeGroup.choose-cards__active').data('diameter-allowed');
        showHideRadioElement('topDiameter_', groupDiameterAllowed);
    }

    getProductDetails(elementInAction);
}


function showHomeDeskFrames(elementInAction) {
    $("[rectangularFrame='Y']").hide();
    $("[homeDesk='Y']").show();

    var firstElement = $(".frameType:visible:first");
    if ($(".frameType.choose-cards__active:visible").length == 0) {
        $(firstElement).addClass('choose-cards__active');
    }

    if ($(elementInAction).attr('data-targetgroup') == 'rectangular_breedte') {
        $(".frameType.choose-cards__active:visible").click();
    }
}

function hideHomeDeskFrames() {
    $("[rectangularFrame='Y']").show();
    $("[homeDesk='Y']").hide();

    var firstElement = $(".frameType:visible:first");
    if ($(".frameType.choose-cards__active:visible").length == 0) {
        $(firstElement).addClass('choose-cards__active');
    }
}

function showAllFinishes() {
    if ($('.frameType.choose-cards__active').attr('data-same-top-frame-finish') == 'Y') return;

    $('#more_finishes_link').hide();
    $('#less_finishes_link').show();
    $('.topFinish').show();
}

function showLessFinishes() {
    if ($('.frameType.choose-cards__active').attr('data-same-top-frame-finish') == 'Y') return;

    $('#more_finishes_link').show();
    $('#less_finishes_link').hide();
    $('.topFinish').hide();
    $('.defaultVisible').show();
}

function selectDeselectDiameterElement(elementPrefix, visibleElements, allowedElements) {
    var activeElementFound = false;
    var firstElement;
    $('[id^=' + elementPrefix + ']').each(function() {
        var elementCode = $(this).attr('data-value');
        if ($.inArray(elementCode, visibleElements) === -1) {
            //$(this).hide();
        } else {
            var radioElement = '#' + elementPrefix + elementCode + ' :radio';
            if ($(radioElement).prop('checked') && $.inArray(elementCode, allowedElements) !== -1) {
                activeElementFound = true;
            }

            if ($.inArray(elementCode, allowedElements) !== -1) {
                firstElement = (firstElement) ? firstElement : radioElement;
            }
            //$(this).show();
        }
    });

    if (!activeElementFound) {
        $(firstElement).prop('checked', true);
        if (typeof $(firstElement).attr('data-value') != "undefined") {
            $('#diameter_label').html($(firstElement).attr('data-value') + defaultDimensionUnit);
        }
    }
}

function showHideFrameTypeElement(elementPrefix, visibleElements, allowedElements) {
    var activeElementFound = false;
    var firstElement;
    var preSelectedElement = null;
    $('[id^=' + elementPrefix + ']').each(function() {
        var elementCode = $(this).attr('data-value');

        if ($(this).hasClass("choose-cards__active")) {
            preSelectedElement = this;
        }
        $(this).removeClass("choose-cards__active");

        if ($.inArray(elementCode, visibleElements) === -1) {
            $(this).hide();
        } else {
            console.log(selectedTopShape + " || " + elementPrefix);
            if (selectedTopShape == 'RD' && elementPrefix == 'frameType_') {
                var from = $("#diameterRange_" + elementCode).attr('data-range-from');
                var to = $("#diameterRange_" + elementCode).attr('data-range-to');
                console.log("from:" + from + " || to:" + to + " || selectedDiameter:" + selectedDiameter);
                if (!(selectedDiameter >= from && selectedDiameter <= to)) {
                    $(this).hide();
                    return true;
                }
            }

            if ($(this).hasClass("choose-cards__active") && $.inArray(elementCode, allowedElements) !== -1) {
                activeElementFound = true;
                firstElement = (firstElement) ? firstElement : this;
            }

            if ($.inArray(elementCode, allowedElements) !== -1) {
                firstElement = (firstElement) ? firstElement : this;
            }

            $(this).show();
        }
    });

    if (!activeElementFound) {
        if ($(preSelectedElement).is(":visible") && $.inArray($(preSelectedElement).attr('data-value'), allowedElements) !== -1) {
            $(preSelectedElement).addClass("choose-cards__active");
        } else {
            $(firstElement).addClass("choose-cards__active");
        }
    }
}

//Not in use
function showHideFrameTypeGroupElement(elementPrefix, visibleElements, allowedElements) {
    var activeElementFound = false;
    var firstElement;
    var preSelectedElement = null;
    $('[id^=' + elementPrefix + ']').each(function() {
        var elementCode = $(this).attr('data-value');

        if ($(this).hasClass("choose-cards__active")) {
            preSelectedElement = this;
        }
        $(this).removeClass("choose-cards__active");

        if ($.inArray(elementCode, visibleElements) === -1) {
            $(this).hide();
        } else {
            // console.log(selectedTopShape + " || " + elementPrefix);
            // if (selectedTopShape == 'RD' && elementPrefix == 'frameType_') {
            //     var from = $("#diameterRange_" + elementCode).attr('data-range-from');
            //     var to = $("#diameterRange_" + elementCode).attr('data-range-to');
            //     console.log("from:" + from + " || to:" + to + " || selectedDiameter:" + selectedDiameter);
            //     if (!(selectedDiameter >= from && selectedDiameter <= to)) {
            //         $(this).hide();
            //         return true;
            //     }
            // }

            if ($(this).hasClass("choose-cards__active") && $.inArray(elementCode, allowedElements) !== -1) {
                activeElementFound = true;
                firstElement = (firstElement) ? firstElement : this;
            }

            if ($.inArray(elementCode, allowedElements) !== -1) {
                firstElement = (firstElement) ? firstElement : this;
            }

            $(this).show();
        }
    });

    if (!activeElementFound) {
        if ($(preSelectedElement).is(":visible") && $.inArray($(preSelectedElement).attr('data-value'), allowedElements) !== -1) {
            $(preSelectedElement).addClass("choose-cards__active");
        } else {
            $(firstElement).addClass("choose-cards__active");
        }
    }
}

function getSelectionRestrictions(length, width, thickness, diameter, shape, topFinish, edgeType, frameType, frameFinish) {
    var selectionJson = {};
    jQuery.each(restrictionsJsonObj, function(index1, configuration) {
        if (index1 == 'topLengthRestrictions') {
            selectionJson[index1] = configuration[length];
        }

        if (index1 == 'topWidthRestrictions') {
            selectionJson[index1] = configuration[width];
        }

        if (index1 == 'topThicknessRestrictions') {
            selectionJson[index1] = configuration[thickness];
        }

        if (index1 == 'topDiameterRestrictions') {
            selectionJson[index1] = (configuration[diameter]) ? configuration[diameter] : [];
        }

        if (index1 == 'topShapeRestrictions') {
            selectionJson[index1] = configuration[shape];
        }

        if (index1 == 'topFinishRestrictions') {
            selectionJson[index1] = configuration[topFinish];
        }

        if (index1 == 'topEdgeTypeRestrictions') {
            selectionJson[index1] = configuration[edgeType];
        }

        if (index1 == 'frameTypeRestrictions') {
            selectionJson[index1] = configuration[frameType];
        }

        if (index1 == 'frameFinishRestrictions') {
            selectionJson[index1] = configuration[frameFinish];
        }
    });

    return selectionJson;
}

function showHideElement(elementPrefix, allowedElements) {
    var activeElementFound = false;
    var firstElement;

    $('[id^=' + elementPrefix + ']').each(function() {
        var elementCode = $(this).attr('data-value');
        if (elementPrefix == "frameTypeGroup_" || elementPrefix == "topDiameter_") elementCode = parseInt(elementCode);

        if ($.inArray(elementCode, allowedElements) > -1) {
            if ($(this).hasClass("choose-cards__active")) {
                activeElementFound = true;
            }
            firstElement = (firstElement) ? firstElement : this;

            $(this).show();
        } else {
            if (elementPrefix == "frameTypeGroup_") {
                //console.log("Not allowed:"+$.inArray(elementCode, allowedElements));
            }
            $(this).hide();
            $(this).removeClass("choose-cards__active");
        }
    });

    if (!activeElementFound) {
        $(firstElement).addClass("choose-cards__active");
    }
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function showHideRadioElement(elementPrefix, allowedElements) {
    var activeElementFound = false;

    if (elementPrefix == "topDiameter_") {
        //console.log("topDiameter_");
        //console.log(allowedElements);
    }
    var firstElement;
    $('[id^=' + elementPrefix + ']').each(function() {
        var elementCode = $(this).attr('data-value');
        if (elementPrefix == "topDiameter_") {
            // console.log(elementCode);
        }

        if (elementPrefix == "topDiameter_") elementCode = parseInt(elementCode);
        if ($.inArray(elementCode, allowedElements) === -1) {
            $(this).hide();
            // console.log('hiding..' + elementCode);
        } else {
            var radioElement = '#' + elementPrefix + elementCode + ' :radio';
            if(selectedTopShape == "SQOC" && elementPrefix == "topThickness_") radioElement = '#' + elementPrefix + '3PNT6 :radio'
            if ($(radioElement).prop('checked')) {
                activeElementFound = true;
            }

            firstElement = (firstElement) ? firstElement : radioElement;
            $(this).show();
        }
    });

    if (!activeElementFound) {
        $(firstElement).prop('checked', true);
        $(firstElement).parent().parent().parent().parent().find('.selector__bar--value span:first-of-type').html($(firstElement).attr('data-value') + defaultDimensionUnit);
    }
}

function showHideDimensionUL(selectedTopShape) {
    if (selectedTopShape == 'RD') {
        $('#diameter_div').show();
        $('#length_div').hide();
        $('#width_div').hide();
    } else {
        $('#diameter_div').hide();
        $('#length_div').show();
        $('#width_div').show();
    }
}

function updateSpecification() {
    var selectedTopShape = $('.topShape.choose-cards__active').attr('data-value');
    var selectedFrameType = $('.frameType.choose-cards__active').attr('data-value');
    var selectedFrameFinish = $('.frameFinish.choose-cards__active').attr('data-value');
    var selectedTopEdgeType = $('.topEdgeType.choose-cards__active').attr('data-value');
    var selectedTopFinish = $('.topFinish.choose-cards__active').attr('data-value');

    var selectedLength = $("input:radio[name=rectangular_lengte]:checked").attr('data-label');
    var selectedWidth = $("input:radio[name=rectangular_breedte]:checked").attr('data-label');
    var selectedThickness = $("input:radio[name=rectangular_dikte]:checked").attr('data-label');
    var selectedDiameter = $("input:radio[name=round_diameter]:checked").attr('data-label');

    if (selectedTopShape == 'RD') {
        // $("#topLengthSpec_li").hide();
        // $("#topWidthSpec_li").hide();
        // $("#topDiameterSpec_li").show();

        $(".topLengthSpec").hide();
        $(".topWidthSpec").hide();
        $(".topDiameterSpec").show();
    } else {
        // $("#topLengthSpec_li").show();
        // $("#topWidthSpec_li").show();
        // $("#topDiameterSpec_li").hide();

        $(".topLengthSpec").show();
        $(".topWidthSpec").show();
        $(".topDiameterSpec").hide();
    }

    var nameStr = dataConfigurationJsonObj.topFinishes[selectedTopFinish];
    if (typeof nameStr != "undefined") {
        $("*[data-label='topMaterialSpecLabel']").html(nameStr.substr(0, nameStr.indexOf(' ')));
    }
    $("*[data-label='topShapeSpecLabel']").html(dataConfigurationJsonObj.topShapes[selectedTopShape]);
    $("*[data-label='topLengthSpecLabel']").html(selectedLength + defaultDimensionUnit);
    $("*[data-label='topWidthSpecLabel']").html(selectedWidth + defaultDimensionUnit);
    $("*[data-label='topThicknessSpecLabel']").html(selectedThickness + defaultDimensionUnit);
    $("*[data-label='topDiameterSpecLabel']").html(selectedDiameter + defaultDimensionUnit);
    $("*[data-label='topFinishSpecLabel']").html(dataConfigurationJsonObj.topFinishes[selectedTopFinish]);
    $("*[data-label='topEdgeTypeSpecLabel']").html(dataConfigurationJsonObj.topEdgeTypes[selectedTopEdgeType]);
    $("*[data-label='frameTypeSpecLabel']").html(dataConfigurationJsonObj.frameTypes[selectedFrameType]);
    $("*[data-label='frameFinishSpecLabel']").html(dataConfigurationJsonObj.frameFinishes[selectedFrameFinish]);

    $('input:radio[name=round_diameter]:checked').parent().parent().parent().parent().find('.selector__bar--value span:first-of-type').html(selectedDiameter + defaultDimensionUnit);
    $('input:radio[name=rectangular_lengte]:checked').parent().parent().parent().parent().find('.selector__bar--value span:first-of-type').html(selectedLength + defaultDimensionUnit);
    $('input:radio[name=rectangular_breedte]:checked').parent().parent().parent().parent().find('.selector__bar--value span:first-of-type').html(selectedWidth + defaultDimensionUnit);
    $('input:radio[name=rectangular_dikte]:checked').parent().parent().parent().parent().find('.selector__bar--value span:first-of-type').html(selectedThickness + defaultDimensionUnit);

    // $("#topMaterialSpecLabel").html(nameStr.substr(0, nameStr.indexOf(' ')));
    // $("#topShapeSpecLabel").html(dataConfigurationJsonObj.topShapes[selectedTopShape]);
    // $("#topLengthSpecLabel").html(dataConfigurationJsonObj.topLengths[selectedLength]+defaultDimensionUnit);
    // $("#topWidthSpecLabel").html(dataConfigurationJsonObj.topWidths[selectedWidth]+defaultDimensionUnit);
    // $("#topThicknessSpecLabel").html(dataConfigurationJsonObj.topThicknesses[selectedThickness]+defaultDimensionUnit);
    // $("#topDiameterSpecLabel").html(dataConfigurationJsonObj.topDiameters[selectedDiameter]+defaultDimensionUnit);
    // $("#topFinishSpecLabel").html(dataConfigurationJsonObj.topFinishes[selectedTopFinish]);
    // $("#topEdgeTypeSpecLabel").html(dataConfigurationJsonObj.topEdgeTypes[selectedTopEdgeType]);
    // $("#frameTypeSpecLabel").html(dataConfigurationJsonObj.frameTypes[selectedFrameType]);
    // $("#frameFinishSpecLabel").html(dataConfigurationJsonObj.frameFinishes[selectedFrameFinish]);
}

function getProductDetails(elementInAction) {
    var selectedTopShape = $('.topShape.choose-cards__active:visible').attr('data-value');
    var selectedFrameType = $('.frameType.choose-cards__active:visible').attr('data-value');
    var selectedFrameFinish = $('.frameFinish.choose-cards__active:visible').attr('data-value');
    var selectedTopEdgeType = $('.topEdgeType.choose-cards__active:visible').attr('data-value');
    var selectedTopFinish = $('.topFinish.choose-cards__active:visible').attr('data-value');

    if (selectedTopFinish == undefined) {
        $('#more_finishes_button').click();
        var selectedTopFinish = $('.topFinish.choose-cards__active:visible').attr('data-value');
    }

    if ($('.frameType.choose-cards__active').attr('data-same-top-frame-finish') == 'Y') {
        selectedFrameFinish = $('.topFinish.choose-cards__active:visible').attr('data-value');
    }

    var selectedLength = $("input:radio[name=rectangular_lengte]:checked").attr('data-value');
    var selectedWidth = $("input:radio[name=rectangular_breedte]:checked").attr('data-value');
    var selectedThickness = $("input:radio[name=rectangular_dikte]:checked").attr('data-value');
    var selectedDiameter = $("input:radio[name=round_diameter]:checked").attr('data-value');
    if(selectedTopShape == "SQOC") selectedThickness = "3.6";
    var queryString = 'shape=' + selectedTopShape + '&edgeType=' + selectedTopEdgeType + '&topfinish=' + selectedTopFinish + '&frameType=' + selectedFrameType + '&frameFinish=' + selectedFrameFinish + '&topThickness=' + selectedThickness;
    var sku = '';
    if (selectedTopShape == 'RD') {
        if (typeof selectedTopFinish == 'undefined') selectedTopFinish = '3041';
        sku = 'T-RD-' + selectedDiameter + '-' + selectedThickness + '-' + selectedTopFinish + '-' + selectedTopEdgeType + '-' + selectedFrameType + '-' + selectedFrameFinish;
        queryString = queryString + '&topDiameter=' + selectedDiameter;
    } else {
        if (typeof selectedTopFinish == 'undefined') selectedTopFinish = '3041';
        sku = 'T-' + selectedTopShape + '-' + selectedLength + '-' + selectedWidth + '-' + selectedThickness + '-' + selectedTopFinish + '-' + selectedTopEdgeType + '-' + selectedFrameType + '-' + selectedFrameFinish;
        queryString = queryString + '&topLength=' + selectedLength + '&topWidth=' + selectedWidth;
    }

    var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + queryString;
    window.history.pushState({ path: refresh }, '', refresh);

    //configImage = selectedTopShape+'_'+selectedTopEdgeType+'_'+selectedTopFinish+'_'+selectedFrameType+'_'+selectedFrameFinish+'.jpg';
    //$('#configurator__image').attr('src', assetsBaseUrl+'/Images/configurator/dining-tables/'+configImage);
    //$('#configurator__image--large').attr('src', assetsBaseUrl+'/Images/configurator/dining-tables/'+configImage);
    sku = sku.replace(".","PNT");
    $.ajax({
        url: "/" + currentLocale + "/get-price/" + sku,
        //data: {sku : sku},
        success: function(result) {
            if (result.success) {
                configImage = "T-" + selectedTopShape + '-' + selectedTopFinish + '-' + selectedTopEdgeType + '-' + selectedFrameType + '-' + selectedFrameFinish;
                $('#configurator__image').attr('src', '/dining-table-configurator-image/' + configImage);
                $('#configurator__image--large').attr('src', '/dining-table-configurator-image/' + configImage);

                emersyaConfig = result.emersyaConfig;
                if ($("#3d_div").is(":visible")) {
                    if ($(elementInAction).hasClass('topFinish')) {
                        customSwitchConfigurationGroup("topFinish", selectedTopFinish);
                    } else if ($(elementInAction).hasClass('topEdgeType')) {
                        customSwitchConfigurationGroup("topEdgeType", selectedTopEdgeType);
                    } else if ($(elementInAction).hasClass('frameType') || $(elementInAction).hasClass('frameTypeGroup')) { //missing
                        customSwitchConfigurationGroup("frameType", selectedFrameType);
                    } else if ($(elementInAction).hasClass('frameFinish')) {
                        customSwitchConfigurationGroup("frameFinish", selectedFrameFinish);
                    }
                }

                clickCount = 0;
                if (result.inStock) {
                    $("#product_delivery_time_wrapper").hide();
                    $("#product_stock_wrapper").show();
                } else {
                    $("#product_delivery_time_wrapper").show();
                    $("#product_stock_wrapper").hide();
                    let txt = result.deliveryWeek + "-" + (result.deliveryWeek + 1);
                    $("#product_delivery_time").html(txt);
                }

                $("#configurator__price1").html(defaultCurrency + ' ' + result.price);
                $("#configurator__price11").html(defaultCurrency + ' ' + result.price);

                var quantity = $(".qty").val();
                $("#configurator__price2").html(defaultCurrency + ' ' + (parseFloat(result.price) * parseInt(quantity)));
                $("#configurator_product_id").val(result.productId);

                $('#configurator__image').attr('alt', result.imageAltText);
                $('#configurator__image--large').attr('alt', result.imageAltText);
                $("*[data-label='skuSpecLabel']").html(result.sku);
                if (result.inStock) {
                    $('#stock_availability_message_span').show();
                } else {
                    $('#stock_availability_message_span').hide();
                }
            } else if (clickCount == 5) {
                alert("Something went wrong.");
                clickCount = 0;
                $.ajax({
                    url: "/configurator/log-configurator-issue",
                    data: { sku: sku },
                    success: function(result) {
                        if (result.success) {
                            console.log("SKU [" + sku + "] issue logged successfully.");
                        }
                    }
                });
                console.log(window.location);
                //window.location = window.location.pathname;
            } else {
                //alert('Product not found.');
                clickCount++;
                applySelection(elementInAction);
            }
        }
    });
}

/******/
(function(modules) { // webpackBootstrap
    /******/ // The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId])
        /******/
            return installedModules[moduleId].exports;
        /******/
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/
            exports: {},
            /******/
            id: moduleId,
            /******/
            loaded: false
                /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/
        module.loaded = true;
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
    }

    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ // __webpack_public_path__
    /******/
    __webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/
    return __webpack_require__(0);
    /******/
})
/************************************************************************/
/******/
([
    /* 0 */
    /***/
    (function(module, exports, __webpack_require__) {

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
        // handleCookies()

        svg4everybody();

        $(function() {
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
        applySelection(this);


        /***/
    }),
    /* 1 */
    ,
    /* 2 */
    /***/
    (function(module, exports) {

        function mainNavigation() {

            $(document).ready(function() {

                "use strict";

                var MOBILE_OPEN = 'mobile-dropdown-open';

                var screenSize = $(window).innerWidth();
                $(window).resize(function() {
                    screenSize = $(window).innerWidth();
                    if (screenSize > 992) {
                        $('.main-nav__item--with-dropdown').each(function() {
                            $(this).removeClass(MOBILE_OPEN);
                            $(this).find('.sub-nav').css('height', 'auto');
                        });
                        $('html').removeClass('nav-open');
                        $('.main-nav').removeClass('open');
                        $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').removeClass('open');
                    } else {
                        $('.main-nav__item--with-dropdown').each(function() {
                            // $(this).find('.sub-nav').css('height', 0);
                        });
                    }
                    return screenSize;
                });

                $('.main-nav__item--with-dropdown').click(function() {
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
                            }, 400, function() {
                                sub_nav.height('auto');
                            });
                        }
                    }
                });

                $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function() {
                    $(this).toggleClass('open');
                    $('html').toggleClass('nav-open');
                    $('.main-nav').toggleClass('open');
                });
            });
        }

        module.exports = mainNavigation;

        /***/
    }),
    /* 3 */
    /***/
    (function(module, exports) {

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
                        }, 400, function() {
                            $collapser.height('auto');
                        });
                    }
                }

                // check to see if it's part of an accordion and collapse all other trigger elements with the same accordion value
                var _this = this;

                $('.' + COLLAPSER_EXPANDED + '[data-accordion=' + this.getAttribute('data-accordion') + ']').each(function(index) {
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
                $(COLLAPSER_TRIGGER).each(function(i) {
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

        /***/
    }),
    /* 4 */
    /***/
    (function(module, exports) {

        function filterMobile() {

            if (window.innerWidth < 768) {
                $(".filter__btn").on('click', function() {
                    $(this).toggleClass('filter-open');
                });
            } else {
                $(".filter__btn").on('click', function() {
                    Event.preventDefault();
                });
            }
        }

        module.exports = filterMobile;

        /***/
    }),
    /* 5 */
    /***/
    (function(module, exports) {

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
                $(ZOOMIMAGE).imagesLoaded({ background: true }).done(function(instance) {
                    $('.fabric-module__image--loader').hide();
                    $(ZOOMIMAGE).fadeTo(96, 1, function() {
                        $(ZOOMIMAGEBACKUP).css("background-image", "url(" + url + ")");
                        $(ZOOMIMAGE).css("opacity", 0);
                    });
                });
            }

            $(CHOOSECARD).unbind().on('click', onClick);

            function onClick(event) {
                if ($(event.target).hasClass('icon-info') || $(event.target).parent().hasClass('icon-info')) {
                    return false;
                }
                if ($(event.target).hasClass('choose-cards__item--more') || $(event.target).parent().hasClass('choose-cards__item--more')) {
                    // IF CLICKED ON RESIZE ICON
                    var $tempTarget = $(this).data('target'),
                        $newUrl = '/themes/studio-henk-v2/dist/assets/toolkit/images/fabric/large/' + $tempTarget + '.jpg',
                        $collection = $(this).data('collection'),
                        $collectionValue = $collection.replace(/\-/g, ' '),
                        $createTitle = $tempTarget.replace(/\-/g, ' ');
                    $(ZOOMIMAGE).css("background-image", "url(" + $newUrl + ")");
                    loadBackgroundFirst($newUrl);
                    $(FABRICMODULE).modal("show");
                    $('#fabric-module .selector__bar--value span:first-of-type').html($collectionValue);
                    $('#' + $collection).prop('checked', true);
                    $(FABRICMODULE_THUMBS + '[data-targetgroup="fabric-module-collection"]').each(function(index) {
                        $(this).hide();
                    });
                    $(FABRICMODULE_THUMBS + '[data-target=' + $collection + ']').each(function(index) {
                        $(this).show();
                    });
                    $(CHOOSECARD + '[data-targetgroup="fabric-module-card"]').each(function(index) {
                        $(this).removeClass(ACTIVE_CHOOSECARD);
                    });
                    $(FABRICCHOOSECARD + '[data-target=' + this.getAttribute('data-target') + ']').each(function(index) {
                        $(this).addClass(ACTIVE_CHOOSECARD);
                    });
                    $(FABRICTITLE).html($createTitle);
                    // DON'T CHANGE CHOOSECARD ACTIVE STATE
                    return false;
                }
                var $cardValue = this.getAttribute('data-value');
                $(CHOOSECARD + '[data-targetgroup=' + this.getAttribute('data-targetgroup') + ']').each(function(index) {
                    $(this).removeClass(ACTIVE_CHOOSECARD);
                });
                $(SELECTOR_BAR + '[data-target=' + this.getAttribute('data-targetgroup') + ']').each(function(index) {
                    $(this).find('.selector__bar--value span:first-of-type').html($cardValue);
                });

                $(this).toggleClass(ACTIVE_CHOOSECARD);

                var STEP = $(this).closest(".steps").attr("id");

                if (STEP === "step-one") {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'ga-event',
                        'category': 'configurator',
                        'action': 'step 1',
                        'label': $(this).find(".choose-cards__item--label").text()
                    });
                } else if (STEP === "step-two") {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'ga-event',
                        'category': 'configurator',
                        'action': 'step 2',
                        'label': $(this).find(".choose-cards__item--label").text()
                    });
                } else if (STEP === "step-three") {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'ga-event',
                        'category': 'configurator',
                        'action': 'step 3',
                        'label': $(this).find(".choose-cards__item--label").text()
                    });
                } else if (STEP === "step-four") {

                    // console.log(this);


                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'ga-event',
                        'category': 'configurator',
                        'action': 'step 4',
                        'label': $(this).find(".choose-cards__item--label").text()
                    });
                } else if (STEP === "step-five") {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'ga-event',
                        'category': 'configurator',
                        'action': 'step 5',
                        'label': $(this).find(".choose-cards__item--label").text()
                    });
                } else if (STEP === "step-five") {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'ga-event',
                        'category': 'configurator',
                        'action': 'step 6',
                        'label': $(this).find(".choose-cards__item--label").text()
                    });
                }

                applySelection(this);
            }
        }

        module.exports = chooseCard;

        /***/
    }),
    /* 6 */
    /***/
    (function(module, exports) {

        function toggleSelector() {

            "use strict";

            var TOGGLE_BTN = '.toggle-js',
                TOGGLE_ACTIVE = 'toggle-active',
                TOGGLE_CONTAINER = '.toggle-container',
                TOGGLE_CONTAINER_EXPANDED = 'toggle-container--expanded';

            $(TOGGLE_BTN).on('click', onClick);

            //Not in use - Prateek
            function onClick(event) {
                /*
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
                */
                //console.log(this);
                //applySelection(this);
            }

        }

        module.exports = toggleSelector;

        /***/
    }),
    /* 7 */
    /***/
    (function(module, exports) {

        function radioMenu() {

            "use strict";

            var RADIO_ITEM = '.radio-menu__btn',
                RADIO_CHOOSE_CARDS = '.radio-menu__choose-cards';

            //$(RADIO_ITEM).on('click', onClick);

            function onClick(event) {
                $(RADIO_CHOOSE_CARDS + '[data-targetgroup=' + this.getAttribute('data-targetgroup') + ']').each(function(index) {
                    $(this).hide();
                });
                $(RADIO_CHOOSE_CARDS + '[data-target=' + this.getAttribute('data-target') + ']').each(function(index) {
                    $(this).show();
                });

                //$(this).off();
                //console.log(this);
                //applySelection(this);
            }
        }

        module.exports = radioMenu;

        /***/
    }),
    /* 8 */
    /***/
    (function(module, exports) {

        function modal() {

            "use strict";

            $('.modal').on('shown.bs.modal', function(e) {
                $('.product-slider__view').slick("setPosition", 0);
            });
        }

        module.exports = modal;

        /***/
    }),
    /* 9 */
    /***/
    (function(module, exports) {

        function slickSlider() {

            "use strict";

            var PRODCUT_SLIDER_VIEW = '.product-slider__view';

            $('.product-slider__view').slick({
                slidesToShow: 1,
                draggable: false,
                prevArrow: $('slick-prev'),
                nextArrow: $('slick-next')
            });

            $('li.product-slider__thumbnail[data-slide]').click(function(e) {
                e.preventDefault();
                var currentSlide = $(PRODCUT_SLIDER_VIEW).slick('slickCurrentSlide');
                var slideIndex = $(this).data('slide');
                if (currentSlide != slideIndex) {
                    $('.product-slider__view').slick('slickGoTo', slideIndex);
                }
            });
            $('.slick-next').click(function(e) {
                $(PRODCUT_SLIDER_VIEW).slick('slickGoTo', $(PRODCUT_SLIDER_VIEW).slick('slickCurrentSlide') + 1);
            });
            $('.slick-prev').click(function(e) {
                $(PRODCUT_SLIDER_VIEW).slick('slickGoTo', $(PRODCUT_SLIDER_VIEW).slick('slickCurrentSlide') - 1);
            });
        }

        module.exports = slickSlider;

        /***/
    }),
    /* 10 */
    /***/
    (function(module, exports) {

        function qtyPlus() {

            "use strict";

            var QTYPLUS = '.qtyplus',
                QTYMINUS = '.qtyminus';

            $(QTYPLUS).click(function(e) {
                e.preventDefault();
                var fieldName = $(this).attr('field');
                var currentVal = parseInt($('input[name=' + fieldName + ']').val());
                if (!isNaN(currentVal)) {
                    $('input[name=' + fieldName + ']').val(currentVal + 1);
                } else {
                    $('input[name=' + fieldName + ']').val(1);
                }

                var quantity = $(".qty").val();
                var price = $("#configurator__price1").html().substr(2);
                $("#configurator__price2").html(defaultCurrency + ' ' + (parseFloat(price) * parseInt(quantity)));
            });

            $(QTYMINUS).click(function(e) {
                e.preventDefault();
                var fieldName = $(this).attr('field'),
                    currentVal = parseInt($('input[name=' + fieldName + ']').val()),
                    ZERO_ONE = $(this).hasClass('oak');
                if (!ZERO_ONE) {
                    if (!isNaN(currentVal) && currentVal > 1) {
                        $('input[name=' + fieldName + ']').val(currentVal - 1);
                    } else {
                        $('input[name=' + fieldName + ']').val(1);
                    }
                }

                var quantity = $(".qty").val();
                var price = $("#configurator__price1").html().substr(2);
                $("#configurator__price2").html(defaultCurrency + ' ' + (parseFloat(price) * parseInt(quantity)));
            });
        }

        module.exports = qtyPlus;

        /***/
    }),
    /* 11 */
    /***/
    (function(module, exports) {

        function sizeMenu() {

            "use strict";

            var SIZE_ITEM = '.size-menu__btn',
                SELECTOR_BAR = '.selector__bar',
                COLLAPSER_EXPANDED = 'collapser--expanded';

            $(SIZE_ITEM).on('click', onClick);

            function onClick(event) {
                var $sizeValue = this.getAttribute('data-value');
                var $collapser = $('#' + this.getAttribute('data-targetgroup'));
                $(SELECTOR_BAR + '[data-target=' + this.getAttribute('data-targetgroup') + ']').each(function(index) {
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
                            }, 400, function() {
                                $collapser.height('auto');
                            });
                        }
                    }
                });

                //console.log('Radio Click');
                //console.log($(this).siblings(":radio"))

                $(this).siblings(":radio").prop('checked', true);

                var SELECTOR_CONTENT = $(this).closest(".selector__content").attr("id");
                var SELECTOR_TYPE = null;
                if (SELECTOR_CONTENT === "length_div") {
                    SELECTOR_TYPE = "length";
                } else if (SELECTOR_CONTENT === "width_div") {
                    SELECTOR_TYPE = "width";
                } else if (SELECTOR_CONTENT === "thickness_div") {
                    SELECTOR_TYPE = "thickness";
                }
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'ga-event',
                    'category': 'configurator',
                    'action': 'step 6',
                    'label': SELECTOR_TYPE
                });

                applySelection(this);
            }
        }

        module.exports = sizeMenu;

        /***/
    }),
    /* 12 */
    /***/
    (function(module, exports) {

        function autoCollapser() {

            "use strict";

            var AUTO_COLLAPSE = '.auto_collapse';

            $(AUTO_COLLAPSE).each(function(index) {
                var children = $(this).children(),
                    arrShow = [],
                    arrHide = [];
                for (var i = 0; i < children.length; i++) {
                    if (i < 2) {
                        arrShow.push(children[i]);
                        children[i].remove();
                    } else {
                        arrHide.push(children[i]);
                        children[i].remove();
                    }
                }
                $('.auto_collapse').append(arrShow);
                $('#more-description').append(arrHide);
            });
        }

        module.exports = autoCollapser;

        /***/
    }),
    /* 13 */
    /***/
    (function(module, exports) {

        function popover() {

            "use strict";

            $('[data-toggle="popover"]').popover({
                placement: 'top',
                html: true
            });
            $(document).on("click", ".popover .popover__close", function() {
                $(this).parents(".popover").popover('hide');
            });
        }

        module.exports = popover;

        /***/
    }),
    /* 14 */
    /***/
    (function(module, exports) {

        function quickCart() {

            "use strict";

            var QUICK_CARTLAUNCH = '.quick-cart__launch',
                QUICK_CART = '#quick-cart';

            $('body').click(function(e) {
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

        /***/
    }),
    /* 15 */
    /***/
    (function(module, exports) {

        function imageZoom() {

            "use strict";

            $('.no-touchevents .fabric-module__image')
                // tile mouse actions
                .on('mouseover', function() {
                    $(this).children('.fabric-module__image--zoom').css({ 'transform': 'scale(2.8)' });
                }).on('mouseout', function() {
                    $(this).children('.fabric-module__image--zoom').css({ 'transform': 'scale(1)' });
                }).on('mousemove', function(e) {
                    $(this).children('.fabric-module__image--zoom').css({ 'transform-origin': (e.pageX - $(this).offset().left) / $(this).width() * 100 + '% ' + (e.pageY - $(this).offset().top) / $(this).height() * 100 + '%' });
                });
        }

        module.exports = imageZoom;

        /***/
    }),
    /* 16 */
    /***/
    (function(module, exports) {

        function isMobileLayout() {
            return window.innerWidth < 768;
        }

        module.exports = isMobileLayout;

        /***/
    })
    /******/
]);
//# sourceMappingURL=toolkit.js.map