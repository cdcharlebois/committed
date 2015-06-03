Session.set('points', []);
Session.set('partial', null);
var GLASSES_TARGETS = [
	[150,100],
	[450,100]
];

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
	},
	points: function(){
		return Session.get('points');
	},
	message: function(){
		return Session.get('message') || '';
	}
});
//
// Holy shit this works for any element...
//
Template.images.events({
	'click canvas#1': function(e,t) {
		var TO_RADIANS = Math.PI/180;
		var c = e.target;
		var ctx = c.getContext('2d');
		var img = document.getElementById('test'); // 235x235
		(Session.get('angle') ? '' : Session.set('angle', 0));
		(Session.get('scale') ? '' : Session.set('scale', 1));
		var iw = 235 * Session.get('scale');
		var ih = 235 * Session.get('scale');
		//
		// move the center of the image to the center of the context
		//
		ctx.translate(e.offsetX, e.offsetY);
		//
		// rotate the context to the specified angle
		//
		ctx.rotate(Session.get('angle')*TO_RADIANS); 
		//
		// draw image
		//  * note because we moved the context, the top-left part of the
		//    image needs to slide up and left
		//
		ctx.drawImage(img, -iw/2, -ih/2, iw, ih); // (img, -width/2, -height/2)
		//
		// now put it back the way you found it
		//
		ctx.rotate(Session.get('angle')*TO_RADIANS*-1); // pi
		ctx.translate(-1*e.offsetX, -1*e.offsetY)

		Session.set('angle', (Session.get('angle') + 45)*1);
		Session.set('scale', (Session.get('scale') + 0.1)*1);
	},
	'click button': function(e,t){
		var c = document.getElementById('2');
		var ctx = c.getContext('2d');
		var img = document.getElementById('test'); // 235x235
		ctx.drawImage(img, 0, 0, 235*2, 235*2);
		Session.set('message', "now click on my eyes to place the glasses");
	},
	'click canvas#2': function(e,t) {
		// check to see if there's a partial already
		var points = Session.get('points');
		points.push([e.offsetX, e.offsetY])
		Session.set('points', points);

		if (Session.get('points').length == 2){
			//get all the shit for the glasses image
			var c = e.target;
			var ctx = c.getContext('2d');
			var img = document.getElementById('glasses'); // 600x226
			var iw = 600;
			var ih = 226;
			//
			// get the scale
			//
			var scale = 1;
			var init_points = Session.get('points');
			//console.log(init_points);
			var x1 = init_points[0][0],
			    y1 = init_points[0][1],
			    x2 = init_points[1][0],
			    y2 = init_points[1][1];
			var init_length = Math.sqrt(Math.pow(Math.abs(x1-x2),2) + Math.pow(Math.abs(y1-y2),2));
			x1 = GLASSES_TARGETS[0][0],
			y1 = GLASSES_TARGETS[0][1],
			x2 = GLASSES_TARGETS[1][0],
			y2 = GLASSES_TARGETS[1][1];
			var fin_length = Math.sqrt(Math.pow(Math.abs(x1-x2),2) + Math.pow(Math.abs(y1-y2),2));
			console.log('init: ' +init_length); 
			console.log('fin: ' + fin_length);
			scale = init_length/fin_length;
			console.log('scale: ' + scale);
			//
			// get the angle
			//
			x1 = init_points[0][0],
			x2 = init_points[1][0],
			y1 = init_points[0][1],
			y2 = init_points[1][1];
			var dx = x1-x2;
			var dy = y1-y2;
			console.log('dx: ' + dx);
			var angle = Math.acos(Math.abs(dx)/init_length);
			if (dx * dy < 0)
				angle *= -1;
			console.log('angle: ' + angle);
			//
			// get the offset
			// * difference between init point A and glasses point A
			var offset = [
				init_points[0][0],
				init_points[0][1]
			]

			//
			// draw the new image
			//
			ctx.translate(offset[0],offset[1]);
			ctx.rotate(angle); 
			ctx.drawImage(img, -GLASSES_TARGETS[0][0]*scale, -GLASSES_TARGETS[0][1]*scale, iw*scale, ih*scale); // (img, -width/2, -height/2)
			ctx.rotate(-angle);
			ctx.translate(-offset[0],-offset[1]);


		}
	}
});


