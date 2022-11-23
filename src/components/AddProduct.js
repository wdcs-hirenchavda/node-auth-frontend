import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Form from 'react-bootstrap/Form';
function AddProduct() {
    const navigate = useNavigate()
    const [name, setName]= useState('');
    const [price, setPrice]= useState('');
    const [category, setCategory]= useState();
    const [company, setCompany]= useState('');
    const [error, setError]= useState(false);
    const user = localStorage.getItem('user');
    
    // console.log(JSON.parse(user)._id);
    

    const addProduct = async()=>{
        if(!name || !price || !company || !category){
            setError(true);
            return false;
        }else{
            let data = await axios.post(`http://localhost:5000/product`,{
                
                    name:name,
                    price:parseInt(price),
                    category:category,
                    userId: JSON.parse(user)._id,
                    company:company
                
            })
            if(data){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Your Product has been Added successfully",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  navigate('/product')
            }
        } 
        
    } 
  return (
    <div>
       <div className='product ' >
       <h1>Add Your Product here</h1>

       <div className='my-2 '>

      <input type="text" placeholder='Enter product name ' className='inputBox' onChange={(e)=>setName(e.target.value)} />
     {error && !name && <span className='invalid-input' >Enter Product name</span>}


      <input type="number" placeholder='Enter product price ' className='inputBox' onChange={(e)=>setPrice(e.target.value)} />
     {error && !price && <span className='invalid-input' >Enter price</span>} 

     <select className='inputBox'  onChange={(e)=>setCategory(e.target.value)} >
            
      <option>select category</option>
      <option value="laptop">Laptop</option>
      <option value="Mobile">Mobile</option>
      <option value="Shoes">Shoes</option>
    </select>
      {error && !category && <span className='invalid-input' >Enter category</span>} 

      <input type="text" placeholder='Enter company name' className='inputBox' onChange={(e)=>setCompany(e.target.value)} />
      {error && !company && <span className='invalid-input' >Enter company name</span>}
        
      <button type="submit" className='appButton' onClick={addProduct} >Add Product</button>

       </div>
    </div>
    </div>
  )
}

export default AddProduct
