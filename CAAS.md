## Card as a Service APIs

Before using the CAAS APIs, it is important to understand the general data model that supports the virtual card ecosystem.

When you register for the **Yackety Hack, Get Caa$h Fast** hackathon, you will receive your own unique company account ID. The company account is analogous to a customer record and already has a **line of credit** (LOC) account associated with it. The LOC account is used to fund the virtual cards.

The company account also has a pool of unassigned virtual cards that you will use as part of your solution.

When you assign a new virtual card, the backend will create a new credit card account for this virtual card. This is the account that will be used for making card purchases. The LOC account serves as the **payment account** (or parent) for the card account because it is actually responsible for it. However, the card transactions will be listed under the card account.


![data model](img/caas-workflow.png)

The company details are available in the */company/{companyID}* method. This will show you pertinent information about the company as well as the general status of the cards (*e.g.* the number of total cards, the number of assigned cards).

The LOC account details are available in the */company/{companyID}/account* method. This will show you the current balance of the LOC, including the available credit. As you assign a new virtual card, you will allocate a specific amount to each card that will therefore reduce the available credit remaining to allocate to other cards.

Please note that some methods require the *companyID* while other methods require the *LOC accountID*

### Q. How much money is in the Line of Credit Account?

Each LOC account is initially funded with $500,000.

### Q. How can I find my LOC accountID?

The LOC account ID can be found by calling the */company/{companyID}/account* method using the *companyID* that you were given. In the resulting JSON payload, you will see the it listed as the *accountID* - you should note that the same value is listed in the *paymentAccountID* field. This is because the LOC account is also its parent account.

Also note that the *accountType* is listed as **LOC** for *Line of Credit*.

### Q. What do the various balances mean in the LOC account record?

There are several balances listed in the *balances* object.
- *lineOfCredit* - the total amount of credit assigned to this LOC account.
- *availableCredit* - the amount of credit that is still available to be disbursed to new virtual cards
- *allocatedActiveBalance* - the amount of credit that has been assigned to all active cards so far
- *allocatedPendingBalance* - the amount of credit that has been allocated to cards that have not yet been activated. (This field will be zero since cards are immediately activated upon creation)
- *actualClosedBalance* - the amount that has been spent by cards that have been closed (but not paid off).
- *outstandingPurchases* - this is a running total of purchases that have been made by all the virtual cards in the pool.

Please note that the *availableCredit*, *allocatedActiveBalance*, *allocatedPendingBalance* and *actualClosedBalance* will add up to the *lineOfCredit*.

### Q. What do I need to do to create a virtual card?

You will use the */vcard* (POST) method to create a virtual card. At minimum, you will need to provide the following data:
 - *amount* - the amount to fund the card
 - *paymentAccountID* - the account ID for the LOC account which will be providing the funds for this new card
 - *effectiveUntil* - basically, the expiration date for this card. Virtual cards are only available for a maximum of one year after creation.
 - *firstName* - the first name of the person to whom this card is assigned
 - *lastName* - the last name of the person to whom this card is assigned

You will see that there are several optional fields also described in the API specifications.

### Q. What is the *Card Info* used for in the virtual card record?

The card info contains the personal information about the person to whom the virtual card is assigned (firstName, lastName, email, and phone). Additionally, it includes company-specific assignments that are used for internal bookkeeping.

For example, a construction company could assign specific cards to different building projects (using different *project IDs*) and would be able to aggregate all of the purchases made for each project. Similarly, a marketing company could issue virtual cards to several people who are working at a particular event (using *event ID*).

### Q. How do I find a list of all of my virtual cards?

You can find all of your virtual cards by using the */account/{accountID}/cards/{status}* method where the *accountID* is the account ID for your LOC account.

Please note that the search is based on the card status. This enables you to quickly see all of your active cards. The possible values for *status* are: ACTIVE, CLOSED, CANCELLED.

### Q. How can I use a virtual card for a purchase?

