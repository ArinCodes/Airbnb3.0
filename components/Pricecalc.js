import React from 'react'
import {useState} from 'react'



function Pricecalc({price}) {
const [data , setData] = useState(null);
const[print ,setPrint] =useState(false);
function getData (val){
    setData(val.target.value)
    setPrint(false)
}
    
  return (
    <div className='mx-auto lg:w-3/5 '>
     <div className=' py-14 p-8 rounded-bl-md rounded-br-md lg:rounded-bl-none 
        lg:rounded-tr-md font-semibold  '>
     <label className='text-2xl'> Price Per Night is £{price}</label><br></br>
     <div className='flex py-3'>
     <label className='pr-3 '>Number of Days</label>
      <input type='number' className='bg-gray-200 ' onChange={getData}  defaultValue = "1" min="1"></input>
     </div>
     
     {print?
      <label className='bg-white ' type='text'> Your Total is  £ {data *price} </label>
     :null 
    }
      <div className='flex '>
      <button onClick={()=>setPrint(true)} className=' text-sm text-white bg-red-400 px-4 py-2
       rounded-lg mt-5 cursor-pointer hover:scale-105 transform
       transition duration-300 ease-out '>Calculate</button>
      <div className='px-4'></div>
     
     <button className=' text-sm text-white bg-red-400 px-4 py-2
       rounded-lg mt-5 cursor-pointer hover:scale-105 transform
       transition duration-300 ease-out'>Checkout</button><br></br>
      </div>
      
      </div>
   

    </div>
  )
}

export default Pricecalc