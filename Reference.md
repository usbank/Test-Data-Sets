## Reference APIs

This API provides methods to look up both the definitions of MCCs and popular U.S. Bank product types.

### Q. What are MCC codes?
A "Merchant Category Code" (MCC) is a four-digit code assigned by the major credit card networks (e.g. Visa, Mastercard, American Express and Discover) to every business that applies to accept credit cards. This code indicates the nature of the merchant's business (e.g Airlines, Veterinary Sciences, Hardware Store, etc.) They have become the standard for categorizing card purchases based on industry.


### Q. How do I look up a specific MCC code?
The */code/{mcc}* method will return the description for a specific merchant code.

This method is very useful for categorizing a specific purchase.

### Q. What if I don't know the MCC code? How can I find the appropriate MCC code?

The *Reference* API also has a search function for you to look up MCC codes based on their description. Specifically, the */codes/search/desc={search_string}* method allows you to query for a given string. For example, you can search for all the MCC codes associated with a general industry, such as "Food" or "Legal"
