import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../../apiProvider";
import useAuthentication from "../../../utils/verifyAuth";

export default function CreatePost() {
  // HOOKS

  const router = useRouter();
  useAuthentication("create-post", "protected");

  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [error, setError] = useState("");

  // FUNCTIONS
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api("posts/create", "POST", {
      title: postTitle,
      text: postText,
    });

    // console.log("response: ", response);
    if (response?.message === "success") {
      router.push("/");
    } else {
      setError("Error submitting the post! Please try again");
    }
  }

  return (
    <div>
      <form onSubmit={() => e.preventDefault()}>
        <div className="col">
          <input
            type="text"
            className="create-post-title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Post title goes here"
          />
          <textarea
            rows="6"
            value={postText}
            className="create-post-text"
            onChange={(e) => setPostText(e.target.value)}
            placeholder="... and the rest here"
          ></textarea>
          <div className="-flex-row">
            <div></div>
            <button
              className="btn signup-button post-btn"
              type="submit"
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
