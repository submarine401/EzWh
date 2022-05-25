# Integration and API Test Report

Date:

Version:

# Contents

- [Dependency graph](#dependency graph)

- [Integration and API Test Report](#integration-and-api-test-report)
- [Contents](#contents)
- [Dependency graph](#dependency-graph)
- [Integration approach](#integration-approach)
- [Integration Tests](#integration-tests)
  - [Step 1](#step-1)
  - [Step 2](#step-2)
- [API testing - Scenarios](#api-testing---scenarios)
  - [Scenario UC11-1](#scenario-uc11-1)
  - [Scenario UC6-1](#scenario-uc6-1)
  - [Scenario UC5-1](#scenario-uc5-1)
- [Coverage of Scenarios and FR](#coverage-of-scenarios-and-fr)
- [Coverage of Non Functional Requirements](#coverage-of-non-functional-requirements)
    - [](#)

- [Tests](#tests)

- [Scenarios](#scenarios)

- [Coverage of scenarios and FR](#scenario-coverage)
- [Coverage of non-functional requirements](#nfr-coverage)



# Dependency graph 

     <report the here the dependency graph of the classes in EzWH, using plantuml or other tool>

![dependency_graph](/dependency_graph/dependency_graph_1.jpg)


     
# Integration approach
    
    The integration approach followed by our group was to test modules and services in a bottom up approach. In detail, the procedure is described by the following steps.
    Step1: DAO classes (including functions which perform query to the database) were tested together with service classes, which include some additional logic to manage positions, quantities, volumes, prices.
    In some cases, DAO classes show some dependency (for example: SKUitems are dependant from SKUs, which are linked to Items); during stage 1 these dependencies were tested to ensure consistency.
    Step2: API classes were linked to service classes and tested at API level.
    


#  Integration Tests

   <define below a table for each integration step. For each integration step report the group of classes under test, and the names of
     Jest test cases applied to them, and the mock ups used, if any> Jest test cases should be here code/server/unit_test

## Step 1
| Classes  | mock up used |Jest test cases |
|--|--|--|
|PositionService.js && Position.js|PositionDaoMock.js|get positions, add position, modify position|
|SKU.js|None|create sku, modify sku without position, add position to sku, modify sku with position, modify position of sku|
|ItemService.js|ItemDaoMock.js|get Items, setitem|
|SKUItemService.js && SKUItemDAO.js|none|Create SKUItem, Modify SKUItem, Modify SKUItem with wrong availability value, get array of SKUItem, get SKUItem by SKUID with available = 1, Get SKUItem by RFID, Get SKUItem - unexistent RFID, GET SKUItem by SKUId with available = 1 - unexistent SKUid|
|UserService.js|mock_userDAO.js|POST Users, 'GET list of suppliers|
|RestockOrdersService.js|RestockOrdersDaoMock.js|get restock orders, set restock orders|
|ReturnOrdersService.js|ReturnOrdersDaoMock.js|get retun orders, set retun orders|
|Test_DescriptorService.js|mock_tdDAO.js|get test descriptor, set test descriptor, modify inexistent test descriptor, modify test descriptor|
|Test_ResultService.js|mock_trDAO.js|get test result, set test result, modify inexistent test result, modify test result|
|InternalOrderservice.js|InternalOrderDaoMock.js|get internal order, set internal order|



## Step 2
| Classes  | mock up used |Jest test cases |
|--|--|--|
|ItemDao.js && skuDao.js |None|adding a new item with integeration test'|
|PositionService.js && Position.js && PositionDao.js|None|get positions, add position, modify position, delete position|
|ItemService.js && ItemDao.js|None|adding a new item, get item by ID (three tests: existent ID, unexistent ID and ID < 0), update item, update NULL item, Get all items|
|UserService.js && userDAO.js|None|check password, checking password of a user with unexisting type, Get suppliers, get users except managers, Post newUser correct version, Post user with short password (less than 8 characters), post user with unexpected type,modify a normal user, Delete a normal user (NO MANAGER), delete unexisting user, delete with unexisting type, delete all users|
|RestockOrdersService.js && RestockOrdersDao.js|None|(NOTE: "RSO" stands for Restock Order). Get restock order, get not existent RSO, get RSO with ID less than one, set empty Restock Order, test set empty RSO, update transportnote of RSO, update state of RSO, update null RSO,delete restock order by ID|
|ReturnOrdersService.js && ReturnOrdersDao.js|None|(NOTE: "RO" stands for "Return Order"). Get return order, get not existent RO, get wrong id type for RO, set empty RO, set RO|
|Test_DescriptorService.js && tdDAO.js|None|get Test Descriptor|
|Test_ResultService.js && trDAO.js|None|Get Test Result|
|InternalOrderservice.js && InternalOrderDaoMock.js|none|get internal order, get not existed IO, set IO, set empty IO, update IO, update null IO|

## Step 3
| Classes  | mock up used |Jest test cases |
|--|--|--|
|SkuService.js && <br>SKU.js &&<br> PositionService.js && <br>Position.js && <br>PositionDao.js && TestDescriptorDAO.js| SkuDaoMock.js | get sku, add sku, modify sku|
|PositionApi.js && PositionService.js && Position.js && PositionDao.js|None|get positions, add position, modify position, delete position|
|InternalOrderAPI.js && InternalOrderservice.js && InternalOrderDaoMock.js|none|getting Internl order data from the system, adding a new internal order, Deleting internal order|
|ItemAPI.js && ItemService.js && ItemDao.js|None|getting Item data from the system, adding a new item, adding a new item with integeration test, Deleting item|


## Step 4
| Classes  | mock up used |Jest test cases |
|--|--|--|
|SkuService.js && <br>SkuDao.js && <br>SKU.js &&<br> PositionService.js && <br>Position.js && <br>PositionDao.js && TestDescriptorDAO.js|None|get sku, add sku, modify sku, delete sku|

## Step 5
| Classes  | mock up used |Jest test cases |
|--|--|--|
|SKUapi.js && <br>SkuService.js && <br>SkuDao.js && <br>SKU.js &&<br> PositionService.js && <br>Position.js && <br>PositionDao.js && TestDescriptorDAO.js|None|get sku, add sku, modify sku, delete sku|




# API testing - Scenarios


<If needed, define here additional scenarios for the application. Scenarios should be named
 referring the UC in the OfficialRequirements that they detail>

## Scenario UC11-1

| Scenario |  name |
| ------------- |:-------------:| 
|  Precondition     | Identifier of corresponding SKU exists in the DB |
|  Post condition     | New Item is inserted  |
| Step#        | Description  |
|  1     | new Item description is inserted  |  
|  2     |   Identifier of corresponding SKU is inserted |
|3|new price is inserted|

## Scenario UC6-1
[//]: <> (?? INTERNAL ORDER ///////////////this won't render/////////////////////)
| Scenario |  name |
| ------------- |:-------------:| 
|  Precondition     |there is at least one SKU in products |
|  Post condition     | New IO is inserted  |
| Step#        | Description  |
|  1     |  add all items to REO |  
|  2     |  System provide RFID of SKU items that not passed quality tests|

## Scenario UC5-1

| Scenario |  name |
| ------------- |:-------------:| 
|  Precondition     |SKU S exists |
||SKU position is valid|
|  Post condition     |Each sku item has an RFID  |
| Step#        | Description  |
|  1     |  RO arrives to the shop |  
|  2     |records every item in the system with a new RFID|
|3|new price is inserted|

## Scenario 4-1

| Scenario |  Create users and define rights |
| ------------- |:-------------:| 
|  Precondition     | Manager M exists and is logged in |
|  Post condition     | Account X is created  |
| Step#        | Description  |
|  1  | M defines the credentials of the new Account X  |  
|  2  | A selects the access rights for the new account X |
| 3 | M confirms the inserted data  |

# Coverage of Scenarios and FR


<Report in the following table the coverage of  scenarios (from official requirements and from above) vs FR. 
Report also for each of the scenarios the (one or more) API Mocha tests that cover it. >  Mocha test cases should be here code/server/test




| Scenario ID | Functional Requirements covered | Mocha  Test(s) | 
| ----------- | ------------------------------- | ----------- | 
|UC1 | FR2 | `test SKU API` > create new sku, modify sku, modify sku position, delete sku, get sku |  
|UC2| FR3.1|`test Position API` >  create new position, modify position, modify position id, delete position, get positions|   
|UC4|FR1.5| `test newUser API` > Authorize access to functions to specific actors according to access rights|  
|UC4|FR1.2|`test DELETE user API` > Delete a user|
||FR1.3   |get users except managers/admins` > Search for all users(except for managers)           
|UC5|FR5|`test Restockorder apis` > getting restockorder data from the system, adding a new restock order, Deleting restock order|
|UC5.2.1|FR5|`test test Result apis` > getting test results for each sku item|  
|UC5.3|FR5|`test test Result apis` > getting test results for each sku item| 
|UC9-1|FR6|`test Internal order apis` > adding a new internal order, Deleting internal order,|
|UC11-1|FR7|`test Item apis` >  adding a new item, Deleting item|     
|UC12.1 | FR3.2 | `test test Descriptor apis` > Create test description|
|UC12.2 | FR3.2 | `test test Descriptor apis` > Update test description|
|UC12.3 | FR3.2 | `test test Descriptor apis` > Delete test description|
|   |FR5.8.1   |`POST SKUITEMS` > Create and tag a SKU item with an RFID |
|   |FR5.8.3   |`POST SKUITEMS` > Store a SKU item |
|   |FR6.10   |`DELETE SKUITEMS` > Remove SKU item from warehouse  |

# Coverage of Non Functional Requirements


<Report in the following table the coverage of the Non Functional Requirements of the application - only those that can be tested with automated testing frameworks.>


### 

| Non Functional Requirement | Test name |
| -------------------------- | --------- |
|                     NFR2   |     get Item      |
|                     NFR2   |     get internal order      |
|                     NFR2   |     set restock order    |
|                     NFR2   |     get retun order     |
