Meteor.methods({
	foo: function(){
		console.log("Foo called on server");
		return "bar";
	},
	createOrUpdateContact: function(data){
		//
		// new version
		//
		var email   = data.email,
		    url     = "http://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/" + email + "?hapikey=3bb48633-14c5-4db1-80da-e6fe6be6f83f",
		    options = {
		    	data: {
		    		"properties":[
		    			{
		    				"property": "email",
		    				"value": data.email
		    			},
		    			{
		    				"property": "firstname",
		    				"value": data.firstname
		    			},
		    			{
		    				"property": "lastname",
		    				"value": data.lastname
		    			},
		    		]
		    	}
		    };
		try {
			var response = HTTP.post(
				url,
				options
			);
		}
		catch (e) {
			return false;
		}
		return response;


		// try {
		// var postResponse = HTTP.post(
		// 	"http://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/cdcharlebois@gmail.com?hapikey=3bb48633-14c5-4db1-80da-e6fe6be6f83f",
		// 	{
  //           	data: {
  //           		"properties": [
  //           		    {
  //           		        "property": "email",
  //           		        "value": "cdcharlebois@gmail.com"
  //           		    },
  //           		    {
  //           		        "property": "firstname",
  //           		        "value": "Matt"
  //           		    },
  //           		    {
  //           		        "property": "lastname",
  //           		        "value": "Schnitt"
  //           		    },
  //           		    {
  //           		        "property": "website",
  //           		        "value": "http://hubspot.com"
  //           		    },
  //           		    {
  //           		        "property": "company",
  //           		        "value": "HubSpot"
  //           		    },
  //           		    {
  //           		        "property": "phone",
  //           		        "value": "555-122-2323"
  //           		    },
  //           		    {
  //           		        "property": "address",
  //           		        "value": "25 First Street"
  //           		    },
  //           		    {
  //           		        "property": "city",
  //           		        "value": "Cambridge"
  //           		    },
  //           		    {
  //           		        "property": "state",
  //           		        "value": "MA"
  //           		    },
  //           		    {
  //           		        "property": "zip",
  //           		        "value": "02139"
  //           		    }
  //           		]
  //           	}
  //       	}
  //       ); // end HTTP post
		// }
		// catch (e) {return false;}
		
		// return postResponse;
	}
});