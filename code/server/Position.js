'use strict'


class Position{
    
    constructor(newPosition){

        this.positionID = newPosition.positionID;
        this.aisleID = newPosition.aisleID;
        this.row = newPosition.row;
        this.col = newPosition.col;
        this.maxWeight = newPosition.maxWeight;
        this.maxVolume = newPosition.maxVolume;
        this.occupiedWeight = newPosition.occupiedWeight? newPosition.occupiedWeight: 0;
        this.occupiedVolume = newPosition.occupiedVolume? newPosition.occupiedVolume: 0;

    }

    modifyPosition(newValues){

        this.aisleID = newValues.newAisleID;
        this.row = newValues.newRow;
        this.col = newValues.newCol;
        this.positionID = this.aisleID + this.row + this.col;
        this.maxWeight = newValues.newMaxWeight;
        this.maxVolume = newValues.newMaxVolume;
        this.occupiedWeight = newValues.newOccupiedWeight;
        this.occupiedVolume = newValues.newOccupiedVolume;
    }

    modifyPositionID(newPid){
        
        this.aisleID = newPid.substr(0, 4);
        this.row = newPid.substr(4, 4);
        this.col = newPid.substr(8, 4);
        this.positionID = this.aisleID + this.row + this.col;
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