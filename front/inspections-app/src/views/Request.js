import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input ,Row, Progress} from 'reactstrap';

import configAPI from './../config/api_config.json';

import FormsRequest from './../components/forms/FormsRequest'

class FormsResearch extends React.Component {

  render(){
    return (
      <div>

            <FormsRequest />
      </div>
    )
  }
}


export default FormsResearch;
