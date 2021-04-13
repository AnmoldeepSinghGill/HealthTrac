import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditStudent(props) {
  const [student, setStudent] = useState({ _id: '', firstName: '', lastName: '', 
  email: '',studentNumber: '',password: '' ,address:'',city:'',phoneNumber:'',program:''});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3001/students/" + props.match.params.id;
  
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {

      const result = await axios(apiUrl);
      setStudent(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName: student.firstName, lastName: student.lastName, 
      email: student.email,studentNumber: student.studentNumber, password: student.password ,address: student.address, city:student.city,phoneNumber: student.phoneNumber, program: student.program};
    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={updateStudent}>
        <Form.Group>
        <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={student.email} onChange={onChange} />
          </Form.Group>
     
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" name="password" id="password" placeholder="Enter password"  onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" id="city" placeholder="Enter City" value={student.city} onChange={onChange} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phone number" value={student.phoneNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Program</Form.Label>
            <Form.Control type="text" name="program" id="program" placeholder="Enter program" value={student.program} onChange={onChange} />
          </Form.Group>
          <Form.Group>
          <Form.Label>address</Form.Label>
            <Form.Control type="text" name="address" id="address" placeholder="Enter address" value={student.address} onChange={onChange} />
          </Form.Group>
          
        
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditStudent);
