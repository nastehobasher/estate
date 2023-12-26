import React from 'react'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateList from './pages/CreateList'
function App() {
  return (
    <BrowserRouter className='text-red-500'>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/sign-in" element={<Signin/>}></Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/create-listing" element={<CreateList/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App