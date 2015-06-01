// ---------------------------------------------------- //
//    How to match two images based on target points    //
// ---------------------------------------------------- //
// 1. Place target points on images
// 2. Use target points A(x,y) B(x,y) A'(x,y) B'(x,y) to determine...
//    a) Scale -- using distance from A-B to A'-B' as a measure
//    b) Rotation -- using slope from A-B to A'-B' as a measure
//    c) Translation -- using dx/dy from A to A' as a measure
Template.images.helpers({
	foobar: function(){
		return "Foobar";
	}
});
//
// Holy shit this works for any element...
//
Template.images.events({
	'click canvas': function(e,t) {
		alert("you clicked on (" + e.offsetX +", " + e.offsetY + ")");
		var c = e.target;
		var ctx = c.getContext('2d');
		var img = document.getElementById('test');
		ctx.drawImage(img, e.offsetX, e.offsetY);
	}
});