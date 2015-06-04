Meteor.startup(function(){
	//
	// Add default clothing
	//
	if (Clothing.find().count() === 0){
		Clothing.insert({
			name: "Glasses"
			img: "/images/glasses.png"
			mapPoints: [
				{x: , y: },
				{x: , y: },
			]
		});
	}
});