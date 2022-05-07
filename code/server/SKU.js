'use strict';

const DBhelper = require("./DBhelper");

class SKU{

    costructor(descrpition, weight, volume, note, price, available_quantity, position){

        this.descrpition = descrpition;
        this.weight = weight;
        this.volume = volume;
        this.note = note;
        this.price = price;
        this.available_quantity = available_quantity;
        this.position = position;
        this.test_descriptiors = [];

        await DBhelper.storeSKU(this);

        return this;

    }
}

modules.export = SKU;