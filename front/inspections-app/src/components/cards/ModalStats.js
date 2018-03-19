import React  from 'react';
import './../../App.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import TabStats from './TabStats'


class ModalStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    console.log("receipt:"+JSON.stringify(this.props.data))
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
        <Button onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> Restaurant : {this.props.data.name}</ModalHeader>
          <ModalBody>
            <h6>Address : {this.props.data.street} {this.props.data.zipcode} - {this.props.data.borough}</h6>
            <h6>Cook : {this.props.data.cuisineType} </h6>
          <TabStats data={this.props.id} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Skip</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalStats;
