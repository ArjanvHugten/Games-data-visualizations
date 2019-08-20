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

  var svg = d3.select("#top5genres")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales.csv").then(function (data) {
    var genres = {};
    genres['Action'] = 0;
    genres['Sports'] = 0;
    genres['Shooter'] = 0;
    genres['Role-Playing'] = 0;
    genres['Platform'] = 0;

    data.forEach(function (d) {
      if (d.Genre == 'Action') {
        genres['Action'] += parseFloat(d.Global_Sales) || 0
      } else if (d.Genre == 'Sports') {
        genres['Sports'] += parseFloat(d.Global_Sales) || 0
      } else if (d.Genre == 'Shooter') {
        genres['Shooter'] += parseFloat(d.Global_Sales) || 0
      } else if (d.Genre == 'Role-Playing') {
        genres['Role-Playing'] += parseFloat(d.Global_Sales) || 0
      } else if (d.Genre == 'Platform') {
        genres['Platform'] += parseFloat(d.Global_Sales) || 0
      }
    });

    var data = [];
    data.push({
      genre: 'Action',
      sales: genres['Action']
    });
    data.push({
      genre: 'Sports',
      sales: genres['Sports']
    });
    data.push({
      genre: 'Shooter',
      sales: genres['Shooter']
    });
    data.push({
      genre: 'Role-Playing',
      sales: genres['Role-Playing']
    });
    data.push({
      genre: 'Platform',
      sales: genres['Platform']
    });

    x.domain(Object.keys(genres).map(function (d) {
      return d;
    }));
    y.domain([0, d3.max(Object.values(genres), function (d) {
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
        return 20 + x(d.genre);
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
      left: 150
    },
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  var y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1);

  var x = d3.scaleLinear()
    .range([0, width]);

  d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales.csv").then(function (data) {
    var publishersAction = {};
    var publishersSports = {};
    var publishersShooter = {};
    var publishersRole = {};
    var publishersPlatform = {};

    data.forEach(function (d) {
      if (d.Genre == 'Action') {
        if (publishersAction[d.Publisher] == null) {
          publishersAction[d.Publisher] = 0;
        }
        publishersAction[d.Publisher] += parseFloat(d.Global_Sales) || 0
      } else if (d.Genre == 'Sports') {
        if (publishersSports[d.Publisher] == null) {
          publishersSports[d.Publisher] = 0;
        }
        publishersSports[d.Publisher] += parseFloat(d.Global_Sales) || 0
      } else if (d.Genre == 'Shooter') {
        if (publishersShooter[d.Publisher] == null) {
          publishersShooter[d.Publisher] = 0;
        }
        publishersShooter[d.Publisher] += parseFloat(d.Global_Sales) || 0
      } else if (d.Genre == 'Role-Playing') {
        if (publishersRole[d.Publisher] == null) {
          publishersRole[d.Publisher] = 0;
        }
        publishersRole[d.Publisher] += parseFloat(d.Global_Sales) || 0
      } else if (d.Genre == 'Platform') {
        if (publishersPlatform[d.Publisher] == null) {
          publishersPlatform[d.Publisher] = 0;
        }
        publishersPlatform[d.Publisher] += parseFloat(d.Global_Sales) || 0
      }
    });

    for (i = 1; i <= 5; i++) {

      var dictonary = null;
      if (i == 1) {
        dictonary = publishersAction;
        svg3 = d3.select("#svg_top_publishers_action");
      } else if (i == 2) {
        dictonary = publishersSports;
        svg3 = d3.select("#svg_top_publishers_sports");
      } else if (i == 3) {
        dictonary = publishersShooter;
        svg3 = d3.select("#svg_top_publishers_shooter");
      } else if (i == 4) {
        dictonary = publishersRole;
        svg3 = d3.select("#svg_top_publishers_role");
      } else {
        dictonary = publishersPlatform;
        svg3 = d3.select("#svg_top_publishers_platform");
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
    var consolesAction = {};
    var consolesSports = {};
    var consolesShooter = {};
    var consolesRole = {};
    var consolesPlatform = {};

    data.forEach(function (d) {
      if (d.Genre == 'Action') {
        if (consolesAction[d.Platform] == null) {
          consolesAction[d.Platform] = 0;
        }
        consolesAction[d.Platform] += parseFloat(d.Global_Sales) || 0
      } else if (d.Genre == 'Sports') {
        if (consolesSports[d.Platform] == null) {
          consolesSports[d.Platform] = 0;
        }
        consolesSports[d.Platform] += parseFloat(d.Global_Sales) || 0
      } else if (d.Genre == 'Shooter') {
        if (consolesShooter[d.Platform] == null) {
          consolesShooter[d.Platform] = 0;
        }
        consolesShooter[d.Platform] += parseFloat(d.Global_Sales) || 0
      } else if (d.Genre == 'Role-Playing') {
        if (consolesRole[d.Platform] == null) {
          consolesRole[d.Platform] = 0;
        }
        consolesRole[d.Platform] += parseFloat(d.Global_Sales) || 0
      } else if (d.Genre == 'Platform') {
        if (consolesPlatform[d.Platform] == null) {
          consolesPlatform[d.Platform] = 0;
        }
        consolesPlatform[d.Platform] += parseFloat(d.Global_Sales) || 0
      }
    });

    for (i = 1; i <= 5; i++) {

      var dictonary = null;
      if (i == 1) {
        dictonary = consolesAction;
        svg3 = d3.select("#svg_top_consoles_action");
      } else if (i == 2) {
        dictonary = consolesSports;
        svg3 = d3.select("#svg_top_consoles_sports");
      } else if (i == 3) {
        dictonary = consolesShooter;
        svg3 = d3.select("#svg_top_consoles_shooter");
      } else if (i == 4) {
        dictonary = consolesRole;
        svg3 = d3.select("#svg_top_consoles_role");
      } else {
        dictonary = consolesPlatform;
        svg3 = d3.select("#svg_top_consoles_platform");
      }

      var data = [];
      for (var index in dictonary) {
        data.push({
          console: index,
          sales: dictonary[index]
        });
      }

      data.sort((a, b) => (a.sales > b.sales) ? 1 : ((b.sales > a.sales) ? -1 : 0));
      data = data.slice(-10);

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