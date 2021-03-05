import React, { useState, useEffect } from 'react';

import Map from '../../components/charts/Map'

function Home(props) {
  const [data, setData] = useState({});

  const [publishers, setPublishers] = useState([]);
  const [popularPublishers, setPolularPublishers] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState("all");

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");

  const [consoles, setConsoles] = useState([]);
  const [selectedConsole, setSelectedConsole] = useState("all");

  const [selectedYear, setSelectedYear] = useState("all");
 
  useEffect(() => {
    function PrepareData(inputData) {
      var RegionSales = {};

      RegionSales['NA'] = 0;
      RegionSales['EU'] = 0;
      RegionSales['JP'] = 0;
      RegionSales['Other'] = 0;
  
      inputData.forEach((d) => {
        if (selectedPublisher !== 'all' && selectedPublisher !== d.Publisher) {
            return;
        }
        if (selectedConsole !== 'all' && selectedConsole !== d.Platform) {
            return;
        }
        if (selectedGenre !== 'all' && selectedGenre !== d.Genre) {
            return;
        }
        if (selectedYear !== 'all' && selectedYear !== d.Year) {
            return;
        }
  
        RegionSales['NA'] += parseFloat(d.NA_Sales) || 0;
        RegionSales['EU'] += parseFloat(d.EU_Sales) || 0;
        RegionSales['JP'] += parseFloat(d.JP_Sales) || 0;
        RegionSales['Other'] += parseFloat(d.Other_Sales) || 0;
      });
  
      return RegionSales;
    }

    async function AsyncFetchData() {
      const fetchedData = await props.data;

      if(!fetchedData){
        setData({});
      }

      setData(PrepareData(fetchedData));

      const dropdownData = GetDropDownData(fetchedData);

      setPolularPublishers(dropdownData.PopularPublishers);
      setPublishers(dropdownData.Publishers);

      setGenres(dropdownData.Genres);
      setConsoles(dropdownData.Consoles);
    }

    AsyncFetchData();
  }, [props.data, selectedPublisher, selectedGenre, selectedConsole, selectedYear]);

  function GetDropDownData(data) {
    var popularPublishers = [];
    var publishers = [];
    var consoles = [];
    var genres = [];

    data.forEach((d) => {
      if (publishers.indexOf(d.Publisher) === -1) {
          publishers.push(d.Publisher);
      }

      if (consoles.indexOf(d.Platform) === -1) {
          consoles.push(d.Platform);
      }
      if (genres.indexOf(d.Genre) === -1) {
          genres.push(d.Genre);
      }

      // Needed for getting the most popular publishers
      var foundPublisherIndex = popularPublishers.findIndex(x => x.key === d.Publisher);;
      if (foundPublisherIndex === -1) {
        popularPublishers.push({ key: d.Publisher , value: parseFloat(d.Global_Sales) || 0 });
      }
      else {
        popularPublishers[foundPublisherIndex].value += parseFloat(d.Global_Sales) || 0;
      }
    });
    
    // Take the top publishers
    popularPublishers.sort((a, b) => b.value - a.value);
    popularPublishers = popularPublishers.slice(0, 5);
    popularPublishers = popularPublishers.map(publisher => publisher.key);

    popularPublishers.sort();
    publishers.sort();
    consoles.sort();
    genres.sort();
    
    return { PopularPublishers: popularPublishers, Publishers: publishers, Consoles: consoles, Genres: genres};
  }

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Map</h1>
      </div>

      <p>The map below shows the game sales in the regions North America, Japan, Europe and Other.</p>

      <div className="map-select-option">
					<select id="publisherSelect" className="custom-select" value={selectedPublisher} onChange={e => setSelectedPublisher(e.currentTarget.value)}>
						<option value="all">All</option>
						<optgroup label="Popular">
              { popularPublishers.map(publisher => {
                return <option key={publisher} value={publisher}>{publisher}</option>
              }) }
						</optgroup>
						<optgroup id="publisherSelect-opt-group" label="Other">
              { publishers.map(publisher => {
                return <option key={publisher} value={publisher}>{publisher}</option>
              }) }
						</optgroup>
					</select>
				</div>

				<div className="map-select-option">
					<select id="genreSelect" className="custom-select" value={selectedGenre} onChange={e => setSelectedGenre(e.currentTarget.value)}>
						<option value="all">All</option>
            { genres.map(genre => {
              return <option key={genre} value={genre}>{genre}</option>
            }) }
					</select>
				</div>

				<div className="map-select-option">
					<select id="consoleSelect" className="custom-select" value={selectedConsole} onChange={e => setSelectedConsole(e.currentTarget.value)}>
						<option value="all">All</option>
            { consoles.map(console => {
              return <option key={console} value={console}>{console}</option>
            }) }
					</select>
				</div>

				<div className="map-select-option">
					<select id="yearSelect" className="custom-select" value={selectedYear} onChange={e => setSelectedYear(e.currentTarget.value)}>
						<option value="all">All</option>
            { [...Array(36).keys()].map(i => {
              let year = 1980 + i;
              return <option key={year} value={year}>{year}</option>
            }) }
					</select>
				</div>

        <div className="map-additional-explaining">
          <p>Sales are in millions.</p>
        </div>

        { data && Object.keys(data).length > 0 ? <Map data={data} /> : "" }
    </main>
  );
}

export default Home;
