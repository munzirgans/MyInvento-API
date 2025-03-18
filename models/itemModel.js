const db = require('../config/db');

const Item = {
    create: (user_id, name, description, price) => {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO items (user_id, name, description, price,created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)";
            const created_at = new Date().toISOString();
            const updated_at = created_at;
            db.query(query, [user_id, name, description, price, created_at, updated_at], (err, result) => {
                if (err) reject(err);
                else {
                    const newItemId = result.insertId;
                    const selectQuery = "SELECT * FROM items where id = ?";
                    db.query(selectQuery, [newItemId], (err, rows) => {
                        if(err){
                            reject(err);
                        }else{
                            const newItem = rows[0];
                            resolve(newItem);
                        }
                    })
                };
            });
        });
    },

    getAll: (user_id) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM items where user_id = ?";
            db.query(query, [user_id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getById: (id, user_id) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM items WHERE id = ? and user_id = ?";
            db.query(query, [id, user_id], (err, results) => {
                if (err || results.length === 0) reject('Item not found');
                else resolve(results[0]);
            });
        });
    },

    update: (id, name, description, price) => {
        return new Promise((resolve, reject) => {
            const query = "UPDATE items SET name = ?, description = ?, price = ?, updated_at = ? WHERE id = ?";
            const updated_at = new Date().toISOString();
            db.query(query, [name, description, price, updated_at, id], (err, result) => {
                if (err) reject(err);
                else if (result.affectedRows === 0) reject('Item not found');
                else {
                    const selectQuery = "SELECT * FROM items where id = ?";
                    db.query(selectQuery, [id], (err, rows) => {
                        if(err) reject(err);
                        else resolve(rows[0]);
                    })
                    
                }
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const selectQuery = "SELECT * FROM items where id = ?";
            const query = "DELETE FROM items WHERE id = ?";
            db.query(query, [id], (err, result) => {
                if (err) reject(err);
                else if (result.affectedRows === 0) reject('Item not found');
                else {
                    db.query(selectQuery, [id], (err, rows) => {
                        if(err) reject(err);
                        else resolve(rows[0]);
                    });
                };
            });
        });
    }
};

module.exports = Item;