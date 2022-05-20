const UserService = require ('../services/UserService')
const dao = require('../modules/mock_userDAO')
const user_service = new UserService(dao);

describe('POST Users', () => {
  beforeEach(() =>{
    dao.newUser.mockReset();
  });
  
    test('Post correct version', async() =>{
      const newUserData = {
        username:"Giovanni1@ezwh.com",
        name:"Giovanni",
        surname : "ciao",
        password : "testpassword",
        type : "deliveryEmployee"
      }
      
      let res = await user_service.setUser(newUserData);
      expect(dao.newUser.mock.calls[0][0]['username']).toBe(newUserData["username"]);
      //first call, second parameter passed
      expect(dao.newUser.mock.calls[0][0]['name']).toBe(newUserData["name"]);
      //first call, third parameter passed
      expect(dao.newUser.mock.calls[0][0]['surname']).toBe(newUserData["surname"]);
      //first call, fourth parameter passed
      expect(dao.newUser.mock.calls[0][0]['password']).toBe(newUserData["password"]);
      
      expect(dao.newUser.mock.calls[0][0]['type']).toBe(newUserData["type"]);
    });
    
});

    
    /*test('Post already existent user', async() =>{
      const newUserData = {
        username:"supplier1@ezwh.com",
        name:"Giovanni",
        surname : "Storti",
        password : "testpassword",
        type : "supplier"
      }
      let res = await user_service.setUser(newUserData);
      expect(dao.newUser.mock.calls[0][0]['username']).toBe(newUserData["ursername"]);
      //first call, second parameter passed
      expect(dao.newUser.mock.calls[0][0]['name']).toBe(newUserData["name"]);
      //first call, third parameter passed
      expect(dao.newUser.mock.calls[0][0]['surname']).toBe(newUserData["surname"]);
      //first call, fourth parameter passed
      expect(dao.newUser.mock.calls[0][0]['password']).toBe(newUserData["password"]);
      
      expect(dao.newUser.mock.calls[0][0]['type']).toBe(newUserData["type"]);
    });
    
    test('Post unprocessable entity', async() =>{
      const newUserData = {
        username:"supplier1@ezwh.com",
        surname : "Storti",
        password : "testpassword",
        type : "supplier"
      }
      let res = await user_service.setUser(newUserData);
      expect(res).toBe(422);
    });
*/
  
