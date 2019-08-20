(function () {
  // Top 5 consoles.
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

  var svg = d3.select("#top5consoles")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales.csv").then(function (data) {
    var consoles = {};
    consoles['PS2'] = 0;
    consoles['PS3'] = 0;
    consoles['Wii'] = 0;
    consoles['DS'] = 0;
    consoles['XBOX360'] = 0;

    data.forEach(function (d) {
      if (d.Platform == 'PS2') {
        consoles['PS2'] += parseFloat(d.Global_Sales) || 0
      } else if (d.Platform == 'PS3') {
        consoles['PS3'] += parseFloat(d.Global_Sales) || 0
      } else if (d.Platform == 'Wii') {
        consoles['Wii'] += parseFloat(d.Global_Sales) || 0
      } else if (d.Platform == 'DS') {
        consoles['DS'] += parseFloat(d.Global_Sales) || 0
      } else if (d.Platform == 'X360') {
        consoles['XBOX360'] += parseFloat(d.Global_Sales) || 0
      }
    });

    var data = [];
    data.push({
      console: 'PS2',
      sales: consoles['PS2']
    });
    data.push({
      console: 'PS3',
      sales: consoles['PS3']
    });
    data.push({
      console: 'Wii',
      sales: consoles['Wii']
    });
    data.push({
      console: 'DS',
      sales: consoles['DS']
    });
    data.push({
      console: 'XBOX360',
      sales: consoles['XBOX360']
    });

    x.domain(Object.keys(consoles).map(function (d) {
      return d;
    }));
    y.domain([0, d3.max(Object.values(consoles), function (d) {
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
        return 20 + x(d.console);
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
  // Top genres for each console.
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
    var genresPs2 = {};
    var genresPs3 = {};
    var genresWii = {};
    var genresDs = {};
    var genresXbox360 = {};

    data.forEach(function (d) {
      if (d.Platform == 'PS2') {
        if (genresPs2[d.Genre] == null) {
          genresPs2[d.Genre] = 0;
        }
        genresPs2[d.Genre] += parseFloat(d.Global_Sales) || 0
      } else if (d.Platform == 'PS3') {
        if (genresPs3[d.Genre] == null) {
          genresPs3[d.Genre] = 0;
        }
        genresPs3[d.Genre] += parseFloat(d.Global_Sales) || 0
      } else if (d.Platform == 'Wii') {
        if (genresWii[d.Genre] == null) {
          genresWii[d.Genre] = 0;
        }
        genresWii[d.Genre] += parseFloat(d.Global_Sales) || 0
      } else if (d.Platform == 'X360') {
        if (genresXbox360[d.Genre] == null) {
          genresXbox360[d.Genre] = 0;
        }
        genresXbox360[d.Genre] += parseFloat(d.Global_Sales) || 0
      } else if (d.Platform == 'DS') {
        if (genresDs[d.Genre] == null) {
          genresDs[d.Genre] = 0;
        }
        genresDs[d.Genre] += parseFloat(d.Global_Sales) || 0
      }
    });

    for (i = 1; i <= 5; i++) {

      var dictonary = null;
      if (i == 1) {
        dictonary = genresPs2;
        svg3 = d3.select("#svg_top_genres_ps2");
      } else if (i == 2) {
        dictonary = genresPs3;
        svg3 = d3.select("#svg_top_genres_ps3");
      } else if (i == 3) {
        dictonary = genresWii;
        svg3 = d3.select("#svg_top_genres_wii");
      } else if (i == 4) {
        dictonary = genresXbox360;
        svg3 = d3.select("#svg_top_genres_xbox360");
      } else {
        dictonary = genresDs;
        svg3 = d3.select("#svg_top_genres_ds");
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
  // Top publishers for each console.
  var margin = {
      top: 20,
      right: 20,
      bottom: 70,
      left: 150
    },
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  var y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1);

  var x = d3.scaleLinear()
    .range([0, width]);

  d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales.csv").then(function (data) {
    var publishersPS2 = {};
    var publishersPS3 = {};
    var publishersXbox360 = {};
    var publishersWii = {};
    var publishersDs = {};

    data.forEach(function (d) {
      if (d.Platform == 'PS2') {
        if (publishersPS2[d.Publisher] == null) {
          publishersPS2[d.Publisher] = 0;
        }
        publishersPS2[d.Publisher] += parseFloat(d.Global_Sales) || 0
      } else if (d.Platform == 'PS3') {
        if (publishersPS3[d.Publisher] == null) {
          publishersPS3[d.Publisher] = 0;
        }
        publishersPS3[d.Publisher] += parseFloat(d.Global_Sales) || 0
      } else if (d.Platform == 'X360') {
        if (publishersXbox360[d.Publisher] == null) {
          publishersXbox360[d.Publisher] = 0;
        }
        publishersXbox360[d.Publisher] += parseFloat(d.Global_Sales) || 0
      } else if (d.Platform == 'Wii') {
        if (publishersWii[d.Publisher] == null) {
          publishersWii[d.Publisher] = 0;
        }
        publishersWii[d.Publisher] += parseFloat(d.Global_Sales) || 0
      } else if (d.Platform == 'DS') {
        if (publishersDs[d.Publisher] == null) {
          publishersDs[d.Publisher] = 0;
        }
        publishersDs[d.Publisher] += parseFloat(d.Global_Sales) || 0
      }
    });

    for (i = 1; i <= 5; i++) {

      var dictonary = null;
      if (i == 1) {
        dictonary = publishersPS2;
        svg3 = d3.select("#svg_top_publishers_ps2");
      } else if (i == 2) {
        dictonary = publishersPS3;
        svg3 = d3.select("#svg_top_publishers_ps3");
      } else if (i == 3) {
        dictonary = publishersWii;
        svg3 = d3.select("#svg_top_publishers_wii");
      } else if (i == 4) {
        dictonary = publishersXbox360;
        svg3 = d3.select("#svg_top_publishers_xbox360");
      } else {
        dictonary = publishersDs;
        svg3 = d3.select("#svg_top_publishers_ds");
      }

      var data = [];
      for (var index in dictonary) {
        data.push({
          publisher: index,
          sales: dictonary[index]
        });
      }

      data.sort((a, b) => (a.sales > b.sales) ? 1 : ((b.sales > a.sales) ? -1 : 0));
      data = data.slice(-10);

      x.domain([0, d3.max(data, function (d) {
        return Number(d.sales);
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
          return x(d.sales);
        })
        .attr("y", function (d) {
          return y(d.publisher);
        })
        .attr("height", y.bandwidth());
    }
  });
})();

(function () {
  // Releases for each console.
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
    var releasesPs2 = 0;
    var releasesPs3 = 0;
    var releasesXbox360 = 0;
    var releasesWii = 0;
    var releasesDS = 0;

    data.forEach(function (d) {
      if (d.Platform == 'PS2') {
        releasesPs2++;
      } else if (d.Platform == 'PS3') {
        releasesPs3++;
      } else if (d.Platform == 'X360') {
        releasesXbox360++;
      } else if (d.Platform == 'Wii') {
        releasesWii++;
      } else if (d.Platform == 'DS') {
        releasesDS++;
      }
    });

    var data = [];
    data.push({
      console: 'PS2',
      releases: releasesPs2
    });
    data.push({
      console: 'PS3',
      releases: releasesPs3
    });
    data.push({
      console: 'XBOX360',
      releases: releasesXbox360
    });
    data.push({
      console: 'Wii',
      releases: releasesWii
    });
    data.push({
      console: 'DS',
      releases: releasesDS
    });

    svg3 = d3.select("#svg_releases");

    x.domain([0, d3.max(data, function (d) {
      return Number(d.releases);
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
        return x(d.releases);
      })
      .attr("y", function (d) {
        return y(d.console);
      })
      .attr("height", y.bandwidth());
  });
})();

(function () {
  // Releases trends for each console.
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
    var releasesPs2 = {};
    var releasesPs3 = {};
    var releasesXbox360 = {};
    var releasesWii = {};
    var releasesDS = {};

    data.forEach(function (d) {
      if (d.Year != "N/A") {
        if (d.Platform == 'PS2') {
          if (releasesPs2[d.Year] == null) {
            releasesPs2[d.Year] = 0;
          }
          releasesPs2[d.Year]++;
        } else if (d.Platform == 'PS3') {
          if (releasesPs3[d.Year] == null && d.Year != 'N/A') {
            releasesPs3[d.Year] = 0;
          }
          releasesPs3[d.Year]++;
        } else if (d.Platform == 'X360') {
          if (releasesXbox360[d.Year] == null && d.Year != 'N/A') {
            releasesXbox360[d.Year] = 0;
          }
          releasesXbox360[d.Year]++;
        } else if (d.Platform == 'Wii') {
          if (releasesWii[d.Year] == null && d.Year != 'N/A') {
            releasesWii[d.Year] = 0;
          }
          releasesWii[d.Year]++;
        } else if (d.Platform == 'DS' && d.Year != '1985' && d.Year != '2020') {
          if (releasesDS[d.Year] == null) {
            releasesDS[d.Year] = 0;
          }
          releasesDS[d.Year]++;
        }
      }
    });

    for (i = 1; i <= 5; i++) {
      var dictonary = null;
      var text = "";
      if (i == 1) {
        text = "Releases PS2";
        dictonary = releasesPs2;
        svg3 = d3.select("#svg_trend_ps2");
      } else if (i == 2) {
        text = "Releases PS3";
        dictonary = releasesPs3;
        svg3 = d3.select("#svg_trend_ps3");
      } else if (i == 3) {
        text = "Releases XBOX360";
        dictonary = releasesXbox360;
        svg3 = d3.select("#svg_trend_xbox360");
      } else if (i == 4) {
        text = "Releases Wii";
        dictonary = releasesWii;
        svg3 = d3.select("#svg_trend_wii");
      } else {
        text = "Releases DS";
        dictonary = releasesDS;
        svg3 = d3.select("#svg_trend_ds");
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
      y.domain([0, 600]);

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