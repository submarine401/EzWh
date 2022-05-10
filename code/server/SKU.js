'use strict';

const DBhelper = require("./DBhelper");

class SKU{

    
    constructor(id, descrpition, weight, volume, note, price, available_quantity, position, test_descriptors){

        this.id = id;
        this.descrpition = descrpition;
        this.weight = weight;
        this.volume = volume;
        this.note = note;
        this.price = price;
        this.available_quantity = available_quantity;
        this.position = position;
        this.test_descriptors = test_descriptors? test_descriptors:[];

        console.log('created '+ this);

    }
}

module.exports = SKU;