import { BrowserRouter, Routes,Route } from 'react-router-dom';
import SignupNew from './components/SignupNew';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Navbar1 from './components/Navbar1';
import Sidebar1 from './components/Sidebar1';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import User from './components/User';
// import PrivateRoutes from './components/PrivateRoutes';

function App() {
  // const loginToken = localStorage.getItem('login_token')

  return (
    <div className="App">

      <BrowserRouter>
      <Navbar1/>
        <Routes>
          <Route  path="/about" element={<About/>} />

          <Route  path="/signup" element={<SignupNew/>} />
          <Route  path="/login" element={<Login/>} />
          <Route  path="/" element={<Home/>} />
          <Route  path="/product" element={<Products/>} />
          <Route  path="/add-product" element={<AddProduct/>} />
          <Route  path="/user" element={<User/>} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
