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

/*
 * Given the number of putts from a distance, return the SG versus the 
 *    PGA Tour average
 * ----------------------------------------------
 * @param putts = number of putts from [distance]
 * @param distance = the distance 
 *
 */
getStrokesGained = function (putts, distance){
	
	if ( distance > 25 )
		return 2 - putts;
	
	var TOUR_TABLE = [
		[3, 1],
		[4, 1.1],
		[5, 1.2],
		[6, 1.3],
		[7, 1.4],
		[8, 1.5],
		[10, 1.6],
		[15, 1.7],
		[20, 1.8],
		[25, 1.9]
	];
	for (var i in TOUR_TABLE){
		if ( TOUR_TABLE[i][0] >= distance )
			return TOUR_TABLE[i][1] - putts;
	}
}