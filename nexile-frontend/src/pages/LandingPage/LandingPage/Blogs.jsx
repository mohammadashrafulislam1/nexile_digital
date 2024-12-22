import axios from "axios";
import { useEffect, useState } from "react";
import { endPoint } from "../../../Components/ForAll/ForAll";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${endPoint}/blog`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching Blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

    // Set a timeout for loader to hide after 2 seconds if data fetch is complete
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  // Filter blogs by category
  const videoEditingBlog = blogs
    .filter((blog) => blog.category === "Video Editing")
    .slice(0, 1); // Get the latest one
  const otherCategoryBlogs = blogs
    .filter((blog) => blog.category !== "Video Editing")
    .slice(0, 2); // Get the latest two

  if (loading) {
    return (
      <div className="text-center text-white py-20">
        <p>Loading blogs...</p>
      </div>
    );
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options); // 'en-GB' gives the "day month, year" format
  };
  
  return (
    <div className="py-24 container mx-auto">
      <div className="flex lg:flex-row flex-col-reverse items-center gap-10 px-0 lg:px-0 md:px-8">
        {/* Category: Video Editing - 1 Latest Blog */}
      <div className="">
        {videoEditingBlog.length > 0 ? (
          videoEditingBlog.map((blog) => (
            <div
              key={blog._id}
              className="lg:h-[630px] h-[500px] lg:w-[450px] w-[350px] rounded-[10px] shadow-md"
              style={{
                backgroundImage:
                  `url(${blog.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                zIndex: 0,
              }}
            >
             <div className="absolute bottom-0 px-5 pb-12  z-20">
             <div className="flex justify-between items-center">
              <p className="text-[#00ECFB] text-[20px] poppins-semibold mt-4">{blog.category}</p>
              <p className="text-[#fff] text-[20px] mt-4"><b className="poppins-black ">.  </b>{formatDate(blog.created_at)}</p>
              </div>
              <a
                href={`/blog/${blog._id}`}
                className="text-blue-500 mt-4 inline-block mt-0"
              > <h3 className="text-white text-[24px] font-semibold">{blog.title}</h3>
              </a>
             </div>
              {/* Black shadow at the bottom */}
<div
  className="absolute bottom-0 left-0 right-0 opacity-90 h-80 bg-gradient-to-t from-black to-transparent z-0"
></div>;

            </div>
          ))
        ) : (
          <p className="text-gray-400">No blogs found in this category.</p>
        )}
      </div>

      {/* Other Categories - 2 Latest Blogs */}
      <div>
      <div className="flex items-center gap-4 px-8 md:px-0">
      <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734805953/nexile%20digital/asset/uls3io21ae7r1hbrvaw9.png" alt="" />
      <h2 className="text-white text-end  lg:text-[100px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
      Latest Blogs 
      </h2>
      </div>
      <div className="flex justify-end md:mb-0 mb-24 px-8 md:px-0">
        
      <img src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732024726/nexile%20digital/assets/ejj6ajpv5ykj5qdgeqmi.png"
       alt="" className="lg:w-[125px] w-[80px] ml-19 flex justify-end absolute"/>
      </div>
        {otherCategoryBlogs.length > 0 ? (
          otherCategoryBlogs.map((blog) => (
            <div
              key={blog._id}
              className="rounded-lg shadow-md mb-6 flex md:flex-row flex-col justify-center items-center
               gap-8 mt-10 z-24 px-8  md:px-0 relative"
            >
                <img src={blog.image} alt="" className="md:w-[200px] w-full md:h-[188px] rounded-[10px]" />
              <div>
              <p className="text-[#fff] text-[20px] mt-4">{formatDate(blog.created_at)}</p>
              
              <p className="text-[#00ECFB] text-[20px] poppins-semibold">{blog.category}</p>
              <a
                href={`/blog/${blog._id}`}
                className="text-blue-500 inline-block z-10 relative"
              ><h3 className="text-white text-[24px] font-semibold z-10">{blog.title}</h3></a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No blogs found in other categories.</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default Blogs;
