// -------------- //
//     router     //
// -------------- //
Router.configure({
	layoutTemplate: 'layout' //default layout
})
// 
// This is a client-side route, where we're just changing the tempalte
//    that's displayed in the layout.
//
Router.route('/', function(){
	this.render('home');
});
Router.route('/golf', function(){
	this.render('golf');
});
Router.route('/work', function(){
	this.render('work');
});
Router.route('/contact', function(){
	this.render('contact');
});
Router.route('/images', function(){
	this.render('images');
})

//
// These are server-side routes (for now), where we're actually modifiying
//    the HTTP request. (or, what content is actually sent to the client)
//

// Router.route('/work', function(){
// 	var res = this.response;
// 	res.end("There will be something here, soon.");
// }, {where:'server'});