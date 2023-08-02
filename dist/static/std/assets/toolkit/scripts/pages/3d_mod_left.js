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

var switchConfigurationGroup = function(configurationType, configurationName){
    viewerIframe.postMessage({
        action : 'setMaterialsGroupConfiguration',
        configurationName : configurationName,
        groupName : configurationType
    }, '*');
    $BASE_FABRIC = configurationName;
    $(".product-slider__view").slick('slickGoTo', 0);
};

var startConfigurationGroup = function () {
    if ($BASE_VERSION == 'SO-MOD22-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-MOD27-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD32-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD37-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD242-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD27-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD32-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD37-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD242-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-MOD41-frame'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-MOD41-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if (($BASE_VERSION == 'SO-MOD27-fabric')) {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-MOD22-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD32-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD37-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD242-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD22-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD32-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD37-fabric'
            }, {
                configurationName : 'Hidden',
                groupName : 'SO-MOD242-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-MOD41-frame'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-MOD41-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if (($BASE_VERSION == 'SO-MOD32-fabric')) {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-MOD22-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD27-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD37-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD242-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD22-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD27-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD37-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD242-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-MOD41-frame'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-MOD41-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if (($BASE_VERSION == 'SO-MOD37-fabric')) {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-MOD22-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD27-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD32-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD242-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD22-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD27-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD32-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD242-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-MOD41-frame'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-MOD41-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if (($BASE_VERSION == 'SO-MOD242-fabric')) {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-MOD22-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD27-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD32-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD37-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD22-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD27-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD32-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD37-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-MOD41-frame'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-MOD41-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
};

var customSwitchConfigurationGroup = function (type, configurationName) {
    if (type == 'model') {
        if (configurationName == 'SO-MOD22-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD27-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD32-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD37-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD242-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD27-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD32-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD37-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD242-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD41-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-MOD41-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD22-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-MOD27-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD22-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD32-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD37-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD242-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD22-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD32-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD37-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD242-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD41-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-MOD41-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD27-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-MOD32-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD22-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD27-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD37-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD242-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD22-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD27-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD37-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD242-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD41-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-MOD41-fabric'
                }, {
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD32-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-MOD37-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD22-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD27-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD32-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD242-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD22-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD27-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD32-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD242-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD41-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-MOD41-fabric'
                }, {
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD37-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-MOD242-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD22-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD27-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD32-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD37-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD22-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD27-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD32-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD37-fabric'
                },
                
                {
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD41-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-MOD41-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD242-frame'
                },
                
                {
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        $BASE_VERSION = configurationName;
    }
    else if (type == 'base-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : configurationName,
                groupName : $BASE_VERSION
            }, {
                configurationName : configurationName,
                groupName : 'SO-MOD41-fabric'
            }]}, '*');
        $BASE_FABRIC = configurationName;
    }
    else if (type == 'frame-texture') {
        if ($BASE_VERSION == 'SO-MOD22-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD22-frame'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD27-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD27-frame'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD32-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD32-frame'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD37-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD37-frame'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD242-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD242-frame'
            }, '*');
        }
        viewerIframe.postMessage({
            action : 'setMaterialsGroupConfiguration',
            configurationName : configurationName,
            groupName : 'SO-MOD41-frame'
        }, '*');
        $FRAME_TEXTURE = configurationName;
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