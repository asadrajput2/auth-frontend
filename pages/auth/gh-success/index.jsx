import { useRouter } from "next/router";
import React from "react";

export default function GithubSuccess() {
  const route = useRouter();

  // console.log("route.params: ", route.params);

  return (
    <div>
      <h1>Successfully logged in to github, now redirecting...</h1>
    </div>
  );
}
