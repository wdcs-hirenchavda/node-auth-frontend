import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Navbar1 from './Navbar1';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function Products() {
    const navigate = useNavigate();
    const [product,setProduct] = useState([])

    useEffect( () => {
        axios.get(`http://localhost:5000/product`).then((response) =>{setProduct(response.data) });
    },[])
  return (
    <div className='login' >
      <Navbar1/>
      
        <h1>iStore Products</h1>
        <Button onClick={()=>{navigate('/add-product')}} >Add Product</Button>
        <div className='my-3' >
        <Container>
          <Row>
           {product.map((product) => { return(
            <Col>
            <div className='my-3' >

             <Card style={{ width: '18rem' }}>
             <ListGroup variant="flush">
               <ListGroup.Item>Name:{product.name}</ListGroup.Item>
               <ListGroup.Item>Price:{product.price}</ListGroup.Item>
               <ListGroup.Item>Category:{product.category}</ListGroup.Item>
               <ListGroup.Item>Company:{product.company}</ListGroup.Item>
               <ListGroup.Item>
                <Button onClick={()=>{navigate('/add-product')}} >Update Product</Button>
               </ListGroup.Item>
             </ListGroup>
           </Card>
            </div>
            </Col>
           )
           })}
            </Row>
        </Container>
        </div>
      </div>
  )
}

export default Products
