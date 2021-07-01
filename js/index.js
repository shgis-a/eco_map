function populateSidebar(data) {

	function populateSection(element, line) {

		var directory = element + " > .list-group"

		// Empty list, then re-inject new list
		$(directory).empty()
		line.forEach(function (line) {

			if (line.Year != "") {
				year = " (" + line.Year + ")"
			} else {
				year = ""
			}

			if (links[line["Code"]] == undefined) {
				var html_string = "<li class='list-group-item " + line["Code"] + "_li'><input type='checkbox' id='" + line["Code"] + "'><span id='" + line["Code"] + "_text'>" + line["Code"] + ": " + line["Map Name"] + year + "</span><br><input type='range' class='form-range' id='" + line["Code"] + "'></li>"
				$(directory).append(html_string)
				link(line["Code"])
			} else {
				var html_string = "<li class='list-group-item " + line["Code"] + "_li'><button type='button' class='btn btn-primary btn-sm image_link' id='" + line["Code"] + "'><span id='" + line["Code"] + "_text'>" + line["Code"] + ": " + line["Map Name"] + year + "</span></button></li>"
				$(directory).append(html_string)

				var OSDid = line["Code"] + "OSD"

				$("#" + line["Code"]).click(function () {
					SimpleLightbox.open({
						content: "<div class='OSD' id='" + OSDid + "'></div>",
						elementClass: OSDid
					});

					console.log(links[line["Code"]])

					var viewer = OpenSeadragon({
						id: OSDid,
						prefixUrl: "./img/Openseadragon/",
						tileSources: {
							type: "image",
							url: links[line["Code"]]
						}
					});
				})
			}

		})
	}

	// As name implies

	// Instantiate buffer lists
	var list_alpha = [],
		list_bravo = [],
		list_charlie = []

	//Iterate through data, a list of dictionaries to generate categorised lists
	data.forEach(function (line) {
		// Categorise line by category
		if (line["Category"] == "A") {
			list_alpha.push(line)
		} else if (line["Category"] == "B") {
			list_bravo.push(line)
		} else if (line["Category"] == "C") {
			list_charlie.push(line)
		}
	})

	// Injecting lists into the right section

	populateSection("#layers_A", list_alpha);
	populateSection("#layers_B", list_bravo);
	populateSection("#layers_C", list_charlie);
}


function link(code) {
	// Helper function to grey out missing layers

	var li_class_tag = "." + code + "_li"

	// Verify the layer exists in Mapbox
	var mapLayer = map.getLayer(code);

	if (typeof mapLayer !== 'undefined') {
		// Default to hidden
		map.setLayoutProperty(code, 'visibility', 'none');

	} else {
		// Grey out unfound layers
		$(li_class_tag).addClass("disabled")
	}
}

// Init Map
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA';
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/shgis-kennethdean/ckjs4728a6vc319t4ml6d9eqv',
	zoom: 11,
	center: [103.8198, 1.3521]
});

var links = {}

$(document).ready(function () {

	map.on('load', function () {
		var data;
		$.ajax({
			type: "GET",
			url: "./csv/Ledger_of_maps.csv",
			dataType: "text",
			success: function (response) {
				data = $.csv.toObjects(response)

				// Iterate through and load layers
				data.forEach(function (entry) {
					// Test to load tilesets


					var code = entry.Code
					var tileset_url = entry["url"]

					// only add layers with tileset_ID
					if (entry["Source"] == "mapbox") {
						var tileset_url = 'https://api.mapbox.com/v4/' + entry.tileset_ID + '/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA'

						map.addSource(code, {
							'type': 'raster',
							'tiles': [tileset_url],
							'tileSize': 256
						})

						map.addLayer({
							'id': code,
							'type': 'raster',
							'source': code,
							'minzoom': 0,
							'maxzoom': 22
						});
					} else if (entry["Source"] == "libmap") {

						map.addSource(code, {
							'type': 'raster',
							'tiles': [tileset_url],
							'tileSize': 256
						})

						map.addLayer({
							'id': code,
							'type': 'raster',
							'source': code,
							'minzoom': 0,
							'maxzoom': 22
						});
					} else if (entry["Source"] == "geojson-points") {

						map.addSource('meteor-source', {
							type: 'geojson',
							// Use a URL for the value for the `data` property.
							data: tileset_url
						});

						map.addLayer({
							'id': code,
							'type': 'symbol',
							'source': 'meteor-source',
							'layout': {
								'text-field': ['get', 'id'],
								'text-variable-anchor': ['center'],
								'text-justify': 'auto'
							},
							'paint': {
								"text-color": "#dddddd",
								"text-halo-color": "#0000ff",
								"text-halo-width": 1,
								"text-halo-blur": 1
							}
						});
					} else if (entry["Source"] == "image") {
						links[code] = entry["url"];
					}
				})

				populateSidebar(data)

				$(":checkbox").click(function () {
					var id = $(this).attr('id')

					if (this.checked) {
						map.setLayoutProperty(id, 'visibility', 'visible');
					} else {
						map.setLayoutProperty(id, 'visibility', 'none');
					}
				})

				// Opacity function
				$("[type=range]").change(function () {
					value = $(this)[0].value
					var id = $(this).attr('id')

					map.setPaintProperty(
						id,
						'raster-opacity',
						parseInt(value, 10) / 100
					);
				})
			}
		})
	})

});
