import { useEffect } from "react";
import { useState } from "react";
import { endPoint } from "../../../Components/ForAll/ForAll";
import axios from "axios";

const HowWeWork = () =>{

    const [howWeWork, setHowWeWork] = useState([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const fetchHowWeWork = async () => {
      try {
        const response = await axios.get(`${endPoint}/howwework`);
        setHowWeWork(response.data);
      } catch (error) {
        console.error("Error fetching HowWeWorks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHowWeWork();
    // Set a timeout for loader to hide after 2 seconds if data fetch is complete
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  console.log(howWeWork)


    return(
        <div className="px-8 lg:py-5 relative overflow-x-hidden"> <h2 className="text-white lg:py-20 pb-6 lg:text-[130px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
     HOW WE WORK
              </h2>
       



        </div>
    )
}
export default HowWeWork; 