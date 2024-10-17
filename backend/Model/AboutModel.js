import mongoose from "mongoose";

// Schema for Core Values
const CoreValueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // e.g., "Integrity"
  },
  description: {
    type: String, // e.g., "We operate with honesty and transparency..."
  }
});

// Schema for Why Choose Us
const WhyChooseUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // e.g., "Expertise"
  },
  description: {
    type: String, // e.g., "With years of experience in the digital world..."
  }
});

// Schema for Social Proof (client logos or awards)
const SocialProofSchema = new mongoose.Schema({
  title: {
    type: String, // e.g., "Our Clients"
  },
  images: [{
    url: {
      type: String, // URL for the image (e.g., Cloudinary URL)
    },
    public_id: {
      type: String, // Cloudinary public ID for easy deletion
    }
  }]
});

// Schema for Our Impact
const ImpactSchema = new mongoose.Schema({
  title: {
    type: String, // e.g., "X websites designed and developed"
  },
  description: {
    type: String, // Detailed description about the impact
  },
  image: {
    url: {
      type: String, // URL for the impact image (e.g., Cloudinary URL)
    },
    public_id: {
      type: String, // Cloudinary public ID for the impact image
    }
  }
});

// Main About Us Schema
const AboutUsSchema = new mongoose.Schema({
  sectionTitle: {
    type: String
  },
  sectionDes: {
    type: String
  },
  metaTitle: {
    type: String
  },
  metaDes: {
    type: String
  },
  intro: {
    tagline: {
      type: String, // e.g., "Empowering businesses through cutting-edge digital solutions."
    },
    whoWeAre: {
      type: String, // A short description about the company
    }
  },
  ourStory: {
    description: {
      type: String, // e.g., "Nexile Digital was born out of a desire to provide businesses with..."
    },
    image: {
      url: {
        type: String, // URL for the story image (e.g., Cloudinary URL)
      },
      public_id: {
        type: String, // Cloudinary public ID for the story image
      }
    }
  },
  ourMission: {
    description: {
      type: String, // e.g., "Our mission is to deliver scalable and innovative digital solutions..."
    },
    image: {
      url: {
        type: String, // URL for the mission image (e.g., Cloudinary URL)
      },
      public_id: {
        type: String, // Cloudinary public ID for the mission image
      }
    }
  },
  ourVision: {
    description: {
      type: String, // e.g., "Our vision is to be a leader in the digital space..."
    },
    image: {
      url: {
        type: String, // URL for the vision image (e.g., Cloudinary URL)
      },
      public_id: {
        type: String, // Cloudinary public ID for the vision image
      }
    }
  },
  coreValues: [CoreValueSchema], // Array of core values with title and description
  whyChooseUs: [WhyChooseUsSchema], // Array for Why Choose Us sections with title and description
  ourImpact: [ImpactSchema], // Array for impacts with title, description, and image
  socialProof: [SocialProofSchema], // Array of images and titles for social proof
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const AboutModel = mongoose.model('AboutUs', AboutUsSchema);
