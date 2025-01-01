import { useParams } from "react-router-dom";
import Footer from "../../Components/ForAll/Footer";
import Header from "../../Components/ForAll/Header";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import axios from "axios";
import { endPoint } from "../../Components/ForAll/ForAll";
import HerfModel from "../../Components/ForAll/HerfModel";

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

const SingleProject = () => {
  const { title } = useParams();
  const realUrl = title.replace(/-/g, " ");
  const [work, setWork] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility

  useEffect(() => {
    const fetchCategoriesAndWorks = async () => {
      try {
        const [categoriesResponse, worksResponse] = await Promise.all([
          axios.get(`${endPoint}/TechCategory`),
          axios.get(`${endPoint}/works/${realUrl}`),
        ]);

        const work = worksResponse.data.work;
        const categoriesData = categoriesResponse.data.techCategories;

        const worksData = (work) => {
          const category = categoriesData.find((cat) => cat._id === work.category);
          return { ...work, categoryName: category?.name || "No category specified" };
        };

        setCategories([{ name: "All", _id: "all" }, ...categoriesData]);
        setWork(worksData(work));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndWorks();
  }, [realUrl]);

  // Function to handle link click and show modal if the link is empty or '#'
  const handleLinkClick = (url) => {
    if (!url || url === "#") {
      setShowModal(true); // Show the modal if the link is empty or '#'
      return false; // Prevent link from opening
    }
    return true; // Allow the link to open normally
  };

  return (
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
            ) : work ? (
              <div className="h-[1040px]">
                <h2 className="lg:text-[130px] text-[60px] font-bold lg:leading-[130px] leading-[60px] text-white text-center uppercase z-40" style={{ letterSpacing: '-5px' }}>
                  {realUrl}
                </h2>
                <p className="lg:text-[20px] text-[16px] text-[#00ECFB] font-[100] text-center">{work?.categoryName}</p>

               <div className="flex justify-center items-center gap-4">
               <a
  target="_blank"
  href={work?.projectUrl}
  onClick={(e) => {
    if (!handleLinkClick(work?.projectUrl)) {
      e.preventDefault(); // Prevent opening the link if URL is invalid
    }
  }}
  className="flex justify-center my-4"
>
  <button className="bg-white lg:py-2 lg:px-7 px-4 py-2 text-[20px] rounded-sm poppins-medium lg:text-[25px]">
    View Website
  </button>
</a>

<a
  target="_blank"
  href={work?.githubUrl}
  onClick={(e) => {
    if (!handleLinkClick(work?.githubUrl)) {
      e.preventDefault(); // Prevent opening the link if URL is invalid
    }
  }}
  className="flex justify-center my-4"
>
  <button className="bg-white lg:py-2 lg:px-7 px-4 py-2 text-[20px] rounded-sm poppins-medium lg:text-[25px]">
    Github
  </button>
</a>
               </div>
               
<img src={work?.images[0].url} alt={work?.title - work?.categoryName} className="w-[910px] h-[560px] mx-auto rounded-[10px] mt-10"/>
              </div>
            ) : (
              <div className="text-center text-white py-10">Project not found.</div>
            )}

            {/* Black shadow at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
          </div>

          <Footer className="!z-24" />
        </div>
      </div>

      {/* Modal Component */}
      <HerfModel isVisible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default SingleProject;
