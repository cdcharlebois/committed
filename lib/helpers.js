distanceBetweenPoints = function (point1, point2) {
	return Math.sqrt(Math.pow(Math.abs(point1.x-point2.x),2) + Math.pow(Math.abs(point1.y-point2.y),2));
}

getGhinHdcp = function (ghinNumber) {
	$.ajax(
		{
			url: "http://widgets.ghin.com/HandicapLookupResults.aspx?entry=1&ghinno=" + ghinNumber,
			success: function(data){
				console.log(data);
			},
			error: function(err){
				console.log(err);
			}
		}
	)
}