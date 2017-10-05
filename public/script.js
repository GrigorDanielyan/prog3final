google.charts.load('45', { packages: ['corechart', 'table', 'geochart'] });

google.charts.setOnLoadCallback(BubbleChart);
google.charts.setOnLoadCallback(Histogram);
google.charts.setOnLoadCallback(drawTable);

function BubbleChart() {
    $.ajax({
        url: "/hotels",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'title');
            data.addColumn('number', 'price');
            data.addColumn('number', 'rating');
            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].title,
                    jsonData[i].price,
                    jsonData[i].rating,
                ]);
            }

            var options = {
                title: 'Correlation between life expectancy, fertility rate ' +
                       'and population of some world countries (2010)',
                hAxis: {title: 'Life Expectancy'},
                vAxis: {title: 'Fertility Rate'},
                bubble: {textStyle: {fontSize: 7.5}}
              };

              var chart = new google.visualization.BubbleChart(document.getElementById('chart_div0'));
              chart.draw(data, options);
        }
    });
}

function Histogram() {
    $.ajax({
        url: "/hotels",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'rating');
            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].rating,
                ]);

            }

            var options = {
                title: 'works',
                colors: ['orange'],
                legend: { position: 'none' },
                hAxis: { title: 'work in salary' },
                vAxis: { minValue: 0, title: 'work in count' },
                histogram: {
                    bucketSize: 0.5,
                    maxNumBuckets: 15
                    // minValue: -1,
                    // maxValue: 1
                }
            };
            //console.log(data.toJSON());
            // Instantiate and draw the chart.
            var chart = new google.visualization.Histogram(document.getElementById('chart_div1'));
            chart.draw(data, options);
        }
    });
};

function drawTable() {
    $.ajax({
        url: "/hotels",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'title');
            data.addColumn('number', 'price');
            data.addColumn('number', 'rating');

            for (var i = 1; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].title,
                    jsonData[i].price,
                    jsonData[i].rating,
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            // var formatter = new google.visualization.BarFormat({ width: 100 });
            // formatter.format(data, 2); // Apply formatter to 3rd column
            table.draw(data, options);
        }
    });
}

$(window).resize(function () {
    BubbleChart();
    Histogram();
    drawTable();
});
