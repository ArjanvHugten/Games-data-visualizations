import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import BarChart from '../../components/charts/BarChart'

function Region(props) {
    const { region } = useParams();
    const [data, setData] = useState({});
   
    useEffect(() => {
        async function AsyncFetchData() {
            const result = PrepareData(await props.data);
            setData(result);
        }
  
        AsyncFetchData();
    }, [props.data, region]);
  
    function PrepareData(data) {
      if(!data){
        return {};
      }
  
      return { GenreSales: GetGenreSales(data), PublisherSales:  GetPublisherSales(data), ConsoleSales:  GetConsoleSales(data) };
    }

    function GetGenreSales(data) {
        var genreSalesDictonary = {};

        data.forEach((d) => {
            if (!genreSalesDictonary[d.Genre]) {
                genreSalesDictonary[d.Genre] = 0;
            }
            genreSalesDictonary[d.Genre] += parseFloat(GetRegionSales(d)) || 0
        });

        return genreSalesDictonary;
    }
    
    function GetPublisherSales(data) {
        var publisherSalesDictonary = {};

        data.forEach((d) => {
            if (!publisherSalesDictonary[d.Publisher]) {
                publisherSalesDictonary[d.Publisher] = 0;
            }
            
            publisherSalesDictonary[d.Publisher] += parseFloat(GetRegionSales(d)) || 0
        });

        return publisherSalesDictonary;
    }
    
    function GetConsoleSales(data) {
        var consoleSalesDictonary = {};

        data.forEach((d) => {
            if (!consoleSalesDictonary[d.Platform]) {
                consoleSalesDictonary[d.Platform] = 0;
            }
            
            consoleSalesDictonary[d.Platform] += parseFloat(GetRegionSales(d)) || 0
        });

        return consoleSalesDictonary;
    }

    function GetRegionSales(d){
        switch(region.toLowerCase()){
            case "north-america":
                return d.NA_Sales;
            case "europe":
                return d.EU_Sales;
            case "japan":
                return d.JP_Sales;
            default:
                return d.Other_Sales;
        }
    }

    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Region: {region}</h1>
            </div>


            { data.GenreSales && data.GenreSales && Object.keys(data.GenreSales).length > 0  ? <BarChart data={data.GenreSales} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
            { data.PublisherSales &&  data.PublisherSales && Object.keys(data.PublisherSales).length > 0  ? <BarChart data={data.PublisherSales} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
            { data.ConsoleSales &&  data.ConsoleSales && Object.keys(data.ConsoleSales).length > 0  ? <BarChart data={data.ConsoleSales} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
        </main>
    );
}

export default Region;
