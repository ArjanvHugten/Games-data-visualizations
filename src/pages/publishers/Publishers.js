import React, { useState, useEffect } from 'react';

import BarChart from '../../components/charts/BarChart'
import LineChart from '../../components/charts/LineChart'

import NintendoLogo from '../../assets/images/nintendo.png';
import EaLogo from '../../assets/images/ea.png';
import ActivisionLogo from '../../assets/images/activision.png';
import SonyLogo from '../../assets/images/sony.png';

function Publishers(props) {
	const [data, setData] = useState({});
   
	useEffect(() => {
	  async function AsyncFetchData() {
		const result = PrepareData(await props.data);
		setData(result);
	  }
  
	  AsyncFetchData();
	}, [props.data]);
  
	function PrepareData(data) {
	  if(!data){
		return {};
	  }
  
	  return { PublisherSales: GetPublisherSales(data), GenreSales:  GetGenreSales(data), ConsoleSales:  GetConsoleSales(data), ReleasesPerPublisher: GetReleasesPerPublisher(data), ReleaseTrends: GetReleaseTrends(data)  };
	}
  
	function GetPublisherSales(data) {
	  var publisherSalesDictonary = {};
  
	  data.forEach((d) => {
		if (!publisherSalesDictonary[d.Publisher]) {
			publisherSalesDictonary[d.Publisher] = 0;
		}
  
		publisherSalesDictonary[d.Publisher] += parseFloat(d.Global_Sales) || 0
	  });
  
	  return publisherSalesDictonary;
	}
  
	function GetGenreSales(data) {
	  var genreSalesDictonary = {};
  
	  data.forEach((d) => {
		if (!genreSalesDictonary[d.Publisher]) {
			genreSalesDictonary[d.Publisher] = {};
		}
  
		if (!genreSalesDictonary[d.Publisher][d.Genre]) {
			genreSalesDictonary[d.Publisher][d.Genre] = 0;
		}
		
		genreSalesDictonary[d.Publisher][d.Genre] += parseFloat(d.Global_Sales) || 0
	  });
  
	  return genreSalesDictonary;
	}
  
	function GetConsoleSales(data) {
	  var consoleSalesDictonary = {};
  
	  data.forEach((d) => {
		if (!consoleSalesDictonary[d.Publisher]) {
		  consoleSalesDictonary[d.Publisher] = {};
		}
  
		if (!consoleSalesDictonary[d.Publisher][d.Platform]) {
		  consoleSalesDictonary[d.Publisher][d.Platform] = 0;
		}
		
		consoleSalesDictonary[d.Publisher][d.Platform] += parseFloat(d.Global_Sales) || 0
	  });
  
	  return consoleSalesDictonary;
	}

	function GetReleasesPerPublisher(data) {
		var releasesDictonary = {};
	
		data.forEach((d) => {
		  if (!releasesDictonary[d.Publisher]) {
			releasesDictonary[d.Publisher] = 0;
		  }
	
		  releasesDictonary[d.Publisher]++;
		});
	
		return releasesDictonary;
	  }
	
	  function GetReleaseTrends(data) {
		var releasesTrendsDictonary = {};
	
		data.forEach((d) => {
		  if (d.Year !== "N/A" && d.Year !== '1985' && d.Year !== '2020') {
			if (!releasesTrendsDictonary[d.Publisher]) {
			  releasesTrendsDictonary[d.Publisher] = {};
			}
	  
			if (!releasesTrendsDictonary[d.Publisher][d.Year]) {
			  releasesTrendsDictonary[d.Publisher][d.Year] = 0;
			}
	
			releasesTrendsDictonary[d.Publisher][d.Year]++;
		  }
		});
	
		return releasesTrendsDictonary;
	  }

	return (
		<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h1 className="h2">Publishers</h1>
			</div>

			<p>
				The most important publishers in this dataset are Nintendo, Activision, Sony and Electronic Arts. This publishers are
				compared against each other on this page, the graph below shows that Nintendo has the most sales followed by EA, Activision
				and at last Sony.
			</p>

			
			{ data.PublisherSales && Object.keys(data.PublisherSales).length > 0 ? <BarChart data={data.PublisherSales} xScaleLinear={false} axisTitle="Sales in millions" topN={4}/> : "" }

			<div>
				<img src={NintendoLogo} width='150' alt="Nintendo" className="logo" />

				<p>
					Nintendo is a Japanese multinational consumer electronics and video game company headquartered in Kyoto. Nintendo is
					one of the world's largest video game companies by market capitalization, creating some of the best-known and top-selling
					video game franchises, such as Mario, The Legend of Zelda, and Pokémon. Founded on 23 September 1889 by Fusajiro Yamauchi,
					it originally produced handmade hanafuda playing cards. By 1963, the company had tried several small niche businesses,
					such as cab services and love hotels. Abandoning previous ventures in favor of toys in the 1960s, Nintendo developed
					into a video game company in the 1970s, ultimately becoming one of the most influential in the industry and Japan's
					third most-valuable company with a market value of over $85 billion. <a href="https://en.wikipedia.org/wiki/Nintendo">Source wikipedia</a>
				</p>
			
				{ data.GenreSales && data.GenreSales["Nintendo"] && Object.keys(data.GenreSales["Nintendo"]).length > 0  ? <BarChart data={data.GenreSales["Nintendo"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
        		{ data.ConsoleSales &&  data.ConsoleSales["Nintendo"] && Object.keys(data.ConsoleSales["Nintendo"]).length > 0  ? <BarChart data={data.ConsoleSales["Nintendo"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
			</div>
			<div>
				<img src={EaLogo} width='150' alt="EA" className="logo" />

				<p>
					Electronic Arts Inc. (EA) is an American video game company headquartered in Redwood City,
					California. Founded and incorporated on May 28, 1982 by Trip Hawkins, the company was a pioneer of the early home computer games
					industry and was notable for promoting the designers and programmers responsible for its games. As of March 2018,
					Electronic Arts is the second-largest gaming company in the Americas and Europe by revenue and market capitalization after Activision
					Blizzard and ahead of Take-Two Interactive and Ubisoft. Currently, EA develops and publishes games including EA
					Sports titles FIFA, Madden NFL, NHL, NCAA Football, NBA Live, and SSX. Other EA established franchises includes
					Battlefield, Need for Speed, The Sims, Medal of Honor, Command & Conquer, as well as newer franchises such as Crysis, Dead Space,
					Mass Effect, Dragon Age, Army of Two, Titanfall and Star Wars: Knights of the Old Republic, produced in partnership
					with LucasArts. EA also owns and operates major gaming studios, EA Tiburon in Orlando, EA Vancouver in Burnaby,
					BioWare in Edmonton aswell as Austin, and DICE in Sweden and Los Angeles. <a href="https://en.wikipedia.org/wiki/Electronic_Arts">Source wikipedia</a>
				</p>

				{ data.GenreSales && data.GenreSales["Electronic Arts"] && Object.keys(data.GenreSales["Electronic Arts"]).length > 0  ? <BarChart data={data.GenreSales["Electronic Arts"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
        		{ data.ConsoleSales &&  data.ConsoleSales["Electronic Arts"] && Object.keys(data.ConsoleSales["Electronic Arts"]).length > 0  ? <BarChart data={data.ConsoleSales["Electronic Arts"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
			</div>
			<div>
				<img src={ActivisionLogo} width='150' alt="Activision" className="logo" />

				<p>
					Activision Publishing, Inc. is an American video game publisher. It was founded on October 1,
					1979 and was the world's first independent developer and distributor of video games for gaming consoles. Its first
					products were cartridges for the Atari 2600 video console system published from July 1980 for the US market and from
					August 1981 for the international market (UK). As of January 2017, Activision is one of the largest third-party video game
					publishers in the world and was the top publisher for 2016 in the United States. Its parent company is Activision Blizzard,
					formed from the merger of Activision and Vivendi Games on July 9, 2008, an entity which became a completely independent
					company on July 25, 2013 when Activision Blizzard purchased the remaining shares from then majority owner Vivendi.
					Its CEO was Eric Hirshberg until March 2018. <a href="https://en.wikipedia.org/wiki/Activision">Source wikipedia</a>
				</p>

				{ data.GenreSales && data.GenreSales["Activision"] && Object.keys(data.GenreSales["Activision"]).length > 0  ? <BarChart data={data.GenreSales["Activision"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
        		{ data.ConsoleSales &&  data.ConsoleSales["Activision"] && Object.keys(data.ConsoleSales["Activision"]).length > 0  ? <BarChart data={data.ConsoleSales["Activision"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
			</div>
			<div>
				<img src={SonyLogo} width='150' alt="Sony" className="logo" />

				<p>
					Sony Interactive Entertainment LLC (SIE) is a multinational video game and digital entertainment
					company that is a wholly owned subsidiary of Japanese conglomerate Sony. The company was founded in Tokyo, Japan, and
					established on November 16, 1993, as Sony Computer Entertainment (SCE), to handle Sony's venture into video game
					development through its PlayStation brand. Since the successful launch of the original PlayStation console in 1994, the company has
					been developing the PlayStation lineup of home video game consoles and accessories. Expanding into North America and
					other countries, the company quickly became Sony's main resource for research and development in video games and
					interactive entertainment. In April 2016, SCE and Sony Network Entertainment International was restructured and reorganized
					into Sony Interactive Entertainment, carrying over the operations and primary objectives from both companies. The same
					year, SIE moved its headquarters from Tokyo to San Mateo, California. Sony Interactive Entertainment handles the
					research and development, production, and sales of both hardware and software for the PlayStation video game systems. SIE
					is also a developer and publisher of video game titles, and operates several subsidiaries in Sony's largest markets: North America, Europe
					and Asia. By August 2018, the company had sold more than 525 million PlayStation consoles	worldwide. <a href="https://en.wikipedia.org/wiki/Sony">Source wikipedia</a> 
				</p>

				{ data.GenreSales && data.GenreSales["Sony Computer Entertainment"] && Object.keys(data.GenreSales["Sony Computer Entertainment"]).length > 0  ? <BarChart data={data.GenreSales["Sony Computer Entertainment"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
        		{ data.ConsoleSales &&  data.ConsoleSales["Sony Computer Entertainment"] && Object.keys(data.ConsoleSales["Sony Computer Entertainment"]).length > 0  ? <BarChart data={data.ConsoleSales["Sony Computer Entertainment"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
			</div>

			<div>
				<h5>Trends</h5>

				<p>
					All the publishers have released multiple games between the years it is interesting to look into
					the number of releases
					of the different publishers. This shows the years in which the companies were active. EA has the
					most releases as shown
					in the graph below, if you compare this to the first graph EA still has less sales then
					Nintendo.
				</p>

				{ data.ReleasesPerPublisher && Object.keys(data.ReleasesPerPublisher).length > 0  ? <BarChart data={data.ReleasesPerPublisher} xScaleLinear={false} axisTitle="Releases" topN={4} /> : "" }

				<div>
					{ data.ReleaseTrends && data.ReleaseTrends["Nintendo"] && Object.keys(data.ReleaseTrends["Nintendo"]).length > 0  ? <LineChart data={data.ReleaseTrends["Nintendo"]} yAxisTitle="Releases" xAxisTitle="Releases Nintendo" /> : "" }
					{ data.ReleaseTrends && data.ReleaseTrends["Electronic Arts"] && Object.keys(data.ReleaseTrends["Electronic Arts"]).length > 0  ? <LineChart data={data.ReleaseTrends["Electronic Arts"]} yAxisTitle="Releases" xAxisTitle="Releases EA" /> : "" }
					{ data.ReleaseTrends && data.ReleaseTrends["Activision"] && Object.keys(data.ReleaseTrends["Activision"]).length > 0  ? <LineChart data={data.ReleaseTrends["Activision"]} yAxisTitle="Releases" xAxisTitle="Releases Activision" /> : "" }
					{ data.ReleaseTrends && data.ReleaseTrends["Sony Computer Entertainment"] && Object.keys(data.ReleaseTrends["Sony Computer Entertainment"]).length > 0  ? <LineChart data={data.ReleaseTrends["Sony Computer Entertainment"]} yAxisTitle="Releases" xAxisTitle="Releases Sony" /> : "" }
				</div>
			</div>
		</main>
	);
}

export default Publishers;
