const db = require('../config/db');

const User = {
    create: (first_name, last_name, email, password) => {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) values (?,?,?,?,?,?)";
            const created_at = new Date().toISOString();
            const updated_at = created_at;
            db.query(query, [first_name, last_name, email, password, created_at, updated_at], (err, result) => {
                if(err) reject(err);
                else {
                    const newUserId = result.insertId;
                    const selectQuery = "SELECT * FROM users where id = ?";
                    db.query(selectQuery, [newUserId], (err, rows)=>{
                        if(err){
                            reject(err);
                        }else{
                            const newUser = rows[0];
                            resolve(newUser);
                        }
                    })
                };
            })
        });
    },
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = "select * from users where email = ?";
            db.query(query, [email], (err, results) => {
                if (err || results.length === 0) reject('User not found');
                else resolve(results[0]);
            });
        });
    }
}

module.exports = User;