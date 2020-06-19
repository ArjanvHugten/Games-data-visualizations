$('document').ready(function () {
    var select = document.getElementById('yearSelect');

    for (var i = 2016; i >= 1980; i--) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }
});

Promise.all([
    d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales.csv")
]).then(function (files) {
    var publishers = [];
    var consoles = [];
    var genres = [];

    files[0].forEach(function (d) {
        if (publishers.indexOf(d.Publisher) == -1) {
            publishers.push(d.Publisher);
        }

        if (consoles.indexOf(d.Platform) == -1) {
            consoles.push(d.Platform);
        }
        if (genres.indexOf(d.Genre) == -1) {
            genres.push(d.Genre);
        }
    });

    publishers.sort();
    consoles.sort();
    genres.sort();

    var sel1 = document.getElementById('publisherSelect-opt-group');
    var sel2 = document.getElementById('consoleSelect');
    var sel3 = document.getElementById('genreSelect');

    for (var i = 0; i < publishers.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = publishers[i];
        opt.value = publishers[i];
        sel1.appendChild(opt);
    }

    for (var i = 0; i < consoles.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = consoles[i];
        opt.value = consoles[i];
        sel2.appendChild(opt);
    }

    for (var i = 0; i < genres.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = genres[i];
        opt.value = genres[i];
        sel3.appendChild(opt);
    }

}).catch(function (err) {
    throw err;
})

function updateMap() {

    var myNode = document.getElementById("map");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var width = 1000;
    var height = 700;

    var projection = d3.geoMercator().scale(width / 2 / Math.PI)
        .rotate([-11, 0])
        .translate([(width) / 2, height * 1.35 / 2])
        .precision(.1);

    var path = d3.geoPath().projection(projection);

    var svg = d3.select("#map")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin")
        .attr("width", width)
        .attr("height", height)
        .append("g");

    Promise.all([
        d3.json("http://gamesvisualizations.arjanvanhugten.nl/data/custom.geo.json"),
        d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales.csv"),
    ]).then(function (files) {

        var salesByRegion = {};

        salesByRegion['NA'] = 0;
        salesByRegion['EU'] = 0;
        salesByRegion['JP'] = 0;
        salesByRegion['Other'] = 0;

        var sel1 = $("#publisherSelect").val();
        var sel2 = $("#consoleSelect").val();
        var sel3 = $("#genreSelect").val();
        var sel4 = $("#yearSelect").val();

        files[1].forEach(function (d) {
            if (sel1 != '-1' && sel1 != d.Publisher) {
                return;
            }
            if (sel2 != '-1' && sel2 != d.Platform) {
                return;
            }
            if (sel3 != '-1' && sel3 != d.Genre) {
                return;
            }
            if (sel4 != '-1' && sel4 != d.Year) {
                return;
            }

            salesByRegion['NA'] += parseFloat(d.NA_Sales) || 0;
            salesByRegion['EU'] += parseFloat(d.EU_Sales) || 0;
            salesByRegion['JP'] += parseFloat(d.JP_Sales) || 0;
            salesByRegion['Other'] += parseFloat(d.Other_Sales) || 0;
        });

        var color = d3.scaleQuantile()
            .domain([Math.min(salesByRegion['NA'], salesByRegion['EU'], salesByRegion['JP'], salesByRegion['Other']), Math.max(salesByRegion['NA'], salesByRegion['EU'], salesByRegion['JP'], salesByRegion['Other'])])
            .range(["rgb(219,237,255)", "rgb(198,219,239)", "rgb(107,174,214)", "rgb(20,99,169)", "rgb(9,86,154)", "rgb(3,19,43)"]);

        files[0].features.forEach(function (d) {
            if (d.properties.continent == 'North America') {
                d.sales = salesByRegion['NA'];
            } else if (d.properties.continent == 'Europe' && d.properties.name != 'Russia' && d.properties.name != 'French Guiana') {
                d.sales = salesByRegion['EU'];
            } else if (d.properties.name == 'Japan') {
                d.sales = salesByRegion['JP'];
            } else {
                d.sales = salesByRegion['Other'];
            }
        });

        svg.selectAll("path")
            .data(files[0].features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                return color(d.sales);
            })

        var colorLegend = d3.legendColor()
            .labelFormat(d3.format(".0f"))
            .scale(color)
            .shapePadding(5)
            .shapeWidth(50)
            .shapeHeight(20)
            .labelOffset(12);

        var width = 200;
        var height = 180;

        d3.select("#legend").selectAll("*").remove();

        var svg2 = d3.select("#legend")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin")
            .attr("width", width)
            .attr("height", height);

        svg2.append("g")
            .attr("transform", "translate(0, 0)")
            .call(colorLegend);

    }).catch(function (err) {
        throw err;
    })
}