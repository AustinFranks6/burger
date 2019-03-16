var connection = require("../config/connection");

function createQmarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function translateSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

var orm = {
  selectAll: function(table, cb) {
    var dbQuery = "SELECT * FROM " + table + ";";

    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    var dbQuery =
      "INSERT INTO " +
      table +
      " (" +
      cols.toString() +
      ") " +
      "VALUES (" +
      createQmarks(vals.length) +
      ") ";

    console.log(dbQuery);
    connection.query(dbQuery, vals, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  updateOne: function(table, objColVals, condition, cb) {
    var dbQuery =
      "UPDATE " +
      table +
      " SET " +
      translateSql(objColVals) +
      " WHERE " +
      condition;

    console.log(dbQuery);

    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  deleteOne: function(table, condition, cb) {
    var dbQuery = "DELETE FROM " + table + " WHERE " + condition;
    console.log(dbQuery);

    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }
};

  // insert: function(some_tbl, some_col, some_val, cb){
  //   connection.query('INSERT INTO ' + some_tbl + ' ( ' + some_col + ' ) ' + ' VALUES (?)', [some_val], function(err, result){
  //     cb(result);
  //   });
  // },
  // read: function(some_tbl, cb){
  //   connection.query('SELECT *  FROM ' + some_tbl + ';', function(err, result){
  //     cb(result);
  //   });
  // },
  // update: function(some_tbl, some_set_col, some_set_val, some_col_param, some_val_param, cb){
  //   connection.query('UPDATE ' + some_tbl + ' SET ' + some_set_col + ' = ? WHERE ' + some_col_param + ' = ?', [some_set_val, some_val_param], function(err, result){
  //     cb(result);
  //   });
  // },
  // delete: function(some_tbl, some_col, some_val, cb){
  //   connection.query('DELETE FROM ' + some_tbl + ' WHERE ' + some_col + ' = ?',[some_val], function(err, result){
  //     cb(result);
  //   });
  // }}

module.exports = orm;