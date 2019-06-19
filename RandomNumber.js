
// returns a random number in the range between min and max
async function randomInt(min, max) {
	
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports.randomInt = randomInt;