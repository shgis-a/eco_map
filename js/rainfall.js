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

$(".s1_list li").on("click", function () {
	if ($(this).hasClass("active")) {

	} else {
		$(".s1_list li").removeClass("active")
		$(this).addClass("active")
	}

	map.setStyle("mapbox://styles/shgis-kennethdean/" + $(this).attr("id"))
})

new ScrollMagic.Scene({
		triggerElement: "#s1b"
	})
	.on("enter", function (e) {
		map.fitBounds([[103.8, 1.25], [103.89, 1.33]]);
		$("#s1b").toggleClass("active")
	})
	.on("leave", function (e) {
		map.flyTo({
			center: [103.82, 1.35],
			zoom: 10
		})
		$("#s1b").toggleClass("active")
	})
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

new ScrollMagic.Scene({
		triggerElement: "#s1c"
	})
	.on("enter", function (e) {
		$("#ckol9hfdg34hr18plw28zxjeb").click()
		$("#s1c").toggleClass("active")
	})
	.on("leave", function (e) {
		$("#ckjs4728a6vc319t4ml6d9eqv").click()
		$("#s1c").toggleClass("active")
	})
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

new ScrollMagic.Scene({
		triggerElement: "#s1d"
	})
	.on("enter", function (e) {
		var marker1 = new mapboxgl.Marker({
				color: "#C02942",
				draggable: true
			}).setLngLat([103.868, 1.310])
			.addTo(map);
		var marker2 = new mapboxgl.Marker({
				color: "#53777A",
				draggable: true
			}).setLngLat([103.849, 1.307])
			.addTo(map);
		$("#s1d").toggleClass("active")
	})
	.on("leave", function (e) {
		$("#s1d").toggleClass("active")
	})
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

new ScrollMagic.Scene({
		triggerElement: "#s1e"
	}).on("enter", function (e) {
		map.fitBounds([[103.845, 1.301], [103.875, 1.314]]);
		$("#s1e").toggleClass("active")
	})
	.on("leave", function (e) {
		$("#s1e").toggleClass("active")
		map.fitBounds([[103.8, 1.25], [103.89, 1.33]]);
	})
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);
