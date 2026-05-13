import React from 'react'
import Contacts from './pages/Contacts/Contacts'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Menu from './pages/Menu/Menu'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register'
import NotFound from './pages/NotFound/NotFound'

const App = () => {
  return (
    
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contacts/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/menu" element={<Menu/>}/>
      <Route path="*" element={<NotFound/>}/>
      
     </Routes>
    </BrowserRouter>
    
    
  )
}

export default App