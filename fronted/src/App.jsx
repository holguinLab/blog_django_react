import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { Register } from './components/Register'
import { Footer } from './components/Footer'
import { Login } from './components/Login'
import { Posts } from './components/Posts'
import { Navigate } from 'react-router-dom'

import { useState, useEffect } from 'react'

import './App.css'


function App() {
  const [logueado, setLogueado] = useState(false)


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLogueado(true)
    }
  }, [])

  return (
    <BrowserRouter>
      <div className='flex flex-col min-h-screen'>
        <Navbar setLogueado={logueado} />
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={logueado ? <Navigate to='/posts' /> : <Login setLogueado={setLogueado} />} />
            <Route path='/register' element={logueado ? <Navigate to='/posts' /> : <Register setLogueado={setLogueado} />} />
            <Route path='/posts' element={logueado ? <Posts /> : <Navigate to='/' />} />
            <Route path='/' element />
            <Route path='/' element />
            <Route path='/' element />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
