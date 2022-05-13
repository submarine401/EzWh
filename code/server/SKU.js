'use strict';

const DBhelper = require("./DBhelper");

class SKU{

    
    constructor(id, descrpition, weight, volume, note, price, availableQuantity, position, test_descriptors){

        this.id = id;
        this.descrpition = descrpition;
        this.weight = weight;
        this.volume = volume;
        this.note = note;
        this.price = price;
        this.availableQuantity = availableQuantity;
        this.position = position;
        this.test_descriptors = test_descriptors? test_descriptors:[];

    }
}

module.exports = SKU;