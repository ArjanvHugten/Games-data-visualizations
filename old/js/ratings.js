function updateGraph() {
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


    d3.select("#visualization").selectAll("*").remove();

    var canvas = d3.select("#visualization").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("http://gamesvisualizations.arjanvanhugten.nl/data/vgsales_rating.csv").then(function (data) {
        data.forEach(function (d) { // convert strings to numbers
            d.User_Score = +d.User_Score;
            d.Critic_Score = +d.Critic_Score;
            d.Global_Sales = +d.Global_Sales;
        });

        var data = data.filter(obj => {
            if ($("#labelUserScore").hasClass("active")) {
                return obj.User_Score > 0 && obj.Global_Sales > 10;
            } else if ($("#labelCriticScore").hasClass("active")) {
                return obj.Critic_Score > 0 && obj.Global_Sales > 10;
            } else {
                return obj.User_Score > 0 && obj.Critic_Score > 0 && obj.Global_Sales > 10;
            }
        })

        // Define our scales
        var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        if ($("#labelCriticScore").hasClass("active")) {
            var xScale = d3.scaleLinear()
                .domain([d3.min(data, function (d) {
                        return d.Critic_Score;
                    }) - 1,
                    d3.max(data, function (d) {
                        return d.Critic_Score;
                    }) + 1
                ])
                .range([0, width]);
        } else {
            var xScale = d3.scaleLinear()
                .domain([d3.min(data, function (d) {
                        return d.User_Score;
                    }) - 1,
                    d3.max(data, function (d) {
                        return d.User_Score;
                    }) + 1
                ])
                .range([0, width]);
        }

        if ($("#labelBoth").hasClass("active")) {
            var yScale = d3.scaleLinear()
                .domain([d3.min(data, function (d) {
                        return d.Critic_Score;
                    }) - 1,
                    d3.max(data, function (d) {
                        return d.Critic_Score;
                    }) + 1
                ])
                .range([height, 0]); // flip order because y-axis origin is upper LEFT
        } else {
            var yScale = d3.scaleLinear()
                .domain([d3.min(data, function (d) {
                        return d.Global_Sales;
                    }) - 1,
                    d3.max(data, function (d) {
                        return d.Global_Sales;
                    }) + 1
                ])
                .range([height, 0]); // flip order because y-axis origin is upper LEFT
        }

        // Define our axes
        var xAxis = d3.axisBottom()
            .scale(xScale);

        var yAxis = d3.axisLeft()
            .scale(yScale);

        // Add x-axis to the canvas
        canvas.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")") // move axis to the bottom of the canvas
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width) // x-offset from the xAxis, move label all the way to the right
            .attr("y", -6) // y-offset from the xAxis, moves text UPWARD!
            .style("text-anchor", "end") // right-justify text
            .text("Sugar");

        // Add y-axis to the canvas
        canvas.append("g")
            .attr("class", "y axis") // .orient('left') took care of axis positioning for us
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)") // although axis is rotated, text is not
            .attr("y", 15) // y-offset from yAxis, moves text to the RIGHT because it's rotated, and positive y is DOWN
            .style("text-anchor", "end")
            .text("Calories");

        // Add the tooltip container to the vis container
        // it's invisible and its position/contents are defined during mouseover
        var tooltip = d3.select("#visualization").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // tooltip mouseover event handler
        var tipMouseover = function (d) {
            var color = colorScale(d.Publisher);
            if ($("#labelUserScore").hasClass("active")) {
                var html = d.Name + "<br/>" +
                    "<span style='color:" + color + ";'>" + d.Publisher + "</span><br/>" +
                    "<b> User score: " + d.User_Score + "</b>, Sales: <b/>" + d.Global_Sales + "</b>";
            } else if ($("#labelCriticScore").hasClass("active")) {
                var html = d.Name + "<br/>" +
                    "<span style='color:" + color + ";'>" + d.Publisher + "</span><br/>" +
                    "<b> Critic score: " + d.Critic_Score + "</b>, Sales: <b/>" + d.Global_Sales + "</b>";
            } else {
                var html = d.Name + "<br/>" +
                    "<span style='color:" + color + ";'>" + d.Publisher + "</span><br/>" +
                    "<b> User score: " + d.User_Score + "</b>, Critic score: <b/>" + d.Critic_Score + "</b>";
            }

            tooltip.html(html)
                .style("left", (d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .transition()
                .duration(200) // ms
                .style("opacity", .9) // started as 0!

        };

        // tooltip mouseout event handler
        var tipMouseout = function (d) {
            tooltip.transition()
                .duration(300) // ms
                .style("opacity", 0); // don't care about position!
        };

        if ($("#labelUserScore").hasClass("active")) {
            // Add data points!
            canvas.selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 5.5) // radius size, could map to another data dimension
                .attr("cx", function (d) {
                    return xScale(d.User_Score);
                }) // x position
                .attr("cy", function (d) {
                    return yScale(d.Global_Sales);
                }) // y position
                .style("fill", function (d) {
                    return colorScale(d.Publisher);
                })
                .on("mouseover", tipMouseover)
                .on("mouseout", tipMouseout);
        } else if ($("#labelCriticScore").hasClass("active")) {
            // Add data points!
            canvas.selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 5.5) // radius size, could map to another data dimension
                .attr("cx", function (d) {
                    return xScale(d.Critic_Score);
                }) // x position
                .attr("cy", function (d) {
                    return yScale(d.Global_Sales);
                }) // y position
                .style("fill", function (d) {
                    return colorScale(d.Publisher);
                })
                .on("mouseover", tipMouseover)
                .on("mouseout", tipMouseout);
        } else {
            // Add data points!
            canvas.selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 5.5) // radius size, could map to another data dimension
                .attr("cx", function (d) {
                    return xScale(d.User_Score);
                }) // x position
                .attr("cy", function (d) {
                    return yScale(d.Critic_Score);
                }) // y position
                .style("fill", function (d) {
                    return colorScale(d.Publisher);
                })
                .on("mouseover", tipMouseover)
                .on("mouseout", tipMouseout);
        }
    });
}