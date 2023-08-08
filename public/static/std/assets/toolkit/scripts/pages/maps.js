window.initMap = function () {
    // var startPos = {lat: 52.367346, lng: 4.950446};
    var startPos = { lat: 51.5, lng: 4.950446 };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: startPos,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
    var infowindow = new google.maps.InfoWindow({});
    var marker;
    $.getJSON("/get-store-locations", function (jsonData) {
        $.each(jsonData, function (key, data) {
            latLng = new google.maps.LatLng(data.lat, data.long);
            if (data.flagship === true) {
                marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    zIndex: google.maps.Marker.MAX_ZINDEX + 1,
                    icon: {
                        url:
                            assetsBaseUrl +
                            "/static/std/assets/toolkit/images/stores/henk.png",
                        scaledSize: new google.maps.Size(48, 56),
                    },
                });
                google.maps.event.addListener(
                    marker,
                    "click",
                    (function (marker, data) {
                        return function () {
                            var info =
                                '<div class="mapsPopup">' +
                                '<img width="64" src="' +
                                assetsBaseUrl +
                                '/static/std/assets/toolkit/images/stores/logo-henk-solo.svg"/>' +
                                "<p>" +
                                data.adress +
                                "</p>" +
                                data.showroomProducts +
                                // '<a target="_blank" href="' + 'https://maps.google.nl/maps?hl=nl&daddr=(' + data.lat + ',' + data.long + ')' + '">' + 'Route</a>' +
                                '<a target="_blank" href="' +
                                data.mapsUrl +
                                '">' +
                                "Route</a>" +
                                "</div>";
                            infowindow.setContent(info);
                            infowindow.open(map, marker);
                        };
                    })(marker, data)
                );
            } else {
                marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: {
                        url: "/static/std/assets/toolkit/images/stores/marker.png",
                        scaledSize: new google.maps.Size(22, 38),
                    },
                });

                google.maps.event.addListener(
                    marker,
                    "click",
                    (function (marker, data) {
                        return function () {
                            var info =
                                '<div class="mapsPopup">' +
                                '<a target="_blank" href="' +
                                data.url +
                                '"><p><strong>' +
                                data.name +
                                "</p></strong></a>" +
                                "<p>" +
                                data.adress +
                                "</p>" +
                                // '<a target="_blank" href="' + data.route + '">' + 'Route</a>' +
                                data.showroomProducts +
                                // '<a target="_blank" href="' + 'https://maps.google.nl/maps?hl=nl&daddr=(' + data.lat + ',' + data.long + ')' + '">' + 'Route</a>' +
                                '<a target="_blank" href="' +
                                data.mapsUrl +
                                '">' +
                                "Route</a>" +
                                "</div>";
                            infowindow.setContent(info);
                            infowindow.open(map, marker);
                        };
                    })(marker, data)
                );
            }
        });
    });
};