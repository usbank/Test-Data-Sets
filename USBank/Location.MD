# Notes about using the Location API

The ATM Branch Location API provides several ways to retrieve  U.S. Bank facility locations based on user supplied input parameters. It is used search for and locate a list of U.S. Bank ATMs and branches based on criteria like addresses and zip codes. This service queries an ATM and branch database based upon the search query to retrieve the count of ATMs and branches in all states and the searchable key codes. It also includes operations to provide various U.S. Bank applications enhanced search results features.

## General requirements

All requests using the ATM Branch Location API will require the following input fields to be populated:

- **application** - Requesting application identifier which is assigned through a formal request.
- **transactionid** - Also known as the Universally Unique Identifier (UUID), this value is used for troubleshooting and must be assigned.

Furthermore, these two fields are not required but useful.

- **output** - Reply data format which is "XML" by default; the other possible choice is "JSON"
- **callback** - This indicates the callback function that will be wrapped around the JSON data (if included). Therefore, this parameter is only applicable when output="JSON".

## Search by geocodes

Location search based on specific map coordinates (geocodes).

- **longitude** - Map Geocode longitude value
- **latitude** - Map Geocode latitude value
- **radius** - Search radius in miles (default is 100)

## Search by street address

Location search is centered on a specific location corresponding to the supplied street address.

- **line0** - Address line one; often the street address
- **line1** - Address line tow; such as an apartment number
- **city** - City name
- **statecode** - Two-letter state abbreviation
- **zipcode** - USPS postal code
- **radius** - Search radius in miles (default is 100)

## Search by cross streets

Location search centered on the intersection of two cross streets. Zip code is also supplied to eliminate confusion.
- **zipcode** - USPS postal code
- **crossstreetname** - Intersection of two street names using "and" as a delimiter. (e.g. "Belleview and DTC")
- **radius** - Search radius in miles (default is 100)

# Keywords

The following keywords can be used to refine the search

## searchtype

Indicates the type of location search (default is 'E')

- **A** - ATM's only
- **B** - Branches only
- **E** - Everything (both ATM's and branches)

## atmfeatures

List of required ATM features for the search query. Multiple features are separated by a pipe (|), such as "AHS|AVA". If no features are supplied, query is not limited by feature.

- **AAD** - Accepts_deposits
- **AHS** - Access_24HR
- **ADU** - Drive_Up
- **AFS** - Full_Statement
- **ANE** - No_Envelope
- **ASS** - Stamps
- **AVA** - Voice_Guided

## branchfeatures

List of required branch features for the search query. Multiple features are separated by a pipe (|), such as "BCC|BMO". If no features are supplied, query is not limited by feature.

- **BCC** - Coin_Counter
- **BCO** - CounterChecks
- **BDA** - DriveUpAvailable
- **BFS** - FullServiceBranch
- **BMO** - MoneyOrders
- **BDO** - NotDriveUpOnly
- **BNY** - Notary
- **BOC** - OfficialChecks
- **BOW** - OpenWeekends
- **BOP** - Open_to_the_Public
- **BOL** - OriginateLoans
- **BSD** - SafeDepositBox
- **BSS** - SpanishSpeaking
- **BTC** - TravellersCheck
