import './App.css'
import  { useState } from 'react';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom'

function App() {



  return (
    <>
      
      <BrowserRouter>
      <NavBar  />
        <Routes>
          <Route path='/' element={<ItemListContainer/> } />
          <Route path="/categoria/:category" element={<ItemListContainer />} />
        </Routes>
      </BrowserRouter>
      
  
    </>
  )
}

export default App
