### Notes about example files

These files are provided to facilitate your testing of the U.S. Bank developer APIs. In order to actually use the APIs, however, you will first need to register at the [U.S. Bank developer portal](https://hacktotrack-innovation.usbank.com). Furthermore, you will need to follow the instructions to generate your own unique API key (instructions are found elsewhere on this site).

## Postman files
There are Postman collections for each of the four U.S. Bank APIs. Each collection of tests uses the same environment file, *'Yackety Hack.postman_environment.json'*. You should replace the *SECRET* and *API_KEY* parameters with the values that you received earlier.

You will need to have your own assigned test data account in order to use the APIs, with the exception of the *Reference API* (which has static data).

For the **Yackety Hack, Get Caa$h Fast** hackathon, you will receive a *companyID* value prior to the event. This will grant you access to all of your test data. Furthermore, it will enable you to create new data (*e.g.* virtual cards and transactions). More details are provided in the documentation for each API.

One note: a *customerID* is required to look up customer details in the *Core Banking API* but this functionality is not necessary for the  **Yackety Hack, Get Caa$h Fast** hackathon. All account-related methods in the *Core Banking API*, however, will work.

## Sample files
There is a sample Javascript file showing how to make an U.S. Bank API call.
