Template.consulting.helpers({
	addingNote: function(){
		return Session.get('addingNote');
	},
	myNotes: function(){
		return Meteor.user().profile.notes;
	}
})
Template.consulting.events({
	'click #createNote':function(){
		Session.set('addingNote', true);
	},
	'click #saveNote':function(e,t){
		Meteor.users.update({
			_id:Meteor.userId()
		}, 
		{
			$push: {
				"profile.notes": {
					title: t.find('#title').value,
					body:  t.find('#body').value,
					todo:  t.find('#todo').value,
					when:  new Date()
				}
			}
		});
		Session.set('addingNote', false);
	}
})