import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from './';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { createNavlinks } from '../constants';
import { useStateContext } from '../context';
import GridViewIcon from '@mui/icons-material/GridView';
import CampaignIcon from '@mui/icons-material/Campaign';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react"

const Navbar = ({ showNavbar, handleSearch }) => {
  if (!showNavbar) {
    return null; 
  }
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const navlinks = createNavlinks(isActive);
  const address = useAddress();

  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
      <div className='sm:flex hidden flex-row items-center gap-6'>
        <p className='text-3xl font-bold text-white cursor-pointer'>
          <Link to='/dashboard'>
            <span style={{ color: '#8C35FF' }}>Web3</span>Raise
          </Link>
        </p>
      </div>
      <div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]'>
        <input
          type='text'
          placeholder='Search for campaigns'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#999da7] text-white bg-transparent outline-none'
        />
        <div className='w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer'>
          <SearchIcon style={{ color: 'white' }} fontSize='medium' />
        </div>
      </div>
      <div className='sm:flex hidden flex-row justify-end gap-4'>
        <div className='w-[52px] h-[52px] flex justify-start items-center cursor-pointer'>
          <label className="swap swap-rotate">
    
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />
          
              {/* sun icon */}
              <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          
              {/* moon icon */}
              <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
    
          </label>
        </div>
        {address && (
          <CustomButton
            btnType="button"
            title='Create Campaign'
            styles='bg-[#1dc071]'
            handleClick={() => {
              navigate('create-campaign')
            }}
          />
        )}
        <ConnectWallet style={{ backgroundColor: '#8C35FF', color: "white" }} theme="dark" className='text-white'/>
        <Link to='/profile'>
          <div className='w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
            <AccountCircleIcon style={{ color: 'white' }} className='w-[60%] h-[60%] object-contain' />
          </div>
        </Link>
      </div>
      {/* Small screen navigation */}
      <div className='sm:hidden flex justify-between items-center relative'>
        <div className='w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
          <AccountCircleIcon style={{ color: 'white' }} className='w-[60%] h-[60%] object-contain' />
        </div>
        <div className='sm:flex flex-row justify-between items-center relative'>
          <p className='text-2xl font-bold text-white cursor-pointer'>
            <Link to='/'>
              <span style={{ color: '#8C35FF' }}>Web3</span>Raise
            </Link>
          </p>
        </div>
        <MenuIcon
          style={{ color: 'white' }}
          className='w-[34px] h-[34px] object-contain cursor-pointer'
          onClick={() => setToggleDrawer(!toggleDrawer)}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'
          } transition-all duration-700`}
        >
          <ul className='mb-4'>
            {navlinks.map((link, index) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                }}
              >
                <Link style={{ color: 'white' }} className='flex p-4' to={link.link}>
                  {index === 0 && (
                      <GridViewIcon style={{ color: 'white' }} className='w-[50%] h-[50%] object-contain'/>
                  )}
                  {index === 1 && (
                      <CampaignIcon style={{ color: 'white' }} className='w-[50%] h-[50%] object-contain'/>
                  )}
                  {index === 2 && (
                      <AccountCircleIcon style={{ color: 'white' }} className='w-[50%] h-[50%] object-contain'/>
                  )}
                  <p
                    className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                      isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'
                    }`}
                  >
                    {link.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className='flex mx-4'>
            <CustomButton
              btnType='button'
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if(address) navigate('create-campaign')
                else connect()
              }}
            />
            <div className='w-[52px] h-[52px] flex justify-end items-center cursor-pointer'>
              <LightModeIcon style={{ color: 'white' }} className='w-[50%] h-[50%] object-contain' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
