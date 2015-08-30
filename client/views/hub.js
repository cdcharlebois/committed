Template.hub.helpers({});

Template.hub.events({
	'click #test':function(e, t){
		
		var data = {
			firstname: t.find('#firstName').value.trim(),
			lastname: t.find('#lastName').value.trim(),
			email: t.find('#email').value,
		}
		console.log(data);
		Meteor.call('createOrUpdateContact', data, function(err, res){
			var pData = EJSON.parse(res.content);
			console.log(pData);
			alert('response received --> ' + pData.vid);
		});
		// Meteor.call('createOrUpdateContact', {}, function(err, res){
		// 	var pData = EJSON.parse(res.content);
		// 	console.log(pData);
		// 	alert('response received --> ' + pData.vid);
		// });
	}
});