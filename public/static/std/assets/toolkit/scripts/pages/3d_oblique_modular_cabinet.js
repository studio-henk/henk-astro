var viewerEventListener =  function(event){
    if(event.data && event.data.action == 'onStateChange'){
        if(event.data.state.viewerState == 'loaded' || event.data.state.viewerState == 'fallbackloaded'){
            console.log('iFrame loaded successfully.');
            viewerActive = true;
            startConfigurationGroup();
        }
    }
    else if(event.data && event.data.action == 'onError'){
        console.log(event);
    }
};

var startConfigurationGroup = function () {
    var jsonArr = [];
    Object.keys(emersyaConfig).forEach(function(k){
        //console.log(k + ' - ' + emersyaConfig[k]);
        jsonArr.push({
            configurationName: emersyaConfig[k],
            groupName: k,
        })
    });

    console.log(jsonArr);
    viewerIframe.postMessage({
        action : 'setMaterialsGroupsConfigurations',
        values : jsonArr
    }, '*');
};

var customSwitchConfigurationGroup = function (type, configurationName) {
    //startConfigurationGroup();
    $(".product-slider__view").slick('slickGoTo', 0);
};