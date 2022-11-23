import axios from "axios";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Navbar1 from "./Navbar1";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router";
import { productContext } from "./Context";
import ReactPaginate from "react-paginate";
import Pagination from "react-bootstrap/Pagination";
import queryString from "query-string";
import "./Pagination.css";
import { useSearchParams } from "react-router-dom";
import { debounce } from "debounce";

function Products() {
  const navigate = useNavigate();
  let arr=[];
  const { search, pathname } = useLocation();
  const { page} = queryString.parse(search);
  const { counter } = useContext(productContext);
  const [product, setProduct] = useState([]);
  const [currentqueries, setCurrentQueries] = useState({ skip: 0, limit: 5 });
  const [queryCategory, setQueryCategory] = useSearchParams(`?page=${page-1}`);
  let categoryItems=queryCategory.get('categoryItems')
  const [querySearch, setquerySearch] = useSearchParams(`?page=${page-1}`);
  let searchItems=querySearch.get('searchItems')
  const [key, setKey] = useState(searchItems);
  const [categoryKey, setCategoryKey] = useState(categoryItems?categoryItems.split(',').map(r => ([{_id: r, isChecked: true}])):[]);
  const [pageCounter, setPageCounter] = useState();
  const[categoryList,setCategoryList] = useState([]);
  let pageCount = Math.ceil(pageCounter / currentqueries.limit);
  useEffect(() => {
    (async () => {
      let ar = [];
      if(page){
        currentqueries.skip = `${page-1}`*currentqueries.limit;
        setquerySearch({page:`${page-1}`,categoryItems:ar?[ar]:'',searchItems: key?key:''});
        setQueryCategory({categoryItems:ar?[ar]:'',page:page?page:'',searchItems: key?key:''})
      }
      let queryString = `?skip=${currentqueries.skip}&limit=${currentqueries.limit}`;
      if (categoryKey ) {
        categoryKey.map(iteam => iteam.map(Item=>ar.push(Item._id)))
        queryString += `&category=${ar}`;
        setQueryCategory({categoryItems:ar?[ar]:'',page:page?page:'',searchItems: key?key:''})
      }
      if (key) {
        queryString += `&key=${key}`;
        setquerySearch({categoryItems:ar?[ar]:'',page:page?page:'',searchItems: key})
      }
      
      const result = await axios.get(`http://localhost:5002/AllDataWithFilterAndPagination${queryString}`);
        setPageCounter(result.data.totalRecords);
        setProduct(result.data.data);
        const allCategory = result.data.categoryList.map(r => {
          let find = categoryKey.find(t=>t[0]._id === r._id);
          if (find){
            return{...find[0]}
          } else { 
            return({...r,isChecked: false })
          }
        })
        setCategoryList(allCategory);
      })();
    }, [currentqueries,key,categoryItems,categoryKey,page,searchItems]);
    
    
  // Filtering category
  const filterCategory = (categoryName) => {
    // let checkbox = document.getElementById(`checkbox${categoryName}`);
    // if (checkbox.checked === true) {
    //   arr.push( [categoryName,true]);
    //   setCategoryKey(categoryKey?[...categoryKey,arr]:arr);
    // } else {
    //   let index = categoryKey.indexOf(categoryName);
    //   if (index>=-1) { 
    //     categoryKey.splice(index, 1);
    //     }
    //     setCategoryKey(categoryKey?[categoryKey]:categoryKey);
    //   }
    let findIndex = categoryList.findIndex(r => r._id === categoryName);
    categoryList[findIndex].isChecked = !categoryList[findIndex].isChecked;
    setCategoryList([...categoryList]);
        if (categoryList[findIndex].isChecked) {
            arr.push(categoryList[findIndex]);
            setCategoryKey(categoryKey ? [...categoryKey, arr] : arr);
        } else {
              let index = categoryKey.indexOf(categoryName);
                if (index>=-1) { 
                  categoryKey.splice(index, 1);
                }
                setCategoryKey(categoryKey?[...categoryKey]:categoryKey)
        }
};
  // ADD to cart product list
  const AddCart = async (id, name, price, quantity) => {
    let productData = (await localStorage.product)? JSON.parse(localStorage.product): [];
    let index = productData.findIndex((product) => product.id === id);
    if (index) {
      productData.splice( -1,index);
      index++;
      productData.push({ id: id, name: name, price: price, quantity: quantity });
      localStorage.product = JSON.stringify(productData);
      counter(productData.length);
    } else {
      alert("This product already exist");
    }
  };
  // Pagination
  const changePage = async ({ selected }) => {
    setCurrentQueries({skip: selected * currentqueries.limit,limit: currentqueries.limit,});
    let query = queryString.parse(search);
    query.page = `${selected + 1}`;
    query = queryString.stringify(query);
    navigate(`${pathname}?${query}`);
  };

  // Searching for products
  const debouncedSave = useCallback(debounce((keyData)=>setKey(keyData),1000),[])
  const searchData=(key)=>{
    debouncedSave(key)
}
  return (
    <div className="login">
      <Navbar1 />
      <h1>iStore Products</h1>
      <Form className="d-flex">
        <Form.Control
          type="search"
          defaultValue={searchItems?searchItems:''}
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => {
            searchData(e.target.value)
          }}
        />
      </Form>
      <div className="cat">
        {categoryList.map((category) => {
          const obj = { checked: category.isChecked ? 'checked' : '' };
          return (
            <div>
              <input onClick={() => filterCategory(`${category._id}`)} {...obj} className="cat"id={`checkbox${category._id}`}name="checkbox"type="checkbox"/>
              {category._id}
            </div>
          );
          })}
      </div>
      <Container>
        <Row>
          {product.length>0 ? <>
          {product.map((product, key) => {
            return (
              <Col>
                <div className="my-3">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={product.image} />
                    <ListGroup variant="flush">
                      <ListGroup.Item>Name: {product.name}</ListGroup.Item>
                      <ListGroup.Item>Price: {product.price}</ListGroup.Item>
                      <ListGroup.Item>
                        Category: {product.category}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Company: {product.company}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button
                          onClick={() => {
                            AddCart(
                              `${product._id}`,
                              `${product.name}`,
                              `${product.price}`,
                              1,
                              `${key + 1}`
                              );
                          }}
                        >
                          Add to cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>
              </Col>
            );
          })}
          <Pagination>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              forcePage={page ? page - 1 : 0}
              renderOnZeroPageCount={null}
              />
          </Pagination>
          </>:<>
          <h2>No product found</h2>
          </>}
        </Row>
      </Container>
    </div>
  );
}

export default Products;
