import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input,Row } from 'reactstrap';

import ReactJson from 'react-json-view'
import configAPI from './../../config/api_config.json';


const urlQuery = configAPI.url_base+configAPI.post_query

var http = require('http')
var request=require('request');
var concatStream = require('concat-stream')


function createOption(url,request){
  var options = {
      url: url,
      method: 'POST',
      processData: false,
      headers: {
        'Content-Type': 'application/json'
      },
      json: true,
      body: request

  };
  return options
}


class FormsResearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "kind" : "find",
      "query" : "",
      "response" : {}
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);

    //JSON.parse("{\"$match\":{\"restaurant.name\":\"Toast\"}}")

    //this.props.sendData(true);
  }

//[{"$match":{"restaurant.name":"Toast"}}]
// {







  stringToArrayJSON(value){
    try {
      var valueRequest = {"q":JSON.parse(value)}
      return valueRequest
      } catch(e) {
        return null
     }
  }

  onChange(event){
    console.log(event.target.value)
    if(event.target.name == "kind"){
        this.state.kind = event.target.value
        console.log("Before :"+this.state.queryUrl)
    }

    if(event.target.name === "query"){
      this.setState({'query':event.target.value})
      console.log(event.target.value)
    }
  }


  requestAPI(url,body){
    return new Promise(function(resolve,reject){
      console.log(url)
      var optionPost = createOption(url,body)
      request(optionPost, function(err, res, body) {
       console.log("send:"+JSON.stringify(optionPost.json))
       if (res && (res.statusCode === 200 || res.statusCode === 201)) {
         resolve(body)
       }})
    })
  }

  onClick(event){
    event.preventDefault();
    var url = urlQuery+this.state.kind
    var q = this.stringToArrayJSON(this.state.query)
    if(q != null){
    this.requestAPI(url,q).then(function(resolve){
      console.log(resolve)
      //this.state.response = resolve
      //this.setState({"response":JSON.stringify(resolve)})
      this.setState({"response":resolve})
    }.bind(this))
    }else{
      alert("Bad request")
    }
   }

//{"idRestaurant":12}

//{this.state.response}
  render(){
    return (
      <Form>
        <Row>
        <Col xs="6" sm={{ size: 6, offset: 0 }}>
        <FormGroup>
          <Label for="exampleSelectMulti">Query Type</Label>
        <Input type="select" name="kind" onChange={this.onChange}>
            <option value="find">Find</option>
            <option value="aggregate">Aggregate</option>
          </Input>
        </FormGroup>

      <FormGroup sm={{'offset':6,'size':6}}>
        <Label for="exampleText">Json Request</Label>
      <Input type="textarea" name="query" onChange={this.onChange}/>
      </FormGroup>
       <Button onClick={this.onClick}>Request</Button>
    </Col>
    <Col xs="6" sm={{ size: 6, offset: 0 }}>
      <ReactJson src={this.state.response} />
    </Col>
  </Row>
    </Form>
    )
  }
}


export default FormsResearch;
