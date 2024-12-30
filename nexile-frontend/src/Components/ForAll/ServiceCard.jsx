import { BsArrowRight } from "react-icons/bs";

export const ServiceCard = (service) =>{
    const serv = service?.service;
    return(
        <div
        className="group grid md:grid-cols-12 h-10 hover:h-[550px] md:hover:h-[151px] md:gap-3 gap-0 md:h-[151px] h-[100px] my-auto justify-between items-center border-b-2 relative"
      >
        {/* Service Title */}
        <h3 className="text-[#A8A8A8] lg:text-[40px] text-[20px] md:text-[26px] poppins-semibold md:col-span-4 group-hover:text-white relative md:mb-0 mb-[-70px]">
          {serv.title}
          {/* Square Dot */}
          <span className="hidden group-hover:inline-block bg-[#00ECFB] w-2 h-2 ml-2 rounded-sm absolute bottom-2"></span>
        </h3>

        {/* Subtitle */}
        <p className="mb-2 md:mt-0 mt-[-100px] text-transparent group-hover:block lg:text-[20px] md:text-[16px] text-[16px] poppins-light md:col-span-4 md:px-3 group-hover:text-white transition duration-300">
          {serv?.subtitle}
        </p>

        {/* Main Service Image */}
        <div className="relative md:col-span-3 mt-[-100px] md:mt-4 overflow-visible  md:block hidden">
          <img
            src={serv?.mainServiceImage}
            alt={`${serv.title}, nexile digital`}
            className="hidden group-hover:block md:w-[300px] lg:h-[250px] md:h-[180px] w-[240px] h-[160px] object-cover 
              rounded-xl md:absolute md:group-hover:translate-y-[-10px] transition duration-300 z-10 lg:top-[-120px] md:top-[-80px] top-[-280px]"
          />
        </div>

        {/* Right Arrow */}
        <div
          className="text-white border border-2px lg:text-[40px] mt-1 md:mt-0 md:text-[30px] text-[25px] font-[400] py-3 px-2 md:py-3 md:px-3 rounded-full md:w-16 md:h-16 w-8 h-8 flex justify-center items-center md:col-span-1 
          group-hover:bg-white group-hover:text-black transition duration-300  md:block hidden "
        >
          <BsArrowRight />
        </div>
        <div className="flex items-center justify-between md:hidden block">
        <div className="relative md:col-span-3 mt-[-140px] md:mt-4 overflow-visible">
          <img
            src={serv?.mainServiceImage}
            alt={`${serv.title}, nexile digital`}
            className="hidden group-hover:block md:w-[300px] lg:h-[250px] md:h-[180px] w-[240px] h-[160px] object-cover 
              rounded-xl md:absolute md:group-hover:translate-y-[-10px] transition duration-300 z-10 lg:top-[-120px] md:top-[-80px] top-[-280px]"
          />
        </div>

        {/* Right Arrow */}
        <div
          className="text-white border border-2px lg:text-[40px] mt-[-80px] md:text-[30px] text-[25px] font-[400] py-3 px-2 md:py-2 md:px-2 rounded-full md:w-16 md:h-16 w-8 h-8 flex justify-center items-center 
          group-hover:bg-white group-hover:text-black transition duration-300 group-hover:mt-[-100px]"
        >
          <BsArrowRight />
        </div>
        </div>
      </div>
      
    )
}