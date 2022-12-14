import React from 'react'
import Footer from '../components/Footer'
import Header from "../components/Header"
import {useRouter} from "next/dist/client/router"
import {format} from "date-fns";
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';
import {sanityClient,urlFor} from "../sanity";
import Link from 'next/link';
function Search({properties,searchResults}) {
  const router =useRouter();

const {location, startDate , endDate 
  ,noOfGuests}=router.query;

  const formattedStartDate =format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate =format(new Date(endDate), "dd MMMM yy");
  const range =`${formattedStartDate} - ${formattedEndDate}`;  
  return (
    <div>
    <Header placeholder={`${location} | ${range} |  ${noOfGuests} guests`}/>
    <main className='flex'>
        <section className="flex-grow pt-14 px-6">
            
            <p className="text-xs">  300+ Stays- {range} -for {noOfGuests} Guests</p>
           
            <h1 className="text-3xl font-semibold mt-2 mb-6"> Stays in {location}</h1>

           < div className="hidden lg:inline-flex mb-5 space-x-3
           text-gray-800 whitespace-nowrap">
            <p className="button"> Cancellation Flexibility</p>
            <p className="button"> Type of Place</p>
            <p className="button"> Price</p>
            <p className="button"> Rooms and Beds</p>
            <p className="button"> More Filters</p>
            
            </div>    
            <div className="flex flex-col ">
            
      



            {properties.map((item) =>(
            <Link key={item._id} href={`/post/${item.slug.current}`}> 
            <div>
            <InfoCard 
            key={item.title}
             item={item}
             
             />
             </div>
             </Link>
          ))}
          
            </div>

          </section>
 <section className='hidden xl:inline-flex xl:min-w-[600px]  '>
  <Map searchResults ={searchResults}/>
 </section>
    </main>
    <Footer/>
    </div>
  )
}

export default Search;

export async function getServerSideProps(){
 
const searchResults =await fetch("https://arincodes.github.io/airbnbdata/map.json").
then(res => res.json());
const query = `*[_type == "detail"]{
  _id,
  title,
  content,
  slug,
  propimg,
  location,
  ownername,
  ownimage,
  contact,
  rating,
  address,
  price,
  total,
  
}`;
const properties =await sanityClient.fetch(query);
return{
    props:{
        properties,
        searchResults ,
    }
}
   


}