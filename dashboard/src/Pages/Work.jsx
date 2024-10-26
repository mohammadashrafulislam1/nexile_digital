import React, { useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Work = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    projectUrl: '',
    githubUrl: '',
    client: '',
    shortDescription: '',
    problemGoal: '',
    servicesProvided: ['Default Service 1'], // Default service
    projectTimeline: '',
    customSolutions: '',
    metricsData: {
      trafficIncrease: '',
      conversionRateImprovement: '',
      pageSpeedImprovement: '',
      seoImprovements: '',
      videoEngagement: '',
    },
    clientTestimonial: '',
    techStack: [
    ],
    tags: [],
    isFeatured: false,
    completionDate: '',
    metaDescription: '',
    metaKeywords: [],
  });

  const [images, setImages] = useState([]);
  const [techStackItem, setTechStackItem] = useState({ title: '', description: '', image: '' });
  const [service, setService] = useState('');
  const [tag, setTag] = useState('');
  const [metaKeyword, setMetaKeyword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    setTechStackItem({ ...techStackItem, image: e.target.files[0] });
  };
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    const newImages = files.map((file) => URL.createObjectURL(file)); // Create URLs for previews
    setImages((prevImages) => prevImages.concat(newImages)); // Concatenate new images with the existing ones
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index)); // Remove the selected image
  };

  const handleTechStackChange = (e) => {
    const { name, value } = e.target;
    setTechStackItem({ ...techStackItem, [name]: value });
  };

  const addTechStackItem = () => {
    setFormData({ ...formData, techStack: [...formData.techStack, techStackItem] });
    setTechStackItem({ title: '', description: '', image: '' });
  };

  const addService = () => {
    setFormData({ ...formData, servicesProvided: [...formData.servicesProvided, service] });
    setService('');
  };

  const addTag = () => {
    setFormData({ ...formData, tags: [...formData.tags, tag] });
    setTag('');
  };

  const addMetaKeyword = () => {
    setFormData({ ...formData, metaKeywords: [...formData.metaKeywords, metaKeyword] });
    setMetaKeyword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completeData = { ...formData, images };
    try {
      const response = await axios.post('/api/works', completeData);
      console.log('Project added successfully:', response.data);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const removeItem = (section, index) => {
    const updatedItems = [...formData[section]];
    updatedItems.splice(index, 1);
    setFormData({ ...formData, [section]: updatedItems });
  };
console.log(formData.techStack)
  return (
   <div>
     <div className="breadcrumbs text-sm lg:w-1/2 md:w-[80%] w-[96%] mx-auto">
      <ul className="my-6">
        <li>
          <Link
            to="/" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
              </svg>
            Home
          </Link>
        </li>
        <li>
          <span className="inline-flex items-center gap-2 text-gray-700"><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Services</span>
        </li>
      </ul>
    </div>
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md lg:w-1/2 md:w-[80%] w-[96%] mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Work</h2>

      <div>
        <input 
          type="text" 
          name="title" 
          placeholder="Project Title" 
          onChange={handleChange} 
          value={formData.title} 
          className="input input-bordered w-full mb-2" 
          required 
        />
        <input 
          type="text" 
          name="category" 
          placeholder="Category" 
          onChange={handleChange} 
          value={formData.category} 
          className="input input-bordered w-full mb-2" 
          required 
        />
      </div>

      <div>
        <input 
          type="url" 
          name="projectUrl" 
          placeholder="Project URL" 
          onChange={handleChange} 
          value={formData.projectUrl} 
          className="input input-bordered w-full mb-2" 
        />
        <input 
          type="url" 
          name="githubUrl" 
          placeholder="GitHub URL" 
          onChange={handleChange} 
          value={formData.githubUrl} 
          className="input input-bordered w-full mb-2" 
        />
      </div>

      <textarea 
        name="shortDescription" 
        placeholder="Short Description" 
        onChange={handleChange} 
        value={formData.shortDescription} 
        className="textarea textarea-bordered w-full mb-4" 
        rows="3" 
      />

      {/* Services Provided Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold capitalize mb-2">Services Provided</h3>
        {formData.servicesProvided.map((service, index) => (
          <div key={index} className="mb-2 border p-4 rounded-md">
            <div className="mb-2 flex items-center gap-2 justify-between">
              <div className="w-[90%]">
                <label className="block text-gray-700 mb-1">Service</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={service}
                  onChange={(e) => {
                    const updatedServices = [...formData.servicesProvided];
                    updatedServices[index] = e.target.value;
                    setFormData({ ...formData, servicesProvided: updatedServices });
                  }}
                  required
                />
              </div>
              <button type="button" className="w-[10%] text-2xl text-red-600 flex justify-end" onClick={() => removeItem('servicesProvided', index)}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
        <button type="button" className="text-7xl text-black" onClick={addService}>
          +
        </button>
      </div>

      {/* Tech Stack Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold capitalize mb-2">Tech Stack</h3>
        {formData.techStack.map((item, index) => (
          <div key={index} className="mb-2 border p-4 rounded-md">
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Title</label>
              <input
                type="text"
                className="input input-bordered w-full mb-2"
                value={item.title}
                onChange={(e) => {
                  const updatedTechStack = [...formData.techStack];
                  updatedTechStack[index].title = e.target.value;
                  setFormData({ ...formData, techStack: updatedTechStack });
                }}
                required
              />
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                className="textarea textarea-bordered w-full mb-2"
                value={item.description}
                onChange={(e) => {
                  const updatedTechStack = [...formData.techStack];
                  updatedTechStack[index].description = e.target.value;
                  setFormData({ ...formData, techStack: updatedTechStack });
                }}
                required
                rows="2"
              />{item.image ? (
                // Check if item.image is a URL
                item.image instanceof File ? (
                  // If it's a File object, create a URL for it
                  <img
                    src={URL.createObjectURL(item.image)}
                    alt={item.title}
                    className="w-32 h-32 rounded-md object-cover my-3" // Adjust styles as needed
                  />
                ) : (
                  // If it's a URL string, use it directly
                  <img
                    src={item.image} // This is the URL
                    alt={item.title}
                    className="w-32 h-32 rounded-md object-cover my-3" // Adjust styles as needed
                  />
                )
              ) : (
                <p>No image uploaded.</p> // Optional: message when no image is present
              )}
            </div>
            <button type="button" className="w-full text-2xl text-red-600 flex justify-end" onClick={() => removeItem('techStack', index)}>
              <FaTrashAlt />
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder="Tech Title"
          name="title"
          value={techStackItem.title}
          onChange={handleTechStackChange}
          className="input input-bordered w-full mb-2"
        />
        <textarea
          placeholder="Tech Description"
          name="description"
          value={techStackItem.description}
          onChange={handleTechStackChange}
          className="textarea textarea-bordered w-full mb-2"
          rows="2"
        />
        <label className="block text-gray-700 mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full mb-2"
            onChange={handleImageChange}
          />
        <button type="button" className="btn btn-primary" onClick={addTechStackItem}>
          Add Tech Stack Item
        </button>
      </div>

      {/* Tags Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold capitalize mb-2">Tags</h3>
        {formData.tags.map((tag, index) => (
          <div key={index} className="mb-2 border p-4 rounded-md">
            <div className="flex justify-between">
              <span>{tag}</span>
              <button type="button" className="text-red-600" onClick={() => removeItem('tags', index)}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
        <input 
          type="text" 
          placeholder="Add Tag" 
          value={tag} 
          onChange={(e) => setTag(e.target.value)} 
          className="input input-bordered w-full mb-2" 
        />
        <button type="button" className="btn btn-primary" onClick={addTag}>
          Add Tag
        </button>
      </div>

      {/* Meta Keywords Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold capitalize mb-2">Meta Keywords</h3>
        {formData.metaKeywords.map((keyword, index) => (
          <div key={index} className="mb-2 border p-4 rounded-md">
            <div className="flex justify-between">
              <span>{keyword}</span>
              <button type="button" className="text-red-600" onClick={() => removeItem('metaKeywords', index)}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
        <input 
          type="text" 
          placeholder="Add Meta Keyword" 
          value={metaKeyword} 
          onChange={(e) => setMetaKeyword(e.target.value)} 
          className="input input-bordered w-full mb-2" 
        />
        <button type="button" className="btn btn-primary" onClick={addMetaKeyword}>
          Add Meta Keyword
        </button>
      </div>

      {/* Other Fields */}
      <div>
        <input 
          type="text" 
          name="client" 
          placeholder="Client Name" 
          onChange={handleChange} 
          value={formData.client} 
          className="input input-bordered w-full mb-2" 
        />
        <textarea 
          name="problemGoal" 
          placeholder="Problem/Goal" 
          onChange={handleChange} 
          value={formData.problemGoal} 
          className="textarea textarea-bordered w-full mb-2" 
          rows="3" 
        />
        <textarea 
          name="customSolutions" 
          placeholder="Custom Solutions" 
          onChange={handleChange} 
          value={formData.customSolutions} 
          className="textarea textarea-bordered w-full mb-2" 
          rows="3" 
        />
        <input 
          type="text" 
          name="projectTimeline" 
          placeholder="Project Timeline" 
          onChange={handleChange} 
          value={formData.projectTimeline} 
          className="input input-bordered w-full mb-2" 
        />
      </div>

      {/* Metrics Data Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold capitalize mb-2">Metrics Data</h3>
        {Object.keys(formData.metricsData).map((key) => (
          <div key={key}>
            <input
              type="text"
              placeholder={key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              name={key}
              value={formData.metricsData[key]}
              onChange={(e) => setFormData({
                ...formData,
                metricsData: { ...formData.metricsData, [key]: e.target.value },
              })}
              className="input input-bordered w-full mb-2"
            />
          </div>
        ))}
      </div>

      <textarea 
        name="clientTestimonial" 
        placeholder="Client Testimonial" 
        onChange={handleChange} 
        value={formData.clientTestimonial} 
        className="textarea textarea-bordered w-full mb-2" 
        rows="3" 
      />

      <label className="flex items-center mb-2">
        <input 
          type="checkbox" 
          name="isFeatured" 
          checked={formData.isFeatured} 
          onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} 
          className="mr-2" 
        />
        Featured Project
      </label>

      <input 
        type="date" 
        name="completionDate" 
        onChange={handleChange} 
        value={formData.completionDate} 
        className="input input-bordered w-full mb-2" 
      />

      <textarea 
        name="metaDescription" 
        placeholder="Meta Description" 
        onChange={handleChange} 
        value={formData.metaDescription} 
        className="textarea textarea-bordered w-full mb-2" 
        rows="3" 
      />

      {/* Image Upload */}
      <div className="mb-4">
      <h3 className="text-lg font-bold capitalize mb-2">Upload Images</h3>
      <input
        type="file"
        onChange={handleImageUpload}
        className="file-input file-input-bordered w-full mb-2"
        accept="image/*"
        multiple // Allow multiple uploads
      />
      {images.map((img, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <img
            src={img}
            alt={`Uploaded preview ${index}`}
            className="w-16 h-16 object-cover mr-2" // Thumbnail style
          />
          <button
            type="button"
            className="text-red-600"
            onClick={() => removeImage(index)} // Use removeImage function
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}
    </div>

      <button type="submit" className="btn btn-primary mt-4">Submit Project</button>
    </form>
  </div>
);
};

export default Work;
