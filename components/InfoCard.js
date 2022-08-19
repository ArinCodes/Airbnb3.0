/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Image from 'next/image'
import{HeartIcon} from "@heroicons/react/outline"
import{StarIcon} from "@heroicons/react/solid"
import {useRouter} from "next/dist/client/router"
import { createClient } from 'next-sanity'
import PortableText from "react-portable-text"
import imageUrlBuilder from '@sanity/image-url'
import { useState,useEffect } from 'react'
import Link from 'next/link'
import  {urlFor} from '../sanity'


 

function InfoCard({item }) {
    const  router=useRouter();
    const client =createClient({
        projectId:"p0e4hksj",
        dataset:"production",
        apiVersion: '2021-08-31',
        useCdn:true
    });
    const [imageUrl ,setImageUrl] = useState('');
     useEffect(()=>{
        const imgBuilder =imageUrlBuilder({
            projectId:'p0e4hksj',
            dataset:'production',
        });
        setImageUrl(imgBuilder.image(item.propimg))
     },[item.propimg])
     
  return (
  
   <>
    <div className='flex py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg
     transition-duration-200  ease-out first:border-t ' >
    <div className='relative h-50 w-80  md:h-54 md:w-80  flex-shrink-0 '   >
    {imageUrl && <img src={imageUrl} className='rounded-2xl'  />}

    </div>
    <div className='flex flex-col flex-grow pl-5'>
        <div className="flex justify-between">
            <p></p>
            <HeartIcon className ="h-7 cursor-pointer"/>
        </div>
        <h4 className="text-xl">{item.title}</h4>
        <div className='border-b w-10 pt-2'/>
        <PortableText className='pt-2 text-sm text-gray-500 flex-grow'
      // Pass in block content straight from Sanity.io
      content={item.content}
      projectId="p0e4hksj"
        dataset="production"
      // Optionally override marks, decorators, blocks, etc. in a flat
      // structure without doing any gymnastics
      serializers={{
        h1: (props) => <h1 style={{ color: "red" }} {...props} />,
        li: ({ children }) => <li className="special-list-item">{children}</li>,
        
      }}
    />
        <div className='flex justify-between items-end pt-5'>
            <p className='flex items-center'>
                <StarIcon className = "h-5 text-red-400"/>
                {item.rating}
            </p>
            <div>
                <p className='text-lg font-semibold pb-2
                 lg:text-2xl'> </p>
                <p className='text-right font-extralight'> Price/night : £ {item.price}</p>
            </div>
        </div>
    </div>
    </div>
    </>
    
  )
}

export default InfoCard

