// // Creating the map:

// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

function addData() {
  d3.json("https://api.seatgeek.com/2/events?&client_id=MTgzNjE4MjJ8MTU5MzYyOTMzOC43Nw", function(data) {
    var data1 = data.events;

    var locationMarkers = []
    for (var i = 0; i <= data1.length; i++) {
      console.log(data1[0])
      try {
        var location = data1[i]["venue"]["location"];
        var venue = data1[i]["venue"].name;
        var locationMarker = L.marker([location.lat, location.lon])
          .bindPopup("<h3>" + venue + "<h3>")
        locationMarkers.push(locationMarker);
      } catch (error) {
        console.log("No Venue")
      }

    }

    var layerGrp = L.layerGroup(locationMarkers)
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Venue Names": layerGrp
    };
    // Create the map with our layers
    var map = L.map("map-id", {
      center: [39.8283, -98.5795],
      zoom: 4,
      layers: [lightmap, layerGrp]
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  })
}
addData();