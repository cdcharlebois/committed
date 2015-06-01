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
		//alert("you clicked on (" + e.offsetX +", " + e.offsetY + ")");
		var c = e.target;
		var ctx = c.getContext('2d');
		var img = document.getElementById('test'); // 235x235
		var iw = 235;
		var ih = 235;
		(Session.get('angle') ? '' : Session.set('angle', 0));
		// Session.set('angle')
		//
		// rotate context 
		//
		var TO_RADIANS = Math.PI/180;
		ctx.translate(e.offsetX, e.offsetY); // center of the image on the canvas.
		ctx.rotate(Session.get('angle')*TO_RADIANS); 
		ctx.drawImage(img, -iw/2, -ih/2, iw, ih); // (img, -width/2, -height/2, width, height)
		ctx.rotate(Session.get('angle')*TO_RADIANS*-1); // pi
		ctx.translate(-1*e.offsetX, -1*e.offsetY)

		Session.set('angle', (Session.get('angle') + 45)*1);
	}
});