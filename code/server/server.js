'use strict';
const express = require('express');
const db = require('./DBhelper');
const InternalOrder = require('./InternalOrder');
const Item = require('./Item');
const ReturnOrder = require('./ReturnOrder');
const Restockorder = require('./Restockorder');
const SKU = require('./SKU');
const dataInterface = require('./DataInterface');
const UserAPI = require('./api/UserAPI');
const SKUapi = require('./api/SKUapi');
const PositionApi = require('./api/PositionApi');
const ItemAPI = require('./api/ItemAPI')
const RestockOrederAPI = require('./api/RestockOrederAPI')
const ReturnOrederAPI = require('./api/ReturnOrderAPI');
const InternalOrderAPI = require('./api/InternalOrderAPI');

const Test_Descriptor = require('./Test_Descriptor');
const Test_Result= require('./Test_Result');





/*
Connect to DB
*/
//const db = new DBhelper("EZWHDB"); --> connection moved in DBhelper.js
/*
Creating instances of classe which db connection is passed to each one
*/
//const dataInterface = new DataInterface(db);
// const IO = new InternalOrder(db);
// const I = new Item(db);
// const RO = new ReturnOrder(db);
// const RSO = new Restockorder(db);
// const U = new User(db);
// const TD = new Test_Descriptor(db);
// const TR = new Test_Result(db);

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
app.use('/',UserAPI)

app.use('/',ItemAPI)

/*
***************************************** Test Descriptor API ****************************************************
*/

/*
INSERT NEW Test Descriptor

    //MISSING ERROR 401 (NOT AUTHENTICATED) su tutti
*/

app.post('/api/testDescriptor', async (req,res)=>{
  try{

    if(Object.keys(req.body).length === 0){
      return res.status(422).json({error : "Unprocessable Entity"});
    }

    const newTD = req.body;
    if( typeof newTD.TDid !== 'number' || 
        typeof newTD.name !== 'string' || 
        typeof newTD.procedure_description !== 'string' || 
        typeof newTD.idSKU !== 'number' ){
      return res.status(422).json({error : "Unprocessable Entity"});
    }

    const s = dataInterface.get_SKU(idSKU)
    console.log(s);
    if(s === undefined){
      return res.status(404).end();
    }

    Test_Descriptor.create_TD(newTD); //TODO create td because i dont know where to put it
    return res.status(201).json({success: 'Created'});
  
  }
  catch(err)
  {
    console.log(err);
    return res.status(503).end();
  }
});
  


app.get('/api/testDescriptors', (req, res)=>{

  try
    {     
      return res.status(200).json(Test_Descriptor.get_TD()); 
    }
  catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }

});


app.get('/api/testDescriptors/:id', (req, res)=>{

  try{   

    const id = req.params.TDid
    if( id > 0 && typeof id === 'number') {
      
      
      const t = Test_Descriptor.get_TD(id);
      console.log(t);
      if(t === undefined){
        return res.status(404).end();
      } else {
        return res.status(200).json(t);
      }

    } else {
      return res.status(422).json({error : "Unprocessable Entity"});
    }
  }
  catch(err) {
    console.log(err);
    return res.status(500).end();
  }

});



app.delete('/api/testDescriptor/:id', (req, res)=>{

  try{     

    const id = req.params.id
    if( id > 0 && typeof id === 'number') {

      if(Test_Descriptor.delete_test_descriptor(id)){
        return res.status(204).end();
      } 
    } else {
      return res.status(422).json({error : "Unprocessable Entity"});
    } 
  }
  catch(err) {
    console.log(err);
    return res.status(503).end();
  }

});


app.put('/api/testDescriptor/:id',async (req,res)=>{
  try
    {
      const td = req.body.td;
      if(Object.keys(req.body).length === 0 || td === undefined || td.newName === undefined ||
       td.newProcedureDescriprion === undefined || td.newIdSKU === undefined ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
      
      const id = req.params.id;

      if(id >0 && typeof id === 'number'){   
        const t = Test_Descriptor.get_TD(id);
        const s = dataInterface.get_SKU(newIdSKU);
          if(t === undefined){
                return res.status(404).end();
           }else if(s === undefined){
                return res.status(404).end();
          }else{
              const results = await TD.modify_test_descriptor(td, id);
              return res.status(200).json(results);
          } 
      }
    }
  catch(err)
  {
    console.log(err);
    return res.status(503).end();
  }
});

    

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});




module.exports = app;
