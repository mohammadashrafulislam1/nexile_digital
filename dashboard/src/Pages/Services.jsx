import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { endPoint } from "../Components/ForAll/ForAll";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState({
    title: "",
    subtitle: "",
    // Ensure each section is initialized with one default item
    approach: [{ title: "", description: "", image: "" }],
    process: [{ title: "", description: "", image: "" }],
    why: [{ title: "", description: "", image: "" }],
    tools: [{ title: "", description: "", image: "" }],
  });
  const [loading, setLoading] = useState(false);
  const [mainServiceImage, setMainServiceImage] = useState(null);

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${endPoint}/service`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Error fetching services");
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("title", selectedService?.title || "");
    formData.append("subtitle", selectedService?.subtitle || "");
    formData.append("mainServiceImage", mainServiceImage);

    ["approach", "process", "why", "tools"].forEach((section) => {
      selectedService?.[section]?.forEach((item, index) => {
        formData.append(`${section}[${index}][title]`, item.title);
        formData.append(`${section}[${index}][description]`, item.description);
        if (item.image instanceof File) {
          formData.append(`${section}[image]`, item.image);
        }
      });
    });

    try {
      setLoading(true);
      let response;

      if (selectedService?._id) {
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
        fetchAllServices();
      } else {
        toast.error("Failed to add/update service.");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Error adding service");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (section, index, file) => {
    const updatedService = { ...selectedService };
    updatedService[section][index].image = file;
    setSelectedService(updatedService);
  };

  const handleMainImageChange = (file) => {
    setMainServiceImage(file);
  };

  const handleDeleteService = async (service) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the service: ${service.title}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`${endPoint}/service/${service._id}`);
        toast.success(`Service: ${service.title} deleted successfully`);
      } catch (error) {
        toast.error("Error deleting service");
      }
    }
  };

  const addNewItem = (section) => {
    const updatedService = { ...selectedService };
    // Initialize section with an empty array if it's undefined
    if (!updatedService[section]) {
      updatedService[section] = [];
    }
    updatedService[section].push({ title: "", description: "", image: "" });
    setSelectedService(updatedService);
  };
  
  const resetForm = () => {
    setSelectedService({
      title: "",
      subtitle: "",
      // Ensure each section is initialized with one default item
      approach: [{ title: "", description: "", image: "" }],
      process: [{ title: "", description: "", image: "" }],
      why: [{ title: "", description: "", image: "" }],
      tools: [{ title: "", description: "", image: "" }],
    });
    setMainServiceImage(null);
  };
  

  const removeItem = (section, itemIndex) => {
    const updatedService = { ...selectedService };
    updatedService[section] = updatedService[section].filter((_, i) => i !== itemIndex);
    setSelectedService(updatedService);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setMainServiceImage(service.mainServiceImage);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
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
            <span className="inline-flex items-center gap-2 text-gray-700">Services</span>
          </li>
        </ul>
        <ToastContainer />
      </div>

      <form onSubmit={handleAddService} className="lg:w-1/2 md:w-[80%] w-[96%] mx-auto bg-white p-6 rounded-2xl shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={selectedService?.title || ""}
            onChange={(e) => setSelectedService({ ...selectedService, title: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Subtitle</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={selectedService?.subtitle || ""}
            onChange={(e) => setSelectedService({ ...selectedService, subtitle: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Main Service Image</label>
          {
          selectedService?.mainServiceImage && 
          <img src={selectedService?.mainServiceImage} alt={selectedService?.title} className="w-24 h-24 rounded-md object-cover my-3" />
          }
          <input
            type="file"
            className="file-input w-full"
            onChange={(e) => handleMainImageChange(e.target.files[0])}
          />
        </div>

        {/* Dynamic Sections */}
        {["approach", "process", "why", "tools"].map((section) => (
          <div key={section} className="mb-4">
            <h3 className="text-lg font-bold capitalize mb-2">{section}</h3>
            {selectedService?.[section]?.map((item, index) => (
              <div key={index} className="mb-2 border p-4 rounded-md">
                <div className="mb-2 flex items-center gap-2 justify-between">
                  <div className="w-[90%]"><label className="block text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={item.title}
                    onChange={(e) => {
                      const updatedService = { ...selectedService };
                      updatedService[section][index].title = e.target.value;
                      setSelectedService(updatedService);
                    }}
                    required
                  /></div>
                <button type="button" className="w-[10%] text-2xl text-red-600 flex justify-end" onClick={() => removeItem(section, index)}>
                  <FaTrashAlt />
                </button>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={item.description}
                    onChange={(e) => {
                      const updatedService = { ...selectedService };
                      updatedService[section][index].description = e.target.value;
                      setSelectedService(updatedService);
                    }}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">Image</label>
                  {
                    selectedService[section][index]?.image && 
                  <img src={selectedService[section][index]?.image} alt={selectedService[section][index]?.title} className="w-24 h-24 rounded-md object-cover my-3" />
                  }
                  <input
                    type="file"
                    className="file-input w-full"
                    onChange={(e) => handleFileChange(section, index, e.target.files[0])}
                  />
                </div>
              </div>
            ))}
            <button type="button" className="text-7xl text-black" onClick={() => addNewItem(section)}>
              +
            </button>
          </div>
        ))}

        <button type="submit" className="btn btn-md bg-black text-white w-full text-center mt-4">
          {selectedService?._id ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* List of services */}
      {
          services.length < 0 ? <h2 className="text-xl font-semibold mt-4 ">Explore Services</h2> : <p className="lg:w-1/2 md:w-[80%] w-[96%] mx-auto text-white p-4 bg-red-400 rounded-md mt-5">no services found</p>
        }
      <div className="mt-6 flex flex-warp gap-4">
        {services?.map((service, index) => (
          <div key={index} className="p-4 border bg-white rounded-md mb-4">
            <div className="flex gap-3 items-center">
              <img src={service?.mainServiceImage} alt={`${service.title}, Nexile Digital`} className="w-32 h-32 rounded-md object-cover my-3"/>
            <div>
            <h3 className="text-lg font-bold">{service.title}</h3>
            <p>{service.subtitle}</p>
            </div>
            <div className="flex justify-between gap-2 mt-4 items-center">
              <button className="text-2xl text-blue-600 " onClick={() => handleEditService(service)}>
              <BsPencilSquare />
              </button>
                <button type="button" className="text-2xl text-red-600" onClick={() => handleDeleteService(service)}>
                  <FaTrashAlt />
                </button>
            </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
