import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import ItemDetailContainer from './components/ItemListContainer/ItemDetailContainer';
import { CartProvider } from './components/CartContext/CartContext';
import Cart from './components/CartWidget/Cart';

function App() {



  return (
    <>
      <CartProvider>
      <BrowserRouter>
      <NavBar  />
        <Routes>
          <Route path='/' element={<ItemListContainer/> } />
          <Route path="/categoria/:category" element={<ItemListContainer />} />
          <Route path="/pelicula/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
  
    </>
  )
}

export default App
