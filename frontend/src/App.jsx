import './App.css'
import "react-toastify/dist/ReactToastify.css"
import Title from './Components/Shered/Title.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import {HomePage} from './Pages/HomePage.jsx'
import Footer from './Components/Shered/Footer.jsx'
import Header from './Components/Shered/Header.jsx'
import { ToastContainer } from 'react-toastify'
import Signin from './Pages/Signin.jsx'
import Signup from './Pages/Signup.jsx'
import Description from './Pages/Description.jsx'
import Cart from './Pages/Cart.jsx'
import Shipping from './Pages/Shipping.jsx'
import Payment from './Pages/Payment.jsx'
import SubmitOrder from './Pages/SubmitOrder.jsx'
import Search from './Pages/Search.jsx'

function App() {

  return (
    <BrowserRouter>
      <div className='d-flex flex-column side-allPage min-width'>
      <ToastContainer position="bottom-center" limit={1}/>
        <Header/>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/signin' element={<Signin/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/product/:token' element={<Description/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/shipping' element={<Shipping/>}/>
              <Route path='/payment' element={<Payment/>}/>
              <Route path='/placeorder' element={<SubmitOrder/>}/>
              <Route path='/search' element={<Search/>}/>
            </Routes>
          </Container>
        </main>
        <Footer/>
      </div>
      <Title title="AMAZON">
      </Title>
    </BrowserRouter>
  )
}

export default App
