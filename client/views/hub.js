Template.hub.helpers({});

Template.hub.events({
	'click #test':function(){
		Meteor.call('createOrUpdateContact', {}, function(err, res){
			var pData = EJSON.parse(res.content);
			console.log(pData);
			alert('response received --> ' + pData.vid);
		});
	}
});