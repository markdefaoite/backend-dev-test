
const random = require('./RandomNumber');

const mysql = require('mysql');

const database = require('./database');

var stringIds =[];

start();

// async function start() {
	// setInterval(async function(){
		// var rows = await database.getSite_powerRows();
		// console.log("2: " +rows[0].rowsCount);
		// var numberOfRows = rows[0].rowsCount;
		
		// var IDs = await database.getId();
		// console.log(IDs[2].id);

		// console.log("3: " + numberOfRows);
		// var x =-1;
		// for(var i =1; i <= numberOfRows; i++){
			// x = await random.randomInt(1, 1000);
			// console.log(x);
			// database.setSite_powerPower(IDs[i -1].id, x);
		// }
		
		// var dsuPower = await database.sumSite_power();
		// console.log(dsuPower);
		// console.log(dsuPower.length);
		// console.log(dsuPower[1].dsu_id);
		
		// for(var i =0; i < dsuPower.length; i++){
			// var result = database.setDsu_powerTotal_Power(dsuPower[i].dsu_id, dsuPower[i].totalPower);
			// stringIds.push(dsuPower[i].dsu_id);
		// }
		// database.setDsu_powerToZero(stringIds.toString());
	// },1000);
	// console.log(stringIds.toString());
// }

async function firstLoop(){
	
	var rows = await database.getSite_powerRows();
	
	var numberOfRows = rows[0].rowsCount;
	var IDs = await database.getId();
	console.log(IDs[2].id);

	
	var x =-1;
	for(var i =1; i <= numberOfRows; i++){
		x = await random.randomInt(1, 1000);
		console.log(x);
		database.setSite_powerPower(IDs[i -1].id, x);
	}

}

async function secondLoop(){
	var dsuPower = await database.sumSite_power();
	console.log(dsuPower);
	console.log(dsuPower.length);
	console.log(dsuPower[1].dsu_id);
	
	for(var i =0; i < dsuPower.length; i++){
		var result = database.setDsu_powerTotal_Power(dsuPower[i].dsu_id, dsuPower[i].totalPower);
		stringIds.push(dsuPower[i].dsu_id);
	}
	database.setDsu_powerToZero(stringIds.toString());

}

async function start(){
	var interval = setInterval(async function(){ 
		var rows = await database.getSite_powerRows();
		
		var numberOfRows = rows[0].rowsCount;
		var IDs = await database.getId();
		console.log(IDs[2].id);

		
		var x =-1;
		for(var i =1; i <= numberOfRows; i++){
			x = await random.randomInt(1, 1000);
			console.log(x);
			database.setSite_powerPower(IDs[i -1].id, x);
		}
	}, 1000);
	var interval = setInterval(async function(){
		var dsuPower = await database.sumSite_power();
		console.log(dsuPower);
		console.log(dsuPower.length);
		console.log(dsuPower[1].dsu_id);
		
		for(var i =0; i < dsuPower.length; i++){
			var result = database.setDsu_powerTotal_Power(dsuPower[i].dsu_id, dsuPower[i].totalPower);
			stringIds.push(dsuPower[i].dsu_id);
		}
		database.setDsu_powerToZero(stringIds.toString());
	}, 1000);
	
	
}