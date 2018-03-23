import React, { Component } from 'react';
import './../../App.css';
import {Row, Col,Card, CardHeader, CardBody } from 'reactstrap';

import ModalStats from './ModalStats'
import configAPI from './../../config/api_config.json';





var http = require('http')
var concatStream = require('concat-stream')

var link = configAPI.url_base+configAPI.get_read

class Cards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      elements: []
    };
    this.getInfoInspection("")
  }

  getInfoInspection(args){
    this.getInfoAPI(args).then(response => {
            this.setState({elements: response})
            this.forceUpdate()
        });
  }


  getInfoAPI(args) {
     return new Promise(function(resolve, reject) {
       http.get((link+args), function callback(response) {
         console.log("Url:"+(link+args))
         response.pipe(concatStream(function(data) {
           if (data.length > 0) {
             var jsonObject = JSON.parse(data);
             //console.log(JSON.stringify(jsonObject))
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
      <div className="animated fadeIn">
        <Row>
        {this.state.elements.map(({_id,restaurant,inspectionDate,criticalFlag,score,idRestaurant}, i) => (
          <Col xs="10" sm="4" md="4" style={{marginTop:'5px'}} key={_id}>
            <Card>
              <CardHeader className="border-primary">
              Inspection Restaurant
              </CardHeader>
              <CardBody>
              <h5 className="title_restaurant"> <b>Restaurant Information </b></h5>
                    <h6><b className="info">Name:</b> {restaurant.name} </h6>
                    <h6 ><b className="info">Borough:</b> {restaurant.borough} </h6>
                    <h6 ><b className="info">Buildingnum:</b> {restaurant.buildingnum} </h6>
                    <h6 ><b className="info">Street:</b> {restaurant.street} </h6>
                <h5 className="title_inspection" ><b>Inspection Information</b></h5>
                    <h6 ><b className="info">Date:</b> {inspectionDate} </h6>
                    <h6 ><b className="info">Critical:</b> {criticalFlag} </h6>
                    <h6 ><b className="info">Score:</b> {score} </h6>
                  <ModalStats buttonLabel="Restaurant Stats" data={restaurant} id={idRestaurant}/>
              </CardBody>
            </Card>
          </Col>
        ))}

        </Row>
        </div>

    )
  }
}

export default Cards;
