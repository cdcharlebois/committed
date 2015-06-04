
distanceBetweenPoints = function (point1, point2) {
	return Math.sqrt(Math.pow(Math.abs(point1.x-point2.x),2) + Math.pow(Math.abs(point1.y-point2.y),2));
}