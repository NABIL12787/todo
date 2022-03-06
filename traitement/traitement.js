var args = require('../presentation/app.js');
const fs = require('fs');


const InfoFunction = () => {
	const UsageText = `
Usage :-
$ node index.js add "todo item"    # Add a new todo
$ node index.js ls			       # Show remaining todos
$ node index.js del NUMBER	       # Delete a todo
$ node index.js done NUMBER	       # Complete a todo
$ node index.js help		       # Show usage
`;

	console.log(UsageText);
};


const listFunction = () => {

	// Create a empty array
	let data = [];

	// Read from data.csv and convert it into a string
	const fileData = fs.readFileSync('../donnees/data.csv').toString();

	// Split the string and store into array
	data = fileData.split('\n');

	// Filter the string for any empty lines in the file
	let filterData = data.filter(function(value) {
		return value !== '';
	});

	if (filterData.length === 0) {
		console.log('There are no pending todos!');
	}
	for (let i = 0; i < filterData.length; i++) {
		console.log((filterData.length - i) + '. ' +
			filterData[i]);
	}
};

const addFunction = () => {

	// New todo string argument is stored
	const newTask = args.args[3];

	// If argument is passed
	if (newTask) {

		// create a empty array
		let data = [];

		// Read the data from file data.csv and
		// convert it in string
		const fileData = fs.readFileSync('../donnees/data.csv').toString();

		// New task is added to previous data
		fs.writeFile( '../donnees/data.csv',newTask + '\n' + fileData,

			function(err) {

				// Handle if there is any error
				if (err) throw err;

				// Logs the new task added
				console.log('Added todo: "' + newTask + '"');
			},
		);
	} else {

		// If argument was no passed
		console.log('Error: Missing todo string.' +
			' Nothing added!');
	}
};

const deleteFunction = () => {

	// Store which index is passed
	const deleteIndex = args.args[3];

	// If index is passed
	if (deleteIndex) {

		// Create a empty array
		let data = [];

		// Read the data from file and convert
		// it into string
		const fileData = fs.readFileSync('../donnees/data.csv').toString();

		data = fileData.split('\n');
		let filterData = data.filter(function(value) {

			// Filter the data for any empty lines
			return value !== '';
		});

		// If delete index is greater than no. of task
		// or less than zero
		if (deleteIndex > filterData.length || deleteIndex <= 0) {
			console.log(
				'Error: todo #' + deleteIndex +
				' does not exist. Nothing deleted.',
			);

		} else {
			
			// Remove the task
			filterData.splice(filterData.length - deleteIndex, 1);
			
			// Join the array to form a string
			const newData = filterData.join('\n');
			
			// Write the new data back in file
			fs.writeFile( '../donnees/data.csv',
				newData,
				function(err) {
					if (err) throw err;

					// Logs the deleted index
					console.log('Deleted todo #' + deleteIndex);
				},
			);
		}
	} else {

		// Index argument was no passed
		console.log('Error: Missing NUMBER for deleting todo.');
	}
};

const doneFunction = () => {
      
    // Store the index passed as argument
    const doneIndex = args.args[3];
      
    // If argument is passed
    if (doneIndex) {
          
        // Empty array
        let data = [];
          
        // Create a new date object
        let dateobj = new Date();
          
        // Convert it to string and slice only the
        //  date part, removing the time part
        let dateString = dateobj.toISOString()
                    .substring(0, 10);
          
        // Read the data from todo.txt
        const fileData = fs.readFileSync('../donnees/data.csv').toString();
          
        // Read the data from done.txt
        const doneData = fs
            .readFileSync('../donnees/done.csv').toString();
          
        // Split the todo.txt data
        data = fileData.split('\n');
          
        // Filter for any empty lines
        let filterData = data.filter(function(value) {
            return value !== '';
        });
          
        // If done index is greater than
        // no. of task or <=0
        if (doneIndex > filterData.length || doneIndex <= 0) {
            console.log('Error: todo #' + doneIndex 
                    + ' does not exist.');
              
        } else {
              
            // Delete the task from todo.txt data
            // and store it
            const deleted = filterData.splice(filterData.length - doneIndex, 1);
              
            // Join the array to create a string
            const newData = filterData.join('\n');
              
            // Write back the data in todo.txt
            fs.writeFile('../donnees/data.csv',
                newData,
                  
                function(err) {
                    if (err) throw err;
                },
            );
            fs.writeFile(
  
                // Write the stored task in done.txt
                // along with date string
                 '../donnees/done.csv',
                'x ' + dateString + ' ' + deleted 
                                + '\n' + doneData,
                function(err) {
                    if (err) throw err;
                    console.log('Marked todo #' 
                        + doneIndex + ' as done.');
                },
            );
        }
    } else {
        // If argument was not passed
        console.log('Error: Missing NUMBER for '
                +  'marking todo as done.');
    }
};


module.exports.InfoFunction = InfoFunction;
module.exports.addFunction = addFunction;
module.exports.listFunction = listFunction;
module.exports.deleteFunction = deleteFunction;
module.exports.doneFunction = doneFunction;
