import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import queryString, { parse } from 'query-string';
import axios from 'axios';
import Swal from 'sweetalert2';
function UpdateProduct() {
    const [name, setName]= useState('');
    const [price, setPrice]= useState('');
    const [category, setCategory]= useState();
    const [company, setCompany]= useState('');
    const [product, setProduct]= useState([]);
    const [error, setError]= useState(false);
    const navigate = useNavigate()
    const {search} = useLocation();
    const{_id} = queryString.parse(search);
    const user = localStorage.getItem('user');
// console.log(_id);

    useEffect(()=>{
        (async()=>{

            await axios.get(`http://localhost:5000/product/${_id}`).then((response)=>{setProduct(response.data)})
        })();
    },[_id])
    
            const updateProduct = async()=>{
                if(!product ){
                    setError(true);
                    return false;
                }else{
                  let data =  await axios.put(`http://localhost:5000/product/${_id}`,{
                    name:name || (product.name) ,
                    price:parseInt(price) ||parseInt((product.name)) ,
                    category:category || (product.name),
                    userId: JSON.parse(user)._id,
                    company:company || (product.name)
                  })
                  if(data){
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Your Product has been updated successfully",
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
       <h1>Update Your Product here</h1>
{console.log(product)
}
       <div >

      <input type="text" placeholder='Enter product name' defaultValue={product[0]?.name}  className='inputBox' onChange={(e)=>setName(e.target.value)} />
     {error && !name && <span className='invalid-input' > Product name</span>}


      <input type="number" placeholder='Enter product price ' className='inputBox' defaultValue={product[0]?.price} onChange={(e)=>setPrice(e.target.value)} />
     {error && !price && <span className='invalid-input' >Price</span>} 

     <select className='inputBox' defaultValue={product[0]?.category}   onChange={(e)=>setCategory(e.target.value)} >
            
      <option>select category</option>
      <option value="laptop">Laptop</option>
      <option value="Mobile">Mobile</option>
      <option value="Shoes">Shoes</option>
    </select>
      {error && !category && <span className='invalid-input' >Enter category</span>} 

      <input type="text" placeholder='Enter company name' defaultValue={product[0]?.company}  className='inputBox' onChange={(e)=>setCompany(e.target.value)} />
      {error && !company && <span className='invalid-input' >Enter company name</span>}
        
      <button type="submit" className='appButton' onClick={updateProduct} >Update Product</button>

       </div>
    </div>
    </div>
  )
}

export default UpdateProduct
