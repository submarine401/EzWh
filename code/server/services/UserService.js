class UserService{
  dao;
  
  constructor(dao){
    this.dao = dao;
  }
  
  //FUNCTIONS (integration with USER DAO)
  getSuppliers = async function(){
    const supplier_list = await this.dao.get_all_suppliers();
    return supplier_list;
  }
  
  get_users_no_manager = async function(){
    const list = await this.dao.getUsers_except_manager();
    return list;
  }
  
  setUser = async function(user_object){
    const result = this.dao.newUser(user_object);
    return result;
  }
  
  modify_user = async function(username,type_data){  
    //type data is a JSON object like the one descriped inside the PUT API
    const result = this.dao.modify_user_rights(username,type_data);
    return result;
  }
  
  delete_user = async function(username,type){
      const result = await this.dao.deleteUser(username,type);
      return result;
  }
  
}

module.exports = UserService;
