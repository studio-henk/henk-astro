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
            cameras : [
                {
                    position : [9.3874, 6.2237, -16.1141],
                    target:[0.1534, 2.3135,-0.0198],
                    up:[0,1,0]
                },
            ]},'*');
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
    $(".product-slider__view").slick('slickGoTo', 0);
};

var startConfigurationGroup = function () {
    viewerIframe.postMessage({
        action : 'setMaterialsGroupsConfigurations',
        values : [{
            configurationName : $BASE_TEXTURE,
            groupName : $BASE_VERSION
        },{
            configurationName : $FABRIC_TYPE,
            groupName : $FABRIC_COLLECTION
        }]
    }, '*');
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