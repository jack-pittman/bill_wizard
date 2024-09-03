(function () {
    // Define constants for the CSV delimiter and newline character
    var DELIMITER = ',';
    var NEWLINE = '\n';

    // Regex to remove quotes from the beginning and end of a string
    var qRegex = /^"|"$/g;

    // Get references to the file input and table elements from the DOM
    var i = document.getElementById('file');
    var table = document.getElementById('table');

    // If the file input element is not found, exit the function
    if (!i) {
        return;
    }

    // Add an event listener to handle file selection
    i.addEventListener('change', function () {
        // If a file is selected, parse the CSV file
        if (!!i.files && i.files.length > 0) {
            parseCSV(i.files[0]);
        }
    });

    // Function to parse the selected CSV file
    function parseCSV(file) {
        // Check if the file exists and if FileReader is supported
        if (!file || !FileReader) {
            return;
        }
    
        // Create a new FileReader instance
        var reader = new FileReader();
    
        // Define the onload event handler for the FileReader
        reader.onload = function (e) {
            var data = e.target.result;
    
            // Check if the checkbox with id="checkbox" is checked
            var isChecked = document.getElementById("checkbox").checked;
    
            // If the checkbox is checked, flip the rows and columns
            var processedData = isChecked ? flipRowsAndColumns(data) : data;
    
            // Convert the data to a table
            toTable(processedData);
        };
    
        // Read the content of the file as a text string
        reader.readAsText(file);
    }

    function flipRowsAndColumns(csvData) {
        // Split the CSV data into rows
        var rows = csvData.split('\n');
    
        // Split each row into columns and store in a 2D array
        var matrix = rows.map(function(row) {
            return row.split(',');
        });
    
        // Transpose the matrix (flip rows and columns)
        var transposedMatrix = matrix[0].map((col, i) => matrix.map(row => row[i]));
    
        // Convert the transposed matrix back into CSV format
        var flippedCSV = transposedMatrix.map(function(row) {
            return row.join(',');
        }).join('\n');
    
        return flippedCSV;
    }
    

    // Function to convert CSV text to an HTML table
    function toTable(text) {
        // If the text or table element is missing, exit the function
        if (!text || !table) {
            return;
        }

        // Clear any existing rows in the table
        while (!!table.lastElementChild) {
            table.removeChild(table.lastElementChild);
        }

        // Split the CSV text into rows using the newline character
        var rows = text.split(NEWLINE);

        // Extract and process the header row
        var headers = rows.shift().trim().split(DELIMITER);
        var htr = document.createElement('tr'); // Create a table row for headers

        // Create and append header cells to the header row
        headers.forEach(function (h) {
            var th = document.createElement('th');
            var ht = h.trim();

            if (!ht) {
                return;
            }

            // Remove any surrounding quotes and set the cell text
            th.textContent = ht.replace(qRegex, '');
            htr.appendChild(th);
        });

        // Append the header row to the table
        table.appendChild(htr);

        var rtr;

        // Function to format numbers as whole numbers
        function formatNumber(value) {
            var number = parseFloat(value);
            // console.log(value)
            // console.log(isNaN(number) ? value : Math.round(number))
            return isNaN(number) ? value : Math.round(number);
        }

        // Process each row of the CSV
        rows.forEach(function (r) {
            r = r.trim();

            // Skip empty rows
            if (!r) {
                return;
            }

            // Split the row into columns based on the delimiter
            var cols = r.split(DELIMITER);

            // Skip rows with no columns
            if (cols.length === 0) {
                return;
            }

            // Create a new table row for the data
            rtr = document.createElement('tr');

            // Create and append data cells to the row
            cols.forEach(function (c) {
                var td = document.createElement('td');
                var tc = c.trim();

                // Remove any surrounding quotes and set the cell text
                td.textContent = formatNumber(tc.replace(qRegex, ''));
                rtr.appendChild(td);
            });

            // Append the data row to the table
            table.appendChild(rtr);
        });
    }
})();
