Template.leagueHeader.helpers({

});

Template.leagueHeader.events({
	'click #profile': function(){
		Session.set('on', 'profile');
	}
});

