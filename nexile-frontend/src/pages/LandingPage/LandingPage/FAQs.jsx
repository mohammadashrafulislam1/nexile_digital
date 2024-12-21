import { useEffect, useState } from "react";
import { endPoint } from "../../../Components/ForAll/ForAll";
import axios from "axios";
import { Link } from "react-router-dom";

const FAQs = () => {
  const [faqs, setFaqs] = useState(null); // Initialize as null to handle data absence gracefully

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${endPoint}/faq`);
        setFaqs(response.data[0]); // Assuming response.data is an array
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFAQs();
  }, []);

  if (!faqs) {
    // Render a loading state or fallback UI until data is fetched
    return <div className="text-white text-center">Loading FAQs...</div>;
  }

  return (
    <div className="lg:py-12 py-4 md:pt-24 px-8 relative overflow-hidden">
      <h2 className="text-white text-center lg:pt-20 lg:text-[120px] text-[40px] uppercase font-bold underline lg:leading-[160px] leading-[40px]">
        {faqs?.sectionTitle}
      </h2>

      <div className="lg:flex items-center">
        <div className="lg:w-[40%] w-full">
          {/* Arrow */}
          <img
            src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1732024726/nexile%20digital/assets/ejj6ajpv5ykj5qdgeqmi.png"
            className="lg:w-[125px] w-[80px] ml-24 flex"
            alt=""
          />

          <Link to="">
            <p>View All</p>
          </Link>
          {/* FAQ's Image */}
          <img
            src="https://res.cloudinary.com/dnwmtd4p1/image/upload/v1734793574/nexile%20digital/asset/sweeuaytvyztteymb3vd.webp"
            alt=""
          />
        </div>

        <div className="lg:w-[60%] w-full mt-24">
          {faqs.faqs?.slice(0, 4).map((faq, index) => (
            <div
              key={index}
              className={`text-[20px] pb-6 ${
                index !== faqs.faqs.slice(0, 4).length - 1
                  ? "border-b-[3px] border-[#646464]"
                  : ""
              } ${index > 0 ? "pt-6" : ""}`}
            >
              <h3 className="text-white poppins-semibold">{faq.title}</h3>
              <p className="text-white poppins-light">{faq.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
