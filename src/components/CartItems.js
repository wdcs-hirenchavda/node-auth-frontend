import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { productContext } from './Context';

function CartItems() {
   let productItems =  localStorage.product? JSON.parse(localStorage.product): [];
   const [removedItems,setRemovedItems] = useState([]);
   const[stock , setStock] = useState(productItems||[...removedItems]);
   const { counter } = useContext(productContext);

   useEffect(() =>{
    localStorage.product = JSON.stringify(stock)
    counter(stock.length)
   },[stock,counter,removedItems])

   const increment = (key)=>{
    const currentItem = [...stock]
        currentItem[key-1].quantity += 1
        localStorage.product = JSON.stringify(currentItem)
        setStock(currentItem) 
   }
   const decrement = (key)=>{
    const currentItem = [...stock]
    if(currentItem[key-1].quantity <=1){
      currentItem[key-1].quantity = 1
      setStock(currentItem) 
      localStorage.product = JSON.stringify(currentItem)
    }else{
      currentItem[key-1].quantity -= 1
      setStock(currentItem) 
      localStorage.product = JSON.stringify(currentItem)
    }
   }
   
   const removeItem = (id)=>{
    const index =stock.findIndex(product => product.id === id);
    if (index >= -1) {
      stock.splice(index, 1);
      localStorage.product = JSON.stringify(stock)
    }
    setRemovedItems(...stock);
  }
  return (
    <div className='tableItem' >
    {
      productItems.length>0 ? <>
        <Table className='tableItem' striped variant='dark' >
      <thead>
        <tr>
          <th>No</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Sub total </th>
          <th>Action</th>
        </tr>
      </thead>
     {
       stock.map((Item, key) => {
         return (
           <tbody>
            <tr>
              <td>{key+1}</td>
              <td>{Item.name}</td>
              <td>{Item.price}</td>
              <td> <Button variant="outline-info" onClick={()=>{decrement(key+1)}} >-</Button>{' '}{ Item.quantity}<Button variant="outline-info" onClick={()=>increment(key+1)} >+</Button>{' '}</td>
              <td>{Item.price*Item.quantity}</td>
              <td><Button onClick={()=>{removeItem(Item.id)}} >Remove</Button></td>
            </tr>
            </tbody>
                  );
                })
              }
              </Table>
              <button className='btn btn-danger total' >Total Amount:{stock.reduce((total, item)=>total+(item.price*item.quantity),0)}</button>
              </>
              :
              <div>
              <h2>Your Cart is Empty Please add product to your cart</h2>
              </div>
          }
          </div>
  )
}

export default CartItems
