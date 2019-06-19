const mysql = require('mysql'); 

const util = require('util');


//establish connection pool
const pool = mysql.createPool({
  connectionLimit : 10, // default:10
  host     : "localhost",
  user     : "root",
  password : "",
  database : "test"
})

// check for general connection errors
pool.getConnection((err, connection) => {
if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
    }
}

if (connection) connection.release()

 return
 })

// Abstract query to general promise
 pool.query = util.promisify(pool.query)


 //returns the number of entries in site_power table 
 async function getSite_powerRows() {
	var _sql_rest_url = "SELECT COUNT(*) AS rowsCount FROM site_power;";
    var rows = await this.query(_sql_rest_url);
	return rows;
}

//returns the number of entries in dsu_power table
 async function getDsu_powerRows() {
	var _sql_rest_url = "SELECT COUNT(*) AS rowsCount FROM dsu_power;";
    var rows = await this.query(_sql_rest_url);
	return rows;
}

//returns all ids from site_power
 async function getSite_powerId() {
	var _sql_rest_url = "SELECT id FROM site_power;";
    var result = await this.query(_sql_rest_url);
	return result;
}

//sums and returns the power of each dsu_id in site_power
 async function sumSite_power() {
	var _sql_rest_url = "SELECT dsu_id, SUM(power) AS totalPower FROM site_power GROUP BY dsu_id;";
    var result = await this.query(_sql_rest_url);
	return result;
}

//set power for a corresponding id in site_power
async function setSite_powerPower(id, power) {
	var _sql_rest_url = "UPDATE site_power SET power = " + power + ", time_sent = NOW() WHERE id = "+ id + ";";
	var result = await this.query(_sql_rest_url);
	return result;
}

//sets total_power for a corresponding dsu_id
async function setDsu_powerTotal_Power(id, power) {
	var _sql_rest_url = "UPDATE dsu_power SET total_power = " + power + ", time_aggregated = NOW() WHERE dsu_id = "+ id + ";";
	var result = await this.query(_sql_rest_url);
	return result;
}

//takes an array of dsu_ids and sets their total_power to zero
async function setDsu_powerToZero(stringIds){
	var _sql_rest_url = "UPDATE dsu_power SET total_power = 0,  time_aggregated = NOW() WHERE dsu_id NOT IN (" + stringIds + ");";
	var result = await this.query(_sql_rest_url);
	return result;
	
}

//functions and objects to be exported
module.exports = pool;
module.exports.getSite_powerRows = getSite_powerRows;
module.exports.getDsu_powerRows = getDsu_powerRows;
module.exports.setSite_powerPower = setSite_powerPower;
module.exports.setDsu_powerTotal_Power =setDsu_powerTotal_Power;
module.exports.getSite_powerId = getSite_powerId;
module.exports.sumSite_power = sumSite_power;
module.exports.setDsu_powerToZero = setDsu_powerToZero;