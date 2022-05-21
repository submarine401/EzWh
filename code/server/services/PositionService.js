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

            const pos = positions.find(p => p.id === posData.positionID);

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

    async modify_Position(newValues, id){

        const positions = await this.get_all_position();

        const pos = positions.find(p => p.id === id);

        if(pos === undefined){
            console.log('no matching pos');
            throw 'not found';
        }

        pos.modify_position(newValues);

        this.dao.update_position(id, pos);

    }

    async modify_positionID(newID, oldID){

        const positions = await this.get_all_position();

        const pos = positions.find(p => p.id === oldID);

        if(pos === undefined){
            console.log('no matching pos');
            throw 'not found';
        }
        
        pos.modify_positionID(newID);

        this.dao.update_position(oldID, pos);

    }

    async delete_position(id){

        console.log('delete position' + id);
        const positions = await this.get_all_position();

        const pos = positions.find(p => p.id === id);

        if(pos === undefined){
            console.log('no matching pos');
            throw 'not found';
        }

        this.dao.delete_position(id);
        

    }

}
module.exports = PositionService;