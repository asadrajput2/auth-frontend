import { useRouter } from "next/router";
import React, { useState } from "react";
import api from "../../../apiProvider";
import useAuthentication from "../../../utils/verifyAuth";

export default function Login() {
  useAuthentication(null, "public");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const text = router.query.text;

  async function handleSubmit() {
    const response = await api("users/create", "POST", {
      email,
      name,
      password,
    });
    // console.log("response: ", response);

    if (response?.message === "success") {
      router.push("/login");
      localStorage.setItem("authtoken", response.token.toString());
    }
  }

  return (
    <>
      <div className="header">Sign up</div>

      <div className="card">
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="
      btn login-button"
          type="submit"
          onClick={handleSubmit}
        >
          Signup
        </button>
      </div>
    </>
  );
}
