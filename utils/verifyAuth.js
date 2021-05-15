import { useRouter } from "next/router";
import { useEffect } from "react";
import api from "../apiProvider";

export default function useAuthentication(text, pageType) {
  const router = useRouter();

  console.log("base url", process.env.BASE_URL);

  useEffect(() => {
    api("users/verify", "POST").then((userVerification) => {
      // console.log("userVerification", userVerification);
      if (pageType === "protected" && userVerification?.message !== "success") {
        router.push({
          pathname: "/auth",
          query: { text: true },
        });
      } else {
        // if logged user opens public page
        if (pageType === "public" && userVerification?.message === "success")
          router.push("/");
      }
    });
  }, []);

  return true;
}

export async function isAuthenticated() {
  const userVerification = await api("users/verify", "POST");
  // console.log("userVerification", userVerification);
  return {
    auth: userVerification?.message === "success",
    oauth: localStorage.getItem("oauthlogin") === "true",
  };
}
