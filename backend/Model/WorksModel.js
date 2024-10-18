import mongoose from "mongoose";

const showcaseSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Category of the showcase (e.g., Web Development, Video Editing)
  title: { type: String, required: true }, // Title of the project
  images: [{ type: String, required: true }], // Array of image URLs
  technologies: [{ type: String, required: true }], // List of technologies used
  client: { type: String, required: true }, // Name of the client
  shortDescription: { type: String, required: true }, // Short description of the project
  problemGoal: { type: String, required: true }, // Problem or goal faced by the client
  servicesProvided: [{ type: String, required: true }], // List of services provided
  projectTimeline: { type: String, required: true }, // Explanation of the project timeline
  customSolutions: { type: String, required: true }, // Description of tailored solutions
  metricsData: { 
    trafficIncrease: { type: String, required: false }, // Metrics on website traffic
    conversionRateImprovement: { type: String, required: false }, // Metrics on conversion rates
    pageSpeedImprovement: { type: String, required: false }, // Page speed metrics
    seoImprovements: { type: String, required: false }, // SEO improvement metrics
    videoEngagement: { type: String, required: false } // Video engagement metrics
  },
  clientTestimonial: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientTestimonial' }, // Reference to ClientTestimonial model
  techStack: [{ 
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
   }], // Technologies and tools used
  pluginsIntegrations: [{ type: String, required: false }], // Plugins or integrations used
  callToAction: { type: String, required: true } // Call-to-action message
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

const worksSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true }, // Title for the works section
  description: { type: String, required: true }, // Description for the works section
  showcases: [showcaseSchema] // Array of showcases
});

export const WorksModel = mongoose.model('Works', worksSchema);
