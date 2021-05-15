import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../../apiProvider";
import { BASE_URL } from "../../config/constants";
import useAuthentication from "../../utils/verifyAuth";

const GH_CLIENT = "34693835b5f6da271c7a";
const GH_REDIRECT = `${BASE_URL}/auth`;
const GH_LINK = `https://github.com/login/oauth/authorize?client_id=${GH_CLIENT}&redirect_uri=${GH_REDIRECT}&scope=user`;

export default function Home({ query }) {
  useAuthentication(null, "public");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // console.log("query: ", query);

    const { code } = query;
    if (code) {
      setLoading(true);
      api(`users/github-login`, "post", { code }).then((response) => {
        setLoading(false);
        // console.log("gh login response: ", response);
        if (response?.message === "success") {
          localStorage.setItem("accesstoken", response.accessToken);
          localStorage.setItem("refreshtoken", response.refreshToken);
          localStorage.setItem("oauthlogin", response.oauthLogin);
          router.push("/");
        }
      });
    }
  }, []);

  return (
    <div className="home">
      <div className="header">Welcome aboard, captain!</div>

      <div className="card">
        <Link href="/auth/login">
          <a className="btn login-button">Login</a>
        </Link>
        <Link href="/auth/signup">
          <a className="btn signup-button">Signup</a>
        </Link>
        <a href={GH_LINK} className="btn gh-button">
          Continue with GitHub
        </a>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  return { props: { query } };
}
