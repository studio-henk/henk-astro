/**
 * @author Nirusu | nils hendriks <info@nirusu.me>
 * @version 0.0.1
 * @date 6 Jan 2022 11:46:24
 * @file Manages the ...
 */
 var viewerIframe = null, viewerActive = false;

 // show3dView
 // if no 3d view loaded iframe yet, create it
 // if already loaded 3d iframe then only show it
   function show3dView(emersyaUrl){
   //$('#conf2d_div').hide();
   //$('#conf2d_div + .sh-org-slick-slider__controls').hide();
   //$('#conf3d_div').show();
 
   //var emersyaUrl = "https://emersya.com/showcase/4766TAPNTJ";
     if(viewerActive === true) {
       console.log('3d view exists and is active');
     } else {
       // create iframe
       var iframe = document.createElement('iframe');
       iframe.class = 'resp-iframe';
       iframe.id = 'emersyaIframe';
       iframe.width = '100%';
       iframe.height = 'auto';
       iframe.allow = 'camera; gyroscope; accelerometer; magnetometer;';
       iframe.frameborder = 0;
       iframe.webkitallowfullscreen = '';
       iframe.mozallowfullscreen = '';
       iframe.allowfullscreen = '';
       iframe.style = 'border:none;display:block;';
       iframe.src = emersyaUrl;
 
       $('.resp-container').append(iframe);
       $(iframe).addClass("resp-iframe");
 
       // document.getElementById('emersyaIframe').onload = function() {
       //   viewerIframe = document.getElementById('emersyaIframe').contentWindow;
       //   window.removeEventListener('message', viewerEventListener ,false);
       //   viewerIframe.postMessage({
       //     action : 'registerCallback'
       //   }, '*');
       //   window.addEventListener('message', viewerEventListener, false);
       //   viewerIframe.postMessage({
       //     action:'getViewerState'
       //   }, '*');
       // };
 
       // var viewerEventListener =  function(event){
       //   if(event.data && event.data.action == 'onStateChange'){
       //     if(event.data.state.viewerState == 'loaded' || event.data.state.viewerState == 'fallbackloaded'){
       //       viewerActive = true;
       //       startConfigurationGroup();
       //     }
       //   }
       //   if(event.data && event.data.action == 'onError'){
       //     console.log(event);
       //   }
       // };
 
       // load category specific js here?
 
     }
     // end if
 }
 
   function show2dView() {
   //$('#conf2d_div').show();
   //$('#conf2d_div + .sh-org-slick-slider__controls').show();
   //$('#conf3d_div').hide();
 
   // $('.resp-container').html('');
   // viewerActive            = false;
   console.log('show3dView called');
 }
 