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
                $("#slider_image_0").attr("src", data); 

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

var switchConfigurationGroup = function(configurationType, configurationName){
    viewerIframe.postMessage({
        action : 'setMaterialsGroupConfiguration',
        configurationName : configurationName,
        groupName : configurationType
    }, '*');
    $BASE_TEXTURE = configurationName;
    $(".product-slider__view").slick('slickGoTo', 0);
};

var startConfigurationGroup = function () {
    if ($BASE_VERSION == 'DR21' || $BASE_VERSION == 'DR22') {
        if ($BASE_VERSION == 'DR21') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'DR22'
                },{
                    configurationName : 'Hidden',
                    groupName : 'DR31'
                },{
                    configurationName : 'Hidden',
                    groupName : 'DR32'
                },{
                    configurationName : 'Hidden',
                    groupName : 'DR-3xframe'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : $FRAME_VERSION
                },{
                    configurationName : $BASE_TEXTURE,
                    groupName : $BASE_VERSION
                }]
            }, '*');
        }
        else if (($BASE_VERSION == 'DR22')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'DR21'
                },{
                    configurationName : 'Hidden',
                    groupName : 'DR31'
                },{
                    configurationName : 'Hidden',
                    groupName : 'DR32'
                },{
                    configurationName : 'Hidden',
                    groupName : 'DR-3xframe'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : $FRAME_VERSION
                },{
                    configurationName : $BASE_TEXTURE,
                    groupName : $BASE_VERSION
                }]
            }, '*');
        }
    }
    else if ($BASE_VERSION == 'DR31' || $BASE_VERSION == 'DR32') {
        if ($BASE_VERSION == 'DR31') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'DR21'
                },{
                    configurationName : 'Hidden',
                    groupName : 'DR22'
                },{
                    configurationName : 'Hidden',
                    groupName : 'DR32'
                },{
                    configurationName : 'Hidden',
                    groupName : 'DR-2xframe'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : $FRAME_VERSION
                },{
                    configurationName : $BASE_TEXTURE,
                    groupName : $BASE_VERSION
                }]
            }, '*');
        }
        else if (($BASE_VERSION == 'DR32')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'DR21'
                },{
                    configurationName : 'Hidden',
                    groupName : 'DR22'
                },{
                    configurationName : 'Hidden',
                    groupName : 'DR31'
                },{
                    configurationName : 'Hidden',
                    groupName : 'DR-2xframe'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : $FRAME_VERSION
                },{
                    configurationName : $BASE_TEXTURE,
                    groupName : $BASE_VERSION
                }]
            }, '*');
        }
    }
};

var customSwitchConfigurationGroup = function (type, configurationName) {

    if (type == 'model') {
        if (configurationName == 'DR21' || configurationName == 'DR22') {
            if (configurationName == 'DR21') {
                viewerIframe.postMessage({
                    action : 'setMaterialsGroupsConfigurations',
                    values : [{
                        configurationName : 'Hidden',
                        groupName : 'DR22'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'DR31'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'DR32'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'DR-3xframe'
                    },{
                        configurationName : $FRAME_TEXTURE,
                        groupName : 'DR-2xframe'
                    },{
                        configurationName : $BASE_TEXTURE,
                        groupName : configurationName
                    }]
                }, '*');
            }
            else if ((configurationName == 'DR22')) {
                viewerIframe.postMessage({
                    action : 'setMaterialsGroupsConfigurations',
                    values : [{
                        configurationName : 'Hidden',
                        groupName : 'DR21'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'DR31'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'DR32'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'DR-3xframe'
                    },{
                        configurationName : $FRAME_TEXTURE,
                        groupName : 'DR-2xframe'
                    },{
                        configurationName : $BASE_TEXTURE,
                        groupName : configurationName
                    }]
                }, '*');
            }
        }
        else if (configurationName == 'DR31' || configurationName == 'DR32') {
            if (configurationName == 'DR31') {
                viewerIframe.postMessage({
                    action : 'setMaterialsGroupsConfigurations',
                    values : [{
                        configurationName : 'Hidden',
                        groupName : 'DR21'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'DR22'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'DR32'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'DR-2xframe'
                    },{
                        configurationName : $FRAME_TEXTURE,
                        groupName : 'DR-3xframe'
                    },{
                        configurationName : $BASE_TEXTURE,
                        groupName : configurationName
                    }]
                }, '*');
            }
            else if ((configurationName == 'DR32')) {
                viewerIframe.postMessage({
                    action : 'setMaterialsGroupsConfigurations',
                    values : [{
                        configurationName : 'Hidden',
                        groupName : 'DR21'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'DR22'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'DR31'
                    },{
                        configurationName : 'Hidden',
                        groupName : 'DR-2xframe'
                    },{
                        configurationName : $FRAME_TEXTURE,
                        groupName : 'DR-3xframe'
                    },{
                        configurationName : $BASE_TEXTURE,
                        groupName : configurationName
                    }]
                }, '*');
            }
        }
        $BASE_VERSION = configurationName;
    }
    else if (type == 'base-texture') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupConfiguration',
            configurationName : configurationName,
            groupName : $BASE_VERSION
        }, '*');
        $BASE_TEXTURE = configurationName;
    }
    else if (type == 'frame-texture') {
        if ($BASE_VERSION == 'DR21' || $BASE_VERSION == 'DR22') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'DR-2xframe'
            }, '*');
        }
        else if ($BASE_VERSION == 'DR31' || $BASE_VERSION == 'DR32') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'DR-3xframe'
            }, '*');
        }
        $FRAME_TEXTURE = configurationName;
    }
    else if (type == 'frame-texture') {

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