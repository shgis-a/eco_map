//Scrollmagic init
var controller = new ScrollMagic.Controller();

//Scene Two

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA';
var map = new mapboxgl.Map({
	container: 's1_map', // container id
	style: 'mapbox://styles/shgis-kennethdean/ckjs4728a6vc319t4ml6d9eqv', // style URL
	center: [103.82, 1.35], // starting position [lng, lat]
	zoom: 10, // starting zoom
	interactive: false
})

function switchLayer(layer) {
	var layerId = layer.target.id;
	map.setStyle('mapbox://styles/shgis-kennethdean/' + layerId);
}

function makeGeoJSON(csvData, name) {
	console.log(csvData, name)

	csv2geojson.csv2geojson(csvData, {
		latfield: 'Latitude',
		lonfield: 'Longitude',
		delimiter: ','
	}, function (err, data) {
		map.on('load', function () {

			map.addLayer({
				'id': name,
				'type': 'symbol',
				'source': {
					'type': 'geojson',
					'data': data
				},
				'layout': {
					"icon-image": "marker-15"
				},
				'paint': {}
			});
		});
	});
}

map.on('load', function () {

	$(".s1_list li").on("click", function () {
		if ($(this).hasClass("active")) {

		} else {
			$(".s1_list li").removeClass("active")
			$(this).addClass("active")
		}

		if ($(this).attr("id") == "1860") {
			map.addSource('1860wms-source', {
				'type': 'raster',
				"maxzoom": 24,
				'tiles': [
				'https://libmaps.nus.edu.sg/gis/rest/services/Sing_Hist_Maps/1860/MapServer/tile/{z}/{y}/{x}/'
			],
				'tileSize': 256
			});

			map.addLayer({
				'id': '1860wms-layer',
				'type': 'raster',
				'source': '1860wms-source'
			});
		} else {
			try {
				map.removeLayer("1860wms-layer")
			} catch {}
			map.setStyle("mapbox://styles/shgis-kennethdean/" + $(this).attr("id"))
		}
	})
})

new ScrollMagic.Scene({
		triggerElement: "#s2b"
	})
	.on("enter", function (e) {
		map.fitBounds([[103.8, 1.25], [103.89, 1.33]]);
		$("#s2b").toggleClass("active")
	})
	.on("leave", function (e) {
		map.flyTo({
			center: [103.82, 1.35],
			zoom: 10
		})
		$("#s2b").toggleClass("active")
	})
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

new ScrollMagic.Scene({
		triggerElement: "#s2c"
	})
	.on("enter", function (e) {
		$("#ckol9hfdg34hr18plw28zxjeb").click()
		$("#s2c").toggleClass("active")
	})
	.on("leave", function (e) {
		$("#ckjs4728a6vc319t4ml6d9eqv").click()
		$("#s2c").toggleClass("active")
	})
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

// markers

var popup1 = new mapboxgl.Popup({
	closeButton: true,
	classname: "popup1 popup",
	maxWidth: "400px",
	offset: 50
}).setHTML(
	'<h4 class="bold">Singapore’s First Observatory 1841-45</h4> <h5>Location: 1.310472, 103.868306</h5> <p>In the late 1830s, the British Association for the Advancement of Science and the Royal Society in London embarked on a mission to collect simultaneous magnetic and meteorological observations across the Empire and colonies. One of the chosen sites was Singapore. The observatory here was set up and run by Lieutenant Elliot of the Madras Engineers in 1841. It was described by contemporaries as small but well designed for making weather observations. Open windows maximised air flow and direct sunlight was prevented from reaching the meteorological instruments. The walls were 18 inches thick and painted white in order that they should reflect, rather than retain heat (Elliot, 1849). For four years, Elliot and his small team – comprising of locally hired assistants and observers – worked on a shoe-string budget making hourly magnetic, temperature and pressure observations from this building. Elliot himself lived on site and it was largely down to his tireless efforts to record and publish the observations, that we still have access to this incredible resource today, now digitised., the observatory was closed in 1845, due to the withdrawal of finances for this aspect of the project in Singapore; the measuring instruments sent to India for re-use at Bombay. The building was left empty for several years.</p>'
);

