import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { endPoint } from '../Components/ForAll/ForAll'; // Adjust the import path as necessary
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

const Footer = () => {
    const [footerData, setFooterData] = useState({
        logo: '',
        services: [{ name: '' }],
        resources: [{ name: '', link: '' }],
        followUs: [{ platform: '', url: '' }],
        contactMessage: '',
    });
    const [loading, setLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [footerId, setFooterId] = useState(null);

    // Fetch existing footer data if needed for edit mode
    useEffect(() => {
        fetchFooterData();
    }, []);

    const fetchFooterData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${endPoint}/footer`);
            if (response.data.length > 0) {
                const existingFooter = response.data[0];
                setFooterData(existingFooter);
                setFooterId(existingFooter._id);
                setIsUpdating(true);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching footer data:', error);
            setLoading(false);
        }
    };

    const handleFooterChange = (e) => {
        const { name, value } = e.target;
        setFooterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleServiceChange = (index, e) => {
        const { value } = e.target;
        const updatedServices = footerData.services.map((service, i) =>
            i === index ? { name: value } : service
        );
        setFooterData((prevData) => ({ ...prevData, services: updatedServices }));
    };

    const handleResourceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedResources = footerData.resources.map((resource, i) =>
            i === index ? { ...resource, [name]: value } : resource
        );
        setFooterData((prevData) => ({ ...prevData, resources: updatedResources }));
    };

    const handleFollowUsChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFollowUs = footerData.followUs.map((social, i) =>
            i === index ? { ...social, [name]: value } : social
        );
        setFooterData((prevData) => ({ ...prevData, followUs: updatedFollowUs }));
    };

    const addServiceField = () => {
        setFooterData((prevData) => ({
            ...prevData,
            services: [...prevData.services, { name: '' }],
        }));
    };

    const addResourceField = () => {
        setFooterData((prevData) => ({
            ...prevData,
            resources: [...prevData.resources, { name: '', link: '' }],
        }));
    };

    const addFollowUsField = () => {
        setFooterData((prevData) => ({
            ...prevData,
            followUs: [...prevData.followUs, { platform: '', url: '' }],
        }));
    };

    const deleteServiceField = (index) => {
        setFooterData((prevData) => ({
            ...prevData,
            services: prevData.services.filter((_, i) => i !== index),
        }));
    };

    const deleteResourceField = (index) => {
        setFooterData((prevData) => ({
            ...prevData,
            resources: prevData.resources.filter((_, i) => i !== index),
        }));
    };

    const deleteFollowUsField = (index) => {
        setFooterData((prevData) => ({
            ...prevData,
            followUs: prevData.followUs.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isUpdating) {
                await axios.put(`${endPoint}/footer/${footerId}`, footerData);
            } else {
                await axios.post(`${endPoint}/footer`, footerData);
            }
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${isUpdating ? 'Footer updated successfully!' : 'Footer added successfully!'}`,
                showConfirmButton: false,
                timer: 1500,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error saving footer data:', error);
            toast.error('Error saving footer data');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div className='my-10'>
            <ToastContainer />
            <form onSubmit={handleSubmit} className="p-6 lg:w-1/2 md:w-[80%] w-[90%] mx-auto bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">{isUpdating ? 'Update' : 'Add'} Footer</h2>

                <div className="mb-4">
                    <label className="label">
                        <span className="label-text">Logo URL:</span>
                    </label>
                    <input
                        type="text"
                        name="logo"
                        value={footerData.logo}
                        onChange={handleFooterChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Services:</h3>
                    {footerData.services.map((service, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={service.name}
                                onChange={(e) => handleServiceChange(index, e)}
                                className="input input-bordered w-full mb-2"
                                placeholder="Service Name"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => deleteServiceField(index)}
                                className="text-red-600"
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addServiceField} className="text-4xl text-black mt-2">+</button>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Resources:</h3>
                    {footerData.resources.map((resource, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                name="name"
                                value={resource.name}
                                onChange={(e) => handleResourceChange(index, e)}
                                className="input input-bordered w-full mb-2"
                                placeholder="Resource Name"
                                required
                            />
                            <input
                                type="text"
                                name="link"
                                value={resource.link}
                                onChange={(e) => handleResourceChange(index, e)}
                                className="input input-bordered w-full mb-2"
                                placeholder="Resource Link"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => deleteResourceField(index)}
                                className="text-red-600"
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addResourceField} className="text-4xl text-black mt-2">+</button>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Follow Us:</h3>
                    {footerData.followUs.map((social, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                name="platform"
                                value={social.platform}
                                onChange={(e) => handleFollowUsChange(index, e)}
                                className="input input-bordered w-full mb-2"
                                placeholder="Social Media Platform"
                                required
                            />
                            <input
                                type="text"
                                name="url"
                                value={social.url}
                                onChange={(e) => handleFollowUsChange(index, e)}
                                className="input input-bordered w-full mb-2"
                                placeholder="Social Media URL"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => deleteFollowUsField(index)}
                                className="text-red-600"
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addFollowUsField} className="text-4xl text-black mt-2">+</button>
                </div>

                <div className="mb-4">
                    <label className="label">
                        <span className="label-text">Contact Message:</span>
                    </label>
                    <textarea
                        name="contactMessage"
                        value={footerData.contactMessage}
                        onChange={handleFooterChange}
                        className="textarea textarea-bordered w-full"
                        placeholder="Contact Message"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4">{isUpdating ? 'Update Footer' : 'Add Footer'}</button>
            </form>
        </div>
    );
};

export default Footer;
