import { useState } from 'react'
import './App.css'
import Content from './content/Content'
import Header from './headFoot/Header'
import {Routes, Route} from 'react-router-dom';
import Login from './authed/Login';
import Dashboard from './authed/Dashboard';
import { logOut } from './Helpers/Helper';

function Logout() {
  logOut();
}

function App() {

  return ( 
  <Header >
    <Routes>
      <Route exact path='/' element={<Content />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/dashboard' element={<Dashboard />} />
      <Route exact path='/logout' element={<Logout />} />

    </Routes>
</Header>
  )
}

export default App
