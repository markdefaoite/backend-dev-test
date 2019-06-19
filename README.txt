
Mark White
markdefaoite@hotmail.com
(086)2081899

Back End Development Challenge

To run this app you will first need to specify the database you are connecting to.
In database.js you will find:

	//establish connection pool
	const pool = mysql.createPool({
	  connectionLimit : 10, // default:10
	  host     : "localhost",
	  user     : "root",
	  password : "",
	  database : "test"
	})

This needs to be changed to match your database.

after changing this, the app can be run from the command line. 