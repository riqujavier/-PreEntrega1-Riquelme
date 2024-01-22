/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {


  return (
    <>
      
      <div className="app">
      <NavBar />
      <ItemListContainer greeting="Bienvenidos a ViendoPelis, proximamente el sitio estara terminado. " />
      </div>
    </>
  )
}

export default App
