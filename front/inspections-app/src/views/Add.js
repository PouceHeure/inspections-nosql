import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input ,Row, Progress} from 'reactstrap';

import configAPI from './../config/api_config.json';


var http = require('http')
var request=require('request');
var concatStream = require('concat-stream')

var link = configAPI.url_base+configAPI.get_verify

function createOption(json){
  var options = {
      url: configAPI.url_base+configAPI.post_add,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      json: json
  };
  return options
}

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addRestaurant : true,
      restaurantFound : 0,
      restaurantInfo : {},
      inspectionInfo : {},
      verifyInfo : {},
      inspectionPercent : 0,
      resaurantPercent : 0
    };
  }

  currentStatePercent(){
      var currentInspect = Object.keys(this.state.inspectionInfo).length;
      this.setState({inspectionPercent : (currentInspect/6*100)})
      var currentResto = Object.keys(this.state.restaurantInfo).length;
      this.setState({resaurantPercent : (currentResto/7*100)})
  }


  jsonToParam(json){
    var param = "?"
    for(var key in json){
      param += key+"="+json[key]+"&"
    }
    return param
  }

  onChangeRestaurant = (event) => {
    this.state.restaurantInfo[event.target.name] = event.target.value;
    console.log(this.state)
    this.currentStatePercent()
  }

  onVerifyRestaurant = (event) => {
    this.state.verifyInfo[event.target.name] = event.target.value;
    console.log(this.state)
  }

  getVerify(args){
    return new Promise(function(resolve, reject) {
    http.get((link+args), function callback(response) {
      console.log("Url:"+(link+args))
      response.pipe(concatStream(function(data) {
        if (data.length > 0) {
          var jsonObject = JSON.parse(data);
          resolve(jsonObject)
          console.log(JSON.stringify(jsonObject))
        } else {
          reject("Not found")
        }
      }))
    })})
  }

  onSubmitVerify(event) {
    event.preventDefault();
    var args = this.jsonToParam(this.state.verifyInfo)
    this.getVerify(args).then(response => {
      if (response.found) {
        this.state.restaurantInfo = response.restaurant
        this.state.inspectionInfo["idRestaurant"] = response.idRestaurant
        this.setState({
          restaurantFound: 1
        })
        this.currentStatePercent()

      } else {
        this.setState({
          restaurantFound: -1
        })
      }
    });
  }

  onChangeInspection = (event) => {
    console.log("done")
    this.state.inspectionInfo[event.target.name] = event.target.value;
    console.log(this.state)
    this.currentStatePercent()
  }

  onChangeCheck = (event) => {
        if(event.target.id === "add"){
          this.setState({addRestaurant : true})
        }else if(event.target.id === "load"){
          this.setState({addRestaurant : false})
        }
        this.state.restaurantInfo = {}
        this.currentStatePercent();
  }


  onSubmitAdd(event){
    event.preventDefault();
    if(this.state.resaurantPercent === 100 && this.state.resaurantPercent === 100){
    var jsonResult = this.state.inspectionInfo
    jsonResult["restaurant"] = this.state.restaurantInfo
    if(jsonResult.idRestaurant == null){
      jsonResult.idRestaurant = jsonResult.restaurant.zipcode + jsonResult.restaurant.phone
    }
    console.log(jsonResult)
    request(createOption(jsonResult), function(err, res, body) {
     if (res && (res.statusCode === 200 || res.statusCode === 201)) {
       console.log(body);
     }
   });
   }else{
      alert("Give more information")
   }
  }

  render() {

    let bgColor = "info"

    switch (this.state.restaurantFound) {
      case 0:
          bgColor = "info"
        break;

      case 1:
          bgColor = "success"
          break;

      case -1:
          bgColor = "danger"
          break

      default:
          bgColor = "info"

    }

    return (
      <Form onSubmit={this.onSubmitAdd.bind(this)}>
      <Col sm={{size:8,offset:2}}>
      {/* Check add or load */}
            <Row>
            <Col>
              <FormGroup inline check sm={6}>
                <Label check size="lg">
                  <Input type="radio" defaultChecked={true} name="addLoad" id="add" onChange={this.onChangeCheck}
                      value={this.props.value}/>{' '}
                  Add new restaurant
                </Label>
              </FormGroup>
            </Col>
            <Col >
            <FormGroup inline check sm={6}>
              <Label check size="lg">
                <Input type="radio" name="addLoad" id="load" onChange={this.onChangeCheck} />{' '}
                Load restaurant already saved
              </Label>
            </FormGroup>
            </Col>
            </Row>

        <Col>
        <Row>
        {/* form add restaurant */}

        <Progress bar color="success" value={this.state.resaurantPercent/3}><h2>{Math.round(this.state.resaurantPercent)+"%"}</h2></Progress>

         {this.state.addRestaurant ?
        <Col>
            <h2 className="restaurant_info"> New Restaurant </h2>
            <FormGroup row>
             <Label for="name" sm={3}>Name</Label>
             <Col sm={9}>
                  <Input type="name" name="name" onChange={this.onChangeRestaurant}/>
             </Col>
           </FormGroup>
           <FormGroup row>
            <Label for="borough" sm={3}>Borough</Label>
            <Col sm={9}>
                 <Input type="borough" name="borough" onChange={this.onChangeRestaurant}/>
            </Col>
          </FormGroup>
          <FormGroup row>
           <Label for="buildingnum" sm={3}>Buildingnum</Label>
           <Col sm={9}>
                <Input type="buildingnum" name="buildingnum" onChange={this.onChangeRestaurant}/>
           </Col>
         </FormGroup>
         <FormGroup row>
          <Label for="street" sm={3}>Street</Label>
          <Col sm={9}>
               <Input type="street" name="street" onChange={this.onChangeRestaurant}/>
          </Col>
        </FormGroup>
        <FormGroup row>
         <Label for="phone" sm={3}>Phone</Label>
         <Col sm={9}>
              <Input type="phone" name="phone" onChange={this.onChangeRestaurant}/>
         </Col>
       </FormGroup>
       <FormGroup row>
        <Label for="zipcode" sm={3}>Zipcode</Label>
        <Col sm={9}>
             <Input type="zipcode" name="zipcode" onChange={this.onChangeRestaurant}/>
        </Col>
      </FormGroup>
       <FormGroup row>
        <Label for="cuisineType" sm={3}>Cuisine Type</Label>
        <Col sm={9}>
             <Input type="cuisineType" name="cuisineType" onChange={this.onChangeRestaurant}/>
        </Col>
      </FormGroup>
    </Col>

      : null}

      {/* form load restaurant */}


      {!this.state.addRestaurant ?

      <Col>
      <h2 className="restaurant_info"> Load Restaurant </h2>
      <FormGroup row>
       <Label for="phone" sm={3}>Phone</Label>
       <Col sm={9}>
            <Input type="phone" name="phone" onChange={this.onVerifyRestaurant}/>
       </Col>
     </FormGroup>

      <FormGroup row>
       <Label for="zipcode" sm={3}>Zip code</Label>
       <Col sm={9}>
            <Input type="zipcode" name="zipcode" onChange={this.onVerifyRestaurant}/>
       </Col>
     </FormGroup>
        <FormGroup >
         <Button onClick={this.onSubmitVerify.bind(this)} color={bgColor}> Verify</Button>{' '}
        </FormGroup>
      </Col>
        : null}
      </Row>
    </Col>



        {/*Inspections information*/}
        <Col sm={12}>
        <Row>
              <Progress bar color="info" value={this.state.inspectionPercent/3}><h2> {Math.round(this.state.inspectionPercent)+"%"} </h2> </Progress>
        <Col>
        <h2 className="inspection_info" >Inspection Information</h2>
        <FormGroup row>
         <Label for="date" sm={3}>Date</Label>
         <Col sm={9}>
              <Input type="date" name="inspectionDate" onChange={this.onChangeInspection}/>
         </Col>
       </FormGroup>
        <FormGroup row>
          <Label for="violationCode" sm={3}>violationCode</Label>
          <Col sm={9}>
            <Input onChange={this.onChangeInspection} type="text" name="violationCode"/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="violationDescription" sm={3}>violationDescription</Label>
          <Col sm={9}>
            <Input onChange={this.onChangeInspection} type="text" name="violationDescription"/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="criticalFlag" sm={3}>Type</Label>
          <Col sm={9}>
            <Input onChange={this.onChangeInspection} type="text" name="criticalFlag" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="score" sm={3}>Score</Label>
          <Col sm={9}>
            <Input onChange={this.onChangeInspection} type="text" name="score"/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="grade" sm={3}>Grade</Label>
          <Col sm={9}>
            <Input onChange={this.onChangeInspection} type="text" name="grade"/>
          </Col>
        </FormGroup>

        {/* Submit part */}
         <FormGroup row>
           <Col>
             <Button>Submit</Button>
           </Col>
         </FormGroup>
         </Col>
         </Row>
         </Col>

         </Col>
        </Form>
    );
  }
}

export default Add;
