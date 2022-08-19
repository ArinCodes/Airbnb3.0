import { RssIcon } from "@heroicons/react/outline";
import { useRouter } from "next/dist/client/router"
import Header from "../../components/Header"
import { sanityClient,urlFor } from "../../sanity"
import Footer from "../../components/Footer"
import Contact from "../../components/Contact";
import Pricecalc from "../../components/Pricecalc";

 const Post=({ownername,ownimage,contact, address,price,propimg,content,title})=> {
 

    return (
    <div>
       <Header/>
       <Contact
       ownername={ownername}
       ownimage={ownimage}
       contact={contact}
       address={address}
       
      propimg={propimg}
       content={content}
       title ={title}
       />
         <Pricecalc
         price={price}
         
         
         />
    </div>
  );
}

export default Post


export const getServerSideProps=async pageContext =>{
   
const pageSlug =pageContext.query.slug;
if(!pageSlug){
    return{
        notFound:true
    }
}
const query =encodeURIComponent(`*[_type == "detail" && slug.current=="${pageSlug}"]`);
     
    const url = `https://p0e4hksj.api.sanity.io/v1/data/query/production?query=${query}`;

    const  result =await fetch(url).then(res => res.json());
    const lamp =result.result[0];

    if(!lamp){
        return{
            notFound:true
        }
    } else{
        return{
            props:{
            ownername:lamp.ownername,
            ownimage: lamp.ownimage,
            contact:lamp.contact,
            address:lamp.address,
            price:lamp.price,
            propimg:lamp.propimg,
            content:lamp.content,
            title:lamp.title,
            }
        }
    }
}