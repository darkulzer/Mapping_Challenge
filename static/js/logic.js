// Creating map object
var myMap = L.map("map", {
    center: [36.162, -86.781],
    zoom: 13
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Store API query variables
  var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
  var date = "$where=date_and_time between'2020-01-01T00:00:00' and '2020-08-31T00:00:00'";
  var complaint = "&illumination_description=DAYLIGHT";
  var limit = "&$limit=5000";
  
  // Assemble API query URL
  var url = baseURL + date + limit;
  console.log(url);
  
  // Grab the data with d3
  d3.json(url, function (response) {
  
    // Create a new marker cluster group
    var markers = L.markerClusterGroup();
  
    // Loop through data
    for (var i = 0; i < response.length; i++) {
  
      // Set the data location property to a variable
      var location = response[i].mapped_location;
  
      // Check for location property
      if (location) {
  
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
          .bindPopup("<h3>Type:" + response[i].collision_type_description + "<h3>Conditions:" + response[i].weather_description + "<h3>Illumination:" + response[i].illumination_description));
      }
  
    }
  
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
  });