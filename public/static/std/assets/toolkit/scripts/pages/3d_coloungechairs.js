document.getElementById('emersyaIframe').onload = function() {
    viewerIframe = document.getElementById('emersyaIframe').contentWindow;
    window.removeEventListener('message', viewerEventListener ,false);
    viewerIframe.postMessage({
        action : 'registerCallback'
    }, '*');
    window.addEventListener('message', viewerEventListener, false);
    viewerIframe.postMessage({
        action:'getViewerState'
    }, '*');
};

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
                $.ajax({
                    type:'POST',
                    url: '/associate-emersya-image',
                    data: {'ImageData': data, 'ProductId': productId},
                    cache: false
                });
            }
            //$("#slider_image_"+(i+1)).attr("src", data);
            //$("#slider_image_large_"+(i+1)).attr("src", data);
        });
    }
    else if(event.data && event.data.action == 'onSuccess' && generateListImage == 'YES'){
        viewerIframe.postMessage({
            action : 'getForcedResolutionScreenshots',
            width : 1024,
            height : 1024,
            takeBackground : true,
            cameras : ($OTTO == true) ? cameraPositionWithOtto : cameraPosition
        },'*');
    }
    else if(event.data && event.data.action == 'onError'){
        console.log(event);
    }

};

var switchConfigurationGroup = function(configurationType, configurationName){
    viewerIframe.postMessage({
        action : 'setMaterialsGroupConfiguration',
        configurationName : configurationName,
        groupName : configurationType
    }, '*');
    $FRAME_TEXTURE = configurationName;
    $(".product-slider__view").slick('slickGoTo', 0);
};

var startConfigurationGroup = function () {
    if ($MODEL == 'CO10') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [
                {
                    configurationName : $FRAME_TEXTURE,
                    groupName : $CO10_FRAME
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : $CO10_SEAT
                },{
                    configurationName : $ARM_TEXTURE,
                    groupName : $ARM_VERSION
                },{
                    configurationName : 'Hidden',
                    groupName : $COOT_FRAME
                },{
                    configurationName : 'Hidden',
                    groupName : $COOT_SEAT
                }
            ]
        }, '*');
    }
    else if ($MODEL == 'COOT') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'CO10-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'CO10-seat'
            },{
                configurationName : 'Hidden',
                groupName : 'CO10-armrest'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $COOT_FRAME
            },{
                configurationName : $BASE_FABRIC,
                groupName : $COOT_SEAT
            }]
        }, '*');
    }
    else if ($MODEL == 'CO10+COOT') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : $FRAME_TEXTURE,
                groupName : $CO10_FRAME
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $COOT_FRAME
            },{
                configurationName : $BASE_FABRIC,
                groupName : $CO10_SEAT
            },{
                configurationName : $BASE_FABRIC,
                groupName : $COOT_SEAT
            }]
        }, '*');
    }


};

var customSwitchConfigurationGroup = function (type, configurationName) {
    if (type == 'model') {
        console.log('hello model');
        if (configurationName == 'CO10') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : $FRAME_TEXTURE,
                    groupName : $CO10_FRAME
                },{
                    configurationName : 'Hidden',
                    groupName : $COOT_FRAME
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : $CO10_SEAT
                },{
                    configurationName : 'Hidden',
                    groupName : $COOT_SEAT
                }]
            }, '*');
        } else if (configurationName == 'CO10+COOT') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : $FRAME_TEXTURE,
                    groupName : $CO10_FRAME
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : $COOT_FRAME
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : $CO10_SEAT
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : $COOT_SEAT
                }]
            }, '*');
        }
        $MODEL = configurationName;
    }
    else if (type == 'arm-texture') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupConfiguration',
            configurationName : configurationName,
            groupName : $ARM_VERSION
        }, '*');
        $ARM_TEXTURE = configurationName;
    }
    else if (type == 'frame-texture') {
        console.log('hello frame texture');
        if ($MODEL == 'CO10') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : configurationName,
                    groupName : $CO10_FRAME
                },{
                    configurationName : 'Hidden',
                    groupName : $COOT_FRAME
                },{
                    configurationName : 'Hidden',
                    groupName : $COOT_SEAT
                }]
            }, '*');
        } else if ($MODEL == 'CO10+COOT') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : configurationName,
                    groupName : $CO10_FRAME
                },{
                    configurationName : configurationName,
                    groupName : $COOT_FRAME
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : $COOT_SEAT
                }]
            }, '*');
        }
        $FRAME_TEXTURE = configurationName;
    }
    else if (type == 'base-fabric') {
        console.log('hello base-fabric');
        if ($MODEL == 'CO10') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : configurationName,
                    groupName : $CO10_SEAT
                }]
            }, '*');
        } else if ($MODEL == 'COOT') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : configurationName,
                    groupName : $COOT_SEAT
                }]
            }, '*');
        } else if ($MODEL == 'CO10+COOT') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : configurationName,
                    groupName : $CO10_SEAT
                },{
                    configurationName : configurationName,
                    groupName : $COOT_SEAT
                }]
            }, '*');
        }
        $BASE_FABRIC = configurationName;
    }
    $(".product-slider__view").slick('slickGoTo', 0);
};

function showAllFinishes(){
    $('#more_finishes_link').hide();
    $('#less_finishes_link').show();
    $('.topFinish').show();
}

function showLessFinishes(){
    $('#more_finishes_link').show();
    $('#less_finishes_link').hide();
    $('.topFinish').hide();
    $('.defaultVisible').show();
}