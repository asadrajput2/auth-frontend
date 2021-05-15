import { useRouter } from "next/router";
import React from "react";
import api from "../apiProvider";
import SinglePost from "../components/posts/SinglePost";
import UserFAB from "../components/user";

export default function Posts({ postsList }) {
  const router = useRouter();

  // const isAuthenticated = useAuthentication();

  async function handleAddPost() {
    router.push("/posts/create");
  }

  return (
    <div className="home">
      <UserFAB />
      <button className="add-post-btn" onClick={handleAddPost}>
        Add a new post
      </button>
      {postsList?.map((post) => (
        <SinglePost post={post} />
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const props = {};
  const response = await api("posts");
  // console.log("posts response: ", response);
  props.postsList = response;

  return { props };
}
