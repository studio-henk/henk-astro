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
    if ($BASE_VERSION == 'SO-MOD21-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-MOD26-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD31-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD36-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD241-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD26-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD31-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD36-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD241-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-MOD42-frame'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-MOD42-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if (($BASE_VERSION == 'SO-MOD26-fabric')) {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-MOD21-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD31-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD36-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD241-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD21-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD31-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD36-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD241-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-MOD42-frame'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-MOD42-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if (($BASE_VERSION == 'SO-MOD31-fabric')) {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-MOD21-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD26-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD36-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD241-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD21-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD26-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD36-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD241-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-MOD42-frame'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-MOD42-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if (($BASE_VERSION == 'SO-MOD36-fabric')) {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-MOD21-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD26-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD31-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD241-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD21-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD26-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD31-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD241-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-MOD42-frame'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-MOD42-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : $FRAME_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if (($BASE_VERSION == 'SO-MOD241-fabric')) {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-MOD21-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD26-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD31-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD36-frame'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD21-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD26-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD31-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-MOD36-fabric'
            },{
                configurationName : $FRAME_TEXTURE,
                groupName : 'SO-MOD42-frame'
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-MOD42-fabric'
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
        if (configurationName == 'SO-MOD21-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD26-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD31-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD36-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD241-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD26-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD31-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD36-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD241-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD42-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-MOD42-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD21-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-MOD26-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD21-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD31-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD36-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD241-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD21-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD31-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD36-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD241-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD42-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-MOD42-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD26-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-MOD31-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD21-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD26-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD36-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD241-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD21-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD26-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD36-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD241-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD42-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-MOD42-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD31-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-MOD36-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD21-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD26-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD31-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD241-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD21-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD26-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD31-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD241-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD42-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-MOD42-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD36-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-MOD241-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD21-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD26-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD31-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD36-frame'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD21-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD26-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD31-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-MOD36-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD42-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-MOD42-fabric'
                },{
                    configurationName : $FRAME_TEXTURE,
                    groupName : 'SO-MOD241-frame'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        $BASE_VERSION = configurationName;
    }
    else if (type == 'base-fabric') {
        /*
        if ($BASE_VERSION == 'SO-MOD21-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD21-fabric'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD26-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD26-fabric'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD31-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD31-fabric'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD36-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD36-fabric'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD241-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD241-fabric'
            }, '*');
        }
        */

        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : configurationName,
                groupName : $BASE_VERSION
            }, {
                configurationName : configurationName,
                groupName : 'SO-MOD42-fabric'
            }]}, '*');
        $BASE_FABRIC = configurationName;
    }
    else if (type == 'frame-texture') {
        if ($BASE_VERSION == 'SO-MOD21-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD21-frame'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD26-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD26-frame'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD31-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD31-frame'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD36-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD36-frame'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD241-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD241-frame'
            }, '*');
        }
        viewerIframe.postMessage({
            action : 'setMaterialsGroupConfiguration',
            configurationName : configurationName,
            groupName : 'SO-MOD42-frame'
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