import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { endPoint } from "../Components/ForAll/ForAll"; // Ensure this points to your API endpoint

const Services = () => {
  const [services, setServices] = useState([]);
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
    portfolio: [{ title: "", description: "", image: "" }],
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
    const serviceData = { title, description, metaTitle, metaDescription, services: subServices };
    setLoading(true); // Start loading

    try {
      const response = await fetch(`${endPoint}/service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });
      if (response.ok) {
        toast.success("Service added successfully!");
        fetchAllServices(); // Refresh the list
        resetForm(); // Reset form after successful submission
      } else {
        toast.error("Failed to add service.");
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
      portfolio: [{ title: "", description: "", image: "" }],
    }]);
  };

  const handleFileChange = (index, sectionType, sectionIndex, file) => {
    const newSubServices = [...subServices];
    newSubServices[index][sectionType][sectionIndex].image = file;
    setSubServices(newSubServices);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const uploadResponse = await fetch(`${endPoint}/upload`, {
      method: "POST",
      body: formData,
    });

    if (uploadResponse.ok) {
      const uploadedData = await uploadResponse.json();
      return uploadedData.imageUrl; // Adjust based on your API response
    } else {
      throw new Error("Image upload failed");
    }
  };

  const handleSaveSubService = async (subService, index) => {
    try {
      setLoading(true); // Start loading
      // Handle image uploads for each section of the sub-service
      const uploadedApproaches = await Promise.all(
        subService.approach.map(async (approach) => {
          if (approach.image) {
            approach.image = await uploadImage(approach.image);
          }
          return approach;
        })
      );

      const updatedSubServices = [...subServices];
      updatedSubServices[index].approach = uploadedApproaches;
      setSubServices(updatedSubServices);
      toast.success("Sub-Service saved successfully!");
    } catch (error) {
      console.error("Error saving sub-service:", error);
      toast.error("Error saving sub-service");
    } finally {
      setLoading(false); // End loading
    }
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

  return (
    <div className="p-6">
      <div className="breadcrumbs text-sm lg:w-1/2 md:w-[80%] w-[90%] mx-auto">
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

      <form onSubmit={handleAddService} className="lg:w-1/2 md:w-[80%] w-[90%] mx-auto bg-white p-6 rounded-2xl shadow-md">
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
        {subServices.map((subService, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-300 rounded">
            <h3 className="text-lg font-semibold">Sub-Service {index + 1}</h3>
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

            {/* Approach Section */}
            <h4 className="font-semibold mb-2">Approach</h4>
            {subService.approach.map((approach, approachIndex) => (
              <div key={approachIndex} className="mb-4 p-2 border rounded bg-gray-100">
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
                  <button type="button" onClick={() => removeItem(index, "approach", approachIndex)} className="btn btn-danger">
                    Delete
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
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, "approach", approachIndex, e.target.files[0])}
                  className="mt-2"
                />
              </div>
            ))}
            <button type="button" onClick={() => addNewItem(index, "approach")} className="btn btn-primary mb-4">
              Add Approach
            </button>

            {/* Process Section */}
            <h4 className="font-semibold mb-2">Process</h4>
            {subService.process.map((process, processIndex) => (
              <div key={processIndex} className="mb-4 p-2 border rounded bg-gray-100">
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
                  <button type="button" onClick={() => removeItem(index, "process", processIndex)} className="btn btn-danger">
                    Delete
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
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, "process", processIndex, e.target.files[0])}
                  className="mt-2"
                />
              </div>
            ))}
            <button type="button" onClick={() => addNewItem(index, "process")} className="btn btn-primary mb-4">
              Add Process
            </button>

            {/* Why Section */}
            <h4 className="font-semibold mb-2">Why</h4>
            {subService.why.map((whyItem, whyIndex) => (
              <div key={whyIndex} className="mb-4 p-2 border rounded bg-gray-100">
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
                  <button type="button" onClick={() => removeItem(index, "why", whyIndex)} className="btn btn-danger">
                    Delete
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
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, "why", whyIndex, e.target.files[0])}
                  className="mt-2"
                />
              </div>
            ))}
            <button type="button" onClick={() => addNewItem(index, "why")} className="btn btn-primary mb-4">
              Add Why
            </button>

            {/* Tools Section */}
            <h4 className="font-semibold mb-2">Tools</h4>
            {subService.tools.map((tool, toolIndex) => (
              <div key={toolIndex} className="mb-4 p-2 border rounded bg-gray-100">
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={tool.title}
                    onChange={(e) => {
                      const newSubServices = [...subServices];
                      newSubServices[index].tools[toolIndex].title = e.target.value;
                      setSubServices(newSubServices);
                    }}
                    className="w-3/4 p-2 border rounded"
                    placeholder="Tool Title"
                    required
                  />
                  <button type="button" onClick={() => removeItem(index, "tools", toolIndex)} className="btn btn-danger">
                    Delete
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
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, "tools", toolIndex, e.target.files[0])}
                  className="mt-2"
                />
              </div>
            ))}
            <button type="button" onClick={() => addNewItem(index, "tools")} className="btn btn-primary mb-4">
              Add Tool
            </button>

            {/* Portfolio Section */}
            <h4 className="font-semibold mb-2">Portfolio</h4>
            {subService.portfolio.map((portfolioItem, portfolioIndex) => (
              <div key={portfolioIndex} className="mb-4 p-2 border rounded bg-gray-100">
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={portfolioItem.title}
                    onChange={(e) => {
                      const newSubServices = [...subServices];
                      newSubServices[index].portfolio[portfolioIndex].title = e.target.value;
                      setSubServices(newSubServices);
                    }}
                    className="w-3/4 p-2 border rounded"
                    placeholder="Portfolio Title"
                    required
                  />
                  <button type="button" onClick={() => removeItem(index, "portfolio", portfolioIndex)} className="btn btn-danger">
                    Delete
                  </button>
                </div>
                <textarea
                  value={portfolioItem.description}
                  onChange={(e) => {
                    const newSubServices = [...subServices];
                    newSubServices[index].portfolio[portfolioIndex].description = e.target.value;
                    setSubServices(newSubServices);
                  }}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="Portfolio Description"
                  required
                />
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, "portfolio", portfolioIndex, e.target.files[0])}
                  className="mt-2"
                />
              </div>
            ))}
            <button type="button" onClick={() => addNewItem(index, "portfolio")} className="btn btn-primary mb-4">
              Add Portfolio Item
            </button>

            <button type="button" onClick={() => handleDeleteSubService(index)} className="btn btn-danger">
              Delete Sub-Service
            </button>
            <button type="button" onClick={() => handleSaveSubService(subService, index)} className="btn btn-success">
              Save Sub-Service
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
        }])} className="btn btn-primary mb-4">
          Add New Sub-Service
        </button>
        <button type="submit" className="btn btn-success">
          Submit All Services
        </button>
      </form>
    </div>
  );
};

export default Services;
