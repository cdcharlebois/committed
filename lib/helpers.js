distanceBetweenPoints = function (point1, point2) {
	return Math.sqrt(Math.pow(Math.abs(point1.x-point2.x),2) + Math.pow(Math.abs(point1.y-point2.y),2));
}

getGhinHdcp = function (ghinNumber) {
	$.ajax(
		{
			url: "http://m.ghin.com/HLR.aspx?ghinno=" + ghinNumber,
			success: function(data){
				console.log(data);
			},
			error: function(err){
				console.log(err);
			}
		}
	)
}

formatPhoneNumber = function (s) {
	var justNumbers = s.replace(/\D/g, '');
	var capture = justNumbers.match(/^(\d{3})(\d{3})(\d{4})$/);
	return (!capture) ? "" : "(" + capture[1] + ") " + capture[2] + " - " + capture[3];
}