Template.golf.helpers({
	canAddRound: function(){
		return Session.get('canAddRound');
	},
	canAddPractice: function(){
		return Session.get('canAddPractice');
	},
	rounds: function(){
		return Rounds.find();
	},
	practices: function(){
		return Practices.find({},{sort: {when: -1}})
	},
	avgFour: function(){
		var p = Practices.find().fetch(),
		    a = 0;
		for (var i = 0; i < p.length; i++){
			console.log(p[i].fourPct);
			a += p[i].fourPct * 1;
		}
		console.log("a --> " + a)
		return ( a / p.length ).toFixed(2);
	},
	avgSeven: function(){
		var p = Practices.find().fetch(),
		    a = 0;
		for (var i = 0; i < p.length; i++){
			console.log(p[i].sevenPct);
			a += p[i].sevenPct * 1;
		}
		console.log("a --> " + a)
		return ( a / p.length ).toFixed(2);
	}
});

Template.golf.events({
	'click #addRound': function(e,t){
		Session.set('canAddRound', true);
	},
	'click #doneRound': function(e,t){
		var coursePar  = t.find("#coursePar").value*1,
		    toParTotal = Session.get('frontTotal') + Session.get('backTotal');

		Rounds.insert({
			name:  t.find("#courseName").value,
			score: coursePar + toParTotal
		});

		Session.set('canAddRound', false);
	},
	'click #addPractice': function(e,t){
		Session.set('canAddPractice', true);
	},
	'click #donePractice': function(e,t){
		var fourPct  = ((t.find('#puttsFrom4').value*1/12) * 100).toFixed(1),
		    sevenPct = ((t.find('#puttsFrom7').value*1/12) * 100).toFixed(1);


		if (!(fourPct == 0 || sevenPct == 0)) {
			Practices.insert({
				fourPct:  fourPct,
				sevenPct: sevenPct,
				when:     new Date()
			});	
		}
		

		Session.set('canAddPractice', false);
	}
});