Meteor.methods({
	foo: function(){
		console.log("Foo called on server");
		return "bar";
	},
	createOrUpdateContact: function(data){
		try {
		var postResponse = HTTP.post(
			"http://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/cdcharlebois@gmail.com?hapikey=3bb48633-14c5-4db1-80da-e6fe6be6f83f",
			{
            	data: {
            		"properties": [
            		    {
            		        "property": "email",
            		        "value": "cdcharlebois@gmail.com"
            		    },
            		    {
            		        "property": "firstname",
            		        "value": "Matt"
            		    },
            		    {
            		        "property": "lastname",
            		        "value": "Schnitt"
            		    },
            		    {
            		        "property": "website",
            		        "value": "http://hubspot.com"
            		    },
            		    {
            		        "property": "company",
            		        "value": "HubSpot"
            		    },
            		    {
            		        "property": "phone",
            		        "value": "555-122-2323"
            		    },
            		    {
            		        "property": "address",
            		        "value": "25 First Street"
            		    },
            		    {
            		        "property": "city",
            		        "value": "Cambridge"
            		    },
            		    {
            		        "property": "state",
            		        "value": "MA"
            		    },
            		    {
            		        "property": "zip",
            		        "value": "02139"
            		    }
            		]
            	}
        	}
        ); // end HTTP post
		}
		catch (e) {return false;}
		
		return postResponse;
	}
});