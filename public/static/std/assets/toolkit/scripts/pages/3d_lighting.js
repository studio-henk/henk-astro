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
    $BASE_TEXTURE = configurationName;
    $(".product-slider__view").slick('slickGoTo', 0);
};

var startConfigurationGroup = function () {
    if ($BASE_VERSION == 'NODM') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'NODL'
            },{
                configurationName : 'Hidden',
                groupName : 'NODXL'
            },{
                configurationName : $BASE_TEXTURE,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else if ($BASE_VERSION == 'NODL') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'NODM'
            },{
                configurationName : 'Hidden',
                groupName : 'NODXL'
            },{
                configurationName : $BASE_TEXTURE,
                groupName : $BASE_VERSION
            }]
        }, '*');
    } else if ($BASE_VERSION == 'NODXL') {
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'NODM'
            },{
                configurationName : 'Hidden',
                groupName : 'NODL'
            },{
                configurationName : $BASE_TEXTURE,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
    else{
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : $BASE_TEXTURE,
                groupName : $BASE_VERSION
            }]
        }, '*');
    }
};

var customSwitchConfigurationGroup = function (size, configurationName) {
    if (size == 'NODM') {
        if (size == $BASE_VERSION) {
            return false;
        }
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'NODL'
            },{
                configurationName : 'Hidden',
                groupName : 'NODXL'
            },{
                configurationName : configurationName,
                groupName : 'NODM'
            }]
        }, '*');
    }
    else if (size == 'NODL') {
        if (size == $BASE_VERSION) {
            return false;
        }
        viewerIframe.postMessage({
            id: Date.now(),
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'NODM'
            },{
                configurationName : 'Hidden',
                groupName : 'NODXL'
            },{
                configurationName : configurationName,
                groupName : 'NODL'
            }]
        }, '*');
    } else if (size == 'NODXL') {
        if (configurationName == $BASE_VERSION) {
            return false;
        }
        viewerIframe.postMessage({
            id: Date.now(),
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : 'Hidden',
                groupName : 'NODM'
            },{
                configurationName : 'Hidden',
                groupName : 'NODL'
            },{
                configurationName : configurationName,
                groupName : 'NODXL'
            }]
        }, '*');
    }

    $BASE_TEXTURE = configurationName;
    $BASE_VERSION = size;
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