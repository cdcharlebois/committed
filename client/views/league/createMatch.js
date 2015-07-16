Template.createMatch.helpers({
	'canAddTimePref': function(){
		return Session.get('canAddTimePref')
	},
	'times': function(){
		return Session.get('times');
	}, 
	'userHasGhin': function() {
		return Meteor.user().profile.ghin.number*1 != 0;
	}
});

Template.createMatch.events({
	'ready': function(){
		//init session for this page
		Session.set('canAddTimePref', false);
	},
	'click #addTimePref': function(e,t) {
		Session.set('canAddTimePref', true);
	},
	'click #addTimePrefDone': function(e,t) {
		var times = Session.get('times') || [];
		console.log(times);
		times.push({
					day: 		t.find('#inputPrefDay').value,
					fromTime: 	t.find('#inputPrefFrom').value,
					toTime: 	t.find('#inputPrefTo').value
				});
		Session.set('times', times);
		// Meteor.users.update({_id:Meteor.userId()}, {$push: {"profile.prefs.times": {
		// 	day: 		t.find('#inputPrefDay').value,
		// 	fromTime: 	t.find('#inputPrefFrom').value,
		// 	toTime: 	t.find('#inputPrefTo').value
		// }}});
		Session.set('canAddTimePref', false);
	},
	'click #submit': function(e,t) {
		var match = {
			playerOne: Meteor.user(),
			playerTwo: null,
			results:   null,
			accepted:  false,
			confirmed: false,
			ranked:    t.find('#inputRanked').checked,
			radius:    t.find('#inputRadius').value*1,
			radiusOf:  Meteor.user().profile.contact.address,
			cost:      t.find('#inputCost').value*1,
			times:     Session.get('times')
		}
		console.log(match);
		Matches.insert(match);
	}
});