const express = require('express');

const db = require('../modules/Test_DescriptorDAO');
const Test_DescriptorService = require('../services/Test_DescriptorService')
const TestDescriptorService = new Test_DescriptorService(db);

const dbs = require('../modules/SkuDao');
const SkuService = require('../services/SkuService');
const sku_Service = new SkuService(dbs)

let router = express.Router();

    
router.get('/api/testDescriptors', async (req, res)=>{
  
  try
    {     
      const result = await TestDescriptorService.getAllTestDescriptors();

      return res.status(200).json(result); 
    }
  catch(err)
    {
      console.log(err);
      return res.status(500).end();
    }

});


router.get('/api/testDescriptors/:id', async (req, res)=>{
 
  try{   

    const id = req.params.id;
    if( id > 0  && typeof Number(id) === 'number') {
      
      const t = await TestDescriptorService.getTestDescriptorsById(id);
  
      if(t.length === 0 || t === 404){ 
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


router.post('/api/testDescriptor', async (req,res)=>{
  try{

    if(Object.keys(req.body).length === 0){
      return res.status(422).json({error : "Unprocessable Entity"});
    }

    const newTD = req.body;
    if( typeof newTD.name !== 'string' || 
        typeof newTD.procedureDescription !== 'string' || 
        typeof newTD.idSKU !== 'number' ){
      return res.status(422).json({error : "Unprocessable Entity"});
    }
    const idSKU= req.body.idSKU;
    const s = await sku_Service.get_SKU(idSKU);
    
    if(s === undefined){ 
      return res.status(404).json({error: "No sku associated idSKU"});
    }

    await TestDescriptorService.setTestDescriptor(newTD);

    return res.status(201).json({success: 'Created'});
  
  }
  catch(err)
  {
    console.log(err);
    return res.status(503).end();
  }
});


router.put('/api/testDescriptor/:id',async (req,res)=>{
  try
    {
      const td = req.body;
      const id = req.params.id;
      
      if(Object.keys(req.body).length === 0 || td === undefined || 
      id === undefined|| td.newName === undefined ||
       td.newProcedureDescription === undefined || td.newIdSKU === undefined ){
        return res.status(422).json({error : "Unprocessable Entity"});
      }
      
      if(id > 0 && typeof Number(id) === 'number'){   
        const t = await TestDescriptorService.getTestDescriptorsById(id);
     
        const s = await sku_Service.get_SKU(td.newIdSKU);
          if(t.length === 0 || t===404 || s === undefined){
                return res.status(404).json({error: "No test descriptor associated id or no sku associated to IDSku"});
          }else{
              const results = await TestDescriptorService.modifyTestDescriptor(td, id);
              
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




router.delete('/api/testDescriptor/:id', async (req, res)=>{

  try{     

    const id = req.params.id
    if( id > 0 && typeof Number(id) === 'number' ) {

      const t = await TestDescriptorService.getTestDescriptorsById(id);
   
      if(t.length!==0 && await TestDescriptorService.deleteTestDescriptor(id)){
        return res.status(204).end("Test Descriptor deleted");
      } else {
        return res.status(422).json({error : "Not found"});
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

router.delete('/api/allTD',async (req,res)=>{
  try{
  
  
  const results = await TestDescriptorService.deleteAllTestDescriptors();
  if (results) {
  return res.status(204).json(results);
   } else {
    return res.status(422).json({error : "Not found"});
    }
  } 
  catch(err)
  {
    console.log(err);
    return res.status(503).end();
  }
});

module.exports = router;
