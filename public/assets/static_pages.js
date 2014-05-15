$(function() {
	oltStoryTellers.init();
});
var map = L.map('map').setView([32.78233,-79.934236], 9);
	var ui = document.getElementById('map-ui');
	var locateLayer = L.mapbox.featureLayer().addTo(map);
var oltStoryTellers = {
	init: function() {
		this.initStyling();
		this.initEvents();
	},
	initStyling: function() {
		
		oltStoryTellers.addLayer(L.mapbox.tileLayer('calweb.i87boplm'), 'Base Map', 1);
		oltStoryTellers.addLayer(L.geoJson(easements, { onEachFeature: oltStoryTellers.onEachFeature }), 'Easements', 2);
	},
	initEvents: function() {
		$("#map-ui").on("click", "#geolocate", this.locateMe);
	},
	addLayer: function(layer, name, zIndex) {
		layer
        .setZIndex(zIndex)
        .addTo(map);

    // Create a simple layer switcher that toggles layers on
    // and off.
    var item = document.createElement('li');
    var link = document.createElement('a');

    link.href = '#';
    link.className = 'active';
    link.innerHTML = name;

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = '';
        } else {
            map.addLayer(layer);
            this.className = 'active';
        }
    };

    item.appendChild(link);
    ui.appendChild(item);
	},
	onEachFeature: function(feature, layer) {
		var popupContent = "<h2>" 
				+ feature.properties.name 
				+ "</h2>" 
				+ "<ul>" 
				+ "<li>County: "
				+ feature.properties.COUNTY
				+ "</li>"
				+ "<li> Acres: "
				+ feature.properties.calc_acres
				+ "</li>"
				+ "</ul>";

			if (feature.properties && feature.properties.popupContent) {
				popupContent += feature.properties.popupContent;
			}

			layer.bindPopup(popupContent);

	},
	locateMe: function() {
		if (!navigator.geolocation) {
    	$("#geolocate").html("geolocation is not available");
		} else {
	    
	    map.locate();
	    
		}
		// Once we've got a position, zoom and center the map
// on it, and add a single marker.
		map.on('locationfound', function(e) {
				map.fitBounds(e.bounds);
		    // map.fitBounds(map.getBounds());

		    locateLayer.setGeoJSON({
		        type: "Feature",
		        geometry: {
		            type: "Point",
		            coordinates: [e.latlng.lng, e.latlng.lat]
		        },
		        properties: {
		            'marker-color': '#ff0000',
		            'marker-symbol': 'star-stroked'
		        }
		    });

		    // And hide the geolocation button
		    $("#geolocate").closest("li").remove();
		});
	}
};





