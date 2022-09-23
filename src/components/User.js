import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
function User() {
    const userdata = localStorage.getItem('user');

  return (
    <div className='login' >
      
      <Card style={{ width: '18rem' }}>
             <ListGroup variant="flush">
               <ListGroup.Item>Name: {JSON.parse(userdata).username}</ListGroup.Item>
               <ListGroup.Item>Email: {JSON.parse(userdata).email}</ListGroup.Item>
              
               
             </ListGroup>
           </Card>
    </div>
  )
}

export default User
