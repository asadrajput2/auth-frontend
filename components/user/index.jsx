import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import api from "../../apiProvider";
import { isAuthenticated } from "../../utils/verifyAuth";

export default function UserFAB() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [oauth, setOauth] = useState(false);

  useEffect(() => {
		isAuthenticated().then((results) => {
			// console.log("auth status : ", results);
      setAuth(results.auth);
      results.oauth && setOauth(results.oauth);
    });
  }, []);

  async function logout() {
    const response = await api("users/logout", "POST", {
      accessToken: localStorage.getItem("accesstoken"),
      refreshToken: localStorage.getItem("refreshtoken"),
    });

    if (response?.message === "success") {
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("oauthlogin");

      router.push("/auth");
    }
  }

  function goToCP() {
    router.push("/auth/change-password");
  }

  function gotToLogin() {
    router.push("/auth");
  }

  return (
    <div className="user-fab">
      <div className="user">
        <BiUserCircle />
      </div>
      <div className="user-dropdown">
        {auth ? (
          <>
            {!oauth && (
              <button className="user-btn btn" onClick={goToCP}>
                Change Password
              </button>
            )}
            <button className="user-btn btn" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <button className="user-btn btn" onClick={gotToLogin}>
            Log in
          </button>
        )}
      </div>
    </div>
  );
}
