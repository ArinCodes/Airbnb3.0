import React from 'react'
import Head from 'next/head'
import imageUrlBuilder from '@sanity/image-url'
import { useState,useEffect } from 'react'
import PortableText from "react-portable-text"
function Contact({ownername,ownimage,contact, address,price,propimg,content,title}) {
    const [imageUrl ,setImageUrl] = useState('');
    useEffect(()=>{
       const imgBuilder =imageUrlBuilder({
           projectId:'p0e4hksj',
           dataset:'production',
       });
       setImageUrl(imgBuilder.image(ownimage))
    },[ownimage])
    const [imageUrl2 ,setImageUrl2] = useState('');
    useEffect(()=>{
       const imgBuilder2 =imageUrlBuilder({
           projectId:'p0e4hksj',
           dataset:'production',
       });
       setImageUrl2(imgBuilder2.image(propimg))
    },[propimg])
  return (
    <>
    <div className='px-8 mt-10' >
    <Head>
     <title> Contact details</title>
     <link rel="icon" href="/favicon.ico"/>
    </Head>
    <div className='mx-auto lg:w-3/5 lg:flex lg:flex-row lg:h-auto'>
        {/* propimg */}
       { imageUrl &&  <img className='rounded-tr-md rounded-tl-md h-48 w-full lg:h-auto lg:w-2/5 lg:rounded-bl-md
        lg:rounded-tr-none' src={imageUrl2}  alt=" "/>}
        <div className="bg-white p-8 rounded-bl-md rounded-br-md lg:rounded-bl-none 
        lg:rounded-tr-md">
            {/* Title */}
            <p className='text-lg font-semibold pb-2
                 lg:text-2xl'>{title} </p>
                 {/* Content & address */}
         <h2 className="text-gray-700 font-semibold"> 
         <PortableText 
      // Pass in block content straight from Sanity.io
      content={content}
      projectId="p0e4hksj"
        dataset="production"
      // Optionally override marks, decorators, blocks, etc. in a flat
      // structure without doing any gymnastics
      serializers={{
        h1: (props) => <h1 style={{ color: "red" }} {...props} />,
        li: ({ children }) => <li className="special-list-item">{children}</li>,
        
      }}
    />
                               </h2>
         <p className="text-sm text-gray-600 mt-4 font-extrabold cursor-pointer hover:scale-105 transform
    transition duration-300 ease-out">
            Address : {address}
         </p>
         <div className="flex items-center mt-8">
            <div className="flex items-center">
              {  imageUrl && <img className="h-14 w-19 rounded-full" src={imageUrl}alt=" "/>}
                {/* author image */}
                <div className="ml-4">
                    <p className="text-gray-800 text-sm font-semibold">
                        Owner Name:  {ownername} 
                    </p>
                    <p className='text-gray-600 text-sm font-semibold  cursor-pointer hover:bg-gray-100 hover:scale-105 transition
    transform duration-200 ease-out"'>
                    Contact : {contact}
                    </p>
                </div>
             
            </div>
           <div className='w-8 h-8 ml-auto bg-gray-200 rounded-full flex items-center justify-center  hover:bg-gray-100 hover:scale-105 transition
    transform duration-200 ease-out'>
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
</svg>
           </div>
{/* svg file or price */}

         </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Contact