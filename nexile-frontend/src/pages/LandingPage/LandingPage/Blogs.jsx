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
      {/* Category: Video Editing - 1 Latest Blog */}
      <div className="mb-16">
        {videoEditingBlog.length > 0 ? (
          videoEditingBlog.map((blog) => (
            <div
              key={blog._id}
              className="h-[630px] w-[400px] p-6 rounded-lg shadow-md"
              style={{
                backgroundImage:
                  `url(${blog.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                zIndex: 0,
              }}
            >
              <div className="flex justify-between">
              <p className="text-[#00ECFB] text-[20px] poppins-semibold mt-4">{blog.category}</p>
              <p className="text-[#fff] text-[20px] mt-4"><b className="poppins-black ">.  </b>{formatDate(blog.created_at)}</p>
              </div>
              <a
                href={`/blog/${blog._id}`}
                className="text-blue-500 mt-4 inline-block"
              > <h3 className="text-white text-xl font-semibold">{blog.title}</h3>
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No blogs found in this category.</p>
        )}
      </div>

      {/* Other Categories - 2 Latest Blogs */}
      <div>
        <h2 className="text-white text-2xl font-bold mb-8">Other Categories</h2>
        {otherCategoryBlogs.length > 0 ? (
          otherCategoryBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-800 p-6 rounded-lg shadow-md mb-6"
            >
              
              <p className="text-[#00ECFB] text-[20px] poppins-semibold mt-4">{blog.category}</p>
              <h3 className="text-white text-xl font-semibold">{blog.title}</h3>
              <a
                href={`/blog/${blog._id}`}
                className="text-blue-500 mt-4 inline-block"
              >
                Read More
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No blogs found in other categories.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
