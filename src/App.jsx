import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import ItemDetailContainer from './components/ItemListContainer/ItemDetailContainer';

function App() {



  return (
    <>
      
      <BrowserRouter>
      <NavBar  />
        <Routes>
          <Route path='/' element={<ItemListContainer/> } />
          <Route path="/categoria/:category" element={<ItemListContainer />} />
          <Route path="/pelicula/:id" element={<ItemDetailContainer />} />
        </Routes>
      </BrowserRouter>
      
  
    </>
  )
}

export default App
