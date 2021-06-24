## Core Banking APIs

This API collection has read-only methods for interacting with the financial accounts for a given customer.

### Q. Will any of the Core Banking APIs work for the CAAS accounts?

The short answer is 'yes'. You can look up account details for any account using the */account/{accountID}* whether it is a virtual card account or an LOC account.

On the other hand, you will not be able to use the *customer-related* methods for CAAS because those accounts are all associated with a company account, not a customer account.

### Q. Will I have my own test accounts?
If you are creating a consumer focused application, you will receive a unique *customer ID*. Each customer record includes a savings account, checking account and two credit accounts. You can use the */customer/{customerID}* method to find the customer details.

For the **Yackety Hack, Get Caa$h Fast** hackathon, you will not need a customer account because you will instead receive a company record.

### Q. Where do I find all my accounts?
You can find all the accounts associated with a specific customer record by using the */customer/{customerID}/accounts* method. It will return an array of accounts.

### Q. What is the field name for the account number?
The *account number* is a unique identifier and listed as the *accountID* in the account record.

There is another field, *paymentAccountID*, that corresponds to the parent account responsible for funding this account. For consumer accounts, the *paymentAccountID* will usually be the same as the *accountID*. One exception would be a companion credit card account.


### Q. How can I find the current balance for a specific account?

The */account/{accountID}* method provides all the details about a specific account, including its current balance.

In general, there are two different types of accounts:
 - **ASSET** - an account that has monetary value like a savings or checking account. The balance details include the opening balance, current balance and available balance.
 - **LIABILITY** - a debt account such as a credit account that has an obligation to pay. The balance details include the credit limit, available credit and current balance (amount due).


### Q. How do I find the all the transactions for a specific account?

The */account/{accountID}/trans/{type}* method will provide a list of transactions for the account corresponding to the given *accountID*.

This method takes a *type* parameter that allows you to retrieve only specific transactions. The allowed values are:
 - **FULL** - Detailed listing of all transactions
 - **SHORT** - Short listing of all transactions - suitable for a summary
 - **PUR** - Listing of card purchases
 - **PMT** - Listing of card payments
 - **MEMO** - Listing of non-monetary transactions (memos)

### Q. Can I look at a specific transaction?

Yes, you can use the */transaction/{transactionID}* method to retrieve the details of a single transaction.

### Q. Can we create our own transactions?
Yes, the [Money Movement API](https://github.com/usbank/Test-Data-Sets/Money-Movement.md) emulates a number of different financial transactions. However, transactions are generally limited to particular account types. For example, withdrawals and deposits can only be performed for **direct deposit accounts** (*e.g.* savings and checking).

### Q. What level of details is available for a credit card transaction?
The transaction data only provides basic information such as the merchant name, transaction amount, date and the transaction category. It does not provide detailed information such as the specific items, quantities purchased, sales tax or shipping. These details, known as *Level 2/3 item details*, are typically only available from the merchant itself.

### Q. Can I find the category for a given credit card purchase? If so, where?

Yes, it is listed in the transaction record. When the *category* field has a value of "*mcc*", then the *subcategory* field will contain the specific category code.

The [Reference API](https://github.com/usbank/Test-Data-Sets/Reference.md) documentation provides more details about the meaning of the **merchant category code** and how to use them.
