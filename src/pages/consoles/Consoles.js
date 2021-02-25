import React, { useState, useEffect } from 'react';

import BarChart from '../../components/charts/BarChart'
import LineChart from '../../components/charts/LineChart'

function Consoles(props) {
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

    return { ConsoleSales: GetConsoleSales(data), PublisherSales:  GetPublisherSales(data), GenreSales:  GetGenreSales(data), ReleasesPerConsole: GetReleasesPerConsole(data), ReleaseTrends: GetReleaseTrends(data) };
  }

  function GetConsoleSales(data) {
    var consolesSalesDictonary = {};

    data.forEach((d) => {
      if (!consolesSalesDictonary[d.Platform]) {
        consolesSalesDictonary[d.Platform] = 0;
      }

      consolesSalesDictonary[d.Platform] += parseFloat(d.Global_Sales) || 0
    });

    return consolesSalesDictonary;
  }

  function GetPublisherSales(data) {
    var publisherSalesDictonary = {};

    data.forEach((d) => {
      if (!publisherSalesDictonary[d.Platform]) {
        publisherSalesDictonary[d.Platform] = {};
      }

      if (!publisherSalesDictonary[d.Platform][d.Publisher]) {
        publisherSalesDictonary[d.Platform][d.Publisher] = 0;
      }
      
      publisherSalesDictonary[d.Platform][d.Publisher] += parseFloat(d.Global_Sales) || 0
    });

    return publisherSalesDictonary;
  }

  function GetGenreSales(data) {
    var genreSalesDictonary = {};

    data.forEach((d) => {
      if (!genreSalesDictonary[d.Platform]) {
        genreSalesDictonary[d.Platform] = {};
      }

      if (!genreSalesDictonary[d.Platform][d.Genre]) {
        genreSalesDictonary[d.Platform][d.Genre] = 0;
      }
      
      genreSalesDictonary[d.Platform][d.Genre] += parseFloat(d.Global_Sales) || 0
    });

    return genreSalesDictonary;
  }

  function GetReleasesPerConsole(data) {
    var releasesDictonary = {};

    data.forEach((d) => {
      if (!releasesDictonary[d.Platform]) {
        releasesDictonary[d.Platform] = 0;
      }

      releasesDictonary[d.Platform]++;
    });

    return releasesDictonary;
  }

  function GetReleaseTrends(data) {
    var releasesTrendsDictonary = {};

    data.forEach((d) => {
      if (d.Year !== "N/A" && d.Year !== '1985' && d.Year !== '2020') {
        if (!releasesTrendsDictonary[d.Platform]) {
          releasesTrendsDictonary[d.Platform] = {};
        }
  
        if (!releasesTrendsDictonary[d.Platform][d.Year]) {
          releasesTrendsDictonary[d.Platform][d.Year] = 0;
        }

        releasesTrendsDictonary[d.Platform][d.Year]++;
      }
    });

    return releasesTrendsDictonary;
  }
  
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Consoles</h1>
        </div>
        <p>
            On this page you can have a look into the top 5 consoles in the period of gaming till 2016. The PS2 is the
            console with the
            most sales in this period followed by the XBOX, PS3, Wii and DS.
        </p>

        { data.ConsoleSales && Object.keys(data.ConsoleSales).length > 0 ? <BarChart data={data.ConsoleSales} xScaleLinear={false} axisTitle="Sales in millions" topN={5}/> : "" }

        <div>
          <h5>Playstation 2</h5>
          <p>
            The PlayStation 2 (PS2) is a home video game console that was developed by Sony Computer Entertainment. It is the
            successor to the original PlayStation console and is the second installment in the PlayStation lineup of consoles.
            It was released in 2000 and competed with Sega's Dreamcast, Nintendo's GameCube and Microsoft's Xbox in the sixth
            generation of video game consoles. Announced in 1999, the PlayStation 2 offered backwards compatibility for its
            predecessor's DualShock controller, as well as for its games. The PlayStation 2 is the best-selling video
            game console of all time, selling over 155 million units, with 150 million confirmed by Sony in 2011. More than 3,874
            game titles have been released for the PS2 since launch, and more than 1.5 billion copies have been sold. Sony
            later manufactured several smaller, lighter revisions of the console known as Slimline models in 2004. In 2006,
            Sony announced and launched its successor, the PlayStation 3. Even with the release of its successor, the PlayStation
            2 remained popular well into the seventh generation and continued to be produced until January 4, 2013, when
            Sony finally announced that the PlayStation 2 had been discontinued after 12 years of production – one of the
            longest runs for a video game console. Despite the announcement, new games for the console continued to be produced
            until the end of 2013, including Final Fantasy XI: Seekers of Adoulin for Japan, FIFA 13 for North America, and
            Pro Evolution Soccer 2014 for Europe. Repair services for the system in Japan ended on September 7, 2018. <a href="https://en.wikipedia.org/wiki/PlayStation_2">Source wikipedia</a>
          </p>
          
          { data.GenreSales && data.GenreSales["PS2"] && Object.keys(data.GenreSales["PS2"]).length > 0  ? <BarChart data={data.GenreSales["PS2"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
          { data.PublisherSales &&  data.PublisherSales["PS2"] && Object.keys(data.PublisherSales["PS2"]).length > 0  ? <BarChart data={data.PublisherSales["PS2"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
        </div>

        <div>
          <h5>XBOX 360</h5>
          <p>
            The Xbox 360 is a home video game console developed by Microsoft. As the successor to the original Xbox, it is
            the second console in the Xbox series. It competed with Sony's PlayStation 3 and Nintendo's Wii as part of the
            seventh generation of video game consoles. It was officially unveiled on MTV on May 12, 2005, with detailed launch
            and game information announced later that month at the 2005 E3 expo. The Xbox 360 features an online service,
            Xbox Live, which was expanded from its previous iteration on the original Xbox and received regular updates during
            the console's lifetime. Available in free and subscription-based varieties, Xbox Live allows users to: play games
            online; download games (through Xbox Live Arcade) and game demos; purchase and stream music, television programs,
            and films through the Xbox Music and Xbox Video portals; and access third-party content services through media
            streaming applications. In addition to online multimedia features, it allows users to stream media from local
            PCs. Several peripherals have been released, including wireless controllers, expanded hard drive storage, and
            the Kinect motion sensing camera. The release of these additional services and peripherals helped the Xbox brand
            grow from gaming-only to encompassing all multimedia, turning it into a hub for living-room computing entertainment.
            Launched worldwide across 2005–2006, the Xbox 360 was initially in short supply in many regions, including North
            America and Europe. The earliest versions of the console suffered from a high failure rate, indicated by the
            so-called "Red Ring of Death", necessitating an extension of the device's warranty period. Microsoft released
            two redesigned models of the console: the Xbox 360 S in 2010, and the Xbox 360 E in 2013. As of June 2014, 84
            million Xbox 360 consoles have been sold worldwide, making it the sixth-highest-selling video game console in
            history, and the highest-selling console made by an American company. Although not the best-selling console of
            its generation, the Xbox 360 was deemed by TechRadar to be the most influential through its emphasis on digital
            media distribution and multiplayer gaming on Xbox Live. The Xbox 360's successor, the Xbox One, was released
            on November 22, 2013. On April 20, 2016, Microsoft announced that it would end the production of new Xbox 360
            hardware, although the company will continue to support the platform. <a href="https://en.wikipedia.org/wiki/Xbox_360">Source wikipedia</a>
          </p>

          { data.GenreSales && data.GenreSales["X360"] && Object.keys(data.GenreSales["X360"]).length > 0  ? <BarChart data={data.GenreSales["X360"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
          { data.PublisherSales &&  data.PublisherSales["X360"] && Object.keys(data.PublisherSales["X360"]).length > 0  ? <BarChart data={data.PublisherSales["X360"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
        </div>

        <div>
          <h5>Playstation 3</h5>
          <p>
            The PlayStation 3 (PS3) is a home video game console developed by Sony Computer Entertainment. It is the successor
            to PlayStation 2, and is part of the PlayStation brand of consoles. It was first released on November 11, 2006,
            in Japan, November 17, 2006, in North America, and March 23, 2007, in Europe and Australia. The PlayStation 3
            competed mainly against consoles such as Microsoft's Xbox 360 and Nintendo's Wii as part of the seventh generation
            of video game consoles. The console was first officially announced at E3 2005, and was released at the end of
            2006. It was the first console to use Blu-ray Disc as its primary storage medium. The console was the first PlayStation
            to integrate social gaming services, including being the first to introduce Sony's social gaming service, PlayStation
            Network, and its remote connectivity with PlayStation Portable and PlayStation Vita, being able to remote control
            the console from the devices. In September 2009, the Slim model of the PlayStation 3 was released. It no longer
            provided the hardware ability to run PS2 games. It was lighter and thinner than the original version, and featured
            a redesigned logo and marketing design, as well as a minor start-up change in software. A Super Slim variation
            was then released in late 2012, further refining and redesigning the console. During its early years, the system
            had a critically negative reception, due to its high price ($599 for a 60 gigabyte model, and $499 for a 20 GB
            model), a complex processor architecture and a lack of quality games, but was praised for its Blu-ray capabilities
            and "untapped potential". The reception would get more positive over time. The system had a slow start in the
            market but managed to recover, particularly after the introduction of the Slim model. Its successor, the PlayStation
            4, was released later in November 2013. On September 29, 2015, Sony confirmed that sales of the PlayStation 3
            were to be discontinued in New Zealand, but the system remained in production in other markets. Shipments of
            new units to Europe and Australia ended in March 2016, followed by North America which ended in October 2016.
            Heading into 2017, Japan was the last territory where new units were still being produced until May 29,2017,
            when Sony confirmed the PlayStation 3 was discontinued in Japan. <a href="https://en.wikipedia.org/wiki/PlayStation_3">Source wikipedia</a>
          </p>
          
          { data.GenreSales && data.GenreSales["PS3"] && Object.keys(data.GenreSales["PS3"]).length > 0  ? <BarChart data={data.GenreSales["PS3"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
          { data.PublisherSales &&  data.PublisherSales["PS3"] && Object.keys(data.PublisherSales["PS3"]).length > 0  ? <BarChart data={data.PublisherSales["PS3"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
        </div>

        <div>
          <h5>Wii</h5>
          <p>
            The Wii is a home video game console released by Nintendo on November 19, 2006. As a seventh-generation
            console, the Wii competed with Microsoft's Xbox 360 and Sony's PlayStation 3. Nintendo states that its console targets a broader
            demographic than that of the two others. As of the first quarter of 2016, the Wii led its generation over the
            PlayStation 3 and Xbox 360 in worldwide sales, with more than 101 million units sold; in December 2009, the console
            broke the sales record for a single month in the United States. The Wii introduced the Wii Remote
            controller, which can be used as a handheld pointing device and which detects movement in three dimensions. Another
            feature of the console is the now defunct WiiConnect24, which enabled Wii to receive messages and updates over the
            Internet while in standby mode. Like other seventh-generation consoles, it features a game download service, called
            "Virtual Console", which features emulated games from past Nintendo consoles. It succeeded the GameCube, and early
            models are fully backward-compatible with all GameCube games and most accessories. Nintendo first spoke of the
            console at the E3 2004 press conference and later unveiled it at E3 2005. Nintendo CEO Satoru Iwata revealed a
            prototype of the controller at the September 2005 Tokyo Game Show. At E3 2006, the console won the first of several
            awards. By December 8, 2006, it had completed its launch in the four key markets. In late 2011, Nintendo released a
            reconfigured model, the "Wii Family Edition", which lacks Nintendo GameCube compatibility; this model was not released in
            Japan. The Wii Mini, Nintendo's first major console redesign since the compact SNES, succeeded the standard
            Wii model and was released first in Canada on December 7, 2012. The Wii Mini can only play Wii optical discs, as
            it omits GameCube compatibility and all networking capabilities; this model was not released in Japan,
            Australia, or New Zealand. The Wii's successor, the Wii U, was released on November 18, 2012. On October 20, 2013, Nintendo
            confirmed it had discontinued production of the Wii in Japan and Europe. <a href="https://en.wikipedia.org/wiki/Wii">Source wikipedia</a>
          </p>


          { data.GenreSales && data.GenreSales["Wii"] && Object.keys(data.GenreSales["Wii"]).length > 0  ? <BarChart data={data.GenreSales["Wii"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
          { data.PublisherSales &&  data.PublisherSales["Wii"] && Object.keys(data.PublisherSales["Wii"]).length > 0  ? <BarChart data={data.PublisherSales["Wii"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
        </div>

        <div>
          <h5>Nintendo DS</h5>

          <p>
            The Nintendo DS, or simply DS, is a dual-screen handheld game console developed and released by Nintendo.
            The device went on sale in North America on November 21, 2004. The DS, short for "Developers' System" or "Dual Screen",
            introduced distinctive new features to handheld gaming: two LCD screens working in tandem (the bottom one
            featuring a touchscreen), a built-in microphone, and support for wireless connectivity. Both screens are encompassed
            within a clamshell design similar to the Game Boy Advance SP. The Nintendo DS also features the ability for
            multiple DS consoles to directly interact with each other over Wi-Fi within a short range without the need to connect
            to an existing wireless network. Alternatively, they could interact online using the now-defunct Nintendo
            Wi-Fi Connection service. Its main competitor was Sony's PlayStation Portable as part of the seventh generation
            era. It was likened to the Nintendo 64 from the 1990s, which led to several N64 ports such as Super Mario 64 DS
            and Diddy Kong Racing DS, among others. Prior to its release, the Nintendo DS was marketed as an experimental,
            "third pillar" in Nintendo's console lineup, meant to complement the Game Boy Advance and GameCube. However,
            backward compatibility with Game Boy Advance titles and strong sales ultimately established it as the successor to
            the Game Boy series. On March 2, 2006, Nintendo launched the Nintendo DS Lite, a slimmer and lighter redesign of
            the original Nintendo DS with brighter screens. On November 1, 2008, Nintendo released the Nintendo DSi, another
            redesign with several hardware improvements and new features. All Nintendo DS models combined have sold 154.02
            million units, making it the best selling handheld game console to date, and the second best selling video game
            console of all time behind Sony's PlayStation 2. The Nintendo DS line was succeeded by the Nintendo 3DS family 
            in 2011, which maintains backward compatibility with nearly all Nintendo DS software. <a href="https://en.wikipedia.org/wiki/Nintendo_DS">Source wikipedia</a>
          </p>

          { data.GenreSales && data.GenreSales["DS"] && Object.keys(data.GenreSales["DS"]).length > 0  ? <BarChart data={data.GenreSales["DS"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
          { data.PublisherSales && data.PublisherSales["DS"] && Object.keys(data.PublisherSales["DS"]).length > 0  ? <BarChart data={data.PublisherSales["DS"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
        </div>

        <div>
          <h5>Trends</h5>
          <p>
            All the consoles have multiple games released in the years that the console is relevant. The graphs below show
            in what years the consoles where active and what the most succesfull consoles were.
          </p>

          { data.ReleasesPerConsole && Object.keys(data.ReleasesPerConsole).length > 0  ? <BarChart data={data.ReleasesPerConsole} xScaleLinear={false} axisTitle="Releases" topN={5} /> : "" }
          <div>
            { data.ReleaseTrends && data.ReleaseTrends["PS2"] && Object.keys(data.ReleaseTrends["PS2"]).length > 0  ? <LineChart data={data.ReleaseTrends["PS2"]} yAxisTitle="Releases" xAxisTitle="Releases PS2" /> : "" }
            { data.ReleaseTrends && data.ReleaseTrends["X360"] && Object.keys(data.ReleaseTrends["X360"]).length > 0  ? <LineChart data={data.ReleaseTrends["X360"]} yAxisTitle="Releases" xAxisTitle="Releases XBOX360" /> : "" }
            { data.ReleaseTrends && data.ReleaseTrends["PS3"] && Object.keys(data.ReleaseTrends["PS3"]).length > 0  ? <LineChart data={data.ReleaseTrends["PS3"]} yAxisTitle="Releases" xAxisTitle="Releases PS3" /> : "" }
            { data.ReleaseTrends && data.ReleaseTrends["Wii"] && Object.keys(data.ReleaseTrends["Wii"]).length > 0  ? <LineChart data={data.ReleaseTrends["Wii"]} yAxisTitle="Releases" xAxisTitle="Releases Wii" /> : "" }
            { data.ReleaseTrends && data.ReleaseTrends["DS"] && Object.keys(data.ReleaseTrends["DS"]).length > 0  ? <LineChart data={data.ReleaseTrends["DS"]} yAxisTitle="Releases" xAxisTitle="Releases DS" /> : "" }
          </div>
        </div>
    </main>
  );
}

export default Consoles;
