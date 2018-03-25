import React from 'react';

import {FormGroup, Label,Input,Modal, ModalBody, ModalHeader, ModalFooter, Button, Col } from 'reactstrap';
import loginConnection from './../../config/login.json'



class ModalConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      items: {}
    };
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    //this.props.sendData(true);
  }

  onChange(event){
    this.state.items[event.target.name] = event.target.value;
    console.log(this.state)
  }

  toggle() {
    if(!this.props.isConnected){
      this.setState({
        modal: !this.state.modal
      });
    }else{
      this.props.sendData(false)
    }
  }

  send(){
    this.toggle()
    this.props.sendData(this.checkPassword());
  }

  checkPassword(){
    var pass = this.state.items.password
    var login = this.state.items.login
    return(pass === loginConnection.password && login === loginConnection.login)
  }

  render() {

    let nameButton = "login"
    if(this.props.isConnected){
      nameButton = "Disconnect"
    }

    return (
      <div>
        <Button color = {this.props.connected} onClick={this.toggle}>{nameButton}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Connect</ModalHeader>
          <ModalBody>

            <FormGroup row>
              <Label for="login" sm={5}>login</Label>
              <Col sm={7}>
                <Input onChange={this.onChange} type="text" name="login" placeholder="login" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={5}>password</Label>
              <Col sm={7}>
                <Input onChange={this.onChange} type="password" name="password" placeholder="password" />
              </Col>
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.send.bind(this)}>Connect</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default ModalConnect;
