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
    if ($BASE_VERSION == 'SO-CUB21-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-CUB26-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB36-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB241-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB31-fabric'
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-CUB42-fabric'
            }]
        }, '*');
    }
    else if ($BASE_VERSION == 'SO-CUB26-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-CUB21-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB36-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB241-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB31-fabric'
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-CUB42-fabric'
            }]
        }, '*');
    }
    else if ($BASE_VERSION == 'SO-CUB31-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-CUB21-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB26-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB36-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB241-fabric'
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-CUB42-fabric'
            }]
        }, '*');
    }
    else if ($BASE_VERSION == 'SO-CUB36-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-CUB21-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB26-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB31-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB241-fabric'
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-CUB42-fabric'
            }]
        }, '*');
    }
    else if ($BASE_VERSION == 'SO-CUB241-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-CUB21-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB26-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB31-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB36-fabric'
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-CUB42-fabric'
            }]
        }, '*');
    }
    else if ($BASE_VERSION == 'SO-CUB42-fabric') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'SO-CUB21-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB26-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB31-fabric'
            },{
                configurationName : 'Hidden',
                groupName : 'SO-CUB36-fabric'
            },{
                configurationName : $BASE_FABRIC,
                groupName : $BASE_VERSION
            },{
                configurationName : $BASE_FABRIC,
                groupName : 'SO-CUB42-fabric'
            }]
        }, '*');
    }
};

var customSwitchConfigurationGroup = function (type, configurationName) {
    if (type == 'model') {
        console.log('type is model');
        if (configurationName == 'SO-CUB21-fabric') {
            console.log(configurationName);
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB26-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB36-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB241-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB31-fabric'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-CUB42-fabric'
                }]
            }, '*');
        }
        else if (configurationName == 'SO-CUB26-fabric') {
            console.log(configurationName);
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB21-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB36-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB241-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB31-fabric'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-CUB42-fabric'
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-CUB31-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB21-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB26-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB36-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB241-fabric'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-CUB42-fabric'
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-CUB36-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB21-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB26-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB31-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB241-fabric'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-CUB42-fabric'
                }]
            }, '*');
        }
        else if ((configurationName == 'SO-CUB241-fabric')) {
            viewerIframe.postMessage({
                action : 'setMaterialsGroupsConfigurations',
                values : [{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB21-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB26-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB31-fabric'
                },{
                    configurationName : 'Hidden',
                    groupName : 'SO-CUB36-fabric'
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : configurationName
                },{
                    configurationName : $BASE_FABRIC,
                    groupName : 'SO-CUB42-fabric'
                }]
            }, '*');
        }
        $BASE_VERSION = configurationName;
    }
    else if (type == 'base-fabric') {
        console.log('fabric picker');
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : configurationName,
                groupName : 'SO-CUB42-fabric'
            },{
                configurationName : configurationName,
                groupName : $BASE_VERSION
            }]
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