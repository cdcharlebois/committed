Template.profile.helpers({

});

Template.profile.events({
	'click .edit':function(e,t){
		console.log(e.target.id);
		var toEdit = e.target.id.substring(5);
		console.log(toEdit);

		//set the input for the edit button to not read-only
	}
});