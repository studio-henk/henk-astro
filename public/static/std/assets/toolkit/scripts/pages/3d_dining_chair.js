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
    $FRAME_TEXTURE = configurationName;
    $(".product-slider__view").slick('slickGoTo', 0);
};

var startConfigurationGroup = function () {
    if ($FRAME_VERSION == 'CO-frame') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'COA-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'COA-armrest'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'seat'
            }]
        }, '*');
    }
    else if ($FRAME_VERSION == 'COA-frame') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'CO-frame'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $ARM_TEXTURE,
                groupName : 'COA-armrest'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'seat'
            }]
        }, '*');
    }
    else if ($FRAME_VERSION == 'ODE-frame') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'ODEA-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'ODEA-armrest'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'seat'
            }]
        }, '*');
    }
    else if ($FRAME_VERSION == 'ODEA-frame') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'ODE-frame'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $ARM_TEXTURE,
                groupName : 'ODEA-armrest'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'seat'
            }]
        }, '*');
    }
    else{
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            }]
        }, '*');
    }
};

var customSwitchConfigurationGroup = function (type, configurationName) {

    if (type == 'model') {
        $FRAME_VERSION = configurationName;
        if (configurationName == 'CO-frame') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'COA-armrest'
                },{
                    configurationName : 'Hidden',
                    groupName : 'COA-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'seat'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'CO-frame'
                }]
            }, '*');
        }
        else if ((configurationName == 'COA-frame')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'CO-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'seat'
                },{
                    configurationName : $ARM_TEXTURE,
                    groupName : 'COA-armrest'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'COA-frame'
                }]
            }, '*');
        }
        else if ($FRAME_VERSION == 'ODE-frame') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'ODEA-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'ODEA-armrest'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : $FRAME_VERSION
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'seat'
                }]
            }, '*');
        }
        else if ($FRAME_VERSION == 'ODEA-frame') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'ODE-frame'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : $FRAME_VERSION
                },{
                    configurationName : $ARM_TEXTURE,
                    groupName : 'ODEA-armrest'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'seat'
                }]
            }, '*');
        }
    }
    else if (type == 'arm-texture') {
        var res = $FRAME_VERSION.split('-');
        viewerIframe.postMessage({
            action : 'setMaterialsGroupConfiguration',
            configurationName : configurationName,
            groupName : res[0]+'-armrest'
        }, '*');

        $ARM_TEXTURE = configurationName;
    }
    else if (type == 'frame-texture') {
        console.log('hello frame texture');
        if ($FRAME_VERSION == 'CO-frame') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'CO-frame'
            }, '*');

            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : 'Hidden',
                groupName : 'COA-frame'
            }, '*');
        }
        else if ($FRAME_VERSION == 'COA-frame') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'COA-frame'
            }, '*');

            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : 'Hidden',
                groupName : 'CO-frame'
            }, '*');
        }
        else if ($FRAME_VERSION == 'ODE-frame') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'ODE-frame'
            }, '*');

            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : 'Hidden',
                groupName : 'ODEA-frame'
            }, '*');
        }
        else if ($FRAME_VERSION == 'ODEA-frame') {console.log("configurationName: "+configurationName);
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'ODEA-frame'
            }, '*');

            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : 'Hidden',
                groupName : 'ODE-frame'
            }, '*');
        }
        $FRAME_TEXTURE = configurationName;
        customSwitchConfigurationGroup('model', $FRAME_VERSION);
    }
    else if (type == 'base-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupConfiguration',
            configurationName : configurationName,
            groupName : 'seat'
        }, '*');
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