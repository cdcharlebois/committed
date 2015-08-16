Template.golf.helpers({
	canAdd: function(){
		return Session.get('canAdd');
	},
	rounds: function(){
		return Rounds.find();
	}
});

Template.golf.events({
	'click #addRound': function(e,t){
		Session.set('canAdd', true);
	},
	'click #doneRound': function(e,t){
		var coursePar  = t.find("#coursePar").value*1,
		    toParTotal = Session.get('frontTotal') + Session.get('backTotal');

		Rounds.insert({
			name:  t.find("#courseName").value,
			score: coursePar + toParTotal
		});

		Session.set('canAdd', false);
	}
});