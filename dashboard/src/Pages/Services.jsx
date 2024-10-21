import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { endPoint } from "../Components/ForAll/ForAll"; // Ensure this points to your API endpoint
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [subServices, setSubServices] = useState([{
    title: "",
    image: "",
    subtitle: "",
    approach: [{ title: "", description: "", image: "" }],
    process: [{ title: "", description: "", image: "" }],
    why: [{ title: "", description: "", image: "" }],
    tools: [{ title: "", description: "", image: "" }],
  }]);
  const [loading, setLoading] = useState(false); // New loading state

  // Fetch all services on component mount
  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(`${endPoint}/service`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Error fetching services");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();    
    // Create FormData to handle file uploads
    const formData = new FormData();  
    formData.append("title", title);
    formData.append("description", description);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    // Add sub-services to FormData
    subServices.forEach((subService, index) => {
       // Append the sub-service ID if it exists
       if (subService._id) {
        formData.append(`services[${index}][id]`, subService._id); // Append service ID
    }
      formData.append(`services[${index}][title]`, subService.title);
      formData.append(`services[${index}][subtitle]`, subService.subtitle);
      // Add the main image for the sub-service
      if (subService.image) {
        formData.append(`image`, subService.image);  // Matches 'image' field in multer config
      }
      // Add approach section (images should match multer's field config)
      subService.approach.forEach((approach, appIndex) => {
        formData.append(`services[${index}][approach][${appIndex}][title]`, approach.title);
        formData.append(`services[${index}][approach][${appIndex}][description]`, approach.description);
        if (approach._id) {
          formData.append(`services[${index}][approach][${appIndex}][id]`, approach._id); // Append approach ID
      }
        if (approach.image) {
          formData.append(`approachImages`, approach.image);  // Matches 'approachImages' in multer config
        }
      });
  
      // Add process section
      subService.process.forEach((process, procIndex) => {
        formData.append(`services[${index}][process][${procIndex}][title]`, process.title);
        formData.append(`services[${index}][process][${procIndex}][description]`, process.description);
        if (process._id) {
          formData.append(`services[${index}][process][${procIndex}][id]`, process._id); // Append process ID
      }
        if (process.image) {
          formData.append(`processImages`, process.image);  // Matches 'processImages' in multer config
        }
      });
  
      // Add why section
      subService.why.forEach((why, whyIndex) => {
        formData.append(`services[${index}][why][${whyIndex}][title]`, why.title);
        formData.append(`services[${index}][why][${whyIndex}][description]`, why.description);
        if (why._id) {
          formData.append(`services[${index}][why][${whyIndex}][id]`, why._id); // Append why ID
      }
        if (why.image) {
          formData.append(`whyImages`, why.image);  // Matches 'whyImages' in multer config
        }
      });
  
      // Add tools section
      subService.tools.forEach((tool, toolIndex) => {
        formData.append(`services[${index}][tools][${toolIndex}][title]`, tool.title);
        formData.append(`services[${index}][tools][${toolIndex}][description]`, tool.description);
        if (tool._id) {
          formData.append(`services[${index}][tools][${toolIndex}][id]`, tool._id); // Append tool ID
      }
        if (tool.image) {
          formData.append(`toolsImages`, tool.image);  // Matches 'toolsImages' in multer config
        }
      });
    });
  
    console.log("FormData:", Array.from(formData.entries()));  // Log FormData to inspect
    
    try {
      setLoading(true); // Start loading
      let response;

      // Check if we are updating or adding a new service
      if (selectedService) {
        response = await fetch(`${endPoint}/service/${selectedService._id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        response = await fetch(`${endPoint}/service`, {
          method: "POST",
          body: formData,
        });
      }

      if (response.ok) {
        toast.success(selectedService ? "Service updated successfully!" : "Service added successfully!");
        fetchAllServices(); // Refresh the list
        resetForm(); // Reset the form after submission
      } else {
        toast.error("Failed to add/update service.");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Error adding service");
    } finally {
      setLoading(false); // End loading
    }
  };
  
  

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setMetaTitle("");
    setMetaDescription("");
    setSubServices([{
      title: "",
      image: "",
      subtitle: "",
      approach: [{ title: "", description: "", image: "" }],
      process: [{ title: "", description: "", image: "" }],
      why: [{ title: "", description: "", image: "" }],
      tools: [{ title: "", description: "", image: "" }],
    }]);
  };

  const handleFileChange = (index, sectionType, sectionIndex, file) => {
    const newSubServices = [...subServices];
    if (sectionType === "image") {
      newSubServices[index].image = file; // Handle main sub-service image
    } else {
      newSubServices[index][sectionType][sectionIndex].image = file; // Handle images for sections like approach, process, etc.
    }
    setSubServices(newSubServices);
  };


  const handleDeleteSubService = (index) => {
    const newSubServices = subServices.filter((_, i) => i !== index);
    setSubServices(newSubServices);
    toast.success("Sub-Service deleted successfully!");
  };

  // Function to add new items to a section
  const addNewItem = (index, section) => {
    const newSubServices = [...subServices];
    newSubServices[index][section].push({ title: "", description: "", image: "" });
    setSubServices(newSubServices);
  };

  // Function to remove an item from a section
  const removeItem = (index, section, itemIndex) => {
    const newSubServices = [...subServices];
    newSubServices[index][section] = newSubServices[index][section].filter((_, i) => i !== itemIndex);
    setSubServices(newSubServices);
  };

  // Show loader if loading is true
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  
  }
  console.log(selectedService, subServices)
  const handleEditService = (service) => {
    setSelectedService(service);
    setTitle(service.title);
    setDescription(service.description);
    console.log(service.services)
    setMetaTitle(service.MetaTitle);
    setMetaDescription(service.MetaDescription);
    setSubServices(service.services); // Assuming service has a subServices property
  };
  

  const handleDeleteService =async(service)=>{
    console.log(service)
   // Make DELETE request to your API
   await axios.delete(`${endPoint}/service/${service?._id}`);
   toast.success(`Service: ${service?.title} deleted successfully`);
   const updatedServices = services.filter(service => service._id !== service?._id);
   setServices(updatedServices)
  }

  return (
    <div className="p-6">
      <div className="breadcrumbs text-sm lg:w-1/2 md:w-[80%] w-[96%] mx-auto">
        <ul className="my-6">
          <li>
            <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <span className="inline-flex items-center gap-2 text-gray-700">
              Services
            </span>
          </li>
        </ul>
        <ToastContainer />
      </div>

      <form onSubmit={handleAddService} className="lg:w-1/2 md:w-[80%] w-[96%] mx-auto bg-white p-6 rounded-2xl shadow-md">
        {/* Meta Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Meta Title</label>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Meta Title"
            required
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Description"
            required
          />
        </div>

        {/* Meta Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Meta Description</label>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Meta Description"
            required
          />
        </div>

        {/* Sub-service fields */}
        {subServices?.map((subService, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-300 rounded-2xl">
            <div className="flex justify-between mb-8"><h3 className="text-lg font-semibold">Sub-Service {index + 1}</h3>
            <button type="button" onClick={() => handleDeleteSubService(index)} className="text-red-600 md:pr-4">
             <FaTrashAlt/>
            </button></div>
            {/* Sub-Service Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Sub-Service Title</label>
              <input
                type="text"
                value={subService.title}
                onChange={(e) => {
                  const newSubServices = [...subServices];
                  newSubServices[index].title = e.target.value;
                  setSubServices(newSubServices);
                }}
                className="w-full p-2 border rounded"
                placeholder="Enter Sub-Service Title"
                required
              />
            </div>

            {/* Subtitle */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                type="text"
                value={subService.subtitle}
                onChange={(e) => {
                  const newSubServices = [...subServices];
                  newSubServices[index].subtitle = e.target.value;
                  setSubServices(newSubServices);
                }}
                className="w-full p-2 border rounded"
                placeholder="Enter Subtitle"
                required
              />
            </div>

             {/* Sub-Service Image */}
             <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Sub-Service Image</label>
              {
                subService?.mainServiceImage && 
              <img src={subService?.mainServiceImage} alt={subService?.title} className="w-24 h-24 mb-2"/>
              }
              <input
                type="file"
                onChange={(e) => handleFileChange(index, "image", null, e.target.files[0])}
                className="w-full"
              />
            </div>

            {/* Approach Section */}
            <h4 className="font-semibold mb-2">Approach</h4>
            {subService.approach.map((approach, approachIndex) => (
              <div key={approachIndex} className="mb-4 p-4 border rounded-2xl bg-white">
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={approach.title}
                    onChange={(e) => {
                      const newSubServices = [...subServices];
                      newSubServices[index].approach[approachIndex].title = e.target.value;
                      setSubServices(newSubServices);
                    }}
                    className="w-3/4 p-2 border rounded"
                    placeholder="Approach Title"
                    required
                  />
                  <button type="button" onClick={() => removeItem(index, "approach", approachIndex)} className="text-red-600 md:pr-4">
                  <FaTrashAlt/>
                  </button>
                </div>
                <textarea
                  value={approach.description}
                  onChange={(e) => {
                    const newSubServices = [...subServices];
                    newSubServices[index].approach[approachIndex].description = e.target.value;
                    setSubServices(newSubServices);
                  }}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="Approach Description"
                  required
                />
                 {
                approach?.image && 
                <img src={approach?.image} alt={approach?.title} className="w-24 h-24"/>
              }
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, "approach", approachIndex, e.target.files[0])}
                  className="mt-2"
                />
              </div>
            ))}
            <button type="button" onClick={() => addNewItem(index, "approach")} className="text-blue-700 font-bold text-3xl mb-4">
              +
            </button>

            {/* Process Section */}
            <h4 className="font-semibold mb-2">Process</h4>
            {subService.process.map((process, processIndex) => (
              <div key={processIndex} className="mb-4 p-4 border rounded-2xl bg-white">
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={process.title}
                    onChange={(e) => {
                      const newSubServices = [...subServices];
                      newSubServices[index].process[processIndex].title = e.target.value;
                      setSubServices(newSubServices);
                    }}
                    className="w-3/4 p-2 border rounded"
                    placeholder="Process Title"
                    required
                  />
                  <button type="button" onClick={() => removeItem(index, "process", processIndex)} className="text-red-600 md:pr-4">
                  <FaTrashAlt/>
                  </button>
                </div>
                <textarea
                  value={process.description}
                  onChange={(e) => {
                    const newSubServices = [...subServices];
                    newSubServices[index].process[processIndex].description = e.target.value;
                    setSubServices(newSubServices);
                  }}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="Process Description"
                  required
                />
                {
                process?.image && 
                <img src={process?.image} alt={process?.title} className="w-24 h-24"/>
              }
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, "process", processIndex, e.target.files[0])}
                  className="mt-2"
                />
              </div>
            ))}
            <button type="button" onClick={() => addNewItem(index, "process")} className="text-blue-700 font-bold text-3xl mb-4">
             +
            </button>

            {/* Why Section */}
            <h4 className="font-semibold mb-2">Why</h4>
            {subService.why.map((whyItem, whyIndex) => (
              <div key={whyIndex} className="mb-4 p-4 border rounded-2xl bg-white">
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={whyItem.title}
                    onChange={(e) => {
                      const newSubServices = [...subServices];
                      newSubServices[index].why[whyIndex].title = e.target.value;
                      setSubServices(newSubServices);
                    }}
                    className="w-3/4 p-2 border rounded"
                    placeholder="Why Title"
                    required
                  />
                  <button type="button" onClick={() => removeItem(index, "why", whyIndex)} className="text-red-600 md:pr-4">
                  <FaTrashAlt/>
                  </button>
                </div>
                <textarea
                  value={whyItem.description}
                  onChange={(e) => {
                    const newSubServices = [...subServices];
                    newSubServices[index].why[whyIndex].description = e.target.value;
                    setSubServices(newSubServices);
                  }}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="Why Description"
                  required
                />
                {
                  whyItem?.image &&
                <img src={whyItem?.image} alt={whyItem?.title} className="w-24 h-24"/>
                }
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, "why", whyIndex, e.target.files[0])}
                  className="mt-2"
                />
              </div>
            ))}
            <button type="button" onClick={() => addNewItem(index, "why")} className="text-blue-700 font-bold text-3xl mb-4">
              +
            </button>

            {/* Tools Section */}
            <h4 className="font-semibold mb-2">Tools</h4>
            {subService.tools.map((tool, toolIndex) => (
              <div key={toolIndex} className="mb-4 p-4 border rounded-2xl bg-white">
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={tool.title}
                    onChange={(e) => {
                      const newSubServices = [...subServices];
                      newSubServices[index].tools[toolIndex].title = e.target.value;
                      setSubServices(newSubServices);
                    }}
                    className="w-[90%] p-2 border rounded"
                    placeholder="Tool Title"
                    required
                  />
                  <button type="button" onClick={() => removeItem(index, "tools", toolIndex)} className="text-red-600 md:pr-4">
                    <FaTrashAlt/>
                  </button>
                </div>
                <textarea
                  value={tool.description}
                  onChange={(e) => {
                    const newSubServices = [...subServices];
                    newSubServices[index].tools[toolIndex].description = e.target.value;
                    setSubServices(newSubServices);
                  }}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="Tool Description"
                  required
                />
                {
                  tool?.image &&
                  <img src={tool?.image} alt={tool?.title} className="w-24 h-24"/>
                }
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, "tools", toolIndex, e.target.files[0])}
                  className="mt-2"
                />
              </div>
            ))}
            <button type="button" onClick={() => addNewItem(index, "tools")} className="text-blue-700 font-bold text-3xl mb-4">
              +
            </button>
            <button type="button"  className="bg-black text-white btn btn-sm w-full mb-4">
              Save Sub Service
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setSubServices([...subServices, {
          title: "",
          image: "",
          subtitle: "",
          approach: [{ title: "", description: "", image: "" }],
          process: [{ title: "", description: "", image: "" }],
          why: [{ title: "", description: "", image: "" }],
          tools: [{ title: "", description: "", image: "" }],
          portfolio: [{ title: "", description: "", image: "" }],
        }])} className="btn btn-sm bg-black text-white mb-4">
          Add New Sub-Service
        </button>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          {selectedService ? "Update Service" : "Add Service"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Existing Services</h2>
        <div className="">
        {services.map((service, index) => (
          <div key={service.id} className="p-4 bg-white border rounded-2xl mb-4">
            <h3 className="font-semibold text-xl">Section Title: {service.title}</h3>
            <p className="text-[16px]">Section Description: {service.description}</p>
            <div>
              <h3 className="text-2xl font-semibold my-5">Sub Services:</h3>
              <div className="md:grid lg:grid-cols-3 md:grid-cols-2 gap-3">
              {
              service?.services?.map((subService) => 
          <div key={subService._id} className="p-4 bg-white border rounded-2xl mb-4 flex justify-between items-start">
            <div className="flex gap-3 items-center">
            <img src={subService?.mainServiceImage} alt={`${subService.title}, Nexile Digital`} className="w-32 h-32 rounded-2xl"/>
            <div><h3 className="font-semibold text-xl">{subService.title}</h3>
            <p>{subService.subtitle}</p></div>
            </div>
            
            <button onClick={() => handleDeleteSubService(index)} className="text-red-600 ml-4">
              <FaTrashAlt/>
            </button>
            
            </div>
            )
            }
              </div>
            </div>
            <button onClick={() => handleEditService(service)} className="text-blue-600">
              Edit
            </button>
            <button onClick={() => handleDeleteService(service)} className="text-red-600 ml-4">
              Delete
            </button>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
