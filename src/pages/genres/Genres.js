import React, { useState, useEffect } from 'react';

import BarChart from '../../components/charts/BarChart'

function Genres(props) {
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

    return { GenreSales: GetGenreSales(data), PublisherSales:  GetPublisherSales(data), ConsoleSales:  GetConsoleSales(data) };
  }

  function GetGenreSales(data) {
    var genreSalesDictonary = {};

    data.forEach((d) => {
      if (!genreSalesDictonary[d.Genre]) {
        genreSalesDictonary[d.Genre] = 0;
      }

      genreSalesDictonary[d.Genre] += parseFloat(d.Global_Sales) || 0
    });

    return genreSalesDictonary;
  }

  function GetPublisherSales(data) {
    var publisherSalesDictonary = {};

    data.forEach((d) => {
      if (!publisherSalesDictonary[d.Genre]) {
        publisherSalesDictonary[d.Genre] = {};
      }

      if (!publisherSalesDictonary[d.Genre][d.Publisher]) {
        publisherSalesDictonary[d.Genre][d.Publisher] = 0;
      }
      
      publisherSalesDictonary[d.Genre][d.Publisher] += parseFloat(d.Global_Sales) || 0
    });

    return publisherSalesDictonary;
  }

  function GetConsoleSales(data) {
    var consoleSalesDictonary = {};

    data.forEach((d) => {
      if (!consoleSalesDictonary[d.Genre]) {
        consoleSalesDictonary[d.Genre] = {};
      }

      if (!consoleSalesDictonary[d.Genre][d.Platform]) {
        consoleSalesDictonary[d.Genre][d.Platform] = 0;
      }
      
      consoleSalesDictonary[d.Genre][d.Platform] += parseFloat(d.Global_Sales) || 0
    });

    return consoleSalesDictonary;
  }

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Genre's</h1>
      </div>

      <p>
        All the games in the dataset have genre's, on this page we look into the popularity of each genre on each console
        and of each publisher. This can show on which genre a company is focusing and which genre's are popular on different consoles.
      </p>

      { data.GenreSales && Object.keys(data.GenreSales).length > 0 ? <BarChart data={data.GenreSales} xScaleLinear={false} axisTitle="Sales in millions" topN={5}/> : "" }

      <div>
        <h5>Action</h5>

        <p>
          The action game is a video game genre that emphasizes physical challenges, including hand–eye coordination and
          reaction-time. The genre includes a large variety of sub-genres, such as fighting games, beat 'em ups, shooter
          games and platform games which are widely considered the most important action games, though multiplayer
          online battle arena and some real-time strategy games are also considered to be action games. In an action game,
          the player typically controls a character often in the form of a protagonist or avatar. This player character
          must navigate a level, collecting objects, avoiding obstacles, and battling enemies with their natural skills
          as well as weapons and other tools at their disposal. At the end of a level or group of levels, the player must
          often defeat a boss enemy that is more challenging and often a major antagonist in the game's story. Enemy attacks
          and obstacles deplete the player character's health and lives, and the player receives a Game over when they
          run out of lives. Alternatively, the player gets to the end of the game by finishing a sequence of levels and
          seeing the credits. But some action games, such as early arcade games, are unbeatable and have an indefinite
          number of levels; with the player's only goal being to get as far as they can to maximize their score. <a href="https://en.wikipedia.org/wiki/Action_game">Source wikipedia</a>
        </p>


        { data.PublisherSales && data.PublisherSales["Action"] && Object.keys(data.PublisherSales["Action"]).length > 0  ? <BarChart data={data.PublisherSales["Action"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
        { data.ConsoleSales &&  data.ConsoleSales["Action"] && Object.keys(data.ConsoleSales["Action"]).length > 0  ? <BarChart data={data.ConsoleSales["Action"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
      </div>
      <div>
        <h5>Sports</h5>

        <p>
          A sports game is a video game genre that simulates the practice of sports. Most sports have been recreated
          with a game, including team sports, track and field, extreme sports and combat sports. Some games emphasize actually
          playing the sport (such as the Madden NFL series), whilst others emphasize strategy and sport management
          (such as Championship Manager and Out of the Park Baseball). Some, such as Need for Speed, Arch Rivals and Punch-Out!!,
          satirize the sport for comic effect. This genre has been popular throughout the history of video games and
          is competitive, just like real-world sports. A number of game series feature the names and characteristics of real
          teams and players, and are updated annually to reflect real-world changes. Sports genre is one of the oldest
          genres in gaming history. <a href="https://en.wikipedia.org/wiki/Sports_game">Source wikipedia</a>
        </p>


        { data.PublisherSales && data.PublisherSales["Sports"] && Object.keys(data.PublisherSales["Sports"]).length > 0  ? <BarChart data={data.PublisherSales["Sports"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
        { data.ConsoleSales &&  data.ConsoleSales["Sports"] && Object.keys(data.ConsoleSales["Sports"]).length > 0  ? <BarChart data={data.ConsoleSales["Sports"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
      </div>
      <div>
        <h5>Shooter</h5>

        <p>
          Shooter games are a subgenre of action game, which often test the player's speed and reaction time. It includes
          many subgenres that have the commonality of focusing on the actions of the avatar using some sort of weapons.
          Usually this weapon is a gun or some other long-range weapon. A common resource found in many shooter games is
          ammunition. Most commonly, the purpose of a shooter game is to shoot opponents and proceed through missions without
          the player character being killed or dying. A shooting game is a genre of video game where the player has limited
          spatial control of his or her character, and the focus is almost entirely on the defeat of the character's enemies
          using long-range weaponry. <a href="https://en.wikipedia.org/wiki/Shooter_game">Source wikipedia</a>
        </p>

        { data.PublisherSales && data.PublisherSales["Shooter"] && Object.keys(data.PublisherSales["Shooter"]).length > 0  ? <BarChart data={data.PublisherSales["Shooter"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
        { data.ConsoleSales &&  data.ConsoleSales["Shooter"] && Object.keys(data.ConsoleSales["Shooter"]).length > 0  ? <BarChart data={data.ConsoleSales["Shooter"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
      </div>
      <div>
        <h5>Role-Playing</h5>

        <p>
          A role-playing game (sometimes spelled roleplaying game and abbreviated to RPG) is a game in which players
          assume the roles of characters in a fictional setting. Players take responsibility for acting out these roles
          within a narrative, either through literal acting or through a process of structured decision-making of character
          development. Actions taken within many games succeed or fail according to a formal system of rules and guidelines.
          There are several forms of RPG. The original form, sometimes called the tabletop role-playing game (TRPG), is
          conducted through discussion, whereas in live action role-playing games (LARP) players physically perform their
          characters' actions. In both of these forms, an arranger called a game master (GM) usually decides on the
          rules and setting to be used, acting as referee, while each of the other players plays the role of a single character.
          Several varieties of RPG also exist in electronic media, such as multi-player text-based MUDs and their graphics-based
          successors, massively multiplayer online role-playing games (MMORPGs). Role-playing games also include single-player
          role-playing video games in which players control a character or team who undertake quests, and may include capabilities
          that advance using statistical mechanics. These games often share settings and rules with tabletop RPGs, but
          emphasize character advancement more than collaborative storytelling. Despite this variety of forms, some
          game forms such as trading card games and wargames that are related to role-playing games may not be included.
          Role-playing activity may sometimes be present in such games, but it is not the primary focus. The term is
          also sometimes used to describe roleplay simulation games and exercises used in teaching, training, and academic
          research. <a href="https://en.wikipedia.org/wiki/Role-playing_video_game">Source wikipedia</a>
        </p>


        { data.PublisherSales && data.PublisherSales["Role-Playing"] && Object.keys(data.PublisherSales["Role-Playing"]).length > 0  ? <BarChart data={data.PublisherSales["Role-Playing"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
        { data.ConsoleSales &&  data.ConsoleSales["Role-Playing"] && Object.keys(data.ConsoleSales["Role-Playing"]).length > 0  ? <BarChart data={data.ConsoleSales["Role-Playing"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
      </div>

      <div>
        <h5>Platform</h5>

        <p>
          Platform games, or platformers, are a video game genre and subgenre of action game. In a platformer the player
          controlled character must jump and climb between suspended platforms while avoiding obstacles. Environments often
          feature uneven terrain of varying height that must be traversed. The player often has some control over the height
          and distance of jumps to avoid letting their character fall to their death or miss necessary jumps. The most
          common unifying element of games of this genre is the jump button, but now there are other alternatives like
          swiping a touchscreen. Other acrobatic maneuvers may factor into the gameplay as well, such as swinging from
          objects such as vines or grappling hooks, as in Ristar or Bionic Commando, or bouncing from springboards or trampolines,
          as in Alpha Waves. These mechanics, even in the context of other genres, are commonly called platforming, a verbification
          of platform. Games where jumping is automated completely, such as 3D games in The Legend of Zelda series, fall
          outside of the genre. Platform games originated in the early 1980s, which were often about climbing ladders as
          much as jumping, with 3D successors popularized in the mid-1990s. The term describes games where jumping on platforms
          is an integral part of the gameplay and came into use after the genre had been established, no later than 1983.
          The genre is frequently combined with elements of other genres, such as the shooter elements in Contra, Beat
          'em up elements of Viewtiful Joe, adventure elements of Flashback, or role-playing game elements of Castlevania:
          Symphony of the Night. While commonly associated with console gaming, there have been many important platform
          games released to video arcades, as well as for handheld game consoles and home computers. North America, Europe
          and Japan have played major parts in the genre's evolution. Platform themes range from cartoon-like games to
          science fiction and fantasy epics. At one point, platform games were the most popular genre of video game. At
          the peak of their popularity, it is estimated that between one-quarter and one-third of console games were platformers.
          No genre either before or since has been able to achieve a similar market share. As of 2006, the genre had become
          far less dominant, representing a two percentage market share as compared to fifteen percent in 1998, but
          is still commercially viable, with a number of games selling in the millions of units. Since 2010, a variety
          of endless running platformers for mobile devices have brought renewed popularity to the genre. <a href="https://en.wikipedia.org/wiki/Platform_game">Source wikipedia</a>
        </p>


        { data.PublisherSales && data.PublisherSales["Platform"] && Object.keys(data.PublisherSales["Platform"]).length > 0  ? <BarChart data={data.PublisherSales["Platform"]} xScaleLinear={true} axisTitle="Sales in millions" topN={12} /> : "" }
        { data.ConsoleSales &&  data.ConsoleSales["Platform"] && Object.keys(data.ConsoleSales["Platform"]).length > 0  ? <BarChart data={data.ConsoleSales["Platform"]} xScaleLinear={true} axisTitle="Sales in millions" topN={10} /> : "" }
      </div>
    </main>
  );
}

export default Genres;
