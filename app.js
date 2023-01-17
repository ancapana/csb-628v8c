//set map options
var myLatLng = { lat: 44.439663, lng: 26.096306 };
var mapOptions = {
  center: myLatLng,
  zoom: 7,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

//create map
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

/**
 * obiect pentru serviciul de indicatii
 */
var directionsService = new google.maps.DirectionsService();

/**
 * Render obiectul de directie
 */
var directionsDisplay = new google.maps.DirectionsRenderer();

/**
 * afișare indicațiile de orientare pe hartă legând serviciul de indicații de serviciu de hărți
 */
directionsDisplay.setMap(map);

// Calculare distanta dintre origine si destinatie

function calculateDistance() {
  // creare request nou
  var request = {
    origin: document.getElementById("origin").value,
    destination: document.getElementById("destination").value,
    travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
    unitSystem: google.maps.UnitSystem.METRIC
  };

  // Transmitere cerere creată metodei de traseu

  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      //Obținere distanța și timpul, apoi afișați pe hartă
      const output = document.querySelector("#output");
      output.innerHTML =
        "<p class='alert-success'>De la: " +
        document.getElementById("origin").value +
        "</br>" +
        "La: " +
        document.getElementById("destination").value +
        "</br>" +
        "Distanta de condus <i class='fas fa-road'></i> : " +
        result.routes[0].legs[0].distance.text +
        "</br>" +
        " Durata <i class='fas fa-clock'></i> : " +
        result.routes[0].legs[0].duration.text +
        ".</p>";

      /**
       * Display the obtained route
       */
      directionsDisplay.setDirections(result);
    } else {
      /**
       * Eliminate route from the map
       */
      directionsDisplay.setDirections({ routes: [] });

      /**
       * Centre the map to my current location
       */
      map.setCenter(myLatLng);

      /**
       * show error message in case there is any
       */
      output.innerHTML =
        "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i>  Distanta nu a putut fi afisata. </div>";
    }
  });
}

/**
 * Add autocomplete feature for cities
 */
var options = {
  types: ["(cities)"],
  componentRestrictions: { country: "ro" }
};

var input1 = document.getElementById("origin");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("destination");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
google.maps.event.removeListener(autocomplete1);
google.maps.event.removeListener(autocomplete2); // remove the dropdown list
