import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaClock } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
    console.log(project)
    const CompletionDate = ({ completionDate }) => {
        // Convert the ISO date string to a readable format (Month and Year)
        const date = new Date(completionDate);
        const formattedDate = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
        return (
            <div className="flex bg-black items-center h-fit px-2 py-1 gap-1 rounded-full text-white">
              <FaClock 
              size={20} className="text-[#ffd500]"/> {/* React time icon */}
              <span>{formattedDate}</span>
            </div>
          );
        };      
  return (

    <div className="rounded-[20px] p-[2px] bg-gradient-to-r from-[#9DE8EE] via-[#FA7C0B] 
         to-[#9F8CED] shadow-lg hover:shadow-xl transition duration-300 p-4">
    <div className="bg-[#404040] flex flex-col-reverse p-2 shadow-md gap-3 rounded-[20px]">
      <div className="h-64 rounded-[20px] w-full overflow-hidden">
        <img
          src={project.images[0]?.url || "https://via.placeholder.com/150"}
          alt={project.title}
          className="w-full h-full rounded-[20px] object-cover"
        />
      </div>
      <div className=" pt-2 px-2">
        <div className="flex items-center justify-between mb-3">
        <CompletionDate completionDate={project.completionDate} />
        <Link to={`/project/${project.title.replace(/\s+/g, "-")}`}>
  <div className="bg-[#0f0f0f] p-3 rounded-[10px]">
    <MdOutlineArrowOutward className="text-[25px]" />
  </div>
</Link>

        </div>
        <h3 className="text-[23px] font-bold text-wheat" style={{lineHeight:'20px'}}>{project.title}</h3>
        <div className="mt-1">
          <span className="inline-block text-gray-400 text-[15px]">
            {project.categoryName || "Uncategorized"}
          </span>
        </div>
      </div>
    </div></div>
  );
};

export default ProjectCard;
