
 


var detailMap = {
	init: function() {
		this.initStyling();
		this.initEvents();
	},
	initStyling: function() {
		var pathArray = window.location.pathname.split( '/' );
		 var long = pathArray[2];
		 var lat = pathArray[3];
		 window.mapDetail = L.map('storyMap').setView([lat,long], 15);
		 console.log(pathArray);
		
		// map.setView([lat,long], 15);
		detailMap.addLayer(L.mapbox.tileLayer('calweb.i95d7glk'), 'Base Map', 1);
		detailMap.addLayer(L.geoJson(easements), 'Easements', 2);
		detailMap.addLayer(L.geoJson(easementPoints, { onEachFeature: detailMap.onEachFeature }), 'Lowcountry Open Land Trust', 3);
	},
	initEvents: function() {
		
	},
	placeMap: function() {

	},
	addLayer: function(layer, name, zIndex) {
		layer
        .setZIndex(zIndex)
        .addTo(mapDetail);
   
	},
	onEachFeature: function(feature, layer) {

		var popupContent = [
			"<h2>",
			feature.properties.name,
			"</h2>",
			"<p>View and Tell Your Story</p>",
			"<p><a class=\"btn btn-success\" ",
			"href=\"/location/",
			encodeURIComponent(feature.properties.lng),
			"/",
			encodeURIComponent(feature.properties.lat),
			"/",
			feature.properties.FOCUS_AREA,
			"/",
			feature.properties.name,
			"\">",
			"<span class=\"fa fa-plus\"></span> View/Add Story",
			"</a>",
			"</p>"

		].join("");

			if (feature.properties && feature.properties.popupContent) {
				popupContent += feature.properties.popupContent;
			}

			layer.bindPopup(popupContent);

	}
};
$(function() {
	
	detailMap.init();
});