'use strict';

const User = require('./user');
const db = require('../db');
const bcrypt = require('bcrypt');

/**
 * Function to create a User object from a row of the users table
 * @param {*} row a row of the users table
 */
const createUser = function (row) {
    const id = row.id;
    const username = row.username;
    const password = row.password;
    const name = row.name;
    const role = row.role;
   
    return new User(id, username, password, name, role);
}

exports.getUser = function (username) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE username = ?"
        db.all(sql, [username], (err, rows) => {
            if (err) 
                reject(err);
            else if (rows.length === 0)
                resolve(undefined);
            else{
                const user = createUser(rows[0]);
                resolve(user);
            }
        });
    });
  };

exports.getUserById = function (id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE id = ?"
        db.all(sql, [id], (err, rows) => {
            if (err) 
                reject(err);
            else if (rows.length === 0)
                resolve(undefined);
            else{
                const user = createUser(rows[0]);
                resolve(user);
            }
        });
    });
  };


exports.checkPassword = function(user, password){
    let hash = bcrypt.hashSync(password, 10);
    console.log(hash);
    return bcrypt.compareSync(password, user.password);
}