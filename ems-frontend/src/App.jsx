import { useState } from 'react'
import './App.css'
import { ListEmployee } from './components/ListEmployee'
import { HeaderComponent } from './components/HeaderComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { EmployeeComponent } from './components/EmployeeComponent'
import { HomeComponent } from './components/HomeComponent'
import { LoginComponent } from './components/LoginComponent'
import { SignupComponent } from './components/SignupComponent'
import { PrivateRoute } from './components/PrivateRoute'
import { TokenExpiryWarning } from './components/TokenExpiryWarning'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <HeaderComponent />
          <TokenExpiryWarning/>
          <div className="flex-1">
            <Routes>
              <Route path='/' element={<HomeComponent />} />
              <Route path='/login' element={<LoginComponent />} />
              <Route path='/signup' element={<SignupComponent />} />
              <Route path='/employees' element={<PrivateRoute><ListEmployee /></PrivateRoute>} />
              <Route path='/add-employee' element={<PrivateRoute><EmployeeComponent /></PrivateRoute>} />
              <Route path='/update-employee/:id' element={<PrivateRoute><EmployeeComponent /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
