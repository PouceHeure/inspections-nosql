import React from 'react';
import Research from './Research';
import Add from './Add';
import Request from './Request'
import ModalConnect from './../components/modals/ModalConnect'

import {ButtonGroup, Jumbotron,TabContent, TabPane, Nav, NavItem, NavLink,  Button,Row } from 'reactstrap';
import classnames from 'classnames';

const debugMode = false;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      connected: false,
      tryToConnect: false
    };
  }

  toggle(tab) {
    if (debugMode || ((tab != 3 && tab != 4) || this.state.connected)) {
      this.setState({
        activeTab: tab
      });
    }else{
      alert("You need to be connected")
    }
  }

  getData(data){
        this.setState({connected:data})
   }

  render() {


    let bgColor = "danger"

    if(this.state.connected){
      bgColor = "success"
    }

    return (
      <div>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}>
              Research
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}>
              Add
            </NavLink>
          </NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '4' })}
            onClick={() => { this.toggle('4'); }}>
            Request
          </NavLink>

          <NavItem>
            <NavLink>
            <ModalConnect sendData={this.getData.bind(this)} isConnected={this.state.connected} connected={bgColor} />
          </NavLink>
        </NavItem>

        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
           <Jumbotron>
            <h1 className="display-3">Inspection App</h1>
            <p className="lead">Research and add easily and fastly</p>
            <ModalConnect sendData={this.getData.bind(this)} connected={bgColor} isConnected={this.state.connected} />
           <hr className="my-2" />
         <p>Add and Request features only be used by an admistrator, please connect with admin account</p>
             <h6>With this app you can ...</h6>
             <ButtonGroup size="lg">
                  <Button className="button_home" onClick={() => { this.toggle('2'); }} color="primary">Research</Button>
                  <Button className="button_home" onClick={() => { this.toggle('3'); }} color="primary">Add</Button>
                <Button className="button_home" onClick={() => { this.toggle('4'); }} color="primary">Request</Button>
            </ButtonGroup>
           </Jumbotron>

          </TabPane>
          <TabPane tabId="2">
            <h1 className="title_tab"> Research Inspection </h1>
            <Research />
          </TabPane>
          <TabPane tabId="3">
            <h1 className="title_tab"> Add Inspection </h1>
            <Add />
          </TabPane>
          <TabPane tabId="4">
            <h1 className="title_tab"> Request Inspection </h1>
          <Request />
          </TabPane>

        </TabContent>

      </div>
    );
  }
}

export default App
