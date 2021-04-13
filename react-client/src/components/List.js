import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "http://localhost:3001/students";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:',result.data)
          //check if the user has logged in
          if(result.data.screen !== 'auth')
          {
            
            console.log('data in if:', result.data )
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
          setListError(true)
        });
      };  
    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/show/' + id
    });
  }

  return (
    <div>
      { data.length !== 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <ListGroup>
            {data.map((item, idx) => (
              <ListGroup.Item key={idx} >{item.username}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default withRouter(List);
