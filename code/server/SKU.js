'use strict';

// const skuService = require("./services/SkuService");
const skuDao = require("./modules/SkuDao");

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

        if(this.position){
            
            console.log('aaaa');
            console.log(this.position);
            console.log(newValues);

            const newFullWeight = newValues.newWeight*newValues.newAvailableQuantity;
            const newFullVol = newValues.newVolume*newValues.newAvailableQuantity;

            if(this.position.maxWeight < newFullWeight || this.position.maxVolume < newFullVol){
                console.log('not enough space in position');
                throw('not enough space in position');
            }

            const weightDiff = newFullWeight - this.weight*this.availableQuantity;
            const volDiff = newFullVol - this.volume*this.availableQuantity;

            // console.log('old\tnew\tdiff');
            // console.log(this.weight*this.availableQuantity + '\t' + newFullWeight + '\t' + weightDiff);
            // console.log(this.volume*this.availableQuantity + '\t' + newFullVol + '\t' + volDiff);

            this.position.decrease_free_space(weightDiff, volDiff);
            positionDao.update_position(this.position.id, this.position);
            
        }

        
        this.description = newValues.newDescription;
        this.weight = newValues.newWeight;
        this.volume = newValues.newVolume;
        this.note = newValues.newNotes;
        this.price = newValues.newPrice;
        this.availableQuantity = newValues.newAvailableQuantity;

        skuDao.update_SKU(this.id, this);

    }

    async add_modify_SKU_position(newPos){
        
        if(this.position && this.position.id === newPos.positionID) return;

        const fullWeight = this.weight*this.availableQuantity;
        const fullVol = this.volume*this.availableQuantity;

        //console.log('weight:' + fullWeight + ', vol:' + fullVol);

        if(newPos.maxWeight < fullWeight || newPos.maxVolume < fullVol){
            console.log('not enough space in position');
            throw('not enough space in position');
        }

        if(this.position) {
            this.position.increase_free_space(fullWeight, fullVol);
            console.log(this.position);
            await positionDao.update_position(this.position.id, this.position);
        }

        newPos.decrease_free_space(fullWeight, fullVol);
        console.log(newPos);
        await positionDao.update_position(newPos.id, newPos);

        this.position = newPos;

        await skuDao.update_SKU(this.id, this);
    }
}

module.exports = SKU;