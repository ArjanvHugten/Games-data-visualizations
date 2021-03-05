import React, { useEffect, useRef } from 'react';

import * as d3 from "d3";
import { legendColor } from 'd3-svg-legend'

import mapJson from '../../assets/data/custom.geo.json';

function Map(props) {
    const { data } = props;
    const chartElement = useRef(null);
    const legendElement = useRef(null);

    // Sizes for the chart
    const width = 1000;
    const height = 700;

    // Sizes for the legend
    const legendWidth = 200;
    const legendHeight = 180;

    useEffect(() => {
        createMap(mapJson);

      }, [data]);

    function createMap(map) {
        map.features.forEach((d) => {
            if (d.properties.continent === 'North America') {
                d.value = data['NA'];
            } else if (d.properties.continent === 'Europe' && d.properties.name !== 'Russia' && d.properties.name !== 'French Guiana') {
                d.value = data['EU'];
            } else if (d.properties.name === 'Japan') {
                d.value = data['JP'];
            } else {
                d.value = data['Other'];
            }
        });

        var projection = d3.geoMercator().scale(width / 2 / Math.PI)
            .rotate([-11, 0])
            .translate([(width) / 2, height * 1.35 / 2])
            .precision(.1);

        var path = d3.geoPath().projection(projection);

        var chartSvg = d3.select(chartElement.current)
            .html("")
            .attr("preserveAspectRatio", "xMinYMin")
            .attr("width", width)
            .attr("height", height)
            .append("g");


        var color = d3.scaleQuantile()
            .domain([Math.min(...map.features.map((d) => d.value)), Math.max(...map.features.map((d) => d.value))])
            .range(["rgb(219,237,255)", "rgb(198,219,239)", "rgb(107,174,214)", "rgb(20,99,169)", "rgb(9,86,154)", "rgb(3,19,43)"]);

        chartSvg.selectAll("path")
            .data(map.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                return color(d.value);
            });

        var colorLegend = legendColor()
            .labelFormat(d3.format(".0f"))
            .scale(color)
            .shapePadding(5)
            .shapeWidth(50)
            .shapeHeight(20)
            .labelOffset(12);

        var legendSvg = d3.select(legendElement.current)
            .html("")
            .attr("preserveAspectRatio", "xMinYMin")
            .attr("width", legendWidth)
            .attr("height", legendHeight);

        legendSvg.append("g")
            .attr("transform", "translate(0, 0)")
            .call(colorLegend);
    }

    return (
        <React.Fragment>
            <svg className="map-legend" ref={legendElement}></svg>
            <svg ref={chartElement}></svg>
        </React.Fragment>
    )
}

export default Map