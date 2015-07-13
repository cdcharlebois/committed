Template.profile.helpers({
	canEdit: function(){
		return Session.get('canEdit');
	},
	myTimePrefs: function(){
		return Meteor.user().profile.prefs.times || [];
	},
	myRadiusPref: function(){
		return (Meteor.user().profile.prefs.radius) ? Meteor.user().profile.prefs.radius + " miles" : "not yet set :("
	},
	myCostPref: function() {
		return (Meteor.user().profile.prefs.cost) ? "$ "+Meteor.user().profile.prefs.cost : "not yet set :("
	},
	canAddTimePref: function(){
		return Session.get('canAddTimePref');
	},
});

Template.profile.events({
	'click #edit': function() {
		Session.set('canEdit', true);
	},
	'click #done':function(e,t) {
		var data = {
			name: 		t.find('#inputName').value,
			contact: {
				phone: 	 formatPhoneNumber(t.find('#inputPhone').value),
				email: 	 t.find('#inputEmail').value,
				address: t.find('#inputAddress').value
			},
			ghin: {
				number: t.find('#inputGhin').value,
				// hdcp:   getGhinHdcp(t.find('#inputGhin').value)
			},
			prefs: {
				times:  Meteor.user().profile.prefs.times,
				cost:   t.find('#inputPrefCost').value,
				radius: t.find('#inputPrefRadius').value
			}
		}

		Meteor.users.update({_id:Meteor.userId()}, {$set: {profile: data}});

		Session.set('canEdit', false);
	},
	'click #addTimePref': function(e,t) {
		Session.set('canAddTimePref', true);
	},
	'click #addTimePrefDone': function(e,t) {
		Meteor.users.update({_id:Meteor.userId()}, {$push: {"profile.prefs.times": {
			day: 		t.find('#inputPrefDay').value,
			fromTime: 	t.find('#inputPrefFrom').value,
			toTime: 	t.find('#inputPrefTo').value
		}}});
		Session.set('canAddTimePref', false);
	}
});