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

	//
	// Add default practices and scores
	//
	if (Practices.find().count() === 0){
		Practices.insert({
			fourPct:  100.00,
			sevenPct: 25.05,
			when:     new Date()
		});
		Practices.insert({
			fourPct:  95.67,
			sevenPct: 33.33,
			when:     new Date()
		});
	}
});