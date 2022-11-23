import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function User() {
    let  userData = localStorage.getItem('user');
    userData = JSON.parse(userData);

  return (
    <div className='login' >
      
      <Card style={{ width: '18rem' }}>
             <ListGroup variant="flush">
               <ListGroup.Item>Name: {userData.username}</ListGroup.Item>
               <ListGroup.Item>Email: {userData.email}</ListGroup.Item>
              </ListGroup>
           </Card>
          

    </div>
  )
}

export default User
