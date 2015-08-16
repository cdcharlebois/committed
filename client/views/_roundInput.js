Template.roundInput.helpers({
	frontTotal: function(){
		return Session.get('frontTotal');
	},
	backTotal: function(){
		return Session.get('backTotal');
	},
	total: function(){
		return Session.get('frontTotal') + Session.get('backTotal');
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
	}
});