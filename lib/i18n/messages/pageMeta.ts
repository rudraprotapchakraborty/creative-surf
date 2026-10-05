import { defineMessages } from "../types";

/**
 * Titles and descriptions for routes whose page is a client component and so
 * cannot export metadata itself — a sibling layout.tsx reads them instead.
 */
export const pageMetaMessages = defineMessages("pageMeta", {
  en: {
    account: {
      title: "My Account | Creative Surf",
      description: "Manage your Creative Surf account, saved CVs and chats.",
    },
    accountSettings: {
      title: "Account Settings | Creative Surf",
      description: "Change your name, sign-in email and password.",
    },
    newPost: {
      title: "New Blog Post | Creative Surf",
      description: "Write a new blog post.",
    },
    editPost: {
      title: "Edit Blog Post | Creative Surf",
      description: "Edit a blog post.",
    },
    newRealEstatePost: {
      title: "New Blog Post | Creative Surf Real Estate",
      description: "Write a new real estate blog post.",
    },
    editRealEstatePost: {
      title: "Edit Blog Post | Creative Surf Real Estate",
      description: "Edit a real estate blog post.",
    },
    home: {
      title: "Creative Surf | Digital Marketing Agency",
      description:
        "Creative Surf is a digital marketing agency specialising in SEO, web design, content and social media strategies that drive revenue growth for businesses.",
    },
    login: {
      title: "Sign In | Creative Surf",
      description: "Sign in to your Creative Surf account.",
    },
    forgotPassword: {
      title: "Reset Password | Creative Surf",
      description: "Reset the password for your Creative Surf account.",
    },
    register: {
      title: "Create an Account | Creative Surf",
      description: "Create a free Creative Surf account to save your CVs, chats and more.",
    },
    realEstate: {
      title: "Real Estate Marketing in Dhaka | Creative Surf Real Estate",
      description:
        "Dhaka's dedicated digital platform connecting real estate developers with qualified buyers, investors and land-share partners.",
    },
    realEstateProjects: {
      title: "Real Estate Projects in Dhaka | Creative Surf Real Estate",
      description:
        "Browse ongoing and upcoming residential and commercial real estate projects in Dhaka.",
    },
    realEstateProject: {
      title: "Project Details | Creative Surf Real Estate",
      description: "Plot, unit and building details for this real estate project in Dhaka.",
    },
    newProject: {
      title: "New Project | Creative Surf Real Estate",
      description: "Add a new real estate project listing.",
    },
    editProject: {
      title: "Edit Project | Creative Surf Real Estate",
      description: "Edit a real estate project listing.",
    },
  },
});
