import * as d3 from 'd3';

import vgsales from '../assets/data/vgsales.csv';
import vgsalesWithRating from '../assets/data/vgsales_rating.csv';

export const ImportVgSalesData = function (){
    return d3.csv(vgsales).then(data => {
        return data;
    }).catch(err => {
        console.log(`Could not load data with error: ${err}`)
    })
}

export const ImportVgSalesDataWithRating = function (){
    return d3.csv(vgsalesWithRating).then(data => {
        return data;
    }).catch(err => {
        console.log(`Could not load data with error: ${err}`)
    })
}