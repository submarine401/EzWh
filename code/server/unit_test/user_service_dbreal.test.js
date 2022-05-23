const UserService = require ('../services/UserService');
const dao = require('../modules/UserDAO');
const user_service = new UserService(dao);

describe('Get methods', () =>{
  beforeEach(async() =>{
    
  });
    
  test('GET SUPPLIERS', async() =>{
    let res = await user_service.getSuppliers();
    expect(res).toEqual(
      [{
        id: 5,
        name: "name",
        surname: "surname",
        email: "supplier1@ezwh.com"
      }]
    );
  });
  
  const keys = [
    'id',
    'name',
    'surname',
    'email',
    'type'
  ]
  
  test('GET USERS EXCEPT MANAGERS', async() =>{
    let res = await user_service.get_users_no_manager();
    //check if every element of the array has the same set of properties
    res.forEach(element => {
      expect(Object.keys(element)).toEqual(keys);
    })
  });
  
});

describe('POST methods', ()=>{
  beforeEach(async() =>{
  });
  
  test('POST newUser correct', async() =>{
    let res = await user_service.setUser(
      {
      "username":"Marco@ezwh.com",
      "name":"Marco",
      "surname" : "Rossi",
      "password" : "helloeveryone",
      "type" : "deliveryEmployee"
    });
    console.log(res);
    expect(res).toBe(200);
  });
  
  test('POST USER WITH SHORT PASSWORD', async() =>{
    let res = await user_service.setUser(
      {
      "username":"Luca@ezwh.com",
      "name":"Luca",
      "surname" : "Bianchi",
      "password" : "abc",
      "type" : "customer"
    });
    expect(res).toEqual(422);
  });
  
  test('POST USER WITH UNEXPECTED TYPE', async() =>{
    let res = await user_service.setUser(
      {
      "username":"Mario@ezwh.com",
      "name":"Mario",
      "surname" : "Verdi",
      "password" : "abcdefrgswefowjw",
      "type" : "somethingstrange"
    });
    expect(res).toEqual(422);
  });
  
});

describe('DELETE methods', () =>{
  test('DELETE a normal user (NO MANAGER)', async() =>{
    const user = 'clerk1@ezwh.com';
    const type = 'clerk';
    let res = await user_service.delete_user(user,type);
    expect(res).toEqual(204);
  });
  
  test('DELETE with wrong parameters (unexisting user)', async() =>{
    const user = 'deliveryEmployee1@ezwh.com';
    const type = 'customer';
    let res = await user_service.delete_user(user,type);
    expect(res).toEqual(422);
  });
  
});

describe('PUT methods', () =>{
  
  const user='deliveryEmployee1@ezwh.com'
  const obj =  {
        "oldType" : "deliveryEmployee",
        "newType" : "clerk"
    }
  
  test('MODIFY  a normal user', async() =>{
    let res = await user_service.modify_user(user,obj.newType);
    expect(res).toEqual(200);
  });
});
