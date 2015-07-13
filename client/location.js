Template.location.helpers({
	lat: function(){
		return Session.get('lat') || "hello";
	},
	lon: function(){
		return Session.get('lon') || "world";
	},
	clicked: function() {
		return Session.get('clicked') || "not clicked";
	}
});

Template.location.events({
	'click #getLoc': function(){
		// alert('clicked');
		Session.set('clicked', "clicked!");
		navigator.geolocation.getCurrentPosition(function(position){
			Session.set('lat', position.coords.latitude);
			Session.set('lon', position.coords.longitude);
		});
	}
});