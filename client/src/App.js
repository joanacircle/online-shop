import './App.css';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Shop } from "./pages/shop/Shop";
import { Contact } from "./pages/Contact";
import { Cart } from "./pages/cart/Cart";
import { MainContextProvider } from './context/Context';
import { CustomTextInput } from './pages/CustomTextInput';
import { Login } from './pages/member/Login'
import { Regitster } from './pages/member/Regitster'

function App() {
  return (
    <div className="App">
      <MainContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Shop />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path='/cart' element={<Cart />} />
            {/* <Route path='/test' element={<CustomTextInput />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/regitster' element={<Regitster />} />
          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </div>
  );
}

export default App;