There are two ways to use a virtual card to make a purchase. Both methods are available in the [Money Movement API](https://github.com/usbank/Test-Data-Sets/Money-Movement.md)
 - */activity/card-purchase* - traditional purchase with a merchant (in person or online). You will need all of the card-related information (card number, expiration date, zip, cvv, etc). This information can be obtained by using the */vcards/{cardID}/details* method.

 - */activity/digital-wallet* - through a digital wallet. The virtual card must first be *packaged* for a digital wallet.

### Q. How do I package a virtual card to a digital wallet?

The CAAS APIs provide a mechanism for emulating the insertion of a virtual card into a digital wallet: */cards/{cardID}/digital-wallet/google-pay* (Google Pay) or */cards/{cardID}/digital-wallet/apple-pay* (Apple Pay).

However, the card cannot actually be inserted into a real digital wallet because it is simply a test account and therefore cannot really be used for a purchase. However, the [Money Movement API](https://github.com/usbank/Test-Data-Sets/Money-Movement.md) has a method for you to emulate a purchase using a digital wallet.

When you package a virtual card, you will also need to provide a *device ID* and a *wallet ID* which correspond to the device type and your application's specific wallet ID, respectively. Because this is an emulation, you can use any values for these parameters (as long as you meet the required syntax). However, you will need to provide the same *wallet ID* when you make a purchase via the digital wallet.

### Q. Can virtual cards be reused?

No. Once a virtual card has been assigned to a specific individual, it cannot be reassigned to another person. The virtual card can only be closed or cancelled.

### Q. What is the difference between closing and cancelling a card?

This corresponds to the two methods:
- */vcards/{cardID}/close*
- */vcards/{cardID}/cancel*

Both of these actions will stop a virtual card from being used again by setting its status to **closed**; however, the conditions for using them differ.

Once a virtual card has been used to make a purchase, it can only be closed. If the card has never been used, then the card can be cancelled. Therefore, if you try to cancel a card that has been previously used, you will get an error.

When you close a card that has been previously used, the amount of unused balance will be returned to the available credit for the LOC account while the amount that has been used will be reflected in the *actualClosedBalance* field.

### Q. How can I look at the purchases for a specific virtual card?

You can find all the transactions for a given virtual card by using the methods available in the
[Core Banking APIs](https://github.com/usbank/Test-Data-Sets/Core-Banking.md).

Every virtual card is associated with a real credit card account. Just use the method */account/{accountID}/trans/{type}* in the Core Banking API where the value for *accountID* is equal to the *cardID*.

### Q. How can I search for purchases for a specific project/event/customer etc?

In order to find purchases associated with the parameters set in the *card info* section, you can use the */company/transactions/search* method. The API specifications describe the details of the required parameters.

### Q. How do I find all the card info values?
As more virtual cards get created, it is possible to not remember all of the different events and projects to which they have been assigned. Fortunately, there is a helper method to retrieve the *card info* values that you have previously set.

The */{companyID}/card-info* method will provide you with an array of objects organized by *card info* type.


### Q. How do I pay off a virtual card?

When a virtual card has been closed, its outstanding balance can be paid off. This is analogous to making a payment to the Line of Credit account itself which will then increase its *availableCredit* and reduce its *actualClosedBalance*. It will also reduce the amount of the *outstandingPurchases* field.

To pay off a virtual card, you will use the */account/make-payment* method. This method takes three parameters:
 - *cardID* - the card account ID associated with the virtual card to be paid off
 - *externalAccountID* - the account number of an external account from which the funds will be transferred
 - *routingNumber* - the routing number of the financial institution where this account resides.

In this implementation, there is no actual interaction with an external institution so the values for *externalAccountID* and *routingNumber* can be anything.

Please note that the *Money Movement API* also provides a method for making a credit card payment. This method, however, is for accounts that have perpetual credit; virtual cards are only loaded once with a balance so this method will not work. You must use the payoff method in the *CAAS API*.
