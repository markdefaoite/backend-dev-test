
const random = require('./RandomNumber');
const mysql = require('mysql');
const database = require('./database');


/** Back End Development Challenge**/


start();

async function start(){
	
// A loop which generates a random power value between 0 and 1000 for each site and updates the
// power value and time_sent value in the site_power table. This loop should run once a second

	var interval = setInterval(async function(){ 
		
		// get the number of entries in the site_power table 
		var result = await database.getSite_powerRows();		
		var numberOfRows = result[0].rowsCount;
		
		// get all id in site_power
		var IDs = await database.getSite_powerId();
				
		var power = 0;
		for(var i =1; i <= numberOfRows; i++){
			power = await random.randomInt(1, 1000);			
			database.setSite_powerPower(IDs[i -1].id, power);
		}
	}, 1000);
	

// Another loop which get the contents of the site_power table and aggregates the power by dsu_id and
// inserts the total power by DSU into the dsu_power table. This loop should run once a second.
	
	var interval = setInterval(async function(){
		//get total power of each dsu_id from site_power
		var dsuPower = await database.sumSite_power();
		
		var stringIds =[];
		
		for(var i =0; i < dsuPower.length; i++){
			var result = database.setDsu_powerTotal_Power(dsuPower[i].dsu_id, dsuPower[i].totalPower);
			stringIds.push(dsuPower[i].dsu_id);
		}
		database.setDsu_powerToZero(stringIds.toString());
	}, 1000);	
}







