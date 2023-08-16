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

            console.log('iFrame loaded successfully.');
            $TOP_TEXTURE = $('.topFinish.choose-cards__active').attr('data-value');
            startConfigurationGroup('texture', $TOP_TEXTURE);
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
                    position : [1.9242, 0.9426, -0.9278],
                    target:[0.0535,0.3637,-0.014],
                    up:[0,1,0]
                },
                /*
                {
                    position : [2.1259, 0.9448, -0.0298 ],
                    target:[0.0535,0.3637,-0.014],
                    up:[0,1,0]
                },
                {
                    position : [0.0057, 0.8953, -2.0991],
                    target:[0.0535,0.3637,-0.014],
                    up:[0,1,0]
                }
                */
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
};

var startConfigurationGroup = function (type, configurationName) {
    // $TOP_TEXTURE = $('.topFinish.choose-cards__active').attr('data-value');
    $TOP_EDGE = $('.topEdgeType.choose-cards__active').attr('data-value');
    var frameFinish = $('.frameFinish.choose-cards__active').attr('data-value');

    if($TOP_VERSION == 'T-RC'){
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : configurationName,
                groupName : $TOP_VERSION+'-'+$TOP_SIZE+'-'+$TOP_THICKNESS+'-'+$TOP_EDGE
            },{
                configurationName : frameFinish,
                groupName : $TOP_FRAMETYPE
            },{
                configurationName : 'Hidden',
                groupName : 'T-RC-160-80-4-CRC'
            }]
        }, '*');
    }
    else if($TOP_VERSION == 'T-SQ'){
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : configurationName,
                groupName : $TOP_VERSION+'-'+$TOP_SIZE+'-'+$TOP_THICKNESS+'-'+$TOP_EDGE
            },{
                configurationName : 'Hidden',
                groupName : 'T-SQ-80-80-4-CRC'
            },{
                configurationName : frameFinish,
                groupName : $TOP_FRAMETYPE
            }]
        }, '*');
    }
    else if($TOP_VERSION == 'T-RD'){
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : configurationName,
                groupName : $TOP_VERSION+'-'+$TOP_SIZE+'-'+$TOP_THICKNESS+'-'+$TOP_EDGE
            },{
                configurationName : 'Hidden',
                groupName : 'T-RD-80-4-C'
            },{
                configurationName : frameFinish,
                groupName : $TOP_FRAMETYPE
            }]
        }, '*');
    }


    /*
    viewerIframe.postMessage({
        action : 'setMaterialsGroupConfiguration',
        configurationName : frameFinish,
        groupName : $TOP_FRAMETYPE
    }, '*');
    */


};

var customSwitchConfigurationGroup = function (type, configurationName) {

    if (type == 'texture') {
        console.log(configurationName);
        console.log($TOP_VERSION+'-'+$TOP_SIZE+'-'+$TOP_THICKNESS+'-'+$TOP_EDGE);
        viewerIframe.postMessage({
            action : 'setMaterialsGroupConfiguration',
            configurationName : configurationName,
            groupName : $TOP_VERSION+'-'+$TOP_SIZE+'-'+$TOP_THICKNESS+'-'+$TOP_EDGE
        }, '*');
    }
    else if (type == 'edge') {
        if (configurationName == $TOP_EDGE) {
            return false;
        }
        console.log($TOP_TEXTURE);
        console.log($TOP_VERSION+'-'+$TOP_SIZE+'-'+$TOP_THICKNESS+'-'+configurationName);
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : $TOP_TEXTURE,
                groupName : $TOP_VERSION+'-'+$TOP_SIZE+'-'+$TOP_THICKNESS+'-'+configurationName
            },{
                configurationName : 'Hidden',
                groupName : $TOP_VERSION+'-'+$TOP_SIZE+'-'+$TOP_THICKNESS+'-'+$TOP_EDGE
            }]
        }, '*');
    } else if (type == 'size') {
        if (configurationName == $TOP_SIZE) {
            return false;
        }

        console.log($TOP_TEXTURE);
        console.log($TOP_VERSION+'-'+configurationName+'-'+$TOP_THICKNESS+'-'+$TOP_EDGE);
        viewerIframe.postMessage({
            action : 'setMaterialsGroupsConfigurations',
            values : [{
                configurationName : $TOP_TEXTURE,
                groupName : $TOP_VERSION+'-'+configurationName+'-'+$TOP_THICKNESS+'-'+$TOP_EDGE
            },{
                configurationName : 'Hidden',
                groupName : $TOP_VERSION+'-'+$TOP_SIZE+'-'+$TOP_THICKNESS+'-'+$TOP_EDGE
            }]
        }, '*');
    }

    if (type == 'texture') {
        $TOP_TEXTURE = configurationName;
    }
    if (type == 'edge') {
        $TOP_EDGE = configurationName;
    }
    if (type == 'size') {
        $TOP_SIZE = configurationName;
    }

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