mapboxgl.accessToken = 'pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA';
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/shgis-kennethdean/ckjs4728a6vc319t4ml6d9eqv',
	zoom: 11,
	center: [103.8198, 1.3521]
});

map.on('load', function () {

	// enumerate ids of the layers
	var toggleableLayerIds = ["000 Alfred ER 1968", "000 INTERESTING large-scale-topographical-map-of-singapore-1945", "000 INTERESTING Singapore_1994_CIA_map", "000 interest LAND USE large-old-map-of-singapore-1898", "000 singapore1944", "00 MAYBE INFRASTR Dispositions_of_the_Garrison_February-1942_Singapore", "1983 Singapore p. 265_updated", "1983 Singapore p. 262_updated", "1983 Singapore p. 263_updated", "1976 W-K p. 129_updated"];

	// set up the corresponding toggle button for each layer
	for (var i = 0; i < toggleableLayerIds.length; i++) {

		var id = toggleableLayerIds[i];



		var htmlstring = "<input type='checkbox' class='checkbox' id='" + id + "' checked> <li> " + id + " </li><div class='slidecontainer'><input type='range' min='1' max='100' value='100' class='slider' id='" + id + "'</div > "

		$("#menu").append(htmlstring)
	}

	$(".checkbox").change(function () {

		id = $(this).attr('id')

		if (this.checked) {
			map.setLayoutProperty(id, 'visibility', 'visible');
		} else {
			map.setLayoutProperty(id, 'visibility', 'none');
		}

	})

	$(".slider").change(function () {
		value = $(this)[0].value

		map.setPaintProperty(
			id,
			'raster-opacity',
			parseInt(value, 10) / 100
		);
	})
})


/**
var link = document.createElement('a');
link.href = '#';
link.className = 'active';
link.textContent = id;

link.onclick = function (e) {
	var clickedLayer = this.textContent;
	e.preventDefault();
	e.stopPropagation();

	var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

	// toggle layer visibility by changing the layout object's visibility property
	if (visibility === 'visible') {
		map.setLayoutProperty(clickedLayer, 'visibility', 'none');
		this.className = '';
	} else {
		this.className = 'active';
		map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
	}
};

var layers = document.getElementById('menu');
layers.appendChild(link);
**/
