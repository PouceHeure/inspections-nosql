import React from 'react';
import { Col,Row } from 'reactstrap';
import Cards from '../components/cards/Cards'
import FormsResearch from '../components/forms/FormsResearch'


class Research extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items : []
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  jsonToParam(){
    var result = "?"
    for(var i in this.state.items){
      var key = i;
      var val = this.state.items[i];
      result += key+"="+val+"&"
    }
    return result
  }

  onSubmit(event){

    event.preventDefault()
    var args = this.jsonToParam();
    this.child.getInfoInspection(args);
  }

  onChange = (event) => {
    this.state.items[event.target.name] = event.target.value;
    console.log(this.state)
  }


  render() {
    return(
        <div>
          <Row>
          <Col xs="6" sm="3" className="research" style={{backgroundColor:"#EEE"}}>
            <FormsResearch connected={this.props.connected} onSubmit={this.onSubmit} onChange={this.onChange}/>
          </Col>
          <Col xs="6" sm={{ size: 9, offset: 3 }}>
            <Cards ref={instance => { this.child = instance;}} />
          </Col>
          </Row>
      </div>
    )
  }
}

export default Research;
