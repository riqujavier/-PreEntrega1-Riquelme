import './App.css'
import  { useState } from 'react';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [categoria, setCategoria] = useState(null);
  const handleCategoryFilter = (category) => {
    setCategoria(category === categoria ? null : category);
};


  return (
    <>
      
      <div className="app">
            <NavBar handleCategoryFilter={handleCategoryFilter} />
            <ItemListContainer categoria={categoria} />
      
      </div>
    </>
  )
}

export default App
