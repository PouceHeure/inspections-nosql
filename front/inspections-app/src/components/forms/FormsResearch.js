import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class FormsResearch extends React.Component {

  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>

        {
        this.props.connected ?
        <div>
        <h3>ID</h3>
        <FormGroup row>
          <Label for="idInspection" sm={5}>Id Inspection</Label>
          <Col sm={7}>
            <Input onChange={this.props.onChange} type="text" name="idInspection" placeholder="string" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="idResaurant" sm={5}>Id Restaurant</Label>
          <Col sm={7}>
            <Input onChange={this.props.onChange} type="text" name="idResaurant" placeholder="string" />
          </Col>
        </FormGroup>
      </div>
        : null
      }

        <h3>Information Restaurant</h3>

        <FormGroup row>
          <Label for="name" sm={3}>Name</Label>
          <Col sm={9}>
            <Input onChange={this.props.onChange} type="text" name="name" placeholder="string" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="borough" sm={3}>Borough</Label>
          <Col sm={9}>
            <Input onChange={this.props.onChange} type="text" name="borough" placeholder="string" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="type" sm={3}>Type</Label>
          <Col sm={9}>
            <Input onChange={this.props.onChange} type="text" name="type" placeholder="string" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="date" sm={3}>Date</Label>
          <Col sm={9}>
            <Input onChange={this.props.onChange} type="text" name="date" placeholder="yyyy" />
          </Col>
        </FormGroup>
        <h3>Limitation</h3>
        <FormGroup row>
         <Label for="exampleSelectMulti" sm={3}>Limit</Label>
         <Col sm={9}>
         <Input onChange={this.props.onChange} type="select" name="limit">
            <option>0</option>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>30</option>
            <option>50</option>
         </Input>
         </Col>
       </FormGroup>
       <FormGroup row>
         <Col>
           <Button>Submit</Button>
         </Col>
       </FormGroup>
      </Form>
    );
  }
}

export default FormsResearch;
