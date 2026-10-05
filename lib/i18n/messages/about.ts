import { defineMessages } from "../types";

export const aboutMessages = defineMessages("about", {
  en: {
    metaTitle: "About Us | Creative Surf",
    metaDescription:
      "Learn about Creative Surf, our mission, values, and the talented team behind our creative agency.",
    hero: {
      title: "About Creative Surf",
      subtitle:
        "We're a team of passionate creatives dedicated to helping brands make waves in their industries",
    },
    story: {
      title: "Our Story",
      p1:
        "Creative Surf began with a simple mission: to create authentic brand experiences that resonate with audiences and drive meaningful results.",
      p2:
        "What started as a small team of three has grown into a diverse collective of strategists, designers, developers, and content creators united by our passion for creative excellence.",
      p3:
        "Today, we're proud to partner with brands across industries, from emerging startups to established enterprises, helping them navigate the ever-changing digital landscape and connect with their audiences in authentic ways.",
      imageAlt: "Creative Surf team",
    },
    values: {
      title: "Our Values",
      items: [
        { title: "Creativity", description: "We approach every challenge with fresh thinking and innovative solutions." },
        { title: "Collaboration", description: "We believe the best work happens when diverse perspectives come together." },
        { title: "Excellence", description: "We hold ourselves to the highest standards in everything we do." },
        { title: "Authenticity", description: "We value honesty and transparency in all our relationships." },
        { title: "Growth", description: "We're committed to continuous learning and improvement." },
        { title: "Impact", description: "We measure our success by the results we deliver for our clients." },
      ],
    },
    cta: {
      title: "Let's Create Something Amazing Together",
      body: "Ready to take your brand to the next level? We'd love to hear about your project.",
      button: "Get in Touch",
    },
  },
});
