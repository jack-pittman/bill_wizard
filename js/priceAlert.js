(function () {
    //assign ID's to cells to mark price increases. (#light-red for 100 < x < 500, 
    // #medium-red for 500 < x < 1000, #dark-red for 1000+)

    const ISACTIVE = true; 

    if (!ISACTIVE) {
        return;
    }

    const SMALL = 100; 
    const MEDIUM = 500; 
    const LARGE = 1000; 

    var table = document.getElementById('table');

    function priceAlert() {
        // iterate through each row in table
        // for each cell in row, compare their float value with the float value of the previous cell, if possible. 
        // if difference is greater than 100, set id of cell to small-increase
        setCellIDs();
    }

    function setCellIDs(){

        for (var i = 0; i < table.rows.length; i++) {
            var row = table.rows[i];

            // console.log('row '+ i+' has been accounted for!');
            for (var j = 0; j < row.cells.length; j++) {

                if (j > 0) {
                    var cell = row.cells[j];
                    var prevCell = row.cells[j-1];
                    formatCell(cell, prevCell);
                }
            }
        }
    }

    function formatCell(cell, prevCell) {
        // console.log(cell.textContent.trim() + parseFloat(cell.textContent.trim()));

        cellValue = parseFloat(cell.textContent.trim())
        prevCellValue = parseFloat(prevCell.textContent.trim())

        if (!isNaN(cellValue) && !isNaN(prevCellValue)) {
            console.log('cell value:' + cellValue);
            console.log('prev cell value:' + prevCellValue);

            if (cellValue - prevCellValue > 100) {
                // Set the id of the cell
                cell.id = 'small-increase';  
            }
            if (cellValue - prevCellValue > 500) {
                // Set the id of the cell
                cell.id = 'medium-increase';  
            }
            if (cellValue - prevCellValue > 1000) {
                // Set the id of the cell
                cell.id = 'large-increase';  
            }
        }
    }

    // Export priceAlert() globally. Fly, little bird! 
    window.priceAlert = priceAlert; 
})();