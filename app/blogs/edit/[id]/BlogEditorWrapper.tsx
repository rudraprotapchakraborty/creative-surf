"use client"

import BlogEditor from "../../BlogEditor"

export default function BlogEditorWrapper({ blogId }: { blogId: string }) {
  return <BlogEditor blogId={blogId} />
}
