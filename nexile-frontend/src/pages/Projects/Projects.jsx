import { Helmet } from "react-helmet";
import Footer from "../../Components/ForAll/Footer";
import Header from "../../Components/ForAll/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { endPoint } from "../../Components/ForAll/ForAll";
import ProjectCard from "../../Components/ForAll/ProjectCard";

const Projects = () =>{
  const [works, setWorks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndWorks = async () => {
      try {
        const [categoriesResponse, worksResponse] = await Promise.all([
          axios.get(`${endPoint}/TechCategory`),
          axios.get(`${endPoint}/works`),
        ]);

        const categoriesData = categoriesResponse.data.techCategories;
        const worksData = worksResponse.data.works.map((work) => {
          const category = categoriesData.find((cat) => cat._id === work.category);
          return { ...work, categoryName: category?.name || "No category specified" };
        });

        setCategories([{ name: "All", _id: "all" }, ...categoriesData]);
        setWorks(worksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndWorks();
  }, []);

  const filteredWorks =
    selectedCategory === "All"
      ? works
      : works.filter((work) => work.categoryName === selectedCategory);

    return(
        <div>
        {/* Helmet */}
        <Helmet>
        <title>Nexile Digital - Projects</title>
        <meta name="description" content="Projects that Nexile Digital built. Nexile Digital is a all in one digital solutions. Nexile Digital provides web development, web design, SEO (Search Engine Optimization), Video Editing, UX & UI Design, Figma services."></meta>
        </Helmet>
    
        {/* Content */}
       <div className="bg-black overflow-hidden">
       <div 
      className="relative z-0 bg-black" 
      >
      <div 
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/dnwmtd4p1/image/upload/v1731040743/nexile%20digital/asset/otjfpjewv5z1bubx26kr.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative', // Ensure background is a layer
        zIndex: 0, // Send background layer to the back
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

     

     <div className=" h-[1040px]">
     <h2 className="lg:text-[130px] text-[60px] font-bold lg:leading-[130px] leading-[60px] text-white text-center uppercase z-40" 
             style={{letterSpacing:'-5px'}}>Projects that nexile digital built.</h2>
      <p className="lg:text-[30px] text-[20px] text-white font-[100] text-center">We built these projects.</p>
      <Link to={"/contact_us"} className="flex justify-center my-4">
        <button className="bg-white lg:py-2 lg:px-7 px-4 py-2 text-[20px] rounded-sm poppins-medium lg:text-[25px]">
            Let’s Get Solution!</button></Link>
            

     </div>


    
    
      {/* Black shadow at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"
      ></div>
    </div>

    <div className=" text-white py-8 mt-[-600px] mb-14 z-24 relative">
        <h1 className="text-center text-4xl font-bold">Our Projects</h1>
        <div className="text-center mt-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`${loading? "bg-gray-300" : "bg-gray-800 "} text-white px-4 py-2 rounded`}
          >
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 px-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 h-64 animate-pulse rounded-lg"
                ></div>
              ))
            : filteredWorks.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
        </div>
      </div>

       
      <Footer className="!z-24"/>
      </div>
    </div>
        </div>
    )
}

export default Projects;