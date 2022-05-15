const db = require('./DBhelper');

class User {
  dayjs = require('dayjs');
  constructor(db) {
    this.db = db;
  }
  
  
  
  newUser(u){
    return new Promise((resolve,reject) => {
      if(u.password.length < 8){
        reject("Password must be at least 8 characters long!\n");
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
      this.db.db.all(sql_query2,parameters, function(err,rows){
      if(err){
        reject(err);
        return;
        }
        resolve(201);
      });
      
    });
  }
  
  
  /*API function which modifies access rights of a user, 
  given its username as parameter*/
  modify_user_rights(username,u_new_type){
    return new Promise((resolve,reject) => {
      const sql_query = 'UPDATE users set type = ? WHERE username = ?'
      
      //check if username exists
      this.db.db.all(sql_query,[u_new_type,username], function(err,rows){
      
      if(err){
        reject(err);
        return;
      }
      });
      
      resolve("Operation completed successfully\n");
      
    });
  }
  
  //method to delete a user given its username
   deleteUser(username,type){
    return new Promise((resolve,reject) =>{
      const sql_query1 = 'SELECT * FROM users WHERE username= ? AND type = ?';
      this.db.db.all(sql_query1,[username, type], function(err,rows) {
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
      this.db.db.run(sql_query2, [username, type], function(err) {
        if(err){
          reject(err);
          return;
        }
        resolve(`user with username: ${username} has been correcly deleted.\n`);
        
      });
    });  
  }
  
  
}
const U = new User(db);
module.exports = U;
