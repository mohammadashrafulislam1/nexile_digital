import { Link } from "react-router-dom";

const Works = ()=>{
    return(
        <div className="px-8 lg:py-5 relative overflow-hidden">
            <div className="lg:flex justify-end flex-row-reverse items-center mt-14 md:mt-0">
      <h2 className="text-white lg:py-6 pb-6 text-right lg:text-[120px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
      projects by
        nexile digital
      </h2>
      <div className="lg:w-[56%]">
        <p className="font-[100] text-white text-[20px]">There are some projects that we have done. All of these projects have been featured by us click the arrow button to see all projects done by Nexile Digital</p>
        <Link to="/" className=" flex justify-end">
          <img
            src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732024726/nexile%20digital/assets/ejj6ajpv5ykj5qdgeqmi.png"
            className="lg:w-[125px] w-[80px]"
            alt=""
          />
        </Link>
      </div>
    </div>
        </div>
    )
}
export default Works;