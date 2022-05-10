'use strict'


class Position{
    
    constructor(newPosition){

        this.id = newPosition.positionID;
        this.aisle = newPosition.aisleID;
        this.row = newPosition.row;
        this.col = newPosition.col;
        this.maxWeight = newPosition.maxWeight;
        this.maxVolume = newPosition.maxVolume;
        this.occupiedWeight = 0;
        this.occupiedVolume = 0;

    }

    modify_position(newValues){
        //to do
    }

    modify_positionID(newPid){
        //to do
    }

    increase_free_space(freed_weight, freed_volume){
        //to do
    }

    decrease_free_space(added_weight, added_volume){
        //to do
    }
}

module.exports = Position;