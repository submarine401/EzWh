 const UserService = require ('../services/UserService');
const dao = require('../modules/mock_userDAO');
 const user_service = new UserService(dao);

 describe('POST Users', () => {
   beforeEach(() =>{
     dao.newUser.mockReset();
   });
  
     test('Post correct version', async() =>{
       const newUserData = {
         "username":"Giovanni1@ezwh.com",
         "name":"Giovanni",
         "surname" : "ciao",
         "password" : "testpassword",
         "type" : "deliveryEmployee"
       }
       let res = await user_service.setUser(newUserData);
       expect(res).toBe(200);
     });
    
});

describe('GET list of suppliers', () => {
  beforeEach(() =>{
    dao.get_all_suppliers.mockReset();
    dao.get_all_suppliers.mockReturnValueOnce({
      id: 5,
      username: "supplier1@ezwh.com",
      name: "name",
      surname: "surname"
    });
  });
  
  test('GET Suppliers', async() => {
    let res = await user_service.getSuppliers();
    expect(res).toEqual({
      id: 5,
      username: "supplier1@ezwh.com",
      name: "name",
      surname: "surname"
    });
  });
  
});
