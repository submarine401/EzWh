'use strict'

const express = require ('express');
const dataInterface = require ('../DataInterface');
const U = require('../User');

let router = express.Router();

router.get('/api/suppliers', async (req,res) =>{
  try {
    
    const results= await dataInterface.get_all_suppliers();
    return res.status(200).json(results);
    
  } catch (err) {
    //MISSING ERROR 401 (NOT AUTHENTICATED)
    console.log(err);
    return res.status(500).end();
  }
});

router.get('/api/users', async (req,res) => {
  try{
    const result = await dataInterface.getUsers_except_manager();
    return res.status(200).json(result);
  }
  catch(err){
    //MISSING ERROR 401 (NOT AUTHENTICATED)
    console.log(err);
    return res.status(500).end();
  }
});

router.post('/api/newUser', async (req,res) => {
  try {
    
    const new_u = req.body;
    let users_array = [];
    
    if( new_u.username === undefined ||  new_u.password === undefined ||  new_u.name === undefined || new_u.surname === undefined || new_u.type === undefined){
      return res.status(522).end("Unprocessable entity");
    }
    
    const check_username = await dataInterface.getUsers();
    const res_check_username = check_username.filter(function(users){
      return users.username == new_u.username;
    });
    
    if(res_check_username.length !== 0){
      return res.status(409).end("User already existent!");
    }
    const result = await U.newUser(new_u);
    return res.status(200).end("User inserted!");
    

  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
});


router.put('/api/users/:username', async (req,res) =>{
  
  try {
    const body = req.body;
    const username = req.params.username;
    if (body.oldType === body.newType ||
        body.oldType === 'manager'){
      return res.status(422).end("attempt to modify manager!");
    }
    if(typeof req.params.username === undefined 
      || typeof req.body.oldType !== 'string' 
      || typeof req.body.newType !== 'string'){
      return res.status(422).end();
    }
    
    const check_type = await dataInterface.getUsers();
    const res_check_type = check_type.filter(function(users){
      return (users.type == body.oldType && users.username == username);
    });
    
    if(res_check_type.length === 0){
      return res.status(404).end("Wrong username or OldType");
    }
    
    const result = await U.modify_user_rights(username,body.newType);
    return res.status(200).end();
    
    
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }  
});


router.delete('/api/users/:username/:type', async (req,res) => {
  const type = req.params.type;
  const username = req.params.username
  try {
    if(username === undefined || type === undefined || type === "administrator" || type === "manager"){
      return res.status(422).end("Validation of username or of type failed or attempt to delete a manager/administrator\n");
    }
    
    const result = await U.deleteUser(username,type);
    if(result === 422){
      return res.status(422).end("Failed to validate username or type!");
    }
    return res.status(204).end();
    
  } catch (err) {
    console.log(err);
    return res.status(503).end();
  }
  
});

module.exports = router;
