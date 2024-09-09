const NUM_LINES = 7; 

var data = [
    [23, 45, 67, 34, 89, 12, 56, 78, 91],
    [15, 32, 47, 88, 54, 23, 67, 44, 29],
    [98, 76, 45, 23, 67, 89, 12, 34, 56],
    [11, 22, 33, 44, 55, 66, 77, 88, 99],
    [42, 58, 73, 19, 84, 63, 27, 91, 38]
  ];

var categories = [1991,1992,1993,1994,1995,1996,1997, 1998,1999];

var names = ['sales', 'sales', 'sales', 'sales', 'sales'];

var series = data.map((d, i) => ({
    name: names[i],
    data: d
}));

function setData(arr) {
    data = [];
    categories = [];
    names = [];

    categories = arr[0].slice(2);

    for (let i = 0; i < NUM_LINES; i++) {

        // once we're out of the header row, begin adding data
        if (i > 0) {
            // add first item in each row to names
            names.push(arr[i][0]);

            // add each row of the databucket to "data," excluding the first two columns (they're just labels and totals)
            data.push(arr[i].slice(2));
        }
    }

    console.log("Names: " + names);
    console.log("Data: " + data);
    console.log("Categories: " + categories);


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
        colors: ['#54625d', '#677c75', '#7b978d', '#90b3a7', '#a5d0c1', '#baeddc'],
      }
      
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      
      chart.render();
}

window.createChart = createChart;