import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//
import List from './components/List';
import EditStudent from './components/EditStudent';
import EditArticle from './components/EditArticle';

import CreateAccount from './components/CreateAccount';
import ShowUser from './components/ShowStudent';
import ShowArticle from './components/ShowArticle';

import Home from './components/Home';
import Login from './components/Login';
import ListCourses from './components/ListCourses';
//
function App() {

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="navi" href="/home">Home</Nav.Link>
            <Nav.Link className="navi" href="/login">Login</Nav.Link>
            <Nav.Link className="navi"href="/list">List of Users</Nav.Link>
            <Nav.Link className="navi"href="/listCourses">List of Courses</Nav.Link>
            <Nav.Link className="navi"href="/create">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>          
          <Route render ={()=> < Home />} path="/home" /> 
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < List />} path="/list" />
          <Route render ={()=> < ListCourses />} path="/listCourses" />
          <Route render ={()=> < EditStudent />} path="/edit/:id" />
          <Route render ={()=> < CreateAccount/>} path="/create" />
          <Route render ={()=> < ShowUser />} path="/show/:id" />
          <Route render ={()=> < ShowArticle />} path="/showCourse/:id" />
          <Route render ={()=> < EditArticle />} path="/editarticle/:id" />

      </div>

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
