/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Image from 'next/image'
import {MenuIcon, SearchIcon} from '@heroicons/react/solid'
import {GlobeAltIcon} from '@heroicons/react/solid'
import {UserCircleIcon,UsersIcon} from '@heroicons/react/solid'
import{useState} from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range'
import {useRouter} from "next/dist/client/router"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useSession, signIn, signOut } from "next-auth/react"

function Header({placeholder }) {
  const[searchInput ,setSearchInput]=useState("");
 const[startDate ,setStartDate] =useState(new Date());
 const[endDate ,setEndDate] =useState(new Date());
 const[noOfGuests , setNoOfGuests] =useState(1);
 const selectionRange ={
  startDate :startDate,
  endDate : endDate,
  key:'Selection'
 };
 function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  };
  
 const router=useRouter();

 const handleSelect =(ranges) => {
  setStartDate(ranges.Selection.startDate);
  setEndDate(ranges.Selection.endDate);
 };
const resetInput=()=>{
  setSearchInput("");
};
const search =() =>{
  router.push({
    pathname :"/search",
    query :{
      location :searchInput,
      startDate :startDate.toISOString(),
      endDate:endDate.toISOString(),
      noOfGuests,
    }
  });
  
}
const SessionObj={
  name : "",
  email :"",
  
};
const {  data :session, status } = useSession();


  if (status === "authenticated") {
   
      SessionObj.name  = ` ${session.user.name}`
      SessionObj.email =`${session.user.email}`
      
    }
  
  
  





return (
  <div>
    <header className ="sticky top-0 z-50 grid
    grid-cols-3 bg-white  shadow-md py-5 px-3 md:px-10">
        {/* Left */}
        <div onClick={()=>router.push('/')} className="relative flex items-center h-10 center
        cursor-pointer my-auto">
        
            <Image src="https://links.papareact.com/qd3" 
            layout= "fill"
             objectFit ="contain" 
             objectPosition="left" />

           
        </div>
        {/* Middle */} 
        <div className="flex items-center md:border-2
         rounded-full py-2 md:shadow-sm">
            <input
            value={searchInput}
            onChange={(e)=> setSearchInput(e.target.value)}
            className="flex-grow pl-5
            bg-transparent outline-none text-sm
            text-gray-600 placeholder-gray-400"
           type="text" 
           placeholder={placeholder ||"Start your Search"}/>
           <SearchIcon className="hidden md:inline-flex
            h-8 bg-red-400 text-white rounded-full p-2
            cursor-pointer md:mx-2"/>
        </div>
        {/* Right */}
        <div className="flex items-center space-x-4 
        justify-end text-gray-500">
               
               <p  className="hidden md:inline cursor-pointer">
                
                {SessionObj.name}
               </p>
     
   
         <p className="hidden md:inline cursor-pointer">Become a host</p>
         <GlobeAltIcon className="h-6"/>
         {/* DropDown */}
         <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Login/Signup
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item onClick={signIn}>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Login
                </a>
              )}
            </Menu.Item>
            
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item >
            <form method="POST" action="#">
              <Menu.Item onClick={signOut}>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>





        </div>
        {/* Right End */}
        {searchInput && (
          <div className ="flex flex-col col-span-3
          mx-auto">
          <DateRangePicker
           ranges={[selectionRange]}
           minDate ={new Date()}
           rangeColors={["#FD5B61"] }
           onChange={handleSelect }/>
            <div className='flex items-center border-b mb-4'>
            <h2 className='text-2xl flex-grow font-semibold'>Number of Guests </h2>
            <UsersIcon className="h-5"/>
            <input 
            value={noOfGuests}
            onChange={(e)=> setNoOfGuests(e.target.value)}
            type ="number" 
            min={1}
            className='w-12 pl-2 text-lg outline-none text-red-400 bg-white'
            />
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>
            <button onClick ={search} className="flex-grow text-red-500">Search</button>
          </div>

          </div>
         
        )}
    </header>
  </div>
  )}


export default Header
