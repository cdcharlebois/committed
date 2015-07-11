Template.profile.helpers({
	canEdit: function(){
		return Session.get('canEdit');
	}
});

Template.profile.events({
	'click #edit': function() {
		Session.set('canEdit', true);
	},
	'click #done':function(e,t) {
		var data = {
			name: 		t.find('#inputName').value,
			contact: {
				phone: 	formatPhoneNumber(t.find('#inputPhone').value),
				email: 	t.find('#inputEmail').value
			},
			ghin: {
				number: t.find('#inputGhin').value
			},
			prefs: {

			}
		}

		Meteor.users.update({_id:Meteor.userId()}, {$set: {profile: data}});

		Session.set('canEdit', false);
	}
});