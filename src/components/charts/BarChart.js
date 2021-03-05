import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

// Sizes and margins for the chart
const margin = { top: 20, right: 20, bottom: 50, left: 150 };
const width = 600 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

function BarChart(props) {
    const { data, xScaleLinear, axisTitle, topN } = props;
    const chartElement = useRef(null);

    useEffect(() => {
        function createBarChart() {
            // Gets the data and converts it to an array of key value objects.
            let convertedData = Object.keys(data).map((key) => ({ key, value: data[key] }));
            
            // Sorts the data.
            if (xScaleLinear) { 
                convertedData.sort((a, b) => a.value - b.value);
            }
            else { 
                convertedData.sort((a, b) => b.value - a.value);
            }

            if (xScaleLinear) { 
                // Takes the bottom N values (ASCENDING values).
                convertedData = convertedData.slice(Math.max(convertedData.length - topN, 0));
            } 
            else { 
                // Takes the top N values (DESCENDING values).
                convertedData = convertedData.slice(0, topN);
            }

            // Gets the scales.
            var {xScale, yScale} = createScales(convertedData);

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
                .call(d3.axisBottom(xScale))

            // Add y scale.
            chartSvg.append("g")
                .call(d3.axisLeft(yScale))

            // Add bars.
            createBars(chartSvg, convertedData, xScale, yScale);
        }

        function createScales(convertedData) {
            if (xScaleLinear) {
                let xScale = d3.scaleLinear()
                    .range([0, width])
                    .domain([0, d3.max(convertedData, (d) => d.value)]);
                
                let yScale = d3.scaleBand()
                    .range([height, 0])
                    .padding(0.05)
                    .domain(convertedData.map((d) => d.key));
    
                return {xScale, yScale};
            } 
            else {
                let xScale = d3.scaleBand()
                    .rangeRound([0, width])
                    .padding(0.05)
                    .domain(convertedData.map((d) => d.key));
                
                let yScale = d3.scaleLinear()
                    .rangeRound([height, 0])
                    .domain([0, d3.max(convertedData, (d) => d.value)]);
    
                return {xScale, yScale};
            }
        }
    
        function createBars(chartSvg, convertedData, xScale, yScale) {
            if (xScaleLinear) {
                chartSvg.selectAll(".bar")
                    .data(convertedData)
                    .enter().append("rect")
                    .attr("fill", "steelblue")
                    .attr("class", "bar")
                    .attr("y", (d) => yScale(d.key))
                    .attr("width",  (d) => xScale(d.value))
                    .attr("height", yScale.bandwidth());
            }
            else {
                chartSvg.selectAll(".bar")
                    .data(convertedData)
                    .enter().append("rect")
                    .attr("fill", "steelblue")
                    .attr("class", "bar")
                    .attr("x", (d) => xScale(d.key))
                    .attr("y", (d) => yScale(d.value))
                    .attr("width", xScale.bandwidth())
                    .attr("height", (d) => height - yScale(d.value));
            }
        }

        createBarChart();
      }, [data, xScaleLinear, axisTitle, topN]);

    return <svg ref={chartElement}></svg>
}

export default BarChart