class UserService{
  dao;
  
  constructor(dao){
    this.dao = dao;
    this.dao.create_user_table();
  }
    
  //FUNCTIONS (integration with USER DAO)
  check_passw = async function(username,password,type){
    const result = await this.dao.checkPassword(username,password,type);
    return result;
  }
  
  getSuppliers = async function(){
    const supplier_list = await this.dao.get_all_suppliers();
    return supplier_list;
  }
  
  get_users_no_manager = async function(){
    const list = await this.dao.getUsers_except_manager();
    return list;
  }
  
  setUser = async function(user_object){
    const result = await this.dao.newUser(user_object);
    return result;
  }
  
  modify_user = async function(username,type_data){  
    //type data is a JSON object like the one descriped inside the PUT API
    const result = await this.dao.modify_user_rights(username,type_data);
    return result;
  }
  
  delete_user = async function(username,type){
      const result = await this.dao.deleteUser(username,type);
      return result;
  }
  
  delete_all = async function(){
    const result = await this.dao.deleteUserData();
    return result;
  }
  
}

module.exports = UserService;
