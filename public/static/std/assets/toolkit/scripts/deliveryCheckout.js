let placeSearch;
let autocomplete;
let shipAutocomplete;

const componentForm = {

    route: "long_name",
    street_number: "short_name",
    locality: "long_name",
    postal_code: 'short_name',
    country: "short_name"
};

function initAutocomplete() {

    //AutoComplete address Code for Delivery address
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("form_invoiceAddressStreet"), { types: ["geocode"], componentRestrictions: { country: ["at", "nl", "be", "de", "fi", "fr", "gb", "it", "lu", "no", "se", "ch"] } },

    );
    autocomplete.setFields(["address_component"]);
    autocomplete.addListener("place_changed", fillInAddress);

    // AutoComplete address Code For Shipping Address
    shipAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('form_shippingAddressStreet'), { types: ["geocode"], componentRestrictions: { country: ["at", "nl", "be", "de", "fi", "fr", "gb", "it", "lu", "no", "se", "ch"] } });

    shipAutocomplete.setFields(["address_component"]);
    shipAutocomplete.addListener("place_changed", shipFillInAddress);


}

function fillInAddress() {

    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace();

    for (const component in componentForm) {

        document.getElementsByClassName(component)[0].value = "";
        document.getElementsByClassName(component)[0].disabled = false;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (const component of place.address_components) {
        const addressType = component.types[0];

        if (componentForm[addressType]) {

            const val = component[componentForm[addressType]];
            document.getElementsByClassName(addressType)[0].value = val;

        }
    }
}


function shipFillInAddress() {


    const place = shipAutocomplete.getPlace();

    console.log(place);

    for (const shipComponent in componentForm) {

        document.getElementsByClassName(shipComponent)[1].value = "";
        document.getElementsByClassName(shipComponent)[1].disabled = false;
    }

    for (const shipComponent of place.address_components) {

        const addressType = shipComponent.types[0];

        if (componentForm[addressType]) {

            const val = shipComponent[componentForm[addressType]];
            document.getElementsByClassName(addressType)[1].value = val;

        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            const circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy,
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}


document.write('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNlCyM9JeGzIvttzNbydcNI9dvT65aGQo&callback=initAutocomplete&libraries=places&v=weekly" async></script>');