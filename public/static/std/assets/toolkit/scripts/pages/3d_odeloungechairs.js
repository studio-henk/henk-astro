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
    if(typeof $OTTO  === "undefined"){
        $OTTO = false;
    }
    if ($FRAME_VERSION == 'SO-ODE10-frame' && $OTTO == false) {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [
                {
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-ODE10-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-ODE10-seat'
                },{
                    configurationName : 'Hidden',
                    // groupName : $ARMREST_FRAME
                    groupName : 'SO-ODEA10-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-ODEA10-armrest'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-ODEOT-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-ODEOT-seat'
                }
            ]
        }, '*');
    }
    else if ($FRAME_VERSION == 'SO-ODEA10-frame' && $OTTO == false) {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-ODE10-frame'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-ODEA10-frame'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-ODE10-seat'
            },{
                configurationName : $ARM_TEXTURE,
                groupName : 'SO-ODEA10-armrest'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-ODEOT-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-ODEOT-seat'
            }]
        }, '*');
    }
    else if ($FRAME_VERSION == 'SO-ODEA10-frame' && $OTTO == true) {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-ODE10-frame'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-ODEOT-frame'
            },{
                configurationName : $ARM_TEXTURE,
                groupName : 'SO-ODEA10-armrest'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-ODE10-seat'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-ODEOT-seat'
            }]
        }, '*');
    }
    else if ($FRAME_VERSION == 'SO-ODE10-frame' && $OTTO == true) {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-ODEA10-frame'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-ODEOT-frame'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-ODE10-seat'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-ODEOT-seat'
            }]
        }, '*');
    }
};

var customSwitchConfigurationGroup = function (type, configurationName, otto) {
    if (type == 'model') {
        $OTTO = otto;
        if (configurationName == 'SO-ODE10-frame' || configurationName == 'SO-ODEA10-frame') {
            if (configurationName == 'SO-ODE10-frame') {
                console.log('configname is ode10-frame')
                viewerIframe.postMessage({
                    action : 'setMaterialsGroupsConfigurations',
                    values : [{
                        configurationName : 'Hidden',
                        groupName : 'SO-ODEA10-armrest'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'SO-ODEA10-frame'
                    },{
                        configurationName : $BASE_FABRIC,
                        groupName : 'SO-ODE10-seat'
                    },{
                        configurationName : $FRAME_TEXTURE,
                        groupName : 'SO-ODE10-frame'
                    }]
                }, '*');
                // $MODEL = 'ODE10';
            }
            else if ((configurationName == 'SO-ODEA10-frame')) {
                console.log('configname is odea-frame')
                viewerIframe.postMessage({
                    action : 'setMaterialsGroupsConfigurations',
                    values : [{
                        configurationName : 'Hidden',
                        groupName : 'SO-ODE10-frame'
                    },{
                        configurationName : $BASE_FABRIC,
                        groupName : 'SO-ODE10-seat'
                    },{
                        configurationName : $ARM_TEXTURE,
                        groupName : 'SO-ODEA10-armrest'
                    },{
                        configurationName : $FRAME_TEXTURE,
                        groupName : 'SO-ODEA10-frame'
                    }]
                }, '*');
            }

            if(!$OTTO){
                viewerIframe.postMessage({
                    action : 'setMaterialsGroupsConfigurations',
                    values : [{
                        configurationName : 'Hidden',
                        groupName : 'SO-ODEOT-frame'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'SO-ODEOT-seat'
                    }]
                }, '*');
            }
            else{
                viewerIframe.postMessage({
                    action : 'setMaterialsGroupsConfigurations',
                    values : [{
                        configurationName : $FRAME_TEXTURE,
                        groupName : 'SO-ODEOT-frame'
                    },{
                        configurationName : $BASE_FABRIC,
                        groupName : 'SO-ODEOT-seat'
                    }]
                }, '*');
            }
        }
        $FRAME_VERSION = configurationName;
    }
    else if (type == 'arm-texture') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupConfiguration',
            configurationName : configurationName,
            groupName : 'SO-ODEA10-armrest'
        }, '*');
        $ARM_TEXTURE = configurationName;
    }
    else if (type == 'frame-texture') {
        if ($FRAME_VERSION == 'SO-ODE10-frame' && $OTTO == false) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : configurationName,
                    groupName : 'SO-ODE10-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-ODEOT-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-ODEOT-seat'
                }]
            }, '*');
        } else if ($FRAME_VERSION == 'SO-ODEA10-frame' && $OTTO == false) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : configurationName,
                    groupName : 'SO-ODEA10-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-ODEOT-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-ODEOT-seat'
                }]
            }, '*');
        }
        else if ($OTTO == true) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : configurationName,
                    groupName : $FRAME_VERSION
                },{
                    configurationName : configurationName,
                    groupName : 'SO-ODEOT-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-ODEOT-seat'
                }]
            }, '*');
        }
        $FRAME_TEXTURE = configurationName;
    }
    else if (type == 'base-fabric') {
        console.log('hello base-fabric');
if(typeof $OTTO  === "undefined"){
        $OTTO = false;
    }
        if ($OTTO == false) {
            console.log('otto no');
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : configurationName,
                    groupName : 'SO-ODE10-seat'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-ODEOT-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-ODEOT-seat'
                }]
            }, '*');
        } else if ($OTTO == true) {
            console.log('otto yes');
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : configurationName,
                    groupName : 'SO-ODE10-seat'
                },{
                    configurationName : configurationName,
                    groupName : 'SO-ODEOT-seat'
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