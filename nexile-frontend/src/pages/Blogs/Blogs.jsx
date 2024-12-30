import { Helmet } from "react-helmet";
import Footer from "../../Components/ForAll/Footer";
import Header from "../../Components/ForAll/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { endPoint } from "../../Components/ForAll/ForAll";
import BlogCard from "../../Components/ForAll/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Track the search input
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [dropdownVisible, setDropdownVisible] = useState(false); // Track dropdown visibility on mobile

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${endPoint}/blog`);
        console.log(response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching Blogs data:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Function to handle the search query input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter blogs based on the search query (case-insensitive)
  const filteredBlogs = blogs.filter(blog =>
    (blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory ? blog.category.toLowerCase() === selectedCategory.toLowerCase() : true)
  );

  // Handle category selection
  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(""); // If the selected category is clicked again, reset filter
    } else {
      setSelectedCategory(category); // Set the selected category
    }
    setDropdownVisible(false); // Close the dropdown on category selection
  };

  // Handle "All Categories" selection
  const handleAllCategoriesClick = () => {
    setSelectedCategory(""); // Reset the selected category to show all blogs
    setDropdownVisible(false); // Close the dropdown on "All Categories" selection
  };

  // Toggle dropdown visibility on mobile
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div>
      {/* Helmet */}
      <Helmet>
        <title>Nexile Digital - Blogs</title>
        <meta name="description" content="Blogs from Nexile Digital to know more. Nexile Digital is an all-in-one digital solution provider." />
      </Helmet>

      {/* Content */}
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

            {/* Content */}
            <Header className="relative z-10" />

            <div className="h-[700px]">
              <h2 className="lg:text-[130px] text-[60px] font-bold lg:leading-[130px] leading-[60px] text-white text-center uppercase z-40"
                  style={{ letterSpacing: '-5px' }}>
                Blogs from Nexile Digital
              </h2>
              <p className="lg:text-[30px] text-[20px] text-white font-[100] text-center">
                Learn more about digital solutions by reading our blogs
              </p>
            </div>

            {/* Black shadow at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
          </div>

          {/* Search Bar */}
          <div className="md:p-12 lg:p-[30px] p-2 gap-3 mx-auto my-auto mb-24 lg:mt-[-300px] md:mt-[-560px] mt-[-500px] z-24 relative">
            <div className="animated-border-input animated-border-btn flex justify-center mx-auto md:w-[70%] my-12">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-3 w-full border rounded-md"
              />
            </div>

            {/* Category Dropdown Button (Mobile) */}
            <div className="md:hidden">
              <button
                onClick={toggleDropdown}
                className="text-white p-3 bg-[#141414] rounded-md w-full mb-4"
              >
                {selectedCategory ? selectedCategory : "Select Category"}
              </button>
              {dropdownVisible && (
                <div className="absolute bg-[#141414] text-white w-full p-3 rounded-md">
                  <button
                    onClick={handleAllCategoriesClick}
                    className="block w-full text-left py-2"
                  >
                    All Categories
                  </button>
                  {Array.from(new Set(blogs.map(blog => blog.category)))?.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="block w-full text-left py-2"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Blogs Category (Desktop) */}
            <div className="hidden md:flex items-center justify-startgap-2 mb-10">
              <button
                onClick={handleAllCategoriesClick}
                className="animated-border-btn text-white poppins-regular text-[20px] bg-[#141414] px-3 py-1 rounded-full"
              >
                All Categories
              </button>
              {Array.from(new Set(blogs.map(blog => blog.category)))?.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`animated-border-btn text-white poppins-regular text-[20px] bg-[#141414] px-3 py-1 rounded-full ${selectedCategory === category ? 'bg-blue-500' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Display filtered blogs */}
            <div className="grid lg:grid-cols-2 lg:p-0 md:p-12  items-center justify-start gap-5 mt-10">
              {filteredBlogs?.map(blog => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </div>

          <Footer className="!z-24" />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
