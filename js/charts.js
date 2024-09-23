const NUM_LINES = 5; 

var data = [];

var categories = [];

var names = [];

var series = data.map((d, i) => ({
    name: names[i],
    data: d
}));

function setData(arr) {
    data = [];
    categories = [];
    names = [];

    let otherRow = new Array(categories.length).fill(0);

    categories = arr[0].slice(2);

    for (let i = 0; i < arr.length-1; i++) {

        // once we're out of the header row, begin adding data
        if (i > 0 && i < NUM_LINES) {
            // add first item in each row to names
            names.push(arr[i][0]);

            // add each row of the databucket to "data," excluding the first two columns (they're just labels and totals)
            data.push(arr[i].slice(2));
        }
        if (i >= NUM_LINES) {
            // iterate through each column
            for (let j = 0; j < categories.length; j++) {
                otherRow[j] = (otherRow[j] || 0) + Number(arr[i][j+2]);
            }
        }
    }
    data.push(otherRow);
    names.push('other');

    series = data.map((d, i) => ({
        name: names[i],
        data: d
    }));
}

function createChart(arr) {
    console.log(arr);

    // set values, categories, names, and series
    setData(arr);
    
    var options = {
        chart: {
          type: 'line'
        },
        series: series,
        xaxis: {
          categories: categories
        },
        // colors: ['#54625d', '#677c75', '#7b978d', '#90b3a7', '#a5d0c1', '#baeddc'],
      }
      
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      
      chart.render();
}

window.createChart = createChart;