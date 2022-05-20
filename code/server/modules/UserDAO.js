'use strict'
  const dayjs = require('dayjs');
  const sqlite = require ('sqlite3')
  const db = new sqlite.Database('EZWHDB.db', (err) => {
  if (err) throw err;
  });
  
  
  exports.newUser = function(u){
    return new Promise((resolve,reject) => {
      if(u.password.length < 8){
        resolve(422);
        return;
      }
      let users_array = ['qualityEmployee','customer','supplier','deliveryEmployee','supplier','clerk'];
      const email = u.username;
      const type = u.type;
      if(users_array.includes(type) === false){
        resolve(422);
        return;
      }
      
      function caesarEncr(password,key){
        let enc = '';
        let result = []
        for (let i = 0; i<password.length; i++){
          result[i]=(password.charCodeAt(i) + key);
        } 
        enc=String.fromCharCode.apply(String,result);
        return enc;
      }
      
      let enc_password  = caesarEncr(u.password,1);
      
      const sql_query2 = 'INSERT INTO users(username, password, name, surname, type) VALUES (?, ?, ?, ?, ?)';
      //insert into 'users' table the parameters defining in the following constant
      const parameters=[u.username, enc_password, u.name, u.surname, u.type];
    
    //Insert user in the DB
      db.all(sql_query2,parameters, function(err,rows){
      if(err){
        reject(err);
        return;
        }
        resolve(201);
      });
      
    });
  }
  
  //method returning the list of all users except managers
  /*getUsers() {
    return new Promise((resolve,reject) => {
      const sql_query = 'SELECT * FROM users';
      this.db.all(sql_query,[], function(err, rows){
        
        if(err){
          reject(err);
          return;
        }
        //create an array of 'User' objects
        const users_not_manager = rows.map(u => ({
          
          id : u.id,
          username : u.username,
          name : u.name,
          surname : u.surname,
          type : u.type
          
        }));
        resolve(users_not_manager);    
      });
    });
  }*/
  
  exports.get_all_suppliers = function(){
    return new Promise((resolve,reject) => {
      const sql_query = 'SELECT * FROM users WHERE type=?';
      db.all(sql_query,["supplier"],function(err,rows){
        if(err){
          reject(err);
          return;
        }
        const suppliers_array = rows.map(supplier => ({  //here an array of objects is built
          
          id:supplier.id,
          username:supplier.username,   //must be an email
          name:supplier.name,
          surname:supplier.surname
            
        }));
        //pass the array of suppliers to the resolve function
        resolve(suppliers_array);  
      });
    });
  }
      
      exports.getUsers_except_manager= function(){
        return new Promise((resolve,reject) => {      
          const sql_query = 'SELECT * FROM users WHERE NOT type =?';
          db.all(sql_query,["manager"],function(err, rows){
            if(err){
              reject(err);
              return;
            }
            //return an array of users
            const user_array = rows.map((user) => (
              {
                
              id : user.id,
              name : user.name,
              surname : user.surname,
              email : user.username,
              type : user.type
            }));
            
            resolve(user_array);            
          });
        });
      }

  
  /*API function which modifies access rights of a user, 
  given its username as parameter*/
  exports.modify_user_rights = function(username,u_new_type){
    return new Promise((resolve,reject) => {
      const sql_query = 'UPDATE users set type = ? WHERE username = ?'
      
      //check if username exists
      db.all(sql_query,[u_new_type,username], function(err,rows){
      
      if(err){
        reject(err);
        return;
      }
      });
      
      resolve(200);
      
    });
  }
  
  //method to delete a user given its username
   exports.deleteUser = function(username,type){
    return new Promise((resolve,reject) =>{
      const users_array = ['qualityEmployee','customer','supplier','deliveryEmployee','supplier','clerk'];
      if(users_array.includes(type) === false){
        resolve(422);
        return;
      }
      const sql_query1 = 'SELECT * FROM users WHERE username= ? AND type = ?';
      db.all(sql_query1,[username, type], function(err,rows) {
        if(err){
          reject(err);
          return;
        }
        else if(rows.length === 0){
          resolve(422);
          return;
        }
      });
      const sql_query2 = 'DELETE FROM users WHERE username= ? AND type = ?';
      db.run(sql_query2, [username, type], function(err) {
        if(err){
          reject(err);
          return;
        }
        resolve(`user with username: ${username} has been correcly deleted.\n`);
      });
    });  
  }
