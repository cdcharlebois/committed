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

		//
		// logging for stats
		//
		var scoresToPar = [], 
			putts = [],
			distances = [],
			putt = 0;
		for (var i = 1; i <=18; i++){
			scoresToPar.push(t.find('#'+i).value*1);
			putts.push(t.find('#putts'+i).value*1);
			putt += t.find('#putts'+i).value*1;
			distances.push(t.find('#pd'+i).value*1);
		}
		Rounds.insert({
			name:  t.find("#courseName").value,
			score: coursePar + toParTotal,
			putt: putt,
			scores: scoresToPar,
			putts: putts,
			distances: distances
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