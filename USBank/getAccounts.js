/*
	This test application demonstrates how to call the U.S. Bank Account List and 
	Balances API. This application queries the data and then extracts the account 
	number and current available balance for all the accounts for a given user.
	While the user ID (LPID) is hard coded, you can freely pass a different value on 
	command line:

	"node getAccounts XXXXXXXXXXXXX"
*/

// get required libraries
var https = require("https");
var fs = require("fs");
var querystring = require("querystring");


// hard coded LPID value for default
var lpid = "913996201744144603";

// want to allow the user to pass in a user id (LPID)
var myArgs = process.argv.slice(2);
if (myArgs.length >= 1) {
	if (isNaN(myArgs[0])) {
		console.log("Involid LPID");
	} else {
		lpid = myArgs[0];
	}
} else {
	console.log("Using default LPID");
}

// build request message
var mydata = { "LegalParticipantIdentifier": lpid };


function callAPI(messageBody) {
	var post_data = JSON.stringify(messageBody);

	// host options
	var options = {
		hostname: "https://alpha-api.usbank.com",
		port: 443,
		path: "/innovations/v1/user/accounts",
		method: "POST",
	    headers: {
	        'Content-Type': 'application/json',
			'Accept': 'application/json',
			'apiKey': YOUR_API_KEY,
	        'Content-Length': Buffer.byteLength(post_data)
	    }
	};

	console.log(`Calling \"${options.hostname}\" to run \"${options.path}\"\n
Request data is:\n${post_data}`);

	var req = https.request(options, function(res) {
		var responseBody = "";
		console.log("Response for server started");
		console.log(`Server status: ${res.statusCode}`);

		res.setEncoding("UTF-8");
		// do some stuff
		res.once("data", function(chunk) {
			console.log(`First chunk is ${chunk.length} bytes`);
		});
		// grab all of the data
		res.on("data", function(chunk) {
			responseBody += chunk;
		});

		res.on("end", function() {
			console.log("Finished retrieving data");
			var parsedJson = JSON.parse(responseBody);

			// take apart the data
			var len = parsedJson.AccessibleAccountDetailList.length;
			console.log(`There are ${len} accounts for user ${lpid}:`)
			for (var i = 0; i < len; i++) {
				var account = parsedJson.AccessibleAccountDetailList[i];
				// let's just display it to the console
				console.log(`${account.ProductCode} account #${account.PrimaryIdentifier} has an available balance of \$${account.BasicAccountDetail.Balances.AvailableBalanceAmount}`);

			}

		});
	});

  	// post the data
  	req.write(post_data);

  	// repost any errors
	req.on("error", function(err) {
		console.log(`problem with request: ${err.message}`);
	});

  	req.end();

};


callAPI(mydata);
