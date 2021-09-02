$.ajax({
	type: "GET",
	url: "./csv/maplist.csv",
	dataType: "text",
	success: function (response) {
		data = $.csv.toObjects(response)

		// Iterate through and load layers
		data.forEach(function (entry) {
			console.log(entry)

			var constructor = "<li class='list-group-item'><b>" + entry["S/N"] + ": " + entry["Name"] + "</b><ul class='small'> <li>" + entry["Info"] + "</li>"

			if (entry["Link"] === "") {
				constructor = constructor + "</li>"
			} else {
				constructor = constructor + "<li><a href='" + entry["Link"] + "' class='btn btn-outline-primary btn-sm'>Link</a></li></li>"
			}

			$(".entries").append(constructor)
		})
	}
})
