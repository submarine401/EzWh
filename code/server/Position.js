'use strict'


class Position{
    
    constructor(newPosition){

        this.id = newPosition.positionID;
        this.aisle = newPosition.aisleID;
        this.row = newPosition.row;
        this.col = newPosition.col;
        this.maxWeight = newPosition.maxWeight;
        this.maxVolume = newPosition.maxVolume;
        this.occupiedWeight = newPosition.occupiedWeight? newPosition.occupiedWeight: 0;
        this.occupiedVolume = newPosition.occupiedVolume? newPosition.maxWeight: 0;

    }

    modify_position(newValues){

        this.aisle = newValues.newAisleID;
        this.row = newValues.newRow;
        this.col = newValues.newCol;
        this.id = this.aisle + this.row + this.col
        this.maxWeight = newValues.newMaxWeight;
        this.maxVolume = newValues.newMaxVolume;
        this.occupiedWeight = newValues.newOccupiedWeight;
        this.occupiedVolume = newValues.newOccupiedVolume;
    }

    modify_positionID(newPid){
        
        this.aisle = newPid.substr(0, 4);
        this.row = newPid.substr(4, 4);
        this.col = newPid.substr(8, 4);
    }

    increase_free_space(freed_weight, freed_volume){
        this.occupiedWeight -= freed_weight;
        this.occupiedVolume -= freed_volume;
    }

    decrease_free_space(added_weight, added_volume){
        this.occupiedWeight += added_weight;
        this.occupiedVolume += added_volume;
    }
}

module.exports = Position;