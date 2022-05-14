'use strict';

//const DBhelper = require("./DBhelper");

class SKUItem{
  dayjs = require('dayjs');

    
    constructor(id, RFID, dateOfStock){

        this.idSKU = id;
        this.RFID= RFID;
        this.DateOfStock = dateOfStock;
        this.availability = 0;
        //console.log('created '+ this);
    }
}

module.exports = SKUItem;
