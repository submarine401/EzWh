 #Requirements Document 

Date: 22 march 2022

Version: 0.0

 
| Version number | Change |
| ----------------- |:-----------|
| | | 


# Contents

- [Informal description](#informal-description)
- [Stakeholders](#stakeholders)
- [Context Diagram and interfaces](#context-diagram-and-interfaces)
	+ [Context Diagram](#context-diagram)
	+ [Interfaces](#interfaces) 
	
- [Stories and personas](#stories-and-personas)
- [Functional and non functional requirements](#functional-and-non-functional-requirements)
	+ [Functional Requirements](#functional-requirements)
	+ [Non functional requirements](#non-functional-requirements)
- [Use case diagram and use cases](#use-case-diagram-and-use-cases)
	+ [Use case diagram](#use-case-diagram)
	+ [Use cases](#use-cases)
    	+ [Relevant scenarios](#relevant-scenarios)
- [Glossary](#glossary)
- [System design](#system-design)
- [Deployment diagram](#deployment-diagram)

# Informal description
Medium companies and retailers need a simple application to manage the relationship with suppliers and the inventory of physical items stocked in a physical warehouse. 
The warehouse is supervised by a manager, who supervises the availability of items. When a certain item is in short supply, the manager issues an order to a supplier. In general the same item can be purchased by many suppliers. The warehouse keeps a list of possible suppliers per item. 

After some time the items ordered to a supplier are received. The items must be quality checked and stored in specific positions in the warehouse. The quality check is performed by specific roles (quality office), who apply specific tests for item (different items are tested differently). Possibly the tests are not made at all, or made randomly on some of the items received. If an item does not pass a quality test it may be rejected and sent back to the supplier. 

Storage of items in the warehouse must take into account the availability of physical space in the warehouse. Further the position of items must be traced to guide later recollection of them.

The warehouse is part of a company. Other organizational units (OU) of the company may ask for items in the warehouse. This is implemented via internal orders, received by the warehouse. Upon reception of an internal order the warehouse must collect the requested item(s), prepare them and deliver them to a pick up area. When the item is collected by the other OU the internal order is completed. 

EZWH (EaSy WareHouse) is a software application to support the management of a warehouse.



# Stakeholders


| Stakeholder name  | Description | 
| ----------------- |:-----------:|
|   Manager     |  Supervises the availability of items, free/occupied space inside the warehouse, manages orders to suppliers   |
| Warehouse designers			|	Design the structure and the organization of the warehouse		|
| Supplier		|	Suppliers interact with the warehouse by providing items requested by managers|
| Retailers | They usually own small shops with a limited storage space and buys the SW  |
| Company | It owns one (or more) large warehouse and buys the SW|
| System administrators |	They maintain the EzWH software and also check orders, they keep the SW updated and operating 		|
| Programmers |	Programmers are responsible for implementing the general structure of the SW together with all its features; in addition, they are in charge of developing SW updates of any kind and to test them before they can be issued|
| Quality Office employee |	Responsible for testing items, evaluate them and then decide if they can be stored inside the warehouse. They are also in charge of writing down reports about evaluated items|
| OU(Organizational Units) employee|	They can ask for items in a warehouse and order them, can report issues with shippings/orders to/from the warehouse	|
| Warehouse employee |	They are responsible of collecting/packaging all the requested items in an order. They are also in charge of relocating items inside the same warehouse |
| Competitors| Other warehouse management systems|
| Investors| They provide funds to support the development of the SW| 

# Context Diagram and interfaces

## Context Diagram
\<Define here Context diagram using UML use case diagram>

\<actors are a subset of stakeholders>

## Interfaces
\<describe here each interface in the context diagram>

\<GUIs will be described graphically in a separate document>

| Actor | Logical Interface | Physical Interface  |
| ------------- |:-------------:| -----:|
|   Manager     | GUI | Monitor, keyboard |
|   System administrator    | GUI | Monitor, keyboard |
|   Quality Office employee     | GUI | Monitor, keyboard |
|   OU employee    | GUI | Monitor, keyboard, mobile device |
|   Warehouse Employee     | GUI | Monitor, keyboard, mobile device |

# Stories and personas

Mark is 70 and he is the owner of a __small, old shop__ in the city centre. The shop has a small warehouse on the back but Mark likes to keep things organized in a very
precise inventory, with each product traced in a unique way; to do so, he needs a simple application which can keep the inventory up-to-date and possibly send out 
notifications about orders, quality checks etc...

Adam is 40 and it is the main responsible for a __big warehouse__, owned by a multinational company. The company is organized into many departments, based
worldwide, so he needs to manage orders coming from internal departments; in addition, since the warehouse is resupplied by many suppliers, he must coordinate with a variety of external figures, as well as with quality offices.

Jillian is 30 and she is the manager of a __small shop, part of a big department store chain.__ The organization of the shop is not difficult for her but in some cases she has to manage a lot of orders coming from the central office of the company and also resupply the shop by using a list of suppliers associated with the company, so she needs to process orders and check the status of the inventory very quickly.

# Functional and non functional requirements

## Functional Requirements

\<In the form DO SOMETHING, or VERB NOUN, describe high level capabilities of the system>

\<they match to high level use cases>

| ID        | Description  |
| ------------- |:-------------:| 
|  FR1     |  |
|  FR2     |  |
| FRx..    |  | 

## Non Functional Requirements

\<Describe constraints on functional requirements>

| ID        | Type (efficiency, reliability, ..)           | Description  | Refers to |
| ------------- |:-------------:| :-----:| -----:|
|  NFR1     |   |  | |
|  NFR2     | |  | |
|  NFR3     | | | |
| NFRx .. | | | | 


# Use case diagram and use cases


## Use case diagram
\<define here UML Use case diagram UCD summarizing all use cases, and their relationships>


\<next describe here each use case in the UCD>

### Use case 1, UC1 - Log in
| Actors Involved        | Manager, system administrator, Employees |
| ------------- |:-------------:| 
|  Precondition     | User exists in the system’s database but is not logged in |
|  Post condition     | User is authenticated and logged into the right area based on his/her specific role |
|  Nominal Scenario     | User U is logged in|
|  Variants     | User can be a manager, an admin, a warehouse employee or a OU employee |
| | User must modify the password at first login |
|  Exceptions     | User does not exist|
|  | User inserts wrong username and/or password |

### Use case 2, UC2 - Insert user in the system
| Actors Involved        | Administrator |
| ------------- |:-------------:| 
| Precondition | User U does not exist in the database; user A is logged in as admin |
| postcondition | User is added into the database |
| Nominal scenario | Admin inserts a new user into the database |
| Exception | ID number already exists |

### Use case 3, UC3 - Delete a user 
|Actors involved | Administrator |
| ------------- |:-------------:| 
| Precondition | User U exists, User A is logged in as admin |
| Postcondition | User U is deleted from the system |
| Nominal scenario | Admin selects a user to be deleted |
| Variants |  |
| Exception | User does not exist |
|  | User is the admin |


### Use case x, UCx
| Actors Involved        |  |
| ------------- |:-------------:| 
|  Precondition     | \<Boolean expression, must evaluate to true before the UC can start> |
|  Post condition     | \<Boolean expression, must evaluate to true after UC is finished> |
|  Nominal Scenario     | \<Textual description of actions executed by the UC> |
|  Variants     | \<other normal executions> |
|  Exceptions     | \<exceptions, errors > |

##### Scenario 1.1 

\<describe here scenarios instances of UC1>

\<a scenario is a sequence of steps that corresponds to a particular execution of one use case>

\<a scenario is a more formal description of a story>

\<only relevant scenarios should be described>

| Scenario 1.1 | |
| ------------- |:-------------:| 
| PRECONDITION | User exists in the system’s database but is not logged in |
| POSTCONDITION | User is authenticated and logged into the right area based on his/her specific role |
| Step | Description |
| 1 | User connects to the log in interface of the EZ Warehouse SW |
| 2 | User inserts username |
| 3 | User inserts password and presses the “Log In” button |
| 4 |  System checks for the correctness of username and password |
| 5 | System authenticates user |

| Scenario 1.2 | |
| ------------- |:-------------:| 
 | PRECONDITION | User exists in the system’s database but is not logged in |
| POSTCONDITION | User is asked to repeat the “log in “ procedure again ||
| Step | Description |
| 1 | User connects to the log in interface of the EZ Warehouse SW |
| 2 | User inserts username |
| 3 | User inserts password and presses the “Log In” button |
| 4 |  System checks for the correctness of username and password |
| 5 | Invalid user and/or password; the system displays an error message and returns to the “Log in” interface |

| Scenario 2.1 |  | 
| ------------- |:-------------:| 
| Precondition | User U does not exist in the database |
| postcondition | User is added into the database |
| Step | Description |
| 1 | User is associated with a unique username |
| 2 | User is associated with a password |
| 3 | Admin authorizes the operation |
| 4 |  System checks for exceptions (i.e.: username already exists) |
| 5a | System sends out an error message if there are some exceptions |
| 5b | System registers new user |

| Scenario 3.1 |  |
| ------------- |:-------------:| 
| Precondition | User U exists |
| Postcondition | User U is deleted from the system |
| Step | Description |
| 1 | Admin inserts username |
| 2a | If username does not exist, display an error message |
| 2b | If username exists admin authorizes the operation |
| 3 | System deletes the user’s profile |



| Scenario x.x | |
| ------------- |:-------------:| 
|  Precondition     | \<Boolean expression, must evaluate to true before the scenario can start> |
|  Post condition     | \<Boolean expression, must evaluate to true after scenario is finished> |
| Step#        | Description  |
|  1     |  |  
|  2     |  |
|  ...     |  |

##### Scenario 1.2

##### Scenario 1.x

### Use case 2, UC2
..

### Use case x, UCx
..



# Glossary

\<use UML class diagram to define important terms, or concepts in the domain of the system, and their relationships> 

\<concepts are used consistently all over the document, ex in use cases, requirements etc>

# System Design
\<describe here system design>

\<must be consistent with Context diagram>

# Deployment Diagram 

\<describe here deployment diagram >




