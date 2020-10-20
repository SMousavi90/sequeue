'use strict';

const RequestType = require('./requestType');
const db = require('../db');

const createRequestType = function (row) {
    return new RequestType(row.id, row.tagName, row.estimationTime);
}
/**
 * Get all requestTypes 
 */
exports.getRequestTypes = function (id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT r.RequestTypeId as id, r.TagName as tagName, r.EstimationTime as estimationTime FROM RequestType r`;
        db.all(sql, [id], (err, rows) => {
            if (err)
                reject(err);
            else if (rows.length === 0)
                resolve(undefined);
            else {
                let rents = rows.map((row) => createRequestType(row));
                resolve(rents);
            }
        });
    });
}

exports.reserveSpot = function (serv_id) {
    return new Promise((resolve, reject) => {  
        const sql = `INSERT INTO Queue(RequestTypeId, Date, Status) values (?, datetime('now', 'localtime'), 'W')`;
        db.run(sql, [serv_id], (err, res) => {
            if (err)
                reject(err);
            else{
                db.get(`SELECT MAX(TicketNumber) as 'ticketId' FROM Queue`, [], (err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                });
            }
        });
    });
}

exports.getNWaitingPeople = function (serv_id) {
    return new Promise((resolve, reject) => {  
        const sql = `SELECT COUNT(*) AS 'number' FROM Queue WHERE Status = 'W' AND date(Date) = date('now', 'localtime') AND RequestTypeId = ?`;
        db.get(sql, [serv_id], (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
}

exports.getCounterWeight = function (serv_id) {
    return new Promise((resolve, reject) => {  
        const sql = `SELECT SUM(counterWeight) AS 'weight' FROM (SELECT 1/(cast(COUNT(*) as real)) *
        (SELECT COUNT(*) FROM CounterRequestType WHERE CounterId = C1.CounterId AND RequestTypeId = ?) AS 'counterWeight'
        FROM CounterRequestType C1 
        GROUP BY CounterId)`;
        db.get(sql, [serv_id], (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
}
