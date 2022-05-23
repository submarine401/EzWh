# Unit Testing Report

Date:

Version:

# Contents

- [Black Box Unit Tests](#black-box-unit-tests)

- [White Box Unit Tests](#white-box-unit-tests)

# Black Box Unit Tests

    <Define here criteria, predicates and the combination of predicates for each function of each class.
    Define test cases to cover all equivalence classes and boundary conditions.
    In the table, report the description of the black box test case and (traceability) the correspondence with the Jest test case writing the
    class and method name that contains the test case>
    <Jest tests  must be in code/server/unit_test  >

### Class **_ItemDao_** - method **get_item_by_id(id)**

    In this method we check whether specific item by given id is onside the database or not, if exists the returned value is corresponding item and success status, othewise it will return zero to  API layer which means thers is not corrspondance to given id, and prints: "no item associated to id"

**Criteria**

| Criteria        | Description                                   |
| --------------- | --------------------------------------------- |
| EMPTY_DB        | There is not any stored item in database.                     |
| ITEM_EXISTANCE    | If there is an itEN with the given id     |
| ID_TYPE_CORRECT | If the type of the id param is correct or not |

**Predicates**

| Criteria        | Predicate  |
| --------------- | ---------- |
| DB_EMPTY        | True/False |
| ITEM_EXISTANCE  | True/False |
| ID_TYPE_CORRECT | True/False |

**Boundaries**:

| Criteria        | Boundary values |
| --------------- | :-------------: |
| DB_EMPTY        |       N/A       |
| ITEM_EXISTANCE  |       N/A       |
| ID_TYPE_CORRECT |       N/A       |

**Combination of predicates**:

| EMPTY_DB | ITEM_EXISTANCE | ID_TYPE_CORRECT | Valid / Invalid | Description of the test case             | Jest test case     |
| -------- | ------------ | --------------- | --------------- | ---------------------------------------- | ------------------ |
| TRUE     |              |                 | Valid           | If the db is empty, return 'no item associated to id'     | testgetItemNotexisted |
| FALSE    | FALSE        | TRUE            | Valid           | If the item is not inserted, returns '0'  | testgetItemNotexisted |
| FALSE    | TRUE         | TRUE            | Valid           | Return the item related to given id  | testgetItem |
| \*       | \*           | FALSE           | Invalid         | If the passed id is less than one      | testgetItemWithIdlessthanOne |

### **Class ItemDAO - method insert_into_item_table(item)**

Save an item (id: int, description: str, price: flaot, supplierId: int, idSku: int) into the database.

**Criteria for method insert_into_item_table :**

| Criteria             | Description                               |
| -------------------- | ----------------------------------------- |
| VALID_ITEM_TYPE      | If the item attributes have invalid attributes. |

**Predicates for method insert_into_item_table:**

| Criteria             | Predicate  |
| -------------------- | ---------- |
| VALID_ITEM_TYPE      | True/False |

**Boundaries**:

| Criteria             | Boundary values |
| -------------------- | --------------- |
| VALID_ITEM_TYPE      | null            |

**Combination of predicates**:

|  | VALID_ITEM_TYPE     | Valid / Invalid | Description of the test case           | Jest test case       |
| -------------------- | ------------------- | --------------- | -------------------------------------- | -------------------- |
|                 | TRUE                | Valid           | The item is correctly saved in the db  | testsetItem |
|                 | FALSE (null)        | Invalid         | The item is not saved, returns -1 | testsetEmptyItem |


### Class **_ItemDao_** - method **_modify_item(id,newItem)_**
Modifies given id of item with fields in the newItem object and returns the message which says: `Item with given id is updated`

**Criteria for method _modify_item:**

| Criteria              | Description                                        |
| --------------------- | -------------------------------------------------- |
| EMPTY_DB              |                                                    |
| ITEM_EXISTANCE       | Wheter item with the given id exists or not|
| VALID_NEW_ITEM_TYPE | Wheter the newItem attributes are valid or not|

**Predicates for method _modify_item:**

| Criteria              | Predicate  |
| --------------------- | ---------- |
| EMPTY_DB              | True/False |
| ITEM_EXISTANCE        | True/False |
| VALID_NEW_ITEM_TYPE   | True/False |

**Boundaries**:

| Criteria              | Boundary values |
| --------------------- | --------------- |
| VALID_NEW_ITEM_TYPE | null            |

**Combination of predicates**:

| EMPTY_DB | ITEM_EXISTANCE | VALID_SUPPLIERID_TYPE | Valid / Invalid | Description of the test case                        | Jest test case              |
| -------- | --------------- | --------------------- | --------------- | --------------------------------------------------- | --------------------------- |
| FALSE        | TRUE              | null                  | Invalid         | it should return -1                        | testupdateNullItem |
| FALSE    | TRUE            | TRUE                  | Valid           | it should resolve the array of all suppliers' items | testupdateItem |


### Class **_InternalOrderDao_** - method **get_item_by_id(id)**

# please do not write here

### Class **_RestockorderDao_** - method **get_item_by_id(id)**

# please do not write here

### Class **_REturnOrderDao_** - method **get_item_by_id(id)**

# please do not write here


# White Box Unit Tests

### Test cases definition

    <Report here all the created Jest test cases, and the units/classes under test >
    <For traceability write the class and method name that contains the test case>
## Test cases for Item
| Unit name | Jest test case |     |
| --------- | -------------- | --- |
|test itemDao|get Item||
|test itemDao|get not existed Item||
|test itemDao|new item is inserted||
|test itemDao|set Item||
|test itemDao|set empty Item||
|test itemDao|update Item||
|test itemDao|update null Item||

## Test cases for Internal Orders
| Unit name | Jest test case |     |
| --------- | -------------- | --- |
||||
# please do not write here
## Test cases for Internal Orders
| Unit name | Jest test case |     |
| --------- | -------------- | --- |
||||
# please do not write here
## Test cases for Internal Orders
| Unit name | Jest test case |     |
| --------- | -------------- | --- |
||||
# please do not write here

### Code coverage report for Item
![screenshot1](./Covrage%20screenshots/item1.jpg)
![screenshot2](./Covrage%20screenshots/item2.jpg)
![screenshot3](./Covrage%20screenshots/item3.jpg)

### Code coverage report for Item
![screenshot1](./Covrage%20screenshots/item1.jpg)
![screenshot2](./
# please do not write here
### Code coverage report for Item
![screenshot1](./Covrage%20screenshots/item1.jpg)
![screenshot2](./
# please do not write here
### Code coverage report for Item
![screenshot1](./Covrage%20screenshots/item1.jpg)
![screenshot2](./
# please do not write here