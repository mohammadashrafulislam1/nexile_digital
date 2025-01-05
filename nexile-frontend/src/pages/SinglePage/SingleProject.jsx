import { useParams } from "react-router-dom";
import Footer from "../../Components/ForAll/Footer";
import Header from "../../Components/ForAll/Header";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import axios from "axios";
import { endPoint } from "../../Components/ForAll/ForAll";
import HerfModel from "../../Components/ForAll/HerfModel";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};
const SingleProject = () => {
  const { title } = useParams();
const realUrl = title.replace(/-/g, " ");
const [work, setWork] = useState(null);
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);
const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
const [matchedTechStack, setMatchedTechStack] = useState([]); // State for matched tech stack

useEffect(() => {
  const fetchCategoriesAndWorks = async () => {
    try {
      const [categoriesResponse, techStackRes, worksResponse] = await Promise.all([
        axios.get(`${endPoint}/TechCategory`),
        axios.get(`${endPoint}/techStack`),
        axios.get(`${endPoint}/works/${realUrl}`),
      ]);

      const work = worksResponse.data.work;
      const techStack = techStackRes.data.techStack;
      const categoriesData = categoriesResponse.data.techCategories;

      // Map work's techStack IDs to their corresponding objects
      const matchedTech = techStack.filter((tech) =>
        work.techStack.includes(tech._id)
      );

      // Add category name to work
      const worksData = (work) => {
        const category = categoriesData.find((cat) => cat._id === work.category);
        return { ...work, categoryName: category?.name || "No category specified" };
      };

      setCategories([{ name: "All", _id: "all" }, ...categoriesData]);
      setWork(worksData(work));
      setMatchedTechStack(matchedTech); // Store matched tech stack in state
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCategoriesAndWorks();
}, [realUrl]);

  console.log(work)

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
                <h2 className="lg:text-[100px] md:text-[60px] text-[50px] font-bold lg:leading-[130px] leading-[60px] text-white text-center uppercase z-40" style={{ letterSpacing: '-5px' }}>
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
               

               <p className="text-white text-center poppins-light text-2xl">Project Timeline: <span className="poppins-semibold">{work?.projectTimeline}</span> days</p>
               <p className="text-white text-center poppins-light text-2xl">Completed in: {formatDate(work?.completionDate)}</p>
               
<img src={work?.images[0].url} alt={work?.title - work?.categoryName} className="lg:w-[910px] w-[98%] md:h-[560px] mx-auto rounded-[10px] mt-10 object-cover"/>
              
              </div>
            ) : (
              <div className="text-center text-white py-10">Project not found.</div>
            )}

            {/* Black shadow at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
          </div>

          {
  work ? (
    <div className="px-12 mb-24 lg:mt-0 md:mt-[-150px] mt-[-300px] z-10 relative">
      {/* About the Project */}
      <div className="p-6">
        <h2 className="text-white font-bold text-[25px]">About the project</h2>
        <p className="text-white">{work?.shortDescription}</p>
      </div>

      {/* Goal */}
      <div className="p-6">
        <h2 className="text-white font-bold text-[25px]">Goal</h2>
        <p className="text-white">{work?.problemGoal}</p>
      </div>

      {/* Services Provided */}
      <div className="p-6">
        <h2 className="text-white font-bold text-[25px]">Services Provided</h2>
        {work?.servicesProvided && work?.servicesProvided.length > 0 ? (
          <ul className="list-disc list-inside text-white">
            {work.servicesProvided.map((service, index) => (
              <li key={index} className="flex gap-2 mb-2"><div className="text-white border-[1px] border-[#fff] px-2 rounded-full">{index+1}</div>{service}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No services provided listed for this project.</p>
        )}
      </div>

      <div className="">
                            <div className="p-6">
                                <h2 className="text-white font-bold text-[25px]">Tech Stack</h2>
                                <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
                                    {matchedTechStack.map((tech) => (
                                        <div
                                            key={tech._id}
                                            className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2"
                                        >
                                            <img
                                                src={tech.image}
                                                alt={tech.title}
                                                className="w-16 h-16 mx-auto mb-2 object-contain"
                                            />
                                            <h3 className="text-white text-center font-semibold">{tech.title}</h3>
                                            <p className="text-gray-400 text-sm mt-2">{tech.description}</p>
                                        </div>
                                    ))}
                                </div></div></div>
      
                                {
  work?.metricsData && (
    <div className="p-6">
      <h2 className="text-white font-bold text-[25px]">Metrics Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
        {/* Traffic Increase */}
        <div className="flex flex-col items-center text-white">
          <CircularProgressbar
            value={work.metricsData.trafficIncrease}
            text={`${work.metricsData.trafficIncrease}%`}
            styles={buildStyles({
              textColor: "white",
              pathColor: "#00ECFB",
              trailColor: "#2C2C2C",
            })}
          />
          <p className="mt-2">Traffic Increase</p>
        </div>

        {/* Conversion Rate Improvement */}
        <div className="flex flex-col items-center text-white">
          <CircularProgressbar
            value={work.metricsData.conversionRateImprovement}
            text={`${work.metricsData.conversionRateImprovement}%`}
            styles={buildStyles({
              textColor: "white",
              pathColor: "#FFA500",
              trailColor: "#2C2C2C",
            })}
          />
          <p className="mt-2">Conversion Rate</p>
        </div>

        {/* Page Speed Improvement */}
        <div className="flex flex-col items-center text-white">
          <CircularProgressbar
            value={work.metricsData.pageSpeedImprovement}
            text={`${work.metricsData.pageSpeedImprovement}%`}
            styles={buildStyles({
              textColor: "white",
              pathColor: "#32CD32",
              trailColor: "#2C2C2C",
            })}
          />
          <p className="mt-2">Page Speed</p>
        </div>

        {/* SEO Improvements */}
        <div className="flex flex-col items-center text-white">
          <CircularProgressbar
            value={work.metricsData.seoImprovements}
            text={`${work.metricsData.seoImprovements}%`}
            styles={buildStyles({
              textColor: "white",
              pathColor: "#1E90FF",
              trailColor: "#2C2C2C",
            })}
          />
          <p className="mt-2">SEO Improvements</p>
        </div>

        {/* Video Engagement */}
        <div className="flex flex-col items-center text-white">
          <CircularProgressbar
            value={work.metricsData.videoEngagement}
            text={`${work.metricsData.videoEngagement}%`}
            styles={buildStyles({
              textColor: "white",
              pathColor: "#FF4500",
              trailColor: "#2C2C2C",
            })}
          />
          <p className="mt-2">Video Engagement</p>
        </div>
      </div>
    </div>
  )
}

    </div>
  ) : (
    <div className="text-center text-white py-10">Project not found.</div>
  )
}

          <Footer className="!z-24" />
        </div>
      </div>

      {/* Modal Component */}
      <HerfModel isVisible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default SingleProject;
