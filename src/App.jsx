import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import './App.css'
import { Footer, Header } from './Components/index';
import { Outlet } from 'react-router-dom'
// import cinema_bg from '../src/assets/cinema_bg.jpg'

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  // const cinema_bg = 'https://wallpapercave.com/wp/wp8186561.jpg'

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }))
        else dispatch(logout())
      })
      .finally(() => { setLoading(false) })
  })
  return !loading ? (
    <div className={`min-h-screen flex flex-col text-white content-between bg-gray-700`}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  ) : (
    <div className='min-h-screen flex flex-col  content-between bg-gray-300'>
      <Header />
      <p className='h-[80vh] flex justify-center bg-[#363636] text-gray-300 text-center items-center bold text-3xl'>Loading...</p>
      <Footer />
    </div>
  )
}

export default App
