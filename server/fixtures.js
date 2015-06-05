Meteor.startup(function(){
	//
	// Add default clothing
	//
	if (Clothing.find().count() === 0){
		Clothing.insert({
			name: "Glasses",
			img: "/images/glasses.png",
			mapPoints: [
				{x: 150, y: 100},
				{x: 450, y: 100}
			]
		});
		Clothing.insert({
			name: "Red Dress",
			img: "/images/dress.png",
			mapPoints: [
				{x: 74, y: 130},
				{x: 155, y: 130}
			]
		});
	}
});