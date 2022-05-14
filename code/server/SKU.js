'use strict';

const dataInterface = require("./DataInterface");
const dbHelper = require("./DBhelper");

class SKU{

    
    constructor(id, description, weight, volume, note, price, availableQuantity, position, test_descriptors){

        this.id = id;
        this.description = description;
        this.weight = weight;
        this.volume = volume;
        this.note = note;
        this.price = price;
        this.availableQuantity = availableQuantity;
        this.position = position;
        this.test_descriptors = test_descriptors? test_descriptors:[];

    }

    async modify_SKU(newValues){

        console.log(newValues);

        const positions = this.position? await dataInterface.get_all_position():undefined;

        console.log(positions);

        if(positions){
            
            const pos = positions.find(p => p.id === id);

            console.log('aaaa');
            console.log(pos);

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

        
        this.description = newValues.newDescription;
        this.weight = newValues.newWeight;
        this.volume = newValues.newVolume;
        this.note = newValues.newNotes;
        this.price = newValues.newPrice;
        this.availableQuantity = newValues.newAvailableQuantity;

        dbHelper.update_SKU(this.id, this);

    }
}

module.exports = SKU;