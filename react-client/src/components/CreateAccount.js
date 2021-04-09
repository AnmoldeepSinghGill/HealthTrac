import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateAccount(props) {
  const [account, setAccount] = useState({ _id: '', firstName: '', lastName: '', 
                email: '',AccountNumber: '',password: '' ,address:'',city:'',phoneNumber:'',accountType:''});
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3001/";

  const saveAccount = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName: account.firstName, lastName: account.lastName, 
      email: account.email,accountNumber: account.accountNumber, password: account.password ,address: account.address, city:account.city,phoneNumber: account.phoneNumber, program: account.program};
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setAccount({...account, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={saveAccount}>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={account.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={account.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={account.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Account Number</Form.Label>
            <Form.Control type="number" name="AccountNumber" id="AccountNumber" placeholder="Enter Account  number" value={account.accountNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" name="password" id="password" placeholder="Enter password" value={account.password} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" id="city" placeholder="Enter City" value={account.city} onChange={onChange} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phone number" value={account.phoneNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Account Type</Form.Label>
          <Form.Control as="select" name="accountType" id="accountType" placeholder="Enter Account Type" value={account.accountType} onChange={onChange}>
            <option>PATIENT</option>
            <option>NURSE</option>
    </Form.Control>
      
          </Form.Group>
          <Form.Group>
          <Form.Label>address</Form.Label>
            <Form.Control type="text" name="address" id="address" placeholder="Enter address" value={account.address} onChange={onChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateAccount);
