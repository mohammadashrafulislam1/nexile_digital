import { useParams } from "react-router-dom";
import { endPoint } from "../../Components/ForAll/ForAll";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../Components/ForAll/Header";
import Footer from "../../Components/ForAll/Footer";
const SkeletonLoader = () => {
    return (
      <div className="h-[1040px]">
        <div className="animate-pulse">
          {/* Skeleton Title */}
          <div className="h-[60px] lg:h-[130px] bg-gray-300 rounded-md w-[60%] mx-auto mb-4"></div>
          
          {/* Skeleton Category */}
          <div className="h-[20px] bg-gray-300 rounded-md w-[40%] mx-auto mb-4"></div>
          
          {/* Skeleton Button */}
          <div className="w-[200px] mx-auto h-[45px] bg-gray-300 rounded-md mb-4"></div>
          
          {/* Skeleton Image */}
          <div className="w-[80%] h-[400px] mx-auto bg-gray-300 rounded-md mb-4"></div>
        </div>
      </div>
    );
  }

const SingleBlog = () =>{
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const { title } = useParams();
    const realUrl = title.replace(/-/g, " ");
    console.log(blog)

    useEffect(() => {
        const fetchBlog = async () => {
          try {
            const blogRes = await axios.get(`${endPoint}/blog/${realUrl}`);
            const blog = blogRes.data.findBlog;
            setBlog(blog)
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchBlog();
      }, [realUrl]);

      // Format the date as "Month Day, Year"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return(
        <div>
        {/* Helmet for SEO */}
        <Helmet>
          <title>{realUrl} by Nexile Digital</title>
          <meta
            name="description"
            content={`${realUrl} - Projects that Nexile Digital built. Nexile Digital is an all-in-one digital solutions provider offering web development, web design, SEO (Search Engine Optimization), Video Editing, UX & UI Design, and Figma services.`}
          ></meta>
        </Helmet>
  
        <div className="bg-black overflow-hidden">
          <div className="relative z-0 bg-black">
            <div
              style={{
                backgroundImage: 'url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040743/nexile%20digital/asset/otjfpjewv5z1bubx26kr.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                zIndex: 0,
              }}
              className="relative"
            >
              {/* Background images */}
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040743/nexile%20digital/asset/ebqjrqhwdf0puwpmup9g.webp"
                  alt=""
                  className="absolute right-0 z-[-1]"
                />
                <img
                  src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040744/nexile%20digital/asset/krjhtmdwyfeoebirihzq.webp"
                  alt=""
                  className="absolute left-0 z-[-1]"
                />
              </div>
  
              {/* Header */}
              <Header className="relative z-10" />
  
              {/* Content or Skeleton Loader */}
              {loading ? (
                <SkeletonLoader />
              ) : blog ? (
                <div className="h-[1040px] ">
                  <h2 className="lg:text-[60px] text-[40px] font-bold lg:leading-[70px] leading-[40px] my-4 text-white text-center uppercase z-40" style={{ letterSpacing: '-3px' }}>
                    {realUrl}
                  </h2>
                 <div className="flex justify-between items-center  w-[70%]  mx-auto">
                 <p className="lg:text-[20px] text-[16px] text-[#00ECFB] font-[100] text-center">{blog?.category}</p>
                 <p className="lg:text-[20px] text-[16px] text-[#00ECFB] font-[100] text-center">{formatDate(blog?.created_at)}</p>
                 </div>
                 <img src={blog?.image} alt={blog?.title - blog?.category} className="lg:w-[910px] w-[97%] md:h-[560px] h-[400px] mx-auto rounded-[10px] mt-7 object-cover"/>
              
                </div>
              ) : (
                <div className="text-center text-white py-10">Project not found.</div>
              )}
  
              {/* Black shadow at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
            </div>
             <div className="lg:mt-[-180px]  mt-[-300px] mb-24 ">
             <div className="rounded-lg p-[2px] bg-gradient-to-r from-[#9DE8EE] via-[#FA7C0B] 
        to-[#9F8CED] shadow-lg hover:shadow-xl transition duration-300z-24 relative md:w-[90%] w-[96%]  mx-auto">
            <p className="text-white mx-auto bg-[#141414] md:p-10 p-4 rounded-lg text-[16px]">{blog?.description}</p></div>
     {/* Tags */}
{Array.isArray(blog?.tags) && blog.tags.length > 0 && (
  <div className="text-center my-12">
    <p className="text-white text-xl font-bold">Tags:</p>
    <div className="flex flex-wrap justify-center gap-4 mt-2">
      {/* Parse the JSON string if necessary */}
      {JSON.parse(blog.tags[0]).map((tag, index) => (
        <button
          key={index}
          className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-[#00a9c2] transition-colors focus:outline-none"
        >
          {tag.trim()} {/* Remove extra spaces */}
        </button>
      ))}
    </div>
  </div>
)}

                  </div>
            <Footer className="!z-24" />
          </div>
        </div>
      </div>
    )
}
export default SingleBlog;