import React, { useState, useEffect } from 'react';

import ScatterPlot from '../../components/charts/ScatterPlot'

function Ratings(props) {
  const [data, setData] = useState([]);
  const [dataOption, setDataOption] = useState("User");
  
  useEffect(() => {
    async function AsyncFetchData() {
      const result = PrepareData(await props.data);
      setData(result);
    }

    AsyncFetchData();
  }, [props.data, dataOption]);

  function PrepareData(inputData) {
    if(!inputData){
      return [];
    }

    let scatterPlotData = [];
    inputData.forEach(function (d) {
      // Filter
      if (d.User_Score <= 0 || d.Critic_Score <= 0 || d.Global_Sales <= 10) {
        return;
      }

      if(dataOption === "User") {
        scatterPlotData.push({ x: +d.User_Score, y: +d.Global_Sales, label: d.Name, colorGroup: d.Publisher });
      }
      else if (dataOption === "Critic") {
        scatterPlotData.push({ x: +d.Critic_Score, y: +d.Global_Sales, label: d.Name, colorGroup: d.Publisher });
      }
      else {
        scatterPlotData.push({ x: +d.User_Score, y: +d.Critic_Score, label: d.Name, colorGroup: d.Publisher });
      }
    });

    return scatterPlotData;
  }

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Ratings</h1>
        </div>

        <div id="button-group" className="btn-group btn-group-toggle" data-toggle="buttons">
          <label id="labelUserScore" className={"btn btn-secondary " + (dataOption === 'User' ? "active" : "")}>
              <input type="radio" name="options" id="userScore" value="User" autoComplete="off" checked={dataOption === 'User'} onChange={() => setDataOption('User')}/>
              User
          </label>
          <label id="labelCriticScore" className={"btn btn-secondary " + (dataOption === 'Critic' ? "active" : "")}>
              <input type="radio" name="options" id="criticScore" value="Critic" autoComplete="off" checked={dataOption === 'Critic'} onChange={() => setDataOption('Critic')} />
              Critic
          </label>
          <label id="labelBoth" className={"btn btn-secondary " + (dataOption === 'Both' ? "active" : "")}>
              <input type="radio" name="options" id="both" value="Both" autoComplete="off" checked={dataOption === 'Both'} onChange={() => setDataOption('Both')} />
              Both
          </label>
        </div>

        { data.length > 0 ? <ScatterPlot data={data} /> : "" }
    </main>
  );
}

export default Ratings;
