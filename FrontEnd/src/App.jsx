import './App.css'
import Navbar from './assets/Components/Navbar/Navbar'
import Shop from './assets/Pages/Shop'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ShopCategory from './assets/Pages/ShopCategory'
import Product from './assets/Pages/Product'
import Card from './assets/Pages/Card'
import LoginSignup from './assets/Pages/LoginSignup'
import Footer from './assets/Components/Footer/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />}></Route>
          <Route path='/men' element={<ShopCategory/>} category='men' />
          <Route path='/women' element={<ShopCategory/>} category='women' />
          <Route path='/kids' element={<ShopCategory/>} category='kid' />
          <Route path='/product' element={<Product />} />
          <Route path=':productId' element={<Product />} />

          <Route path='/card' element={<Card />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>

        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
