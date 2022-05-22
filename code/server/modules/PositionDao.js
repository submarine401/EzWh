sqlite = require('sqlite3');
const Position = require('../Position');

const db = new sqlite.Database('EZWHDB.db', (err) => {
    if (err) throw err;
});


exports.create_position_table = () => {
    return new Promise((resolve, reject) => {

        const sql_query = 'CREATE TABLE IF NOT EXISTS position (positionID TEXT PRIMARY KEY, aisleID TEXT, row TEXT, col TEXT, maxWeight REAL, maxVolume REAL, occupiedWeight REAL, occupiedVolume REAL);'
        db.run(sql_query, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve("Position Table -> OK");
        });
    });
}

exports.delete_position_data = () => {
    return new Promise((resolve, reject) => {

        const sql_query = 'DELETE FROM position'
        db.run(sql_query, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve("Position data -> DELETED");
        });
    });
}


exports.load_positions = () => {
    console.log('loading position');

    return new Promise((resolve, reject) => {

        const sql_query = 'SELECT * from position'
        db.all(sql_query, (err,rows)=>{

            if(err){
                reject(err); 
                return;
            }

            const position = rows.map((pos) => new Position(pos));
            resolve(position);
        });
    });
}



exports.store_position = (position) => {

    try {
        console.log('DB store');

        return new Promise((resolve, reject) => {

            try {
                const sql = 'INSERT INTO position (positionID, aisleID, row, col, maxWeight, maxVolume, occupiedWeight, occupiedVolume)  \
                            VALUES  ( ?, ?, ?, ?, ?, ?, ?, ?);'
                const params = [position.positionID, position.aisleID, position.row, position.col, position.maxWeight, 
                                position.maxVolume, position.occupiedWeight, position.occupiedVolume];
                db.run(sql, params, (err)=>{
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve("Stored position");
                });

            } catch (err) {
                throw (err);
            }
        })
    } catch (err) {
        throw (err);
    }
}

exports.update_position = (id, pos) => {
    return new Promise((resolve, reject) => {

        const sql_query = 'UPDATE position \
                           SET  positionID = ?, aisleID = ?, row = ?, col = ?, maxWeight = ?, maxVolume = ?, occupiedWeight = ?, occupiedVolume = ? \
                           WHERE positionID = ?';

        const params = [
            pos.positionID, pos.aisleID, pos.row, pos.col, pos.maxWeight,
            pos.maxVolume, pos.occupiedWeight, pos.occupiedVolume,
            id
        ]
        db.run(sql_query, params, (err)=>{

            if(err){
                reject(err); 
                return;
            }

            resolve();
        });
    });
}

exports.delete_position = (id) => {
    console.log('deleting ' + id + ' from db')

    return new Promise((resolve, reject) => {

        const sql_query = 'DELETE FROM position \
                           WHERE positionID = ?';

        db.run(sql_query, [id], (err)=>{

            if(err){
                reject(err); 
                return;
            }

            resolve();
        });
    });
}