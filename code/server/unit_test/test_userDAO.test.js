const UserService = require ('../services/UserService')
const dao = require('../modules/mock_userDAO')
const user_service = new UserService(dao);

describe('POST Users', () => {
  beforeEach(() =>{
    dao.newUser.mockReset();
  });
  
  describe('POST newUser', () =>{
    test('Post correct version', async() =>{
      const newUserData = {
        username:"Giovanni1@ezwh.com",
        name:"Giovanni",
        surname : "ciao",
        password : "testpassword",
        type : "deliveryEmployee"
      }
      let res = user_service.setUser(newUserData);
      expect(res).toBe(200);
    });
    
    test('Post already existent user', async() =>{
      const newUserData = {
        username:"supplier1@ezwh.com",
        name:"Giovanni",
        surname : "Storti",
        password : "testpassword",
        type : "supplier"
      }
      let res = user_service.setUser(newUserData);
      expect(res).toBe(409);
    });
    
    test('Post unprocessable entity', async() =>{
      const newUserData = {
        username:"supplier1@ezwh.com",
        surname : "Storti",
        password : "testpassword",
        type : "supplier"
      }
      let res = user_service.setUser(newUserData);
      expect(res).toBe(422);
    });
    
  });
  
});
