Session.set('points', []);

// ---------------------------------------------------- //
//    How to match two images based on target points    //
// ---------------------------------------------------- //
// 1. Place target points on images
// 2. Use target points A(x,y) B(x,y) A'(x,y) B'(x,y) to determine...
//    a) Scale -- using distance from A-B to A'-B' as a measure
//    b) Rotation -- using slope from A-B to A'-B' as a measure
//    c) Translation -- using dx/dy from A to A' as a measure
Template.images.helpers({
	points: function(){
		return Session.get('points');
	},
	clothing: function(){
		return Clothing.find().fetch();
	}
});
//
// Holy shit this works for any element...
//
Template.images.events({
	'change select': function(e,t) {
		Session.set('cid', e.target.value);
	},
	'click button': function(e,t){
		var c = document.getElementById('2');
		var ctx = c.getContext('2d');
		var img = document.getElementById('test'); // 235x235
		ctx.drawImage(img, 0, 0, 235*2, 235*2);
		Session.set('message', "now click on my eyes to place the glasses");
	},
	'click canvas#2': function(e,t) {
		//
		// add the new click to `points`
		//
		var points = Session.get('points');
		points.push({
			x: e.offsetX, 
			y: e.offsetY
		});
		Session.set('points', points);

		if (Session.get('points').length % 2 == 0){
			//
			// Load the clothing
			//
			var article = Clothing.findOne(Session.get('cid'));


			// ----------------- //
			// Draw the clothing //
			// ----------------- //
			
			//
			// Set defaults
			//
			var scale = 1;
			// target points
			var p1 = points[points.length-2];
			var p2 = points[points.length-1];
			//
			// make sure the left point is p1
			//
			if (p2.x < p1.x || p2.x === p1.x && p2.y < p1.y) {
				var tmp = p1;
				p1 = p2;
				p2 = tmp;
			}
			// map points
			var mapPoints = article.mapPoints;
			var mp1 = mapPoints[0];
			var mp2 = mapPoints[1];

			//get all the shit for the glasses image
			var c = e.target;
			var ctx = c.getContext('2d');
			var img = new Image();
			img.src = article.img;
			var iw = img.width;
			var ih = img.height;
			
			//
			// get the scale
			//
			
			// length of hypoteneuse on target
			var targetLength = distanceBetweenPoints(p1, p2);
			// length of same segment in the map
			var maplength = distanceBetweenPoints(mp1, mp2);

			scale = targetLength/maplength;
			
			//
			// get the angle
			//
			
			// CAH     cos(x)  = adjacent / hypoteneuse
			//         cos(x)  = dx / targetLength
			//     arc(cos(x)) = arc( dx / targetLength )
			//             x   = arc( dx / targetLength )
			var dx = p1.x-p2.x;
			var dy = p1.y-p2.y;
			var angle = Math.acos(Math.abs(dx)/targetLength);
			
			// account for quandrants and all that
			if (dx * dy < 0)
				angle *= -1;
			
			//
			// draw the new image
			//
			ctx.translate(p1.x,p1.y); // offset to the first target point
			ctx.rotate(angle); 
			ctx.drawImage(img, -mp1.x*scale, -mp1.y*scale, iw*scale, ih*scale); // (img, -width/2, -height/2)
			ctx.rotate(-angle);
			ctx.translate(-p1.x,-p1.y);


		}
	}
});


