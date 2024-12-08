import axios from "axios";
import { useEffect, useState } from "react";
import { endPoint } from "../../../Components/ForAll/ForAll";

const Founder = () =>{
    const [founder, setFounder] = useState();
  const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchFounder = async () => {
          try {
            const response = await axios.get(`${endPoint}/founder`);
            setFounder(response.data);
          } catch (error) {
            console.error("Error fetching Founders:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchFounder();
        // Set a timeout for loader to hide after 2 seconds if data fetch is complete
        const timer = setTimeout(() => setLoading(false), 2000);
    
        return () => clearTimeout(timer); // Clear the timer on component unmount
      }, []);

      console.log(founder)

    return(
     <div className="my-10 px-8 lg:pb-5 relative overflow-hidden">
        <h2 className="text-white lg:py-10 lg:text-[130px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
        {founder[0]?.title}
          </h2>
          <div className=" border-b-[0.5px] opacity-50"></div>

          <div className="grid grid-cols-3">

            <div className="col-span-1 border-r-[0.5px] border-[#fff] mt-20">
                <div>
                    <p className="text-white uppercase poppins-light text-[20px]">Woking since</p>
                    <h1 className="text-9xl text-white poppins-bold">{founder[0]?.year}</h1>
                </div>

                <div>
                    <p className="text-white uppercase poppins-light text-[20px] mt-20">client satisfaction</p>
                    <h1 className="text-9xl text-white poppins-bold">{founder[0]?.satisfaction}%</h1>
                </div>

                <div>
                    <p className="text-white uppercase poppins-light text-[20px] mt-20">total completed projects</p>
                    <h1 className="text-9xl text-white poppins-bold">{founder[0]?.completedPersonally}+</h1>
                </div>

            </div>

            <div className="col-span-2 px-24 py-10">
                <h4 className="text-white poppins-semibold text-[50px] underline">{founder[0]?.des}</h4>

                <div className="mr-[-160px]">
                    <img src={founder[0]?.founderImage} alt={founder[0]?.founderName} />
                </div>

            </div>
          </div>
            
     </div>
    )
}
export default Founder;