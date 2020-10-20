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
