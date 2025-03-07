import { Avatar, Button, Dropdown, Navbar, NavbarToggle, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Link , useLocation, useNavigate} from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon,FaSun } from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userslice.js';
import { toggleTheme } from '../redux/theme/themeSlice.js';


export default function Header() {
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const { currentuser } = useSelector(state => state.user);
   const [searchTerm,setsearchTerm] = useState('');
    const dispatch =useDispatch();
    const {theme} = useSelector((state)=> state.theme);
    const location = useLocation();

    useEffect(()=>{
      const urlparams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlparams.get('searchTerm');
      if(searchTermFromUrl){
        setsearchTerm(searchTermFromUrl);
      }
    

    },[location.search])
    const handleSignout = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };

   const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
   }
    
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Bhavana's</span>
        Blog 
        </Link>
        
        
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())} >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
                
            </Button>
            {currentuser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentuser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentuser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentuser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}

            <NavbarToggle />
            </div>
         <Navbar.Collapse>
           
         <Navbar.Link active={path==="/"} as={'div'}>
            <Link to='/'>
            Home 
            </Link>
           </Navbar.Link>
           <Navbar.Link active={path==="/about"} as={'div'}>
            <Link to='/about'>
            About
            </Link>
           </Navbar.Link>
           <Navbar.Link active={path==="/projects"} as={'div'}>
            <Link to='/projects'>
            Projects
            </Link>
           </Navbar.Link>
           
            </Navbar.Collapse>   
            <form onSubmit={handleSubmit} >
            <TextInput
                type='text'
                placeholder='Search..'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
                value={searchTerm}
                onChange={(e)=> setsearchTerm(e.target.value)}
            />
        </form>
        
    </Navbar>
  );
}
