(function () {
    var margin = {
            top: 20,
            right: 20,
            bottom: 70,
            left: 40
        },
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width], .05);

    var y = d3.scaleLinear().rangeRound([height, 0]);

    var svg = d3.select("#top5publishers")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales.csv").then(function (data) {
        var publishers = {};
        publishers['Nintendo'] = 0;
        publishers['Activision'] = 0;
        publishers['Sony Computer Entertainment'] = 0;
        publishers['Electronic Arts'] = 0;

        data.forEach(function (d) {
            if (d.Publisher == 'Nintendo') {
                publishers['Nintendo'] += parseFloat(d.Global_Sales) || 0
            } else if (d.Publisher == 'Activision') {
                publishers['Activision'] += parseFloat(d.Global_Sales) || 0
            } else if (d.Publisher == 'Sony Computer Entertainment') {
                publishers['Sony Computer Entertainment'] += parseFloat(d.Global_Sales) || 0
            } else if (d.Publisher == 'Electronic Arts') {
                publishers['Electronic Arts'] += parseFloat(d.Global_Sales) || 0
            }
        });

        var data = [];
        data.push({
            publisher: 'Nintendo',
            sales: publishers['Nintendo']
        });
        data.push({
            publisher: 'Activision',
            sales: publishers['Activision']
        });
        data.push({
            publisher: 'Sony Computer Entertainment',
            sales: publishers['Sony Computer Entertainment']
        });
        data.push({
            publisher: 'Electronic Arts',
            sales: publishers['Electronic Arts']
        });

        x.domain(Object.keys(publishers).map(function (d) {
            return d;
        }));
        y.domain([0, d3.max(Object.values(publishers), function (d) {
            return Number(d);
        })]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Total sales in millions");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("fill", "steelblue")
            .attr("class", "bar")
            .attr("x", function (d) {
                return 20 + x(d.publisher);
            })
            .attr("y", function (d) {
                return y(Number(d.sales));
            })
            .attr("width", x.bandwidth() - 40)
            .attr("height", function (d) {
                return height - y(Number(d.sales));
            });
    });
})();

(function () {
    var margin = {
            top: 20,
            right: 20,
            bottom: 70,
            left: 70
        },
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    var x = d3.scaleLinear()
        .range([0, width]);

    d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales.csv").then(function (data) {
        var genresNintedo = {};
        var genresActivision = {};
        var genresSony = {};
        var genresEa = {};

        data.forEach(function (d) {
            if (d.Publisher == 'Nintendo') {
                if (genresNintedo[d.Genre] == null) {
                    genresNintedo[d.Genre] = 0;
                }
                genresNintedo[d.Genre] += parseFloat(d.Global_Sales) || 0
            } else if (d.Publisher == 'Activision') {
                if (genresActivision[d.Genre] == null) {
                    genresActivision[d.Genre] = 0;
                }
                genresActivision[d.Genre] += parseFloat(d.Global_Sales) || 0
            } else if (d.Publisher == 'Sony Computer Entertainment') {
                if (genresSony[d.Genre] == null) {
                    genresSony[d.Genre] = 0;
                }
                genresSony[d.Genre] += parseFloat(d.Global_Sales) || 0
            } else if (d.Publisher == 'Electronic Arts') {
                if (genresEa[d.Genre] == null) {
                    genresEa[d.Genre] = 0;
                }
                genresEa[d.Genre] += parseFloat(d.Global_Sales) || 0
            }
        });

        for (i = 1; i <= 4; i++) {

            var dictonary = null;
            if (i == 1) {
                dictonary = genresNintedo;
                svg3 = d3.select("#svg_top_genres_nintendo");
            } else if (i == 2) {
                dictonary = genresActivision;
                svg3 = d3.select("#svg_top_genres_activision");
            } else if (i == 3) {
                dictonary = genresSony;
                svg3 = d3.select("#svg_top_genres_sony");
            } else {
                dictonary = genresEa;
                svg3 = d3.select("#svg_top_genres_ea");
            }

            var data = [];
            for (var index in dictonary) {
                data.push({
                    genre: index,
                    sales: dictonary[index]
                });
            }

            data.sort((a, b) => (a.sales > b.sales) ? 1 : ((b.sales > a.sales) ? -1 : 0));

            x.domain([0, d3.max(data, function (d) {
                return Number(d.sales);
            })]);
            y.domain(data.map(function (d) {
                return d.genre;
            }));


            var svg = svg3
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            // add the x Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // text label for the x axis
            svg.append("text")
                .attr("transform",
                    "translate(" + (width / 2) + " ," +
                    (height + margin.top + 20) + ")")
                .style("text-anchor", "middle")
                .text("Sales in millions");

            // add the y Axis
            svg.append("g")
                .call(d3.axisLeft(y))

            // append the rectangles for the bar chart
            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("fill", "steelblue")
                .attr("width", function (d) {
                    return x(d.sales);
                })
                .attr("y", function (d) {
                    return y(d.genre);
                })
                .attr("height", y.bandwidth());
        }
    });
})();

