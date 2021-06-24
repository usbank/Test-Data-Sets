## Test-Data-Sets

This section will provide important technical details about the U.S. Bank APIs as well as useful tools that can be leveraged when working with these APIs.

This includes:
 - Explanation of how to best use the APIs
 - Details of test data parameters
 - Postman files and environment
 - Sample code snippets

Detailed technical specifications (*i.e.* swagger files) are located on the [Hackathon portal](https://hacktotrack-innovation.usbank.com/)

### Q. Will I have my own test data?
Each participant will receive their own unique test account that will be pre-populated with test data.

For the **Yackety Hack, Get Caa$h Fast** hackathon, each participant will receive their own company ID that will be distributed on the day of the event. This account will provide you with a pool of 60 virtual cards that you will be able to assign to different individuals.

### Q. How do I use my test account?
The specific details about how to use your test account are provided in the sections about each API. Throughout this event, you will probably use each of the APIs to create your product.

### Q. When do I use the CAAS APIs?
The *Customer as a Service* (CAAS) APIs are the high level APIs for managing virtual cards. They provide access to the principle company record and its funding account.

You will use these methods to assign virtual cards, close or cancel cards. You will also use these methods to gain a current snapshot of your test company account record (outstanding cards, purchases, etc).
Each participant will receive their own unique test account that will be pre-populated with test data.

More detailed information is available [here](https://github.com/usbank/Test-Data-Sets/blob/Test-Data-Sets/CAAS.md)

### Q. When do I use the Core Banking APIs?
The Core APIs provide read-only access to account data. These are the methods that you will use if you want to look at the card transactions for a specific virtual card. You can also look at the details for any of your transactions.

More detailed information is available [here](https://github.com/usbank/Test-Data-Sets/blob/Core-Banking.md)

### Q. When do I use the Money Movement APIs?
The Money Movement APIs provide all of the functionality for performing financial transactions including credit card purchases. For the Yackety Hack hackathon, you will probably use the */activity/card-purchase* and the */activity/digital-wallet* methods.

More detailed information is available [here](https://github.com/usbank/Test-Data-Sets/blob/master/Money-Movement.md)

### Q. When do I use the Reference APIs?
The main purpose of the Reference APIs is give you access to the standard industry codes for card purchases. These methods will only be useful for you if you need to classify card purchases based on their general category (*e.g.* restaurant purchases, gas purchases, etc.)

More detailed information is available [here](https://github.com/usbank/Test-Data-Sets/blob/master/Reference.md)
