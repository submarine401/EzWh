'use strict';

const DBhelper = require("./DBhelper");

class SKU{

    id;
    descrpition;
    weight;
    volume;
    note;
    price;
    available_quantity;
    position;
    test_descriptiors;
    
    costructor(id, descrpition, weight, volume, note, price, available_quantity){

        console.log('constructor');

        this.id = id;
        this.descrpition = descrpition;
        this.weight = weight;
        this.volume = volume;
        this.note = note;
        this.price = price;
        this.available_quantity = available_quantity;
        this.position = undefined;
        this.test_descriptiors = [];

        console.log('constructor');
        console.log(this);

    }
}

module.exports = SKU;