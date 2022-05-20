class SKUItemService{
  dao;
  
  constructor(dao){
    this.dao = dao;
  }
  
  //FUNCTIONS (integration with skuitem services)
  search_by_RFID = async function (RFID){
    const result = await this.dao.get_SKUItem_by_RFID(RFID);
    return result;
  }
  
  get_list_SKUItem = async function(){
    const list = await this.dao.get_all_SKUItem();
    return list;
  }
  
  available_SKUItem = async function(skuID){
  const av_list = await this.dao.get_all_available_SKUItem(skuID);
  return av_list;
  }
  
  delete_SKUItem = async function (rfid){
    const result = await this.dao.deleteSKUItem(rfid);
    return result;
  }
  
  newSKUItem = async function(SKU_item_info){
    this.dao.create_SKUItem(SKU_item_info);
    return;
  }
  
}

module.exports = SKUItemService;
