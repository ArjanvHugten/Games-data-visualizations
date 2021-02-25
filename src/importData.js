import * as d3 from 'd3';
import vgsales from './assets/data/vgsales.csv';

export default function ImportData(){
    return d3.csv(vgsales).then(data => {
        return data;
    }).catch(err => {
        console.log(`Could not load data with error: ${err}`)
    })
}