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

function App() {

  return (
    <BrowserRouter>
      <div className='d-flex flex-column side-allPage min-width'>
      <ToastContainer position="bottom-center" limit={1}/>
        <Header/>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/signin' element={<Signin/>} />
              <Route path='/signup' element={<Signup/>} />
            </Routes>
          </Container>
        </main>
        <Footer/>
      </div>
      <Title title="eliav">
      </Title>
    </BrowserRouter>
  )
}

export default App
