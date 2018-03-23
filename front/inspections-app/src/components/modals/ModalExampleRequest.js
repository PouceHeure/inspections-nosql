import React from 'react';

import {FormGroup, Label,Input,Modal, ModalBody, ModalHeader, ModalFooter, Button, Col, Card, CardHeader, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';

const exampleFind = {
  "idRestaurant": 12
}
const exampleAggregate = [
  {
    "$group": {
      "_id": {
        "id": "$idRestaurant"
      },
      "time": {
        "$sum": 1
      }
    }
  }
]

class ModalExampleRequest extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       modal: false
     };

     this.toggle = this.toggle.bind(this);
   }

   toggle() {
     this.setState({
       modal: !this.state.modal
     });
   }

   render() {
     return (
       <div>
         <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
         <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
           <ModalHeader toggle={this.toggle}>Queries examples</ModalHeader>
           <ModalBody>
             <Card>
               <CardHeader>Find Query - Select kind</CardHeader>
               <CardBody>
                 <CardTitle>Input json like:</CardTitle>
               <CardText>{JSON.stringify(exampleFind)}</CardText>
               </CardBody>
             </Card>
             <br />
             <Card>
               <CardHeader>Aggregate Query - Select Aggregate</CardHeader>
               <CardBody>
                 <CardTitle>Input array of json like:</CardTitle>
               <CardText>{JSON.stringify(exampleAggregate)}</CardText>
               </CardBody>
             </Card>
           </ModalBody>
           <ModalFooter>
             <Button color="primary" onClick={this.toggle}>Understand</Button>{' '}
           </ModalFooter>
         </Modal>
       </div>
     );
  }
}



export default ModalExampleRequest;
