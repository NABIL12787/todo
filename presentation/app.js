var fct = require('../traitement/traitement.js');
const fs = require('fs');

const args = process.argv;
module.exports.args = args; 


if (fs.existsSync('../donnees/data.csv') === false) {
	let createStream = fs.createWriteStream('../donnees/data.csv');
	createStream.end();
}
if (fs.existsSync('../donnees/done.csv') === false) {
	let createStream = fs.createWriteStream('../donnees/done.csv');
	createStream.end();
}


switch (args[2]) {
	case 'add':
		{
			fct.addFunction();
			break;
		}

	case 'ls':
		{
			fct.listFunction();
			break;
		}

	case 'del':
		{
			fct.deleteFunction();
			break;
		}

	case 'done':
		{
			fct.doneFunction();
			break;
		}

	case 'help':
		{
			fct.InfoFunction();
			break;
		}



	default:
		{
			fct.InfoFunction();
			// We will display help when no
			// argument is passed or invalid
			// argument is passed
		}
}
