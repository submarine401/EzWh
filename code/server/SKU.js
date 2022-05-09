'use strict';

const DBhelper = require("./DBhelper");

class SKU{

    
    constructor(id, descrpition, weight, volume, note, price, available_quantity){

        this.id = id;
        this.descrpition = descrpition;
        this.weight = weight;
        this.volume = volume;
        this.note = note;
        this.price = price;
        this.available_quantity = available_quantity;
        this.position = undefined;
        this.test_descriptors = [];

        console.log('created '+ this);

    }
}

module.exports = SKU;