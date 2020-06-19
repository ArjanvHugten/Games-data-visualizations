function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  alert('Query Variable ' + variable + ' not found');
}

var region = getQueryVariable("region");

if (region == "NA") {
  document.getElementById("title").innerHTML = "North America";
  document.getElementById("naLink").classList.add("active");
} else if (region == "EU") {
  document.getElementById("title").innerHTML = "Europe";
  document.getElementById("euLink").classList.add("active");
} else if (region == "JP") {
  document.getElementById("title").innerHTML = "Japan";
  document.getElementById("jpLink").classList.add("active");
} else {
  document.getElementById("title").innerHTML = "Other";
  document.getElementById("otherLink").classList.add("active");
}

(function () {
  var margin = {
      top: 20,
      right: 20,
      bottom: 70,
      left: 200
    },
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  var y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1);

  var x = d3.scaleLinear()
    .range([0, width]);

  d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales.csv").then(function (data) {
    var genres = {};
    var publishers = {};
    var consoles = {};

    data.forEach(function (d) {

      if (region == "NA") {
        sales = d.NA_Sales;
      } else if (region == "EU") {
        sales = d.EU_Sales;
      } else if (region == "JP") {
        sales = d.JP_Sales;
      } else {
        sales = d.Other_Sales;
      }

      if (genres[d.Genre] == null) {
        genres[d.Genre] = 0;
      }
      genres[d.Genre] += parseFloat(sales) || 0;

      if (publishers[d.Publisher] == null) {
        publishers[d.Publisher] = 0;
      }
      publishers[d.Publisher] += parseFloat(sales) || 0;

      if (consoles[d.Platform] == null) {
        consoles[d.Platform] = 0;
      }
      consoles[d.Platform] += parseFloat(sales) || 0;

    });

    for (i = 1; i <= 3; i++) {

      var dictonary = null;
      if (i == 1) {
        dictonary = genres;
        svg3 = d3.select("#svg_genres");
      } else if (i == 2) {
        dictonary = publishers;
        svg3 = d3.select("#svg_consoles");
      } else {
        dictonary = consoles;
        svg3 = d3.select("#svg_publishers");
      }

      var data = [];
      for (var index in dictonary) {
        data.push({
          index: index,
          sales: dictonary[index]
        });
      }


      data.sort((a, b) => (a.sales > b.sales) ? 1 : ((b.sales > a.sales) ? -1 : 0));
      data = data.slice(-10);

      x.domain([0, d3.max(data, function (d) {
        return Number(d.sales);
      })]);
      y.domain(data.map(function (d) {
        return d.index;
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
          return y(d.index);
        })
        .attr("height", y.bandwidth());
    }
  });
})();