import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { PrepareDataOneDeep } from '../../utilities/prepareData'

import BarChart from '../../components/charts/BarChart'

function GetRegionSales(region){
    switch(region.toLowerCase()){
        case "north-america":
            return "NA_Sales";
        case "europe":
            return "EU_Sales";
        case "japan":
            return "JP_Sales";
        default:
            return "Other_Sales";
    }
}

function Region(props) {
    const { region } = useParams();
    const [data, setData] = useState({});
   
	useEffect(() => {
        async function AsyncFetchData() {
          const fetchedData = await props.data;
    
          if(!fetchedData){
            setData({});
          }
          
          setData({ 
            GenreSales: PrepareDataOneDeep(fetchedData, "Genre", GetRegionSales(region)), 
            PublisherSales:  PrepareDataOneDeep(fetchedData, "Publisher", GetRegionSales(region)), 
            ConsoleSales:  PrepareDataOneDeep(fetchedData, "Platform", GetRegionSales(region)), 
          });
        }
    
        AsyncFetchData();
    }, [props.data, region]);

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
