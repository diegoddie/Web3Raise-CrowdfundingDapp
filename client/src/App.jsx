import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CampaignDetails, CreateCampaign, Home, Dashboard, Profile } from './pages'
import { Navbar } from './components';


const App = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const showNavbar = !isHomePage;
  return (
    <div className='relative sm:8 p-4 bg-[#20202b] min-h-screen flex flex-row'>
      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar showNavbar={showNavbar}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App