var tableButton = document.getElementById('show-table');

tableButton.addEventListener('click', function() {
    document.getElementById('chart').style.display = 'block';

    var options = {
        series: [{
        name: "SageMaker",
        data: [4849,	5029,	4872,	5029,	4560,	4262,	5247,	5931,	9227,	7604,	8252,	7674]
        },
        {
        name: "RDS",
        data: [3024,	3875,	5552,	5340,	4453,	4392,	4881,	4808,	5568,	5826,	5549,	5124]
        },
        {
        name: 'Open Search',
        data: [2602,	2655,	2650,	2721,	2836,	3187,	3315,	3259,	5088,	4121,	4769,	4546]
        }
    ],
        chart: {
        height: 350,
        type: 'line',
        zoom: {
        enabled: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
    },
    title: {
        text: '',
        align: 'center'
    },
    legend: {
        tooltipHoverFormatter: function(val, opts) {
        return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
        }
    },
    markers: {
        size: 0,
        hover: {
        sizeOffset: 6
        }
    },
    xaxis: {
        categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
        '10 Jan', '11 Jan', '12 Jan'
        ],
    },
    tooltip: {
        y: [
        {
            title: {
            formatter: function (val) {
                return val + " ($)"
            }
            }
        },
        {
            title: {
            formatter: function (val) {
                return val + " ($)"
            }
            }
        },
        {
            title: {
            formatter: function (val) {
                return val + " ($)";
            }
            }
        }
        ]
    },
    grid: {
        borderColor: '#f1f1f1',
    }
    };
    
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
});