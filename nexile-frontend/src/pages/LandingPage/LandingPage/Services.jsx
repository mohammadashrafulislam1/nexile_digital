import { Link } from "react-router-dom";

const Service = () =>{
    return(
    <div className="px-8">
        <div className="flex justify-end items-center">
        <h2 className="text-white py-20 text-[130px] uppercase font-bold underline leading-[140px]">
         services
         NEXILE
         PROVIDES</h2>
         <div>
         <p className="font-[100] text-white text-[20px]">At Nexile Digital, we provide a wide range of digital solutions designed to enhance your online presence, streamline your business processes, and help you achieve your goals. Whether you're looking to create a stunning website, boost your search engine rankings, or develop custom software, our expert team is here to help. Explore our services below to see how we can support your business.</p>
<Link to='/'>
<img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732024726/nexile%20digital/assets/ejj6ajpv5ykj5qdgeqmi.png" className="w-[155px] ml-10" alt="" />
</Link>   </div> 
       </div>
    </div>
    )
}

export default Service;