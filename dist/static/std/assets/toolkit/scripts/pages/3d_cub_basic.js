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
                $("#slider_image_0").attr("src", data);
                var productId = $("#configurator_product_id").val();
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
    if ($BASE_VERSION == 'SO-CUB15-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-CUB30-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB35-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB40-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB168-fabric'
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if ($BASE_VERSION == 'SO-CUB30-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-CUB15-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB35-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB40-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB168-fabric'
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if ($BASE_VERSION == 'SO-CUB35-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-CUB15-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB30-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB40-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB168-fabric'
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if ($BASE_VERSION == 'SO-CUB40-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-CUB15-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB30-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB35-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB168-fabric'
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if ($BASE_VERSION == 'SO-CUB168-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-CUB15-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB30-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB35-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB40-fabric'
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
};

var customSwitchConfigurationGroup = function (type, configurationName) {
    if (type == 'model') {
        if (configurationName == 'SO-CUB15-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB30-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB35-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB40-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB168-fabric'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        else if (configurationName == 'SO-CUB30-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB15-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB35-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB40-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB168-fabric'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-CUB35-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB15-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB30-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB40-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB168-fabric'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-CUB40-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB15-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB30-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB35-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB168-fabric'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-CUB168-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB15-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB30-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB35-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB40-fabric'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                }]
            }, '*');
        }
        $BASE_VERSION = configurationName;
    }
    else if (type == 'base-fabric') {
        console.log('fabric picker');
        /*
        if ($BASE_VERSION == 'SO-MOD30-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD30-fabric'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD35-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD35-fabric'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD40-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD40-fabric'
            }, '*');
        }
        else if ($BASE_VERSION == 'SO-MOD168-fabric') {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupConfiguration',
                configurationName : configurationName,
                groupName : 'SO-MOD168-fabric'
            }, '*');
        }
        */

        viewerIframe.postMessage({
            action : 'setMaterialsGroupConfiguration',
            configurationName : configurationName,
            //groupName : 'SO-MOD15-fabric'
            groupName : $BASE_VERSION
        }, '*');
        $BASE_FABRIC = configurationName;
    }
    // else if (type == 'frame-texture') {
    //     if ($BASE_VERSION == 'SO-MOD15-fabric') {
    //         viewerIframe.postMessage({
    //             action : 'setMaterialsGroupConfiguration',
    //             configurationName : configurationName,
    //             groupName : 'SO-MOD15-frame'
    //         }, '*');
    //     }
    //     else if ($BASE_VERSION == 'SO-MOD30-fabric') {
    //         viewerIframe.postMessage({
    //             action : 'setMaterialsGroupConfiguration',
    //             configurationName : configurationName,
    //             groupName : 'SO-MOD30-frame'
    //         }, '*');
    //     }
    //     else if ($BASE_VERSION == 'SO-MOD35-fabric') {
    //         viewerIframe.postMessage({
    //             action : 'setMaterialsGroupConfiguration',
    //             configurationName : configurationName,
    //             groupName : 'SO-MOD35-frame'
    //         }, '*');
    //     }
    //     else if ($BASE_VERSION == 'SO-MOD40-fabric') {
    //         viewerIframe.postMessage({
    //             action : 'setMaterialsGroupConfiguration',
    //             configurationName : configurationName,
    //             groupName : 'SO-MOD40-frame'
    //         }, '*');
    //     }
    //     else if ($BASE_VERSION == 'SO-MOD168-fabric') {
    //         viewerIframe.postMessage({
    //             action : 'setMaterialsGroupConfiguration',
    //             configurationName : configurationName,
    //             groupName : 'SO-MOD168-frame'
    //         }, '*');
    //     }
    //     // viewerIframe.postMessage({
    //     //     action : 'setMaterialsGroupConfiguration',
    //     //     configurationName : configurationName,
    //     //     groupName : $FRAME_VERSION
    //     // }, '*');
    //     $FRAME_TEXTURE = configurationName;
    // }
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