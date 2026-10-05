import { defineMessages } from "../types";

/** Shared copy for both blog post readers (marketing and real estate). */
export const blogPostMessages = defineMessages("blogPost", {
  en: {
    notFound: "Post not found",
    backToBlogs: "← Back to Blogs",
    backToBlogsShort: "Back to Blogs",
    back: "Back",
    backToAll: "Back to all articles",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Delete this post? This cannot be undone.",
    writtenBy: "Written by",
    share: "Share",
    keyTakeaways: "Key takeaways",
    seo: {
      inboundReal: "Related on Creative Surf Real Estate",
      inbound: "Related on Creative Surf",
      outbound: "External Resources",
    },
  },
});
