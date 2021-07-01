// Init Map
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA';
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/shgis-kennethdean/ckjs4728a6vc319t4ml6d9eqv',
	zoom: 10,
	center: [103.8198, 1.3521],
	style: 'mapbox://styles/shgis-kennethdean/ckjs4728a6vc319t4ml6d9eqv'
});

//Scrollmagic init
var controller = new ScrollMagic.Controller();

$(document).ready(function () {

	map.on('load', function () {

		map.addSource("s1", {
			'type': 'raster',
			'tiles': ['https://api.mapbox.com/v4/shgis-kennethdean.0k7zbenw/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA'],
			'tileSize': 256
		})

		map.addSource("s3", {
			'type': 'raster',
			'tiles': ['https://api.mapbox.com/v4/shgis-kennethdean.4ki72mgp/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA'],
			'tileSize': 256
		})

		map.addSource("s4", {
			'type': 'raster',
			'tiles': ['https://api.mapbox.com/v4/shgis-kennethdean.9muiu5o5/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA'],
			'tileSize': 256
		})

		map.addSource("s5", {
			'type': 'raster',
			'tiles': ['https://api.mapbox.com/v4/shgis-kennethdean.dg3mxn2w/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA'],
			'tileSize': 256
		})

		map.addSource("s6", {
			'type': 'raster',
			'tiles': ['https://api.mapbox.com/v4/shgis-kennethdean.8u9jidi2/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA'],
			'tileSize': 256
		})

		map.addSource("s8", {
			'type': 'raster',
			'tiles': ['https://api.mapbox.com/v4/shgis-kennethdean.2fkoni01/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA'],
			'tileSize': 256
		})

		map.addSource('raster-tiles', {
			'type': 'raster',
			'tiles': [
					'https://libmaps.nus.edu.sg/gis/rest/services/Sing_Hist_Maps/1975/MapServer/tile/{z}/{y}/{x}'
				],
			'tileSize': 256
		})

		map.addLayer({
			'id': 'simple-tiles',
			'type': 'raster',
			'source': 'raster-tiles',
			'minzoom': 0,
			'maxzoom': 22
		})
	})

	new ScrollMagic.Scene({})
		.setPin("#map")
		.addIndicators({
			name: "map_cont"
		}) // add indicators (requires plugin)
		.addTo(controller);


	new ScrollMagic.Scene({
			triggerElement: "#s1",
			triggerHook: 0.3
		})
		.on("enter", function (e) {
			map.fitBounds([[104.01, 1.38], [104.1, 1.45]])

			map.addLayer({
				'id': "s1",
				'type': 'raster',
				'source': "s1",
				'minzoom': 0,
				'maxzoom': 22
			});
		})
		.on("leave", function (e) {
			map.removeLayer('s1')
			map.flyTo({
				zoom: 10,
				center: [103.8198, 1.3521]
			})
		})
		.addIndicators({
			name: "s1"
		}) // add indicators (requires plugin)
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: "#s2",
			duration: 200,
			triggerHook: 0.3
		})
		.on("enter", function (e) {

			$("<img class='duo' src='./img/s2_house.png'/>").appendTo(".images").hide().fadeIn(300);
			$("<figcaption>(ABOVE) Part of house where 5 malaria cases were detected with a rubber plantation in the background, where Anopheles maculatus (BELOW) was found breeding.</figcaption>").appendTo(".images").hide().fadeIn(300);
			$("<img class='duo' src='./img/s2_mosquito.png'/>").appendTo(".images").hide().fadeIn(300);
		})
		.on("leave", function (e) {
			$(".images").fadeOut(300, function () {
				$(this).empty().show();
			});
		})
		.addIndicators({
			name: "s2"
		}) // add indicators (requires plugin)
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: "#s3",
			triggerHook: 0.3
		})
		.on("enter", function (e) {
			map.fitBounds([[103.58, 1.15], [104.14, 1.53]])
			map.addLayer({
				'id': "s3",
				'type': 'raster',
				'source': "s3",
				'minzoom': 0,
				'maxzoom': 22
			});
			map.removeLayer('s1')
		})
		.on("leave", function (e) {
			map.removeLayer('s3')
			map.fitBounds([[104.01, 1.38], [104.1, 1.45]])
			map.addLayer({
				'id': "s1",
				'type': 'raster',
				'source': "s1",
				'minzoom': 0,
				'maxzoom': 22
			});
		})
		.addIndicators({
			name: "s3"
		}) // add indicators (requires plugin)
		.addTo(controller)

	new ScrollMagic.Scene({
			triggerElement: "#s4",
			triggerHook: 0.3
		})
		.on("enter", function (e) {
			map.addLayer({
				'id': "s4",
				'type': 'raster',
				'source': "s4",
				'minzoom': 0,
				'maxzoom': 22
			});
			map.removeLayer('s3')
		})
		.on("leave", function (e) {
			map.removeLayer('s4')
			map.addLayer({
				'id': "s3",
				'type': 'raster',
				'source': "s3",
				'minzoom': 0,
				'maxzoom': 22
			});
		})
		.addIndicators({
			name: "s4"
		}) // add indicators (requires plugin)
		.addTo(controller)

	new ScrollMagic.Scene({
			triggerElement: "#s5",
			triggerHook: 0.3
		})
		.on("enter", function (e) {
			map.fitBounds([[103.85, 1.28], [103.88, 1.34]])
			map.addLayer({
				'id': "s5",
				'type': 'raster',
				'source': "s5",
				'minzoom': 0,
				'maxzoom': 22
			});
			map.removeLayer('s4')
		})
		.on("leave", function (e) {
			map.fitBounds([[103.58, 1.15], [104.14, 1.53]])
			map.removeLayer('s5')
			map.addLayer({
				'id': "s4",
				'type': 'raster',
				'source': "s4",
				'minzoom': 0,
				'maxzoom': 22
			});
		})
		.addIndicators({
			name: "s5"
		}) // add indicators (requires plugin)
		.addTo(controller)

	new ScrollMagic.Scene({
			triggerElement: "#s6",
			triggerHook: 0.3
		})
		.on("enter", function (e) {
			map.fitBounds([[103.88, 1.28], [104.07, 1.43]])
			map.addLayer({
				'id': "s6",
				'type': 'raster',
				'source': "s6",
				'minzoom': 0,
				'maxzoom': 22
			});
			map.removeLayer('s5')
		})
		.on("leave", function (e) {
			map.fitBounds([[103.85, 1.28], [103.88, 1.34]])
			map.addLayer({
				'id': "s5",
				'type': 'raster',
				'source': "s5",
				'minzoom': 0,
				'maxzoom': 22
			});
			map.removeLayer('s6')
		})
		.addIndicators({
			name: "s6"
		}) // add indicators (requires plugin)
		.addTo(controller)

	new ScrollMagic.Scene({
			triggerElement: "#s7",
			duration: 200,
			triggerHook: 0.3
		})
		.on("enter", function (e) {

			$("<img class='uno' src='./img/s6_graph.png'/>").appendTo(".images").hide().fadeIn(300);
		})
		.on("leave", function (e) {
			$(".images").fadeOut(300, function () {
				$(this).empty().show();
			});
		})
		.addIndicators({
			name: "s7"
		}) // add indicators (requires plugin)
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: "#s8",
			triggerHook: 0.3
		})
		.on("enter", function (e) {
			map.fitBounds([[103.95, 1.31], [103.98, 1.34]])
			map.addLayer({
				'id': "s8",
				'type': 'raster',
				'source': "s8",
				'minzoom': 0,
				'maxzoom': 22
			});
			map.removeLayer('s6')
		})
		.on("leave", function (e) {
			map.fitBounds([[103.88, 1.28], [104.07, 1.43]])
			map.addLayer({
				'id': "s6",
				'type': 'raster',
				'source': "s6",
				'minzoom': 0,
				'maxzoom': 22
			});
			map.removeLayer('s8')
		})
		.addIndicators({
			name: "s8"
		}) // add indicators (requires plugin)
		.addTo(controller)


	new ScrollMagic.Scene({
			triggerElement: "#s9",
			duration: 200,
			triggerHook: 0.3
		})
		.on("enter", function (e) {

			$("<img class='uno' src='./img/s9_graph.png'/>").appendTo(".images").hide().fadeIn(300);
		})
		.on("leave", function (e) {
			$(".images").fadeOut(300, function () {
				$(this).empty().show();
			});
		})
		.addIndicators({
			name: "s9"
		}) // add indicators (requires plugin)
		.addTo(controller);
})