(function () {
    var margin = {
            top: 20,
            right: 20,
            bottom: 70,
            left: 70
        },
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    var x = d3.scaleLinear()
        .range([0, width]);

    d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales.csv").then(function (data) {
        var consolesNintedo = {};
        var consolesActivision = {};
        var consolesSony = {};
        var consolesEa = {};

        data.forEach(function (d) {
            if (d.Publisher == 'Nintendo') {
                if (consolesNintedo[d.Platform] == null) {
                    consolesNintedo[d.Platform] = 0;
                }
                consolesNintedo[d.Platform] += parseFloat(d.Global_Sales) || 0
            } else if (d.Publisher == 'Activision') {
                if (consolesActivision[d.Platform] == null) {
                    consolesActivision[d.Platform] = 0;
                }
                consolesActivision[d.Platform] += parseFloat(d.Global_Sales) || 0
            } else if (d.Publisher == 'Sony Computer Entertainment') {
                if (consolesSony[d.Platform] == null) {
                    consolesSony[d.Platform] = 0;
                }
                consolesSony[d.Platform] += parseFloat(d.Global_Sales) || 0
            } else if (d.Publisher == 'Electronic Arts') {
                if (consolesEa[d.Platform] == null) {
                    consolesEa[d.Platform] = 0;
                }
                consolesEa[d.Platform] += parseFloat(d.Global_Sales) || 0
            }
        });

        for (i = 1; i <= 4; i++) {

            var dictonary = null;
            if (i == 1) {
                dictonary = consolesNintedo;
                svg3 = d3.select("#svg_top_consoles_nintendo");
            } else if (i == 2) {
                dictonary = consolesActivision;
                svg3 = d3.select("#svg_top_consoles_activision");
            } else if (i == 3) {
                dictonary = consolesSony;
                svg3 = d3.select("#svg_top_consoles_sony");
            } else {
                dictonary = consolesEa;
                svg3 = d3.select("#svg_top_consoles_ea");
            }

            var data = [];
            for (var index in dictonary) {
                data.push({
                    console: index,
                    sales: dictonary[index]
                });
            }

            data.sort((a, b) => (a.sales > b.sales) ? 1 : ((b.sales > a.sales) ? -1 : 0));

            x.domain([0, d3.max(data, function (d) {
                return Number(d.sales);
            })]);
            y.domain(data.map(function (d) {
                return d.console;
            }));


            var svg = svg3
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            // add the x Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // text label for the x axis
            svg.append("text")
                .attr("transform",
                    "translate(" + (width / 2) + " ," +
                    (height + margin.top + 20) + ")")
                .style("text-anchor", "middle")
                .text("Sales in millions");

            // add the y Axis
            svg.append("g")
                .call(d3.axisLeft(y))

            // append the rectangles for the bar chart
            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("fill", "steelblue")
                .attr("width", function (d) {
                    return x(d.sales);
                })
                .attr("y", function (d) {
                    return y(d.console);
                })
                .attr("height", y.bandwidth());
        }
    });
})();

