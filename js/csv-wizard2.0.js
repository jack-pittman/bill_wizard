// USE GRID.JS? 
// https://gridjs.io/

(function () {

    // define constants
    var DELIMITER = ',';
    var NEWLINE = '\n';
    var AUTO_FORMAT_DATES = true; 

    const LOOKUP_TABLE = lookupTable;

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
    // EVENT LISTENERS • EVENT LISTENERS • EVENT LISTENERS • EVENT LISTENERS • EVENT LISTENERS • EVENT LISTENERS • EVENT LISTENERS • 

    // Add an event listener to handle file selection
    userFile.addEventListener('change', function() {
        // if a file is selected, convert the csv file to a nested array and 
        // assign it to dataBucket
        if (!!userFile.files && userFile.files.length > 0) {
            // parseCSV(userFile.files[0]);
            csvWizard(userFile.files[0]);
        }
    });

    // Call the showTable function when the button is clicked
    tableButton.addEventListener('click', function() {
        if (!(userFile.files && userFile.files.length > 0)) {
            alert("no file uploaded. please upload a file!");
        }
        else {
            showTable(addTagColumn(dataBucket)); // maybe call an "addTagColumn()"" function which, using a lookup table
            // showGraph();
            setTitles();
            // call price alert (from separate file ) <––––––––––––––––––––––––––––––––––––––––––––––––– from priceAlert.js
            priceAlert();
            createChart(flipRowsAndColumns(dataBucket));
        }
    });

    // FUNCTIONS • FUNCTIONS • FUNCTIONS • FUNCTIONS • FUNCTIONS • FUNCTIONS • FUNCTIONS • FUNCTIONS • FUNCTIONS • FUNCTIONS • FUNCTIONS • 

    function setTitles() {
        var fileInput = document.getElementById('file');
        var tableTitle = document.getElementById('table-title');
        var graphTitle = document.getElementById('graph-title');

        var fileName; 

        if (fileInput.files.length > 0) {
            // Get the first file object from the files array
            var file = fileInput.files[0];
            
            // Get the file name
            fileName = file.name;
        }
        graphTitle.textContent = "GRAPH (" + fileName +")"; 
        tableTitle.textContent = "TABLE (" + fileName +")";  
    }

    // THE CSV Commander
    function csvWizard(file) {
        parseCSV(file);

        // take dataBucket (which is the array we used to populate table) and send it to a 
        // function in charts.js that converts the array to valuable chart data
        arrayToChart();
    }

    // EVENTUALLY I WANT THIS FUNCTION TO BE IN THE CHARTS.JS FILE
    function arrayToChart() {
        console.log('Converting parsed csv into a fancy cool graph');
    }

    function showGraph() {
        var graph = document.getElementById('chart');
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

    function showTable(dataBucket) {
        //Check if the checkbox with id="checkbox" is checked
        var isChecked = document.getElementById("checkbox").checked;
        console.log("checkbox status:" + isChecked);

        dataBucket = isChecked ? flipRowsAndColumns(dataBucket) : dataBucket;

        // Get the table element by its ID
        // var table = document.getElementById('table');
        var thead = document.getElementById('thead');
        var tbody = document.getElementById('tbody');
        var tfoot = document.getElementById('tfoot');

        // Clear any existing rows in the table (optional)
        thead.innerHTML = '';
        tbody.innerHTML = '';
        tfoot.innerHTML = '';


        var firstRow = dataBucket[0];
        var row = document.createElement('tr');
    
        firstRow.forEach(function(cellData) {
            cell = document.createElement('th');

            cell.textContent = cellData;
            row.appendChild(cell);
        });
        
        var remainingRows = dataBucket;
        var lastRow = remainingRows.pop();
        var footerRow = document.createElement('tr');

        lastRow.forEach(function(cellData) {
            cell = document.createElement('td');

            cell.textContent = cellData;
            footerRow.appendChild(cell);
        });

        remainingRows.shift();

        // console.log("Last Row: " + lastRow)

        thead.appendChild(row);
        tfoot.appendChild(footerRow);
    
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
            tbody.appendChild(row);
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

    function addTagColumn(arr) {
        var result = arr; 
        
        // using LOOKUP_TABLE, append the correct tag to the end of each row. 

        return result;
    }
})();