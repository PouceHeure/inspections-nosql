import React from 'react';
import './../../App.css';
import {Table} from 'reactstrap';

import configAPI from './../../config/api_config.json';


var http = require('http')
var concatStream = require('concat-stream')

var linkStats = configAPI.url_base+configAPI.get_stats

class TabStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       elements : {}
    };
    this.getInfoStats(this.props.data)
    //console.log("ID:"+this.props.data)
  }

  getInfoStats(args){
    this.getInfoAPI(args).then(response => {
            this.setState({elements: response})
            console.log(response)
            this.forceUpdate()
        });
  }


  getInfoAPI(argsValue) {
    var args = "?idRestaurant="+argsValue
     return new Promise(function(resolve, reject) {
       console.log(args)
       http.get((linkStats+args), function callback(response) {
         response.pipe(concatStream(function(data) {
           if (data.length > 0) {
             var jsonObject = JSON.parse(data);
             resolve(jsonObject)
           } else {
             reject("not found")
           }
         }))
       })
     })
 }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Query</th>
            <th>Result</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Number Inspections</th>
          <td>{this.state.elements.numberInspec}</td>

          </tr>
          <tr>
            <th scope="row">Avg Score per year</th>
            <td>{this.state.elements.avgPerYear}</td>

          </tr>
          <tr>
            <th scope="row">Max score</th>
            <td>{this.state.elements.scoreMax}</td>

          </tr>
          <tr>
            <th scope="row">Avg score</th>
            <td>{this.state.elements.avgScore}</td>

          </tr>
        </tbody>
      </Table>
    );
  }
}

export default TabStats;
