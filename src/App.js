import { BrowserRouter, Routes,Route } from 'react-router-dom';
import SignupNew from './components/SignupNew';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
  const loginToken = localStorage.getItem('login_token')

  return (
    <div className="App">

      
      <BrowserRouter>
        <Routes>
          {loginToken ? 
          <Route  path="/about" element={<About/>} />
          :
          <Route>

          <Route  path="/signup" element={<SignupNew/>} />
          <Route  path="/login" element={<Login/>} />
          <Route  path="/" element={<Home/>} />
          </Route>

          }
          
          
          {/* <Route  path="/about" element={<About/>} /> */}
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