(function () {
    var margin = {
            top: 20,
            right: 20,
            bottom: 70,
            left: 70
        },
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    var x = d3.scaleLinear()
        .range([0, width]);

    d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales.csv").then(function (data) {
        var releasesNintedo = 0;
        var releasesActivision = 0;
        var releasesSony = 0;
        var releasesEa = 0;

        data.forEach(function (d) {
            if (d.Publisher == 'Nintendo') {
                releasesNintedo++;
            } else if (d.Publisher == 'Activision') {
                releasesActivision++;
            } else if (d.Publisher == 'Sony Computer Entertainment') {
                releasesSony++;
            } else if (d.Publisher == 'Electronic Arts') {
                releasesEa++;
            }
        });

        var data = [];
        data.push({
            publisher: 'Nintendo',
            releases: releasesNintedo
        });
        data.push({
            publisher: 'Activision',
            releases: releasesActivision
        });
        data.push({
            publisher: 'Sony',
            releases: releasesSony
        });
        data.push({
            publisher: 'EA',
            releases: releasesEa
        });

        svg3 = d3.select("#svg_releases");

        x.domain([0, d3.max(data, function (d) {
            return Number(d.releases);
        })]);
        y.domain(data.map(function (d) {
            return d.publisher;
        }));

        var svg = svg3
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // text label for the x axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Sales in millions");

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y))

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("fill", "steelblue")
            .attr("width", function (d) {
                return x(d.releases);
            })
            .attr("y", function (d) {
                return y(d.publisher);
            })
            .attr("height", y.bandwidth());
    });
})();

(function () {
    var margin = {
            top: 20,
            right: 20,
            bottom: 70,
            left: 70
        },
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales.csv").then(function (data) {
        var releasesNintedo = {};
        var releasesActivision = {};
        var releasesSony = {};
        var releasesEa = {};

        data.forEach(function (d) {
            if (d.Year != "N/A") {
                if (d.Publisher == 'Nintendo') {
                    if (releasesNintedo[d.Year] == null) {
                        releasesNintedo[d.Year] = 0;
                    }
                    releasesNintedo[d.Year]++;
                } else if (d.Publisher == 'Activision') {
                    if (releasesActivision[d.Year] == null && d.Year != 'N/A') {
                        releasesActivision[d.Year] = 0;
                    }
                    releasesActivision[d.Year]++;
                } else if (d.Publisher == 'Sony Computer Entertainment') {
                    if (releasesSony[d.Year] == null && d.Year != 'N/A') {
                        releasesSony[d.Year] = 0;
                    }
                    releasesSony[d.Year]++;
                } else if (d.Publisher == 'Electronic Arts') {
                    if (releasesEa[d.Year] == null && d.Year != 'N/A') {
                        releasesEa[d.Year] = 0;
                    }
                    releasesEa[d.Year]++;
                }
            }
        });

        for (i = 1; i <= 4; i++) {
            var dictonary = null;
            var text = "";
            if (i == 1) {
                text = "Releases Nintendo";
                dictonary = releasesNintedo;
                svg3 = d3.select("#svg_trend_nintendo");
            } else if (i == 2) {
                text = "Releases Activision";
                dictonary = releasesActivision;
                svg3 = d3.select("#svg_trend_activision");
            } else if (i == 3) {
                text = "Releases Sony";
                dictonary = releasesSony;
                svg3 = d3.select("#svg_trend_sony");
            } else {
                text = "Releases EA";
                dictonary = releasesEa;
                svg3 = d3.select("#svg_trend_ea");
            }

            var data = [];
            for (var index in dictonary) {
                data.push({
                    year: index,
                    releases: dictonary[index]
                });
            }

            var valueline = d3.line()
                .x(function (d) {
                    return x(new Date(d.year, 0, 1));
                })
                .y(function (d) {
                    return y(d.releases);
                });

            var svg = svg3
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            // Scale the range of the data
            x.domain(d3.extent(data, function (d) {
                return new Date(d.year, 0, 1);
            }));
            y.domain([0, 150]);

            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("d", valueline);

            // add the x Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")));

            // add the y Axis
            svg.append("g")
                .call(d3.axisLeft(y))

            // text label for the y axis
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Releases");

            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .text(text);
        }
    });
})();