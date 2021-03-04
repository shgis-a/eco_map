function populateSidebar(data) {
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

	// Sorting out alpha
	// Empty list, then re-inject new list
	$("#layers_A > .list-group").empty()
	list_alpha.forEach(function (line) {
		var alpha_html_string = "<li class='list-group-item " + line["Code"] + "_li'><input type='checkbox' id='" + line["Code"] + "'><span id='" + line["Code"] + "_text'>" + line["Code"] + ":" + line["Map Name"] + "</span><br><input type='range' class='form-range' id='" + line["Code"] + "'></li>"
		$("#layers_A > .list-group").append(alpha_html_string)

		// Helper function to link layers to points
		link(line["Code"])
	})

	// Sorting out bravo
	// Empty list, then re-inject new list
	$("#layers_B > .list-group").empty()
	list_bravo.forEach(function (line) {
		var bravo_html_string = "<li class='list-group-item " + line["Code"] + "_li'><input type='checkbox' id='" + line["Code"] + "'><span id='" + line["Code"] + "_text'>" + line["Code"] + ":" + line["Map Name"] + "</span><br><input type='range' class='form-range' id='" + line["Code"] + "'></li>"
		$("#layers_B > .list-group").append(bravo_html_string)

		// Helper function to link layers to points
		link(line["Code"])
	})

	// Sorting out charlie
	// Empty list, then re-inject new list
	$("#layers_C > .list-group").empty()
	list_charlie.forEach(function (line) {
		var charlie_html_string = "<li class='list-group-item" + line["Code"] + "_li'><input type='checkbox' id='" + line["Code"] + "'><span id='" + line["Code"] + "_text'>" + line["Code"] + ":" + line["Map Name"] + "</span><br><input type='range' class='form-range' id='" + line["Code"] + "'></li>"
		$("#layers_C > .list-group").append(charlie_html_string)

		// Helper function to link layers to points
		link(line["Code"])
	})


	// Checkbox function
	$(":checkbox").change(function () {

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


function link(code) {
	// Helper function to grey out missing layers

	var li_class_tag = "." + code + "_li"

	// Verify the layer exists in Mapbox
	var mapLayer = map.getLayer(code);
	if (typeof mapLayer !== 'undefined') {


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

$(document).ready(function () {

	map.on('styledata', function () {

		var data;
		$.ajax({
			type: "GET",
			url: "./Ledger_of_maps.csv",
			dataType: "text",
			success: function (response) {
				data = $.csv.toObjects(response)
				populateSidebar(data)
			}
		})
	});

});
