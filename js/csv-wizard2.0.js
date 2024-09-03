(function () {
    // define constants
    var DELIMITER = ',';
    var NEWLINE = '\n';
    var AUTO_FORMAT_DATES = true; 

    // create empty 'bucket' for csv data
    var dataBucket = [];

    // regex to remove quotes from beginning and end of string
    var qRegex = /^"|"$/g;

    // get references to file input and table elements from DOM
    var userFile = document.getElementById('file');
    var table = document.getElementById('table');
    var tableButton = document.getElementById('show-table');

    // if the file is not found, exit the function
    if (!userFile) {
        return; 
    }

    // Add an event listener to handle file selection
    // POTENTIALLY CHANGE THIS TO A BUTTON PRESS EVENT LISTENER????
    userFile.addEventListener('change', function() {
        // if a file is selected, convert the csv file to a nested array and 
        // assign it to dataBucket
        if (!!userFile.files && userFile.files.length > 0) {
            // parseCSV(userFile.files[0]);
            csvWizard(userFile.files[0]);
        }
    });

    // THE COMMANDER OF THE TROOPS
    function csvWizard(file) {
        parseCSV(file);
    }

    // function to turn csv file into an array
    function parseCSV(file) {

        // check if file exists and if FileReader is supported
        if (!file || !FileReader) {
            return; 
        }

        // Create a new FileReader instance
        var reader = new FileReader();

        //Define the onload event handler for the FileReader
        reader.onload = function (e) {
            var data = e.target.result;
            csvToArray(data);
        };

        // Read the content of the file as a text string
        reader.readAsText(file);
    }

    function flipRowsAndColumns(csvData) {
        return csvData[0].map((_, colIndex) =>
            csvData.map(row => row[colIndex])
        );
    }

    // Function to convert CSV text to a nested array
    function csvToArray(text) {
        // If the text or table element is missing, exit function
        if (!text) {
            return;
        }

        // split the csv text into rows using the newline character
        var rows = text.split(NEWLINE);

        rows.forEach(function(row, index) {
            rows[index] = row.split(DELIMITER);
        });
        
        dataBucket = formatArray(rows); 
        // return rows; 
    }

    // Call the showTable function when the button is clicked
    tableButton.addEventListener('click', function() {
        showTable(dataBucket); 
    });

    function showTable(dataBucket) {
        //Check if the checkbox with id="checkbox" is checked
        var isChecked = document.getElementById("checkbox").checked;

        console.log("checkbox status:" + isChecked);

        dataBucket = isChecked ? flipRowsAndColumns(dataBucket) : dataBucket;

        // Get the table element by its ID
        var table = document.getElementById('table');
    
        // Clear any existing rows in the table (optional)
        table.innerHTML = '';


        var firstRow = dataBucket[0];

        var row = document.createElement('tr');

        firstRow.forEach(function(cellData) {
            cell = document.createElement('th');

            cell.textContent = cellData;
            row.appendChild(cell);
        });

        table.appendChild(row);

        var remainingRows = dataBucket;
        remainingRows.shift();
    
        // Iterate through the nested array (dataBucket)
        remainingRows.forEach(function(rowData) {
            // Create a new row element
            var row = document.createElement('tr');
            
            // Iterate through each item in the rowData array
            rowData.forEach(function(cellData) {
 
                cell = document.createElement('td');
                
                // Set the cell's text content to the current item
                cell.textContent = cellData;
                
                // Append the cell to the row
                row.appendChild(cell);
            });
    
            // Append the row to the table
            table.appendChild(row);
        });
    }

    function formatArray(arr) {
        // Copy the array to avoid mutating the original array
        let result = arr.map(row => row.slice());
    
        result.forEach(function(row) {
            row.forEach(function(cell, index, array) {
                if (isDate(cell)) {
                    var result = cell.replace(/['"]/g, '').trim();

                    if (AUTO_FORMAT_DATES) {
                        array[index] = result.slice(0, -3);
                    }
                    else {
                        array[index] = result;
                    }
                }
                else {
                    // Remove quotes and trim whitespace
                    let cleanedCell = (cell || '').toString().replace(/['"]/g, '').trim();
        
                    // Check if the cell is empty or null after cleaning
                    if (cleanedCell === '' || cleanedCell == null) {
                        array[index] = '0';
                    } else {
                        // Parse the cleaned cell as a float and round if necessary
                        let num = parseFloat(cleanedCell);
                        if (!isNaN(num)) {
                            array[index] = Math.round(num).toString();
                        } else {
                            array[index] = cleanedCell; // If not a number, keep the cleaned value
                        }
                    }
                }
            });
        });
        return result;
    }

    function isDate(cell) {
        if (cell.includes('-') || cell.includes('–')) {
            return true; 
        }
        return false; 
    }
})();