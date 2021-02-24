import React from 'react';

function Genres() {
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Genre's</h1>
        </div>

        <p>
            All the games in the dataset have genre's, on this page we look into the popularity of each genre on each console
            and of each publisher. This can show on which genre a company is focusing and which genre's are popular on different consoles.
        </p>
    </main>
  );
}

export default Genres;
