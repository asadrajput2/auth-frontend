import React from "react";

export default function SinglePost({ post }) {
  return (
    <div className="single-post">
      <div className="single-post-header">{post.title}</div>
      <div className="single-post-text">{post.text.length > 200 ? post.text.slice(0, 400) + "..." : post.text}</div>
    </div>
  );
}
