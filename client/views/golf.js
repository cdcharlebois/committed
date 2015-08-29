Template.golf.helpers({
	canAddRound: function(){
		return Session.get('canAddRound');
	},
	canAddPractice: function(){
		return Session.get('canAddPractice');
	},
	rounds: function(){
		return Rounds.find({user: Meteor.user()});
	},
	practices: function(){
		return Practices.find({user: Meteor.user()},{sort: {when: -1}})
	},
	avgFour: function(){
		var p = Practices.find({user: Meteor.user()}).fetch(),
		    a = 0;
		for (var i = 0; i < p.length; i++){
			console.log(p[i].fourPct);
			a += p[i].fourPct * 1;
		}
		return ( a / p.length ).toFixed(2);
	},
	avgSeven: function(){
		var p = Practices.find({user: Meteor.user()}).fetch(),
		    a = 0;
		for (var i = 0; i < p.length; i++){
			console.log(p[i].sevenPct);
			a += p[i].sevenPct * 1;
		}
		return ( a / p.length ).toFixed(2);
	}
});

Template.golf.events({
	'click #addRound': function(e,t){
		Session.set('canAddRound', true);
		// should clear all the other session stuff that's stored
	},
	'click #doneRound': function(e,t){
		var coursePar   = t.find("#coursePar").value*1,
		    toParTotal  = Session.get('frontTotal') + Session.get('backTotal'),
			scoresToPar = [], 
			putts       = [],
			distances   = [],
			SGP         = 0,
			putt        = 0;

		for (var i = 1; i <=18; i++){
			var hole = {
				score:    t.find('#'+i).value*1,
				putts:    t.find('#putts'+i).value*1,
				distance: t.find('#pd'+i).value*1
			}
			scoresToPar.push(hole.score);
			putts.push(hole.putts);
			distances.push(hole.distances);

			putt += hole.putts;
			SGP += getStrokesGained(hole.putts, hole.distance);

		}
		Rounds.insert({
			name:  t.find("#courseName").value,
			score: coursePar + toParTotal,
			putt: putt,
			scores: scoresToPar,
			putts: putts,
			distances: distances,
			sgp: SGP,
			user:  Meteor.user()
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
				user:     Meteor.user(),
				when:     new Date()
			});	
		}
		

		Session.set('canAddPractice', false);
	}
});