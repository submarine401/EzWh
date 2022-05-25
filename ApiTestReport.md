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

![dependency1](/dependency_graph/dependencies1.jpg)
![dependency_graph](/dependency_graph/dependency_graph.jpg)


     
# Integration approach
    
    The integration approach followed by our group was to test modules and services in a bottom up approach. In detail, the procedure is described by the following steps.
    Step1: DAO classes (including functions which perform query to the database) were
    tested independently during unit testing.
    Step2: DAO classes have been linked to service classes, most of which contain
    functions which use DAO's functions and implement some small, intermediate logic;
    In some cases, DAO classes show some dependency (for example: SKUitems are dependant
    from SKUs, which are linked to Items); during stage 2 these dependencies were tested to
    ensure consistency.
    Step3: API classes were linked to service classes and tested at API level.
    


#  Integration Tests

   <define below a table for each integration step. For each integration step report the group of classes under test, and the names of
     Jest test cases applied to them, and the mock ups used, if any> Jest test cases should be here code/server/unit_test

## Step 1
| Classes  | mock up used |Jest test cases |
|--|--|--|
|ItemDao.js|ItemDaoMock.js|adding a new item, get item by ID (three tests: existent ID, unexistent ID and ID < 0), update item, update NULL item, Get all items|
|skuDao.js|SkuDaoMock.js|get sku by id|
|SKUItemDAO.js|none|Create SKUItem, Modify SKUItem, Modify SKUItem with wrong availability value, get array of SKUItem, get SKUItem by SKUID with available = 1, Get SKUItem by RFID, Get SKUItem - unexistent RFID, GET SKUItem by SKUId with available = 1 - unexistent SKUid|
|UserDAO.js|mock_userDAO.js||
|PositionDao.js|PositionDaoMock.js||
|RestockOrdersDao.js|RestockOrdersDaoMock.js||
|ReturnOrdersDao.js|ReturnOrdersDaoMock.js||
|Test_DescriptorDAO.js|none|   |
|Test_ResultDAO.js|none|   |



## Step 2
| Classes  | mock up used |Jest test cases |
|--|--|--|
|ItemDao.js && skuDao.js ||adding a new item with integeration test'|




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
?? internal order
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


# Coverage of Scenarios and FR


<Report in the following table the coverage of  scenarios (from official requirements and from above) vs FR. 
Report also for each of the scenarios the (one or more) API Mocha tests that cover it. >  Mocha test cases should be here code/server/test




| Scenario ID | Functional Requirements covered | Mocha  Test(s) | 
| ----------- | ------------------------------- | ----------- | 
|UC11-1|FR7|`test Item apis` >  adding a new item, Deleting item|             
|UC9-1|FR6|`test Intrenal order apis` > adding a new internal order, Deleting internal order,|             
|UC5|FR5|`test Restockorder apis` > getting restockorder data from the system, adding a new restock order, Deleting restock order|             
||||             
||||             
         



# Coverage of Non Functional Requirements


<Report in the following table the coverage of the Non Functional Requirements of the application - only those that can be tested with automated testing frameworks.>


### 

| Non Functional Requirement | Test name |
| -------------------------- | --------- |
|                     NFR2   |     get Item      |
|                     NFR2   |     get internal order'      |
|                     NFR2   |     set restock order    |
|                     NFR2   |     get retun order     |
