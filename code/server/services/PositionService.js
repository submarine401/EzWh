const Position = require('../Position');

class PositionService{

    constructor(dao){
        this.dao = dao;
    }

    async get_all_position(){

        const positions = await this.dao.load_positions();
        return positions;
        
    }

    async create_Position(posData){

        try{

            const positions = await this.get_all_position();

            const pos = positions.find(p => p.positionID === posData.positionID);

            if(pos !== undefined){
                console.log('already existing position');
                throw 'already existing';
            }

            const newPos = new Position(posData);

            await this.dao.store_position(newPos);

        }  catch(err) {
          throw(err);
        }

    }

    async modifyPosition(newValues, id){

        const positions = await this.get_all_position();

        // console.log(positions);
        // console.log(id);

        const pos = positions.find(p => p.positionID === id);

        if(pos === undefined){
            console.log('no matching pos');
            throw 'not found';
        }
        
        const newID = newValues.newAisleID + newValues.newRow + newValues.newCol

        if(id !== newID){
            const posNewId = positions.find(p => p.positionID === newID);
            if(posNewId !== undefined){
                console.log('new ID alredy taken');
                throw 'taken ID';
            }
        }

        pos.modifyPosition(newValues);

        this.dao.update_position(id, pos);

    }

    async modifyPositionID(newID, oldID){

        const positions = await this.get_all_position();

        const pos = positions.find(p => p.positionID === oldID);

        if(pos === undefined){
            console.log('no matching pos');
            throw 'not found';
        }

        if(newID !== oldID){

            const posNewId = positions.find(p => p.positionID === newID);
            if(posNewId !== undefined){
                console.log('new ID alredy taken');
                throw 'taken ID';
            }
            
            pos.modifyPositionID(newID);
            this.dao.update_position(oldID, pos);
        }
        
       

    }

    async delete_position(id){

        console.log('delete position' + id);
        const positions = await this.get_all_position();

        const pos = positions.find(p => p.positionID === id);

        if(pos === undefined){
            console.log('no matching pos');
            throw 'not found';
        }

        this.dao.delete_position(id);
        

    }

}
module.exports = PositionService;