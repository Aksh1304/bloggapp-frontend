import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userslice'
import { useDispatch,useSelector } from 'react-redux';

export default function DashSidebar() {
  const { currentuser } = useSelector(state => state.user);
  const dispatch=useDispatch();
    const location = useLocation()
  const [tab,setTab]= useState('')
  useEffect(()=>{
    const urlparams = new URLSearchParams(location.search)
    const tabFormUrl = urlparams.get('tab')
    if(tabFormUrl){
      setTab(tabFormUrl);
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
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
            {currentuser && currentuser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab==='profile'} icon={HiUser} label={currentuser.isAdmin ? 'Admin' : 'User'} labelcolor='dark' as='div'>Profile</Sidebar.Item>
                </Link>
                {currentuser.isAdmin && (
                  <Link to='/dashboard?tab=posts'>
                  <Sidebar.Item active={tab==='posts'} icon={HiDocumentText} as='div'>
                    posts
                  </Sidebar.Item>
                  </Link>
                ) }
                {currentuser.isAdmin && (
                  <>
                  <Link to='/dashboard?tab=users'>
                  <Sidebar.Item active={tab==='users'} icon={HiOutlineUserGroup} as='div'>
                    users
                  </Sidebar.Item>
                  </Link>
                  <Link to='/dashboard?tab=comments'>
                  <Sidebar.Item active={tab==='comments'} icon={HiAnnotation} as='div'>
                    Comments
                  </Sidebar.Item>
                  </Link>
                  </>
                ) }
                
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>Sign Out</Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
