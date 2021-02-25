import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

function ScatterPlot(props) {
    const { data, xAxisTitle, yAxisTitle } = props;
    const chartElement = useRef(null);
    const visualisationContainer = useRef(null);

    // Sizes and margins for the chart
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    useEffect(() => {
        createScatterPlot();
      }, []);

    function createScatterPlot() {
        // Creates the chart.
        var chartSvg = d3.select(chartElement.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        // Define our scales
        var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        var xScale = d3.scaleLinear()
            .domain([d3.min(data, (d) => d.x) - 1, d3.max(data, (d) => d.x) + 1])
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([d3.min(data, (d) => d.y) - 1, d3.max(data, (d) => d.y) + 1])
            .range([height, 0]); // flip order because y-axis origin is upper LEFT

        // Define our axes
        var xAxis = d3.axisBottom()
            .scale(xScale);

        var yAxis = d3.axisLeft()
            .scale(yScale);

        // Add x-axis to the svg
        chartSvg.append("g")
            .attr("transform", "translate(0," + height + ")") // move axis to the bottom of the canvas
            .call(xAxis)

        // Add y-axis to the svg
        chartSvg.append("g")
            .call(yAxis)

        // Add the tooltip container to the vis container
        // it's invisible and its position/contents are defined during mouseover
        var tooltip = d3.select(visualisationContainer.current).append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // tooltip mouseover event handler
        var tipMouseover = function (event, d) {
            var color = colorScale(d.colorGroup);

            var html = d.label + "<br/>" +
                "<span style='color:" + color + ";'>" + d.colorGroup + "</span><br/>" +
                "<b> User score: " + d.x + "</b>, Sales: <b/>" + d.y + "</b>";

            tooltip.html(html)
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 28) + "px")
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

        // Add data points!
        chartSvg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 5.5) // radius size, could map to another data dimension
            .attr("cx", (d) => xScale(d.x)) // x position
            .attr("cy", (d) => yScale(d.y)) // y position
            .style("fill", (d) => colorScale(d.colorGroup))
            .on("mouseover", tipMouseover)
            .on("mouseout", tipMouseout);
    }

    return (
        <div ref={visualisationContainer}>
            <svg ref={chartElement}></svg>
        </div>
    )
}

export default ScatterPlot