var popup2 = new mapboxgl.Popup({
	closeButton: true,
	classname: "popup2 popup",
	maxWidth: "400px",
	anchor: "left",
	offset: 50
}).setHTML(
	'<h4 class="bold">Kandang Kerbau Hospital: home of meteorology for the nineteenth century</h4> <h5>Location: 1.307056, 103.849389</h5> <p>In 1869, meteorology for the Straits Settlements was brought under jurisdiction of the Medical Department. This was because of a recognition that weather affected disease incidence, a fact that doctors were keen to study in more depth. The medical department also offered a coherent infrastructure for the systematic collation of observations within a controlled environment. In 1875, Kandang Kerbau Hospital became the centre for meteorological research, with its own small but dedicated observatory. The resultant datasets became the main sources of weather tracking for Singapore and, they were released in the press for the general public. The data was very detailed by this time with readings made three-times daily; in line with a general push to standardise weather records into one coherent format across the British Empire. We do not know exactly who made the observations but there are references that point to Assistant Surgeons and apothecaries working at the hospital who took on this role. The whole enterprise was co-ordinated by the Principle Chief Medical Officer. In the 1880s, this was T. Irvine-Rowell who, as luck would have it, also happened to be a keen semi-amateur meteorologist. It was under his direction that weather recording was promoted and he pushed to extend the existing infrastructure to open more registering stations across Singapore and the Malayan peninsula.</p>'
);

var marker1 = new mapboxgl.Marker({
	color: "#C02942"
}).setLngLat([103.868, 1.310])

var marker2 = new mapboxgl.Marker({
	color: "#53777A"
}).setLngLat([103.849, 1.307])

new ScrollMagic.Scene({
		triggerElement: "#s2d"
	})
	.on("enter", function (e) {
		marker1.setPopup(popup1)
			.addTo(map)
		marker2.setPopup(popup2)
			.addTo(map)

		map.on('click', 'popup', function (e) {
			console.log(e)
		})

		$("#s2d").toggleClass("active")
	})
	.on("leave", function (e) {
		marker1.remove();
		marker2.remove();
		$("#s2d").toggleClass("active")

	})
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

new ScrollMagic.Scene({
		triggerElement: "#s2e"
	}).on("enter", function (e) {
		map.fitBounds([[103.845, 1.301], [103.875, 1.305]]);
		$("#s2e").toggleClass("active")
		marker1.togglePopup()
		marker2.togglePopup()
	})
	.on("leave", function (e) {
		$("#s2e").toggleClass("active")
		map.fitBounds([[103.8, 1.25], [103.89, 1.33]]);
	})
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

new ScrollMagic.Scene({
		triggerElement: "#s2e",
		offset: 300
	}).on("enter", function (e) {
		popup1.remove();
		popup2.remove();
	}).on("leave", function (e) {
		marker1.togglePopup()
		marker2.togglePopup()
	})
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

new ScrollMagic.Scene({
		triggerElement: "#s2e",
		offset: 300
	}).on("enter", function (e) {
		$("#ckoo9el4i0pun17pidps5h38k").click();
		map.flyTo({
			center: [103.849, 1.307],
			zoom: 17
		})
	}).on("leave", function (e) {
		$("#ckol9hfdg34hr18plw28zxjeb").click();
		map.fitBounds([[103.845, 1.301], [103.875, 1.305]]);
	})
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

new ScrollMagic.Scene({
		triggerElement: "#s3a"
	}).on("enter", function (e) {

		marker1.remove();
		marker2.remove();

		map.fitBounds([[103.799674, 1.229805], [103.911245, 1.351018]]);
		$("#1860").click();

		map.addSource('meteor-source', {
			type: 'geojson',
			// Use a URL for the value for the `data` property.
			data: './geojson/meteor_stations.geojson'
		});

		map.loadImage('pointer', "./Map_marker.svg")

		map.addLayer({
			'id': 'meteor-layer-circle',
			'type': 'circle',
			'source': 'meteor-source',
			'paint': {
				'circle-radius': 14,
				'circle-stroke-width': 2,
				'circle-color': 'red',
				'circle-stroke-color': 'black'
			}
		});

		map.addLayer({
			'id': 'meteor-layer-text',
			'type': 'symbol',
			'source': 'meteor-source',
			'layout': {
				'text-field': ['get', 'id'],
				'text-variable-anchor': ['center'],
				'text-justify': 'auto'
			}
		});
	}).on("leave", function (e) {
		map.fitBounds([[103.845, 1.301], [103.875, 1.305]]);
		$("#ckoo9el4i0pun17pidps5h38k").click();
		map.removeLayer("meteor-layer-circle")
		map.removeLayer("meteor-layer-text")
	})
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);
