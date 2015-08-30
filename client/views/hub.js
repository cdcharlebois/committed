Template.hub.helpers({
	'isFlashMessage':function(){
		return Session.get('isFlashMessage');
	},
	'flashMessage':function(){
		return Session.get('flashMessage');
	},
	'flashError':function(){
		return Session.get('flashError');
	}
});

Template.hub.events({
	'click #submit':function(e, t){

		Session.set('isFlashMessage', null);
		Session.set('flashError', null);
		Session.set('flashMessage', null);
		
		var data = {
			firstname: t.find('#firstName').value.trim(),
			lastname: t.find('#lastName').value.trim(),
			email: t.find('#email').value,
		}
		console.log(data);
		Meteor.call('createOrUpdateContact', data, function(err, res){
			if (!res) {
				//set flash message
				Session.set('isFlashMessage', true);
				Session.set('flashError', true);
				Session.set('flashMessage', 'Sorry, your signup failed. Please check your entries.');
			}
			else {
				// var pData = EJSON.parse(res.content);
				// console.log(pData);
				// alert('response received --> ' + pData.vid);	
				Session.set('isFlashMessage', true);
				Session.set('flashError', false);
				Session.set('flashMessage', 'Thanks, '+data.firstname+'. You\'ve been signed up!');
			}
			
		});
		// Meteor.call('createOrUpdateContact', {}, function(err, res){
		// 	var pData = EJSON.parse(res.content);
		// 	console.log(pData);
		// 	alert('response received --> ' + pData.vid);
		// });
	}
});