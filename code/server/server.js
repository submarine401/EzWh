'use strict';
const express = require('express');
//const InternalOrder = require('./InternalOrder');
//const Item = require('./Item');
//const ReturnOrder = require('./ReturnOrder');
//const Restockorder = require('./Restockorder');
//const SKU = require('./SKU');
const UserAPI = require('./api/UserAPI');
const SKUapi = require('./api/SKUapi');
const PositionApi = require('./api/PositionApi');
const ItemAPI = require('./api/ItemAPI')
const RestockOrederAPI = require('./api/RestockOrederAPI')
const ReturnOrederAPI = require('./api/ReturnOrderAPI');
const InternalOrderAPI = require('./api/InternalOrderAPI');
//const Test_Descriptor = require('./Test_Descriptor');
//const Test_Result= require('./Test_Result');
const TestDescriptorAPI = require('./api/TestDescriptorAPI');
const TestResultAPI= require('./api/TestResultAPI');
const SKUItemAPI = require('./api/SKUItemAPI');

// init express
const app = new express();
const port = 3001;
app.use(express.json());
/*
***************************************** IO API ****************************************************
*/
app.use('/',InternalOrderAPI);
/*
***************************************************** RO API *******************************************************
*/
app.use('/',ReturnOrederAPI);
/*
*****************************************RSO API *****************************************************
*/
app.use('/',RestockOrederAPI);

/*
***************************************** SKU API ****************************************************
*/

app.use('/', SKUapi);

/*
***************************************** Position API ****************************************************
*/

app.use('/', PositionApi);

/****************************USER API******************************/

app.use('/',ItemAPI)
app.use('/',UserAPI);

/*****************************SKUITEM API***************************/
app.use('/', SKUItemAPI);


/*
***************************************** Test Descriptor API ****************************************************
*/

app.use('/', TestDescriptorAPI);

/*
***************************************** Test Result API ****************************************************
*/

app.use('/', TestResultAPI);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});




module.exports = app;
