/*
    Example file showing how to call the Rates API
*/
// get required libraries

var https = require("https");
var fs = require("fs");
var querystring = require("query-string");

console.log("Running the Rates sample application");



// set the server vvalues
// host options
var options = {
    hostname: "https://alpha-api.usbank.com",
    port: 443,
    path: "/innovation-rate/v1/GetAutoLoanRates",
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'apiKey': YOUR_API_KEY
    }

};

// the data tha we will use for testing
var data = {
    application: "RIB",
    output: "json",
    zipcode: "55401",
    loanamount: "12000",
    loantermmonths: "24"
};


function callAPI() {
    console.log(`Calling \"${options.hostname}\" to run \"${options.path}\"`);
    // create our query string that includes our data
    var ourQS = querystring.stringify(data);

    // update our path to add the query string data  (needs the '?')
    options.path = options.path + "?" +  ourQS;

	var req = https.request(options, function(res) {
		var responseBody = "";
		console.log("Request sent to server");
		console.log(`Server status: ${res.statusCode}`);

		res.setEncoding("UTF-8");
		// do some stuff
		res.once("data", function(chunk) {
//			console.log(`First chunk is ${chunk.length} bytes`);
		});
		// grab all of the data
		res.on("data", function(chunk) {
			responseBody += chunk;
		});
		res.on("end", function() {
            console.log("Finished retrieving data");
            var parsedJson = JSON.parse(responseBody);
            var len = parsedJson.AutoLoanRates.RateTier.length;
            console.log(`There are ${len} entries for the Rates Tier data`);

            var ratesArray = parsedJson.AutoLoanRates.RateTier;
            for (var i=0; i<len; i++) {
                //
                console.log(`Rate ${i+1} is:`);
                console.log(ratesArray[i]);
            };


		});
	});

  	// repost any errors
	req.on("error", function(err) {
		console.log(`problem with request: ${err.message}`);
	});

  	req.end();

}



callAPI();
