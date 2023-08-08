var viewerEventListener =  function(event){
    if(event.data && event.data.action == 'onStateChange'){
        if(event.data.state.viewerState == 'loaded' || event.data.state.viewerState == 'fallbackloaded'){
            console.log('iFrame loaded successfully.');
            viewerActive = true;
            startConfigurationGroup();
        }
    }
    else if(event.data.action == 'onScreenshots'){
        $.each(event.data.screenshots, function(i, data) {
            if(i == 0 && generateListImage == 'YES'){
                var productId = $("#configurator_product_id").val();
                $("#slider_image_0").attr("src", data);

                $.ajax({
                    type:'POST',
                    url: '/associate-emersya-image',
                    data: {'ImageData': data, 'ProductId': productId},
                    cache: false
                });

            }
        });
    }
    else if(event.data && event.data.action == 'onSuccess' && generateListImage == 'YES'){
        console.log(cameraPosition);
        viewerIframe.postMessage({
            action : 'getForcedResolutionScreenshots',
            width : 1024,
            height : 1024,
            takeBackground : true,
            cameras : cameraPosition
        },'*');
    }
    else if(event.data && event.data.action == 'onError'){
        console.log(event);
    }
};

var startConfigurationGroup = function () {
    /*
    var jsonArr = [];

    if(selectedTopShape == 'BLB'){
        topEdgeTypes.push('STD');
    }

    for (var i = 0; i < topEdgeTypes.length; i++) {
        if(selectedTopShape == 'RD') {
            var roundFrameDiameterRangeJsonObj = jQuery.parseJSON(roundFrameDiameterRange);
            var diameterRange = roundFrameDiameterRangeJsonObj[selectedFrameType];
            var allDiameterRanges = jQuery.parseJSON(diameterRanges);

            if(selectedTopEdgeType == topEdgeTypes[i]){
                for(var ii = 0; ii < allDiameterRanges.length; ii++){
                    if(diameterRange == allDiameterRanges[ii]){
                        jsonArr.push({
                            configurationName: "top-finish-"+selectedTopFinish,
                            groupName: "top-edge-type-"+topEdgeTypes[i]+"-"+diameterRange,
                        })
                    }
                    else{
                        jsonArr.push({
                            configurationName: "top-finish-hidden",
                            groupName: "top-edge-type-"+topEdgeTypes[i]+"-"+allDiameterRanges[ii],
                        })
                    }
                }
            }
            else{
                for(var ii = 0; ii < allDiameterRanges.length; ii++){
                    jsonArr.push({
                        configurationName: "top-finish-hidden",
                        groupName: "top-edge-type-"+topEdgeTypes[i]+"-"+allDiameterRanges[ii],
                    })
                }
            }
        }
        else{
            if(selectedTopEdgeType == topEdgeTypes[i]){
                jsonArr.push({
                    configurationName: "top-finish-"+selectedTopFinish,
                    groupName: "top-edge-type-"+topEdgeTypes[i],
                })
            }
            else{
                jsonArr.push({
                    configurationName: "top-finish-hidden",
                    groupName: "top-edge-type-"+topEdgeTypes[i],
                })
            }
        }
    }

    var frameTypes1 = frameTypes;
    if(homeDesk){
        frameTypes1 = ['B600', 'NC600', 'SX600'];
    }
    else{
        frameTypes1 = arrayRemove(frameTypes1, 'B600');
        frameTypes1 = arrayRemove(frameTypes1, 'NC600');
        frameTypes1 = arrayRemove(frameTypes1, 'SX600');
    }

    for (var i = 0; i < frameTypes1.length; i++) {
        if(selectedFrameType == frameTypes1[i]){
            jsonArr.push({
                configurationName: "frame-finish-"+selectedFrameFinish,
                groupName: "frame-type-"+frameTypes1[i],
            })
        }
        else{
            jsonArr.push({
                configurationName: "frame-finish-hidden",
                groupName: "frame-type-"+frameTypes1[i],
            })
        }
    }

    console.log(jsonArr);
    viewerIframe.postMessage({
        action : 'setMaterialsGroupsConfigurations',
        values : jsonArr
    }, '*');
    */


    var jsonArr = [];
    Object.keys(emersyaConfig).forEach(function(k){
        //console.log(k + ' - ' + emersyaConfig[k]);
        jsonArr.push({
            configurationName: emersyaConfig[k],
            groupName: k,
        })
    });

    console.log(jsonArr);
    viewerIframe.postMessage({
        action : 'setMaterialsGroupsConfigurations',
        values : jsonArr
    }, '*');
};

function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
}

var customSwitchConfigurationGroup = function (type, configurationName) {
    startConfigurationGroup();
    $(".product-slider__view").slick('slickGoTo', 0);
};