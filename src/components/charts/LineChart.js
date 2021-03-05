import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

// Sizes and margins for the chart
const margin = { top: 20, right: 20, bottom: 50, left: 150 };
const width = 600 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

function LineChart(props) {
    const { data, xAxisTitle, yAxisTitle } = props;
    const chartElement = useRef(null);

    useEffect(() => {
        function createLineChart() {
            // Gets the data and converts it to an array of key value objects.
            let convertedData = Object.keys(data).map((key) => ({ key, value: data[key] }));
    
            // Creates the scales
            let xScale = d3.scaleTime()
                .range([0, width])
                .domain(d3.extent(convertedData, (d) => new Date(d.key, 0, 1)));
            
            let yScale = d3.scaleLinear()
                .rangeRound([height, 0])
                .domain([0, 600]);
    
            // Creates the chart.
            var chartSvg = d3.select(chartElement.current)
                .html("")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
            // Add x scale.
            chartSvg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")))
    
            // Add y scale.
            chartSvg.append("g")
                .call(d3.axisLeft(yScale))
    
             // Add the line path.
             var line = d3.line()
                .x((d) => xScale(new Date(d.key, 0, 1)))
                .y((d) => yScale(d.value));
    
             chartSvg.append("path")
                .data([convertedData])
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("d", line);
    
            // text label for the y axis
            chartSvg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left / 2)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text(yAxisTitle);
    
            // Text label for the x axis
            chartSvg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .text(xAxisTitle);
        }

        createLineChart();
      }, [data, xAxisTitle, yAxisTitle]);


    return <svg ref={chartElement}></svg>
}

export default LineChart