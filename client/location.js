Template.location.helpers({
	lat: function(){
		return Session.get('lat') || "hello";
	},
	lon: function(){
		return Session.get('lon') || "world";
	}
});

Template.location.events({
	'click #getLoc': function(){
		// alert('clicked');
		navigator.geolocation.getCurrentPosition(function(position){
			Session.set('lat', position.coords.latitude);
			Session.set('lon', position.coords.longitude);
		});
	}
});