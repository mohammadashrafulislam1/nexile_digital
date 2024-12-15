import { Link } from "react-router-dom";

const Testimonials = () =>{
    return(
    <div className="px-8 lg:py-5 relative overflow-x-hidden">
   <div className="lg:flex justify-end items-center">
              <h2 className="text-white lg:w-[90%] lg:py-20 pb-6 lg:text-[120px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
              What our clients saying
              </h2>
              <div className="lg:w-[30%]">
                <p className="font-[100]  text-white text-[20px] lg:ml-[-200px]">
                We have collaborate with or work with them and helped them to grow their business. With the help of Nexile Digital you also can grow/boost your business. 
                </p>
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732024726/nexile%20digital/assets/ejj6ajpv5ykj5qdgeqmi.png"
                    className="lg:w-[125px] w-[80px] ml-19 flex"
                    alt=""
                  />
                </Link>
              </div>
            </div>
    </div>
    )
}

export default Testimonials;