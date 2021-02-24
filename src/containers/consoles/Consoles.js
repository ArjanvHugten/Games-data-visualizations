import React from 'react';
import BarChart from '../../components/barchart/BarChart'

function Consoles() {
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

        <BarChart />
    </main>
  );
}

export default Consoles;
