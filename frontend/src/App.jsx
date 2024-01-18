import { useState } from 'react'
import './App.css'
import Title from './Components/Shered/Title.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import {HomePage} from './Pages/HomePage.jsx'
import Footer from './Components/Shered/Footer.jsx'
import Header from './Components/Shered/Header.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className='d-flex flex-column side-allPage min-width'>
        <Header/>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomePage/>} />
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
