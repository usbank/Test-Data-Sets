# Notes about U.S. Bank APIs

There are three different APIs that are part of the U.S. Bank Hackathon repository. All of these APIs can be accessed through the Developer Portal where you will find detailed information about the various methods and access to test clients.

The Account API provide three methods for obtain account-related information. They are:
- *Account by*: This REST API provides a list of accounts to which a customer can access including the following account types: checking, savings, credit cards, lines of credit and a variety of installment loans. Account details include product information and current balances.
- *Account Summary Details*: This REST API is used to run operations that provide general account details (e.g. address and phone number) for the checking and savings accounts.
- *Account Transactions*: This REST API is used to retrieve transaction history and current balance for products like checking accounts, retail loans, credit cards, demand deposit line of credit accounts and leases.

Two other APIs are actual public U.S. Bank APIs that expose general public information about U.S. Bank services. They include:
- USB Locations: The Location REST API provides read-only access to location information for US Bank assets, including Wealth, Money Pass, ATM and Branch locations.
- USB Rates: This RESTful API enables you to access rates for any U.S. Bank product/service (e.g. CD rates, Saving Account Rates; Auto Loan Rates, etc.).

# Using the developer portal
All of the U.S. Bank APIs are available on the developer portal. The portal provides event details, links to technical websites and, most importantly, detailed description about each of the different APIs.

The portal documentation includes:
- Overview that describes key features and potential uses
- API Guide that lists each method, required parameters and sample response messages
- Documentation that contains technical details such as the OpenAPI specifications and swagger documents.

The APIs are all accessible via the U.S. Bank API gateway. The endpoint for each API are provided within the Postman collection.

# Postman files
There are Postman test cases for all of the U.S. Bank APIs. Each collection of tests uses the same environment file. Furthermore, there is an environment variable for the API key that can be used for testing.

# Sample files
There are two sample client JSON files for instantiating an API call.

# Rates-specific notes
The U.S. Bank Rates API provides a list of the current rates for a variety of different banking products. Specific methods are described on the developer portal. Parameters are passed on the query string. Most fields are optional. If certain fileds are omitted, then the results will include more options. For example, if a request for auto loan rates does not include the terms, then the results will include rates for all available terms.

# Locations-specific notes
The U.S. Bank Locations API provides a list of U.S. Bank facilities such as ATMs and branches. In general, these methods require parameters to be passed on the query string.

More details about the Location API is available in the Location.MD file in this directory.

# U.S. Banking API notes
Each U.S. Bank APi has detailed explanations provided at the developer portal. In general, U.S. Bank data is associated with a specific customer name that is called a Legal Participant Identifier (LPID). There is a specifc method within the Account List and Balance API that will provide a list of available test users. Typically, this is the first call that a developer will use in order to acquire test accounts for testing.
