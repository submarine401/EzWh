'use strict';

const dataInterface = require("./DataInterface");
const dbHelper = require("./DBhelper");

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

    async modify_SKU(newValues){

        const positions = this.position? await dataInterface.get_all_position():undefined;
        if(positions){
            
            const pos = positions.find(p => p.id === id);

            const newFullWeight = newValues.newWeight*newValues.newAvailableQuntity;
            const newFullVol = newValues.newVolume*newValues.newAvailableQuntity;

            if(pos.maxWeight < newFullWeight || pos.maxVolume < newFullVol){
                console.log('not enough space in position');
                throw('not enough space in position');
            }

            const weightDiff = newFullWeight - this.weight*this.availableQuantity;
            const volDiff = newFullVol - this.volume*this.availableQuantity;

            pos.decrease_free_space(weightDiff, volDiff);
            dbHelper.update_position(pos.positionID, pos);
            
        }

        this.descrpition = newValues.newDescription;
        this.weight = newValues.newWeight;
        this.volume = newValues.newVolume;
        this.note = newValues.newNotes;
        this.price = newValues.newPrice;
        this.availableQuantity = newValues.newAvailableQuntity;

        dbHelper.update_SKU(this.id, this);

    }
}

module.exports = SKU;