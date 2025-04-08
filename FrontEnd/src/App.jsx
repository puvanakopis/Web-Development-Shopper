import './App.css'
import Navbar from './assets/Components/Navbar/Navbar'
import Shop from './assets/Pages/Shop'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ShopCategory from './assets/Pages/ShopCategory'
import Product from './assets/Pages/Product'
import Card from './assets/Pages/Card'
import LoginSignup from './assets/Pages/LoginSignup'
import Footer from './assets/Components/Footer/Footer'
import men_banner from './assets/Components/Assets/Frontend_Assets/banner_mens.png'
import women_banner from './assets/Components/Assets/Frontend_Assets/banner_women.png'
import kid_banner from './assets/Components/Assets/Frontend_Assets/banner_kids.png'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/men' element={<ShopCategory banner={men_banner} category='men' />} />
          <Route path='/women' element={<ShopCategory banner={women_banner} category='women' />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category='kid' />} />

          <Route path='/product' element={<Product />} />
          <Route path=':productId' element={<Product />} />

          <Route path='/card' element={<Card />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
