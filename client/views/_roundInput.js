Template.roundInput.helpers({
	frontTotal: function(){
		return Session.get('frontTotal');
	},
	backTotal: function(){
		return Session.get('backTotal');
	},
	total: function(){
		return Session.get('frontTotal') + Session.get('backTotal');
	},
	frontTotalPutts: function(){
		return Session.get('frontTotalPutts');
	},
	backTotalPutts: function(){
		return Session.get('backTotalPutts');
	},
	totalPutts: function(){
		return Session.get('frontTotalPutts') + Session.get('backTotalPutts');
	},
	frontTotalPd: function(){
		return Session.get('frontTotalPd');
	},
	backTotalPd: function(){
		return Session.get('backTotalPd');
	},
	totalPd: function(){
		return Session.get('frontTotalPd') + Session.get('backTotalPd');
	}
});

Template.roundInput.events({
	'keyup .stp': function(e,t){
		var aHoles = t.findAll('.stp');
		// console.log(aHoles);

		var frontTotal = 0, backTotal = 0;

		//front
		for (var i = 0; i < 9; i++){
			frontTotal += aHoles[i].value*1;
		}
		//back
		for (var i = 9; i < 18; i++){
			backTotal += aHoles[i].value*1;
		}

		// console.log('front --> ' + frontTotal);
		// console.log('back --> ' + backTotal);

		Session.set('frontTotal', frontTotal);
		Session.set('backTotal', backTotal);
	},
	'keyup .putts': function(e,t){
		var aHoles = t.findAll('.putts');
		// console.log(aHoles);

		var frontTotal = 0, backTotal = 0;

		//front
		for (var i = 0; i < 9; i++){
			frontTotal += aHoles[i].value*1;
		}
		//back
		for (var i = 9; i < 18; i++){
			backTotal += aHoles[i].value*1;
		}

		// console.log('front --> ' + frontTotal);
		// console.log('back --> ' + backTotal);

		Session.set('frontTotalPutts', frontTotal);
		Session.set('backTotalPutts', backTotal);
	},
	'keyup .pd': function(e,t){
		var aHoles = t.findAll('.pd');
		// console.log(aHoles);

		var frontTotal = 0, backTotal = 0;

		//front
		for (var i = 0; i < 9; i++){
			frontTotal += aHoles[i].value*1;
		}
		//back
		for (var i = 9; i < 18; i++){
			backTotal += aHoles[i].value*1;
		}

		// console.log('front --> ' + frontTotal);
		// console.log('back --> ' + backTotal);

		Session.set('frontTotalPd', frontTotal);
		Session.set('backTotalPd', backTotal);
	}
